'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import PostCard from '@/components/feed/PostCard';
import { createClient } from '@/lib/supabase/client';

// Sample data for demonstration
const SAMPLE_REALM = {
  id: 'realm1',
  name: 'Urban Photography',
  description: 'A community dedicated to urban photography, city exploration, and capturing the essence of urban life through the lens. Share your city shots, street photography, and architectural captures.',
  creator_id: 'user1',
  creator_username: 'creative_explorer',
  members_count: 5243,
  posts_count: 12567,
  cover_image: null,
  created_at: '2023-01-15T10:30:00Z',
};

const SAMPLE_POSTS = [
  {
    id: '1',
    user: {
      id: 'user1',
      username: 'creative_explorer',
      avatar_url: null,
    },
    media_url: 'https://images.unsplash.com/photo-1682687218147-9806132dc697',
    media_type: 'image',
    caption: 'Downtown vibes and city lights. #urbanphotography #cityscape',
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
    caption: 'Architectural details that often go unnoticed. #architecture #details',
    created_at: '2023-05-14T15:45:00Z',
    likes_count: 89,
    comments_count: 7,
  },
];

export default function RealmPage() {
  const { id } = useParams();
  const [realm, setRealm] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [isMember, setIsMember] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchRealmData() {
      // In a real app, we would fetch realm data from Supabase
      // For now, we'll use sample data
      setRealm(SAMPLE_REALM);
      setPosts(SAMPLE_POSTS);
      setLoading(false);
    }
    
    fetchRealmData();
  }, [id]);

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
      <div className="container mx-auto px-4 py-8">
        {/* Realm Header */}
        <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-md">
          <div className="relative h-48 w-full bg-indigo-100">
            {realm.cover_image ? (
              <Image
                src={realm.cover_image}
                alt={realm.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-indigo-300">
                {realm.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
              <div>
                <h1 className="text-3xl font-bold">{realm.name}</h1>
                <p className="mt-1 text-gray-600">
                  Created by{' '}
                  <Link href={`/profile/${realm.creator_id}`} className="text-indigo-600 hover:underline">
                    @{realm.creator_username}
                  </Link>
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => setIsMember(!isMember)}
                  className={`rounded-full px-6 py-2 font-medium ${
                    isMember
                      ? 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isMember ? 'Joined' : 'Join Realm'}
                </button>
              </div>
            </div>
            
            <p className="mt-4">{realm.description}</p>
            
            <div className="mt-6 flex space-x-6">
              <div>
                <span className="font-bold">{realm.members_count.toLocaleString()}</span>{' '}
                <span className="text-gray-600">members</span>
              </div>
              <div>
                <span className="font-bold">{realm.posts_count.toLocaleString()}</span>{' '}
                <span className="text-gray-600">posts</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Tabs */}
        <div className="mb-6 border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'posts'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'members'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Members
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'about'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="mx-auto max-w-2xl">
          {activeTab === 'posts' && (
            <div>
              {posts.length === 0 ? (
                <div className="rounded-lg bg-white p-8 text-center shadow-md">
                  <h2 className="mb-2 text-xl font-semibold">No posts yet</h2>
                  <p className="mb-4 text-gray-600">
                    Be the first to share content in this realm!
                  </p>
                  <Link
                    href="/create"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                  >
                    Create Post
                  </Link>
                </div>
              ) : (
                <div>
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'members' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Members</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search members..."
                    className="rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="text-center text-gray-500">
                  Member list is not available in the demo.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'about' && (
            <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-lg font-semibold">About this Realm</h2>
                <p className="mt-2 text-gray-600">{realm.description}</p>
              </div>
              
              <div>
                <h3 className="text-md font-semibold">Created</h3>
                <p className="text-gray-600">
                  {new Date(realm.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              
              <div>
                <h3 className="text-md font-semibold">Rules</h3>
                <ul className="mt-2 list-inside list-disc text-gray-600">
                  <li>Be respectful to all members</li>
                  <li>Only share content related to urban photography</li>
                  <li>Credit original photographers when sharing others' work</li>
                  <li>No spam or self-promotion without context</li>
                  <li>Have fun and engage with the community!</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
