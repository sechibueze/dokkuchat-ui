import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { NavItem } from '@/features/navigation/config';

interface SidebarLinkProps {
  item: NavItem;
  isActive: boolean;
}

export function SidebarLink({ item, isActive }: SidebarLinkProps) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
        isActive
          ? 'bg-indigo-50 text-indigo-700'
          : 'text-slate-600 hover:bg-slate-100',
      )}
    >
      <Icon className='h-4 w-4' />
      {item.label}
    </Link>
  );
}
