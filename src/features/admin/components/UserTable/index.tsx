'use client';

import { DataTable, type DataTableColumn } from '@/components/ui/DataTable';
import { adminApi } from '@/features/admin/admin.api';
import type { AdminUser } from '@/features/admin/admin.schema';
import { useAsyncData } from '@/hooks/useAsyncData';
import { formatDate } from '@/lib/formatter';

const COLUMNS: DataTableColumn<AdminUser>[] = [
  {
    key: 'username',
    header: 'Username',
    render: (user) => <span className='font-medium'>{user?.name}</span>,
  },
  { key: 'email', header: 'Email', render: (user) => user?.email },
  {
    key: 'role',
    header: 'Role',
    render: (user) => <span className='capitalize'>{user.role}</span>,
  },
  {
    key: 'tier',
    header: 'Tier',
    render: (user) => <span className='capitalize'>{user.tier}</span>,
  },
  {
    key: 'documents',
    header: 'Documents',
    render: (user) => user?.documentCount,
  },
  {
    key: 'joined',
    header: 'Joined',
    render: (user) => formatDate(user.createdAt),
  },
];

export function UsersTable() {
  const { data, isLoading, error } = useAsyncData(adminApi.listUsers);
  return (
    <DataTable
      columns={COLUMNS}
      rows={data ?? []}
      getRowId={(user) => user.id}
      isLoading={isLoading}
      errorMessage={error}
      emptyMessage='No users found.'
    />
  );
}
