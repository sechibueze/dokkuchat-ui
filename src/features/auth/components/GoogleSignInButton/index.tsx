import { buttonStyles } from '@/components/ui/Button';
import { authApi } from '@/features/auth/auth.api';
import { env } from '@/lib/env';

export function GoogleSignInButton() {
  if (env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED !== 'true') return null;

  return (
    <>
      <div className='my-5 flex items-center gap-3 text-xs text-slate-400'>
        <span className='h-px flex-1 bg-slate-200' />
        or
        <span className='h-px flex-1 bg-slate-200' />
      </div>
      <a
        href={authApi.googleLoginUrl}
        className={buttonStyles({ variant: 'secondary', className: 'w-full' })}
      >
        Continue with Google
      </a>
    </>
  );
}
