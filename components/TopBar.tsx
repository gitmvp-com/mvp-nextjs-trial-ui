'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTrialStatus } from '@/hooks/useTrialStatus';

export default function TopBar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isInTrial } = useTrialStatus();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setIsDropdownOpen(false);
    router.push('/login');
  };

  return (
    <div className="w-full bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link href="/" className="text-md sm:text-lg font-medium text-text dark:text-text-dark flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🚀</span>
          <span className="font-sans">MVP Template</span>
        </Link>

        <div className="flex items-center gap-4">
          {!user ? (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-full transition-colors shadow-subtle hover:shadow-hover"
            >
              Sign in
            </Link>
          ) : (
            <>
              {pathname !== '/dashboard' && (
                <button
                  onClick={() => router.push('/dashboard')}
                  className="hidden sm:block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors shadow-subtle hover:shadow-hover"
                >
                  {isInTrial ? "Go to Dashboard" : "Dashboard"}
                </button>
              )}
              
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 hover:bg-neutral-darker/10 dark:hover:bg-neutral-darker/50 px-3 py-2 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary dark:text-primary-light">
                    {user.email?.[0].toUpperCase()}
                  </div>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface-light dark:bg-surface-dark rounded-lg shadow-hover py-1 z-[60] border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-danger hover:bg-neutral dark:hover:bg-neutral-dark"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
