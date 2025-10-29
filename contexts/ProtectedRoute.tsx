'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from './AuthContext';

const publicPaths = ['/', '/login', '/trial-expired'];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoading } = useAuth();

  if (isLoading && !publicPaths.includes(pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
