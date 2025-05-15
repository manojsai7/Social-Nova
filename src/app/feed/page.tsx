'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import PostCard from '@/components/feed/PostCard';
import { createClient } from '@/lib/supabase/client';

// Sample data for demonstration
const SAMPLE_POSTS = [
  {
    id: '1',
    user: {
      id: 'user1',
      username: 'creative_explorer',
      avatar_url: null,
    },
    media_url: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714',
    media_type: 'image',
    caption: 'Exploring new horizons and embracing the unknown. #adventure #discovery',
    created_at: '2023-05-15T10:30:00Z',
    likes_count: 124,
    comments_count: 18,
  },
  {
    id: '2',
    user: {
      id: 'user2',
      username: 'design_maven',
      avatar_url: null,
    },
    media_url: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1',
    media_type: 'image',
    caption: 'Finding inspiration in the details. What catches your eye? ✨ #design #creativity',
    created_at: '2023-05-14T15:45:00Z',
    likes_count: 89,
    comments_count: 7,
  },
  {
    id: '3',
    user: {
      id: 'user3',
      username: 'urban_photographer',
      avatar_url: null,
    },
    media_url: 'https://images.unsplash.com/photo-1682687218147-9806132dc697',
    media_type: 'image',
    caption: 'City lights and urban nights. The city never sleeps and neither does my camera. #urbanphotography #nightshots',
    created_at: '2023-05-13T20:15:00Z',
    likes_count: 215,
    comments_count: 32,
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchPosts() {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/auth');
        return;
      }
      
      // In a real app, we would fetch posts from Supabase
      // For now, we'll use sample data
      setPosts(SAMPLE_POSTS);
      setLoading(false);
    }
    
    fetchPosts();
  }, [router, supabase]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Your Feed</h1>
        
        {posts.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-md">
            <h2 className="mb-2 text-xl font-semibold">Welcome to SocialNova!</h2>
            <p className="mb-4 text-gray-600">
              Your feed is empty. Start following creators or explore content to populate your feed.
            </p>
            <button 
              onClick={() => router.push('/explore')}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Explore Content
            </button>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
