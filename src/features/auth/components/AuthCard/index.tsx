import type { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className='w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm'>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      <p className='mt-1 mb-6 text-sm text-slate-500'>{subtitle}</p>
      {children}
      {footer && (
        <div className='mt-6 text-center text-sm text-slate-600'>{footer}</div>
      )}
    </div>
  );
}
