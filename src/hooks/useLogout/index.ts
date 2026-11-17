'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/auth.store';

export function useLogout() {
  const router = useRouter();
  const clearSession = useAuthStore((state) => state.clearSession);

  return () => {
    clearSession();

    router.replace('/login');
  };
}
