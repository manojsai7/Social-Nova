'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, ChatBubbleLeftIcon, PaperAirplaneIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface PostCardProps {
  post: {
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
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isDoubleTapLiked, setIsDoubleTapLiked] = useState(false);
  const lastTap = useRef<number>(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      if (!liked) {
        setLiked(true);
        setLikesCount(prev => prev + 1);
        setIsDoubleTapLiked(true);
        setTimeout(() => setIsDoubleTapLiked(false), 1000);
      }
    }
    lastTap.current = now;
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => prev + (liked ? -1 : 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 overflow-hidden rounded-lg bg-white shadow-md"
    >
      <div className="p-4">
        <div className="mb-4 flex items-center">
          <Link href={`/profile/${post.user.id}`} className="flex items-center">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={post.user.avatar_url || '/default-avatar.png'}
                alt={post.user.username}
                fill
                className="object-cover"
              />
            </div>
            <span className="ml-3 font-medium text-gray-900">{post.user.username}</span>
          </Link>
        </div>

        <div className="relative" onClick={handleDoubleTap}>
          <div className="aspect-w-4 aspect-h-3 relative overflow-hidden rounded-lg">
            <Image
              src={post.media_url}
              alt={post.caption || 'Post image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <AnimatePresence>
            {isDoubleTapLiked && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <HeartIconSolid className="h-24 w-24 text-red-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              {liked ? (
                <HeartIconSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6" />
              )}
              <span className="ml-2">{likesCount}</span>
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowComments(!showComments)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChatBubbleLeftIcon className="h-6 w-6" />
              <span className="ml-2">{post.comments_count}</span>
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-gray-600 hover:text-gray-900"
            >
              <PaperAirplaneIcon className="h-6 w-6" />
            </motion.button>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setSaved(!saved)}
            className="text-gray-600 hover:text-gray-900"
          >
            <BookmarkIcon className={`h-6 w-6 ${saved ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {post.caption && (
          <p className="mt-4 text-gray-600">
            <Link href={`/profile/${post.user.id}`} className="mr-2 font-medium text-gray-900">
              {post.user.username}
            </Link>
            {post.caption}
          </p>
        )}

        <p className="mt-2 text-sm text-gray-500">
          {new Date(post.created_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </motion.div>
  );
}
