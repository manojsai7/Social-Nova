'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/navigation/Navbar';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/auth');
        return;
      }
      
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user data:', error);
      } else {
        setUser(userData);
      }
      
      setLoading(false);
    }
    
    getUser();
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
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <div className="mb-4 md:mb-0 md:mr-6">
              <div className="relative h-24 w-24 overflow-hidden rounded-full md:h-32 md:w-32">
                {user?.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt={user.username}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-2xl font-bold text-indigo-600">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{user?.full_name || 'User'}</h1>
              <p className="text-gray-600">@{user?.username || 'username'}</p>
              <p className="mt-2 max-w-md">{user?.bio || 'No bio yet'}</p>
              <div className="mt-4 flex justify-center space-x-4 md:justify-start">
                <div>
                  <span className="font-bold">0</span> <span className="text-gray-600">Posts</span>
                </div>
                <div>
                  <span className="font-bold">0</span> <span className="text-gray-600">Followers</span>
                </div>
                <div>
                  <span className="font-bold">0</span> <span className="text-gray-600">Following</span>
                </div>
              </div>
            </div>
            <div className="ml-auto mt-4 hidden md:block">
              <button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                Edit Profile
              </button>
            </div>
          </div>
          <div className="mt-4 block md:hidden">
            <button className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mb-6 border-b">
          <div className="flex">
            <button className="border-b-2 border-indigo-600 px-4 py-2 font-medium text-indigo-600">
              Posts
            </button>
            <button className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900">
              Saved
            </button>
            <button className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900">
              Tagged
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100 p-4 text-center text-gray-500">
            No posts yet
          </div>
        </div>
      </div>
    </>
  );
}
