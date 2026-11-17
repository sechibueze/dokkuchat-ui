'use client';

import { Clock } from 'lucide-react';
import { useRateLimitCountdown } from '@/features/auth/hooks/userateLimitCountdown';
import { formatRetryDelay, formatRetryTime } from '@/lib/rate-limit';

export function RateLimitBanner() {
  const { isRateLimited, secondsRemaining, retryAt } = useRateLimitCountdown();

  if (!isRateLimited || retryAt === null) return null;

  return (
    <div
      role='alert'
      className='flex items-center gap-3 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900'
    >
      <Clock className='h-4 w-4 shrink-0' aria-hidden='true' />
      <p className='flex-1'>
        <span className='font-medium'>
          You&apos;ve reached your usage limit.
        </span>{' '}
        You can try again at {formatRetryTime(retryAt)}.
      </p>
      {/* Hidden from screen readers so the ticking countdown isn't announced every second. */}
      <span aria-hidden='true' className='shrink-0 font-medium tabular-nums'>
        {formatRetryDelay(secondsRemaining)}
      </span>
    </div>
  );
}
