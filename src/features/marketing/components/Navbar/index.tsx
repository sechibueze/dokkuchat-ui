import { ButtonLink } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export function Navbar() {
  return (
    <header className='border-b border-slate-200 bg-white/80 backdrop-blur'>
      <nav className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
        <Logo />
        <div className='flex items-center gap-2'>
          <ButtonLink href='/login' variant='ghost'>
            Log in
          </ButtonLink>
          <ButtonLink href='/signup'>Sign up</ButtonLink>
        </div>
      </nav>
    </header>
  );
}
