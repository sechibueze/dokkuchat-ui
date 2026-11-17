'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { ZodType } from 'zod';
import { getErrorMessage } from '@/lib/errors';
import { validateForm, type FieldErrors } from '@/lib/forms';

interface UseFormOptions<TValues extends Record<string, string>, TOutput> {
  initialValues: TValues;
  schema: ZodType<TOutput>;
  onSubmit: (data: TOutput) => Promise<void>;
}

export function useForm<TValues extends Record<string, string>, TOutput>({
  initialValues,
  schema,
  onSubmit,
}: UseFormOptions<TValues, TOutput>) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors<TValues>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFieldProps = (field: keyof TValues & string) => ({
    name: field,
    value: values[field],
    error: errors[field],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((previous) => ({ ...previous, [field]: event.target.value })),
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setServerError(null);

    const {
      success: validationOk,
      data,
      errors: validationErrors,
    } = validateForm(schema, values);
    if (!validationOk) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(data as TOutput);
    } catch (error) {
      setServerError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { getFieldProps, handleSubmit, isSubmitting, serverError };
}
