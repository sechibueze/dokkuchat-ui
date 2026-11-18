'use client';

import { LogOut } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/features/auth/auth.store';
import { useLogout } from '@/features/auth/hooks/useLogout';

export function UserMenu() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  if (!user) return null;

  return (
    <div className='group relative'>
      <button
        type='button'
        aria-label='Account'
        aria-haspopup='true'
        className='rounded-full'
      >
        <Avatar name={user.name} />
      </button>
      {/* pt-2 keeps the hover area continuous between the avatar and the card */}
      <div className='invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100'>
        <div className='w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-lg'>
          <p className='truncate text-sm font-semibold'>{user.name}</p>
          <p className='truncate text-xs text-slate-500'>{user.email}</p>
          <dl className='mt-3 grid grid-cols-2 gap-2 text-xs'>
            <div>
              <dt className='text-slate-400'>Tier</dt>
              <dd className='font-medium capitalize'>{user.tier}</dd>
            </div>
            <div>
              <dt className='text-slate-400'>Role</dt>
              <dd className='font-medium capitalize'>{user.role}</dd>
            </div>
          </dl>
          <Button
            variant='ghost'
            size='sm'
            onClick={logout}
            className='mt-3 w-full justify-start'
          >
            <LogOut className='h-4 w-4' />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
