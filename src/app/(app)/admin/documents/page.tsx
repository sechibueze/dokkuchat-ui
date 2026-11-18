import type { Metadata } from 'next';
import { PageContainer } from '@/components/layout/PageContainer';
import { AllDocumentsTable } from '@/features/admin/components/DocumentTable';
export const metadata: Metadata = { title: 'All documents' };

export default function AdminDocumentsPage() {
  return (
    <PageContainer
      title='All documents'
      description='Every document across all users.'
    >
      <AllDocumentsTable />
    </PageContainer>
  );
}
