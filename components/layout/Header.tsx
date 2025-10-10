'use client';

import { Search, Bell, HelpCircle } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-end h-16  gap-4 border-b border-gray-200 bg-white px-6">
      {/* Search */}
      <div className=" items-center gap-4">
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

        {/* User Avatar */}
        <button className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
          <Image 
            src="/images/avatar.jpg" 
            alt="User" 
            width={32} 
            height={32}
            className="h-full w-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}