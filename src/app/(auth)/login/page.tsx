import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { getSafeRedirectPath } from '@/features/auth/auth.util';
import { Suspense } from 'react';
export const metadata: Metadata = { title: 'Log in' };

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

// export default async function LoginPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ next?: string }>;
// }) {
//   const { next } = await searchParams;
//   return <LoginForm redirectTo={getSafeRedirectPath(next)} />;
// }

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center'>
          Loading...
        </div>
      }
    >
      <LoginContent searchParams={searchParams} />
    </Suspense>
  );
}

async function LoginContent({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;

  return <LoginForm redirectTo={getSafeRedirectPath(next)} />;
}
