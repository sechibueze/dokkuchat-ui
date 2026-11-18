import type { Metadata } from 'next';
import { PageContainer } from '@/components/layout/PageContainer';
import { UsersTable } from '@/features/admin/components/UserTable';
export const metadata: Metadata = { title: 'All users' };

export default function AdminUsersPage() {
  return (
    <PageContainer
      title='All users'
      description='Every account in your organization.'
    >
      <UsersTable />
    </PageContainer>
  );
}
