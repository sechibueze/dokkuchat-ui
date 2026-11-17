import { Logo } from '@/components/ui/Logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8 p-6'>
      <Logo />
      {children}
    </div>
  );
}
