'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/dashboard', icon: '/images/home.svg' },
  { name: 'Transactions', href: '/dashboard/transactions', icon: '/images/transactions.svg' },
  { name: 'Reports', href: '/dashboard/reports', icon: '/images/Collection.svg' },
  { name: 'Team', href: '/dashboard/team', icon: '/images/Team.svg' },
  { name: 'Settings', href: '/dashboard/settings', icon: '/images/Cog settings.svg' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 bg-white">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b  border-gray-200 px-6">
          <Image 
            src="/images/logo.png" 
            alt="Spring" 
            width={24} 
            height={24}
          />
          <span className="text-lg font-semibold text-gray-900">Spring</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 border-r border-gray-200 px-3 py-4">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            const showDivider = index === 1; // After Transactions (index 1)
            
            return (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-primary'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Image 
                    src={item.icon} 
                    alt={item.name}
                    width={20}
                    height={20}
                    className={cn(
                      isActive ? 'opacity-100' : 'opacity-60'
                    )}
                  />
                  {item.name}
                </Link>
                {showDivider && (
                  <div className="my-3 border-t border-gray-200" />
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}