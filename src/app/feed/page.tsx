'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '@/components/navigation/Navbar';
import PostCard from '@/components/feed/PostCard';
import { supabase } from '@/lib/supabase/client';

interface Post {
  id: string;
  user: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
  media_url: string;
  media_type: string;
  caption: string | null;
  created_at: string;
  likes_count: number;
  comments_count: number;
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        router.push('/auth');
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('posts')
        .select(`
          id,
          media_url,
          media_type,
          caption,
          created_at,
          likes_count,
          comments_count,
          user:users (
        id,
        username,
        avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .range(page * 10, (page + 1) * 10 - 1);

      if (fetchError) throw fetchError;

      setPosts(prev => page === 0 ? data.map(post => ({
        ...post,
        user: post.user[0], // Ensure user is a single object, not an array
      })) as Post[] : [...prev, ...data.map(post => ({
        ...post,
        user: post.user[0],
      })) as Post[]]);
      setHasMore(data.length === 10);
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchPosts();
    }
  }, [inView]);

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error ? (
            <div className="rounded-lg bg-red-50 p-4 text-center">
              <p className="text-red-800">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setPage(0);
                  fetchPosts();
                }}
                className="mt-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              
              {loading && (
                <div className="flex justify-center p-4">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
                </div>
              )}
              
              <div ref={ref} className="h-10" />
              
              {!hasMore && posts.length > 0 && (
                <p className="text-center text-gray-600">No more posts to load</p>
              )}
              
              {!loading && posts.length === 0 && (
                <div className="rounded-lg bg-gray-50 p-8 text-center">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">No Posts Yet</h3>
                  <p className="text-gray-600">Be the first to share something amazing!</p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </main>
    </>
  );
}
