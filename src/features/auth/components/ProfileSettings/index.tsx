'use client';

import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/features/auth/auth.store';
import { useLogout } from '@/features/auth/hooks/useLogout';

export function ProfileSettings() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  if (!user) return null;

  const rows = [
    { label: 'Username', value: user.name },
    { label: 'Email', value: user.email },
    { label: 'Tier', value: user.tier },
    { label: 'Role', value: user.role },
  ];

  return (
    <div className='space-y-6 rounded-xl border border-slate-200 bg-white p-6'>
      <dl className='grid gap-4 sm:grid-cols-2'>
        {rows.map(({ label, value }) => (
          <div key={label}>
            <dt className='text-xs text-slate-400'>{label}</dt>
            <dd className='text-sm font-medium capitalize-first'>{value}</dd>
          </div>
        ))}
      </dl>
      <Button variant='secondary' onClick={logout}>
        Log out
      </Button>
    </div>
  );
}
