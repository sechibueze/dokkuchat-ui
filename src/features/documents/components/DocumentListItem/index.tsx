import { FileText, Trash2 } from 'lucide-react';
import { DocumentStatusBadge } from '@/features/documents/components/DocumentStatusBadge';
import type { DocumentItem } from '@/features/documents/document.schema';
import { formatFileSize } from '@/lib/formatter';

interface DocumentListItemProps {
  document: DocumentItem;
  onRemove: (documentId: string) => void;
}

export function DocumentListItem({
  document,
  onRemove,
}: DocumentListItemProps) {
  return (
    <li className='flex items-start gap-3 rounded-lg border border-slate-200 p-3'>
      <FileText className='mt-0.5 h-4 w-4 shrink-0 text-slate-500' />
      <div className='min-w-0 flex-1'>
        <p className='truncate text-sm font-medium' title={document.name}>
          {document.name}
        </p>
        <div className='mt-1 flex items-center gap-2 text-xs text-slate-500'>
          <span>{formatFileSize(document.sizeBytes)}</span>
          <DocumentStatusBadge status={document.status} />
        </div>
      </div>
      <button
        type='button'
        aria-label={`Remove ${document.name}`}
        onClick={() => onRemove(document.id)}
        className='rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600'
      >
        <Trash2 className='h-4 w-4' />
      </button>
    </li>
  );
}
