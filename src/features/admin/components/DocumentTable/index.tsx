'use client';

import { DataTable, type DataTableColumn } from '@/components/ui/DataTable';
import { adminApi } from '@/features/admin/admin.api';
import type { AdminDocument } from '@/features/admin/admin.schema';
import { DocumentStatusBadge } from '@/features/documents/components/DocumentStatusBadge';
import { useAsyncData } from '@/hooks/useAsyncData';
import { formatDate, formatFileSize } from '@/lib/formatter';

const COLUMNS: DataTableColumn<AdminDocument>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (document) => <span className='font-medium'>{document.name}</span>,
  },
  { key: 'owner', header: 'Owner', render: (document) => document.email },
  {
    key: 'size',
    header: 'Size',
    render: (document) => formatFileSize(document.sizeBytes),
  },
  {
    key: 'status',
    header: 'Status',
    render: (document) => <DocumentStatusBadge status={document.status} />,
  },
  {
    key: 'uploaded',
    header: 'Uploaded',
    render: (document) => formatDate(document.createdAt),
  },
];

export function AllDocumentsTable() {
  const { data, isLoading, error } = useAsyncData(adminApi.listDocuments);
  return (
    <DataTable
      columns={COLUMNS}
      rows={data ?? []}
      getRowId={(document) => document.id}
      isLoading={isLoading}
      errorMessage={error}
      emptyMessage='No documents have been uploaded.'
    />
  );
}
