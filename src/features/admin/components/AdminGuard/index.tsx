'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/features/auth/auth.store';

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const role = useAuthStore((state) => state.user?.role);

  useEffect(() => {
    if (role && role !== 'admin') router.replace('/chat');
  }, [role, router]);

  if (role !== 'admin') return null;
  return <>{children}</>;
}
