'use client';

import { Spinner } from '@/components/ui/Spinner';
import { documentsApi } from '@/features/documents/document.api';
import { DocumentListItem } from '@/features/documents/components/DocumentListItem';
import { useConversationDocuments } from '@/features/documents/hooks/useConversationDocument';
import { useDocumentsStore } from '@/features/documents/document.store';

export function DocumentsPanel({
  conversationId,
}: {
  conversationId?: string;
}) {
  const { documents, isLoading } = useConversationDocuments(conversationId);
  const removeDocumentFromStore = useDocumentsStore(
    (state) => state.removeDocument,
  );

  const handleRemove = async (documentId: string) => {
    if (!conversationId) return;
    await documentsApi.remove(documentId);
    removeDocumentFromStore(conversationId, documentId);
  };

  return (
    <aside className='hidden w-80 shrink-0 flex-col border-l border-slate-200 bg-white xl:flex'>
      <header className='border-b border-slate-200 px-4 py-3'>
        <h2 className='text-sm font-semibold'>
          Documents ({documents.length})
        </h2>
        <p className='text-xs text-slate-500'>
          Sources used to answer in this chat
        </p>
      </header>
      <div className='flex-1 overflow-y-auto p-4'>
        {isLoading ? (
          <Spinner className='mx-auto text-indigo-600' />
        ) : documents.length === 0 ? (
          <p className='text-sm text-slate-500'>
            Documents you upload or paste will appear here.
          </p>
        ) : (
          <ul className='space-y-2'>
            {documents.map((document) => (
              <DocumentListItem
                key={document.id}
                document={document}
                onRemove={handleRemove}
              />
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
