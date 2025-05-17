'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  PlusCircleIcon, 
  HeartIcon, 
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { supabase, getSignedInUser } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Search', href: '/search', icon: MagnifyingGlassIcon },
  { name: 'Create', href: '/create', icon: PlusCircleIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getSignedInUser();
        setUser({
          id: currentUser.id,
          email: currentUser.email,
          app_metadata: {},
          user_metadata: {},
          aud: 'mock',
          created_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: string, session: { user: User | null }) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const authLinks = user ? (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
            pathname === item.href
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
          }`}
        >
          <item.icon className="h-5 w-5" />
          <span className="hidden md:inline">{item.name}</span>
        </Link>
      ))}
      <button
        onClick={handleSignOut}
        className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        <span className="hidden md:inline">Sign Out</span>
      </button>
    </>
  ) : (
    <Link
      href="/auth"
      className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
    >
      Sign In
    </Link>
  );

  return (
    <>
      {/* Desktop navigation */}
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">SocialNova</span>
            </Link>
          </div>
          
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          ) : (
            <div className="hidden md:flex md:items-center md:space-x-4">
              {authLinks}
            </div>
          )}

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } md:hidden`}
        >
          <div className="space-y-1 px-4 pb-3 pt-2">
            {authLinks}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
