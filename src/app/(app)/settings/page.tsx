import { PageContainer } from '@/components/layout/PageContainer';
import { ProfileSettings } from '@/features/auth/components/ProfileSettings';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Settings' };

export default function SettingsPage() {
  return (
    <PageContainer title='Settings' description='Manage your account.'>
      <ProfileSettings />
    </PageContainer>
  );
}
