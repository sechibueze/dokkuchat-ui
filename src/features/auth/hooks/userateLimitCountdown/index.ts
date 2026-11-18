'use client';

import { useEffect, useState } from 'react';
import { useRateLimitStore } from '@/features/auth/rate-limit.store';

export function useRateLimitCountdown() {
  const retryAt = useRateLimitStore((state) => state.retryAt);
  const clearCooldown = useRateLimitStore((state) => state.clearCooldown);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (retryAt === null) return;
    setNow(Date.now());

    const timer = setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= retryAt) clearCooldown();
    }, 1000);

    return () => clearInterval(timer);
  }, [retryAt, clearCooldown]);

  const secondsRemaining =
    retryAt === null ? 0 : Math.ceil(Math.max(0, retryAt - now) / 1000);

  return { isRateLimited: secondsRemaining > 0, secondsRemaining, retryAt };
}
