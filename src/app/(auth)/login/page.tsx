import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { getSafeRedirectPath } from '@/features/auth/auth.util';

export const metadata: Metadata = { title: 'Log in' };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return <LoginForm redirectTo={getSafeRedirectPath(next)} />;
}
