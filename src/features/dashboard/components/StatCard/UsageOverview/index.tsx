'use client';

import { Spinner } from '@/components/ui/Spinner';
import { dashboardApi } from '@/features/dashboard/dashboard.api';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { useAsyncData } from '@/hooks/useAsyncData';

export function UsageOverview() {
  const { data, isLoading, error } = useAsyncData(dashboardApi.getUsageSummary);

  if (isLoading) return <Spinner className='h-6 w-6 text-indigo-600' />;
  if (error || !data)
    return (
      <p className='text-sm text-red-600'>
        {error ?? 'Usage data is unavailable.'}
      </p>
    );

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <StatCard label='Documents' value={data.documentCount.toLocaleString()} />
      <StatCard
        label='Conversations'
        value={data.conversationCount.toLocaleString()}
      />
      <StatCard label='Tokens used' value={data.tokensUsed.toLocaleString()} />
      <StatCard label='Budget used' value={`${data.budgetUsedPercent}%`} />
    </div>
  );
}
