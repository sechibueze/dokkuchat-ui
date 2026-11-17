'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/auth.store';
import { useRateLimitStore } from '@/features/auth/rate-limit.store';

export function useLogout() {
  const router = useRouter();
  const clearSession = useAuthStore((state) => state.clearSession);

  return () => {
    clearSession();
    useRateLimitStore.getState().clearCooldown();

    router.replace('/login');
  };
}
