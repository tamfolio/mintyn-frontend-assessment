'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Bell, HelpCircle, LogOut, User } from 'lucide-react';
import Image from 'next/image';
import { logout } from '@/lib/api';
import { useUser } from '@/hooks/useUser';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: user } = useUser();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = user?.email?.split('@')[0] || 'User';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-end h-16 gap-4 border-b border-gray-200 bg-white px-6">
      {/* Search */}
      <div className="items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search"
            className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100">
          <Bell className="h-5 w-5 fill-gray" />
        </button>

        {/* Help */}
        <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100">
          <HelpCircle className="h-5 w-5 fill-gray text-white" />
        </button>

        {/* User Avatar with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200 hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all"
          >
            <Image 
              src="/images/avatar.jpg" 
              alt="User" 
              width={32} 
              height={32}
              className="h-full w-full object-cover"
            />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg py-1">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900 capitalize">{displayName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              
              <button
                onClick={() => {
                  setShowDropdown(false);
                
                }}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <User className="h-4 w-4" />
                Profile
              </button>

              <button
                onClick={() => {
                  setShowDropdown(false);
                  handleLogout();
                }}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}