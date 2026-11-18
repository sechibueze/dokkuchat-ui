import type { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function PageContainer({
  title,
  description,
  children,
}: PageContainerProps) {
  return (
    <div className='h-full overflow-y-auto p-6'>
      <div className='mx-auto max-w-5xl space-y-6'>
        <header>
          <h1 className='text-2xl font-semibold'>{title}</h1>
          {description && (
            <p className='mt-1 text-sm text-slate-500'>{description}</p>
          )}
        </header>
        {children}
      </div>
    </div>
  );
}
