import { MessagesSquare } from 'lucide-react';
import Link from 'next/link';

export function Logo({ href = '/' }: { href?: string }) {
  return (
    <Link
      href={href}
      className='flex items-center gap-2 text-lg font-bold text-slate-900'
    >
      <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white'>
        <MessagesSquare className='h-4 w-4' />
      </span>
      dokkuchat
    </Link>
  );
}
