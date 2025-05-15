'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Sample data for demonstration
const SAMPLE_USERS = [
  {
    id: 'user1',
    username: 'creative_explorer',
    full_name: 'Alex Morgan',
    avatar_url: null,
    bio: 'Adventure seeker | Photographer | Storyteller',
  },
  {
    id: 'user2',
    username: 'design_maven',
    full_name: 'Jordan Lee',
    avatar_url: null,
    bio: 'UI/UX Designer | Digital Artist | Coffee Enthusiast',
  },
  {
    id: 'user3',
    username: 'urban_photographer',
    full_name: 'Taylor Kim',
    avatar_url: null,
    bio: 'Capturing city moments | Street photography | Architecture lover',
  },
];

const SAMPLE_REALMS = [
  {
    id: 'realm1',
    name: 'Urban Photography',
    description: 'A community for urban photographers and city explorers',
    members_count: 5243,
    cover_image: null,
  },
  {
    id: 'realm2',
    name: 'Digital Art Masters',
    description: 'Share and discuss digital art techniques and creations',
    members_count: 8721,
    cover_image: null,
  },
  {
    id: 'realm3',
    name: 'Travel Adventures',
    description: 'For those who wander and capture amazing travel moments',
    members_count: 12453,
    cover_image: null,
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('users');
  
  const filteredUsers = SAMPLE_USERS.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredRealms = SAMPLE_REALMS.filter(realm => 
    realm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    realm.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Discover</h1>
        
        {/* Search Input */}
        <div className="mb-6 flex items-center rounded-full border border-gray-300 bg-gray-50 px-4 py-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users, realms, or topics..."
            className="ml-2 w-full bg-transparent outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Tabs */}
        <div className="mb-6 border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'users'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('realms')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'realms'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Realms
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'explore'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Explore
            </button>
          </div>
        </div>
        
        {/* Content based on active tab */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Users</h2>
            {filteredUsers.length === 0 ? (
              <p className="text-gray-500">No users found</p>
            ) : (
              filteredUsers.map(user => (
                <Link href={`/profile/${user.id}`} key={user.id}>
                  <div className="flex items-center rounded-lg bg-white p-4 shadow-sm hover:bg-gray-50">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      {user.avatar_url ? (
                        <Image
                          src={user.avatar_url}
                          alt={user.username}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-sm font-bold text-indigo-600">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{user.full_name}</p>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                    <button className="ml-auto rounded-full border border-indigo-600 px-4 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
                      Follow
                    </button>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
        
        {activeTab === 'realms' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Realms</h2>
            {filteredRealms.length === 0 ? (
              <p className="text-gray-500">No realms found</p>
            ) : (
              filteredRealms.map(realm => (
                <Link href={`/realms/${realm.id}`} key={realm.id}>
                  <div className="rounded-lg bg-white p-4 shadow-sm hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-indigo-100">
                        {realm.cover_image ? (
                          <Image
                            src={realm.cover_image}
                            alt={realm.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm font-bold text-indigo-600">
                            {realm.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">{realm.name}</p>
                        <p className="text-sm text-gray-500">{realm.members_count.toLocaleString()} members</p>
                      </div>
                      <button className="ml-auto rounded-full bg-indigo-600 px-4 py-1 text-sm font-medium text-white hover:bg-indigo-700">
                        Join
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{realm.description}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
        
        {activeTab === 'explore' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Trending Topics</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {['Photography', 'Digital Art', 'Travel', 'Fashion', 'Food', 'Technology'].map(topic => (
                <div 
                  key={topic} 
                  className="flex h-24 items-center justify-center rounded-lg bg-indigo-100 p-4 text-center font-medium text-indigo-800 hover:bg-indigo-200"
                >
                  #{topic.toLowerCase().replace(' ', '')}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
