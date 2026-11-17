import { Menu } from 'lucide-react';
import { UserMenu } from '@/features/navigation/components/UserMenu';

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className='flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4'>
      <button
        type='button'
        onClick={onMenuClick}
        aria-label='Open navigation'
        className='rounded p-2 hover:bg-slate-100 md:hidden'
      >
        <Menu className='h-5 w-5' />
      </button>
      <div className='ml-auto'>
        <UserMenu />
      </div>
    </header>
  );
}
