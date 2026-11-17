import type { Metadata } from 'next';
import { UsageOverview } from '@/features/dashboard/components/StatCard/UsageOverview';
import { PageContainer } from '@/components/layout/PageContainer';
export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return (
    <PageContainer
      title='Dashboard'
      description='Your usage and budget at a glance.'
    >
      <UsageOverview />
    </PageContainer>
  );
}
