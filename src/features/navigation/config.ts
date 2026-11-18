import {
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const USER_NAV_ITEMS: NavItem[] = [
  { label: 'Chat', href: '/chat', icon: MessageSquare },
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { label: 'All users', href: '/admin/users', icon: Users },
  { label: 'All documents', href: '/admin/documents', icon: FileText },
];
