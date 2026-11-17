'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/Input';
import { authApi } from '@/features/auth/auth.api';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { FormError } from '@/features/auth/components/FormError';
import { forgotPasswordSchema } from '@/features/auth/auth.schema';
import { useForm } from '@/hooks/useForm';

export function ForgotPasswordForm() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { getFieldProps, handleSubmit, isSubmitting, serverError } = useForm({
    initialValues: { email: '' },
    schema: forgotPasswordSchema,
    onSubmit: async (input) => {
      await authApi.forgotPassword(input);
      setIsEmailSent(true);
    },
  });

  return (
    <AuthCard
      title='Reset your password'
      subtitle="We'll email you a link to set a new one."
      footer={
        <Link
          href='/login'
          className='font-medium text-indigo-600 hover:underline'
        >
          Back to log in
        </Link>
      }
    >
      {isEmailSent ? (
        <p
          role='status'
          className='rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700'
        >
          If an account exists for that email, a reset link is on its way.
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className='space-y-4'>
          <FormError message={serverError} />
          <InputField
            label='Email'
            type='email'
            autoComplete='email'
            {...getFieldProps('email')}
          />
          <Button type='submit' isLoading={isSubmitting} className='w-full'>
            Send reset link
          </Button>
        </form>
      )}
    </AuthCard>
  );
}
