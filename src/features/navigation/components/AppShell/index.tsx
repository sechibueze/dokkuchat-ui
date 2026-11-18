'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState, type ReactNode } from 'react';
import { Spinner } from '@/components/ui/Spinner';
import { useAuthStore } from '@/features/auth/auth.store';
import { Sidebar } from '@/features/navigation/components/Sidebar';
import { TopBar } from '@/features/navigation/components/Topbar';
import { useIsMounted } from '@/hooks/useIsMounted';
import { RateLimitBanner } from '@/features/auth/components/RateLimitBanner';

export function AppShellContent({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isMounted = useIsMounted();
  const user = useAuthStore((state) => state.user);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isMounted && !user)
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [isMounted, user, pathname, router]);

  useEffect(() => setIsSidebarOpen(false), [pathname]);

  // Validate the access token and retrieve the authenticated user.
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Redirect unauthenticated users.
  useEffect(() => {
    if (!isInitializing && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isInitializing, user, pathname, router]);

  if (isInitializing || !user) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner className='h-6 w-6 text-indigo-600' />
      </div>
    );
  }

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar isOpen={isSidebarOpen} />
      {isSidebarOpen && (
        <div
          className='fixed inset-0 z-30 bg-slate-900/30 md:hidden'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className='flex min-w-0 flex-1 flex-col'>
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
        <RateLimitBanner />
        <main className='min-h-0 flex-1'>{children}</main>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className='min-h-screen' />}>
      <AppShellContent>{children}</AppShellContent>
    </Suspense>
  );
}
