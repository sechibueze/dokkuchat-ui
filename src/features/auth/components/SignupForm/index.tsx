'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/Input';
import { authApi } from '@/features/auth/auth.api';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { FormError } from '@/features/auth/components/FormError';
import { GoogleSignInButton } from '@/features/auth/components/GoogleSignInButton';
import { DEFAULT_AUTHENTICATED_PATH } from '@/features/auth/constant';
import { signupSchema } from '@/features/auth/auth.schema';
import { useAuthStore } from '@/features/auth/auth.store';
import { useForm } from '@/hooks/useForm';

export function SignupForm() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  const { getFieldProps, handleSubmit, isSubmitting, serverError } = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    schema: signupSchema,
    onSubmit: async (input) => {
      const session = await authApi.signup(input);
      console.log('signup session', session);
      setSession(session as string);
      router.push(DEFAULT_AUTHENTICATED_PATH);
    },
  });

  return (
    <AuthCard
      title='Create your account'
      subtitle='Start asking questions of your documents.'
      footer={
        <>
          Already have an account?{' '}
          <Link
            href='/login'
            className='font-medium text-indigo-600 hover:underline'
          >
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className='space-y-4'>
        <FormError message={serverError} />
        <InputField
          label='Name'
          autoComplete='username'
          {...getFieldProps('name')}
        />
        <InputField
          label='Email'
          type='email'
          autoComplete='email'
          {...getFieldProps('email')}
        />
        <InputField
          label='Password'
          type='password'
          autoComplete='new-password'
          {...getFieldProps('password')}
        />
        <InputField
          label='Confirm password'
          type='password'
          autoComplete='new-password'
          {...getFieldProps('confirmPassword')}
        />
        <Button type='submit' isLoading={isSubmitting} className='w-full'>
          Create account
        </Button>
      </form>
      <GoogleSignInButton />
    </AuthCard>
  );
}
