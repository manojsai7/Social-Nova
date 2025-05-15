'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="mb-6 overflow-hidden rounded-lg bg-white shadow-md">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <Link href={`/profile/${post.user.id}`} className="flex items-center">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            {post.user.avatar_url ? (
              <Image
                src={post.user.avatar_url}
                alt={post.user.username}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-sm font-bold text-indigo-600">
                {post.user.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <span className="ml-3 font-medium">{post.user.username}</span>
        </Link>
        <button className="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>

      {/* Post Media */}
      <div className="relative aspect-square w-full bg-black">
        {post.media_type === 'image' ? (
          <Image
            src={post.media_url}
            alt="Post content"
            fill
            className="object-contain"
          />
        ) : (
          <video
            src={post.media_url}
            controls
            className="h-full w-full object-contain"
          />
        )}
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <button onClick={handleLike}>
              {liked ? (
                <HeartIconSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6" />
              )}
            </button>
            <button onClick={() => setShowComments(!showComments)}>
              <ChatBubbleLeftIcon className="h-6 w-6" />
            </button>
            <button>
              <PaperAirplaneIcon className="h-6 w-6 rotate-45" />
            </button>
          </div>
          <button onClick={() => setSaved(!saved)}>
            <BookmarkIcon className={`h-6 w-6 ${saved ? 'fill-current text-black' : ''}`} />
          </button>
        </div>

        {/* Likes count */}
        <div className="mt-2">
          <span className="font-bold">{likesCount} likes</span>
        </div>

        {/* Caption */}
        {post.caption && (
          <div className="mt-2">
            <span className="font-bold">{post.user.username}</span>{' '}
            <span>{post.caption}</span>
          </div>
        )}

        {/* Comments */}
        {post.comments_count > 0 && (
          <button 
            className="mt-2 text-sm text-gray-500"
            onClick={() => setShowComments(!showComments)}
          >
            View all {post.comments_count} comments
          </button>
        )}

        {/* Timestamp */}
        <div className="mt-2 text-xs uppercase text-gray-500">
          {new Date(post.created_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* Comment input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-grow border-none bg-transparent outline-none"
          />
          <button className="font-semibold text-indigo-600">Post</button>
        </div>
      </div>
    </div>
  );
}
