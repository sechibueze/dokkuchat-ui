'use client';

import { Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ButtonLink } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { useAuthStore } from '@/features/auth/auth.store';
import { ConversationList } from '@/features/chat/components/ConversationList';
import { SidebarLink } from '@/features/navigation/components/SidebarLink';
import { ADMIN_NAV_ITEMS, USER_NAV_ITEMS } from '@/features/navigation/config';
import { cn } from '@/lib/cn';

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  const isAdmin = useAuthStore((state) => state.user?.role === 'admin');

  const isItemActive = (href: string) =>
    pathname === href || (href !== '/chat' && pathname.startsWith(href));

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex w-72 flex-col gap-4 border-r border-slate-200 bg-white p-4 transition-transform',
        'md:static md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <Logo href='/chat' />
      <ButtonLink
        href='/chat'
        variant='secondary'
        className='w-full justify-start'
      >
        <Plus className='h-4 w-4' />
        New chat
      </ButtonLink>

      <nav aria-label='Main' className='space-y-1'>
        {USER_NAV_ITEMS.map((item) => (
          <SidebarLink
            key={item.href}
            item={item}
            isActive={pathname === item.href}
          />
        ))}
      </nav>

      {isAdmin && (
        <nav aria-label='Admin' className='space-y-1'>
          <p className='px-3 text-xs font-semibold uppercase tracking-wide text-slate-400'>
            Admin
          </p>
          {ADMIN_NAV_ITEMS.map((item) => (
            <SidebarLink
              key={item.href}
              item={item}
              isActive={isItemActive(item.href)}
            />
          ))}
        </nav>
      )}

      <div className='min-h-0 flex-1 space-y-2 overflow-y-auto'>
        <p className='px-3 text-xs font-semibold uppercase tracking-wide text-slate-400'>
          Chat history
        </p>
        <ConversationList />
      </div>
    </aside>
  );
}
