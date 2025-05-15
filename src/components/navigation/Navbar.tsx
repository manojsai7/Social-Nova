'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  PlusCircleIcon, 
  HeartIcon, 
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Search', href: '/search', icon: MagnifyingGlassIcon },
  { name: 'Create', href: '/create', icon: PlusCircleIcon },
  { name: 'Notifications', href: '/notifications', icon: HeartIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop navigation */}
      <nav className="fixed bottom-0 left-0 z-50 hidden w-full border-t border-gray-200 bg-white md:top-0 md:bottom-auto md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">SocialNova</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === item.href
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-1 h-5 w-5" aria-hidden="true" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <button
              type="button"
              className="rounded-full bg-indigo-600 p-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile navigation */}
      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white md:hidden">
        <div className="grid h-16 grid-cols-5">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center ${
                pathname === item.href
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-6 w-6" aria-hidden="true" />
              <span className="mt-1 text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
