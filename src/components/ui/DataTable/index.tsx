import type { ReactNode } from 'react';
import { Spinner } from '@/components/ui/Spinner';

export interface DataTableColumn<TRow> {
  key: string;
  header: string;
  render: (row: TRow) => ReactNode;
}

interface DataTableProps<TRow> {
  columns: DataTableColumn<TRow>[];
  rows: TRow[];
  getRowId: (row: TRow) => string;
  isLoading?: boolean;
  errorMessage?: string | null;
  emptyMessage?: string;
}

export function DataTable<TRow>({
  columns,
  rows,
  getRowId,
  isLoading,
  errorMessage,
  emptyMessage = 'Nothing to show yet.',
}: DataTableProps<TRow>) {
  if (isLoading) {
    return (
      <div className='flex justify-center py-12'>
        <Spinner className='h-6 w-6 text-indigo-600' />
      </div>
    );
  }
  if (errorMessage)
    return (
      <p className='py-8 text-center text-sm text-red-600'>{errorMessage}</p>
    );
  if (rows.length === 0)
    return (
      <p className='py-8 text-center text-sm text-slate-500'>{emptyMessage}</p>
    );

  return (
    <div className='overflow-x-auto rounded-xl border border-slate-200 bg-white'>
      <table className='w-full text-left text-sm'>
        <thead className='bg-slate-50 text-xs uppercase tracking-wide text-slate-500'>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className='px-4 py-3 font-medium'>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100'>
          {rows.map((row) => (
            <tr key={getRowId(row)}>
              {columns.map((column) => (
                <td key={column.key} className='px-4 py-3'>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
