import {
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
} from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function InputField({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className='space-y-1.5'>
      <label htmlFor={inputId} className='text-sm font-medium text-slate-700'>
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition',
          'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className='text-xs text-red-600'>
          {error}
        </p>
      )}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div className='space-y-1.5'>
      <label
        htmlFor={textareaId}
        className='text-sm font-medium text-slate-700'
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        aria-invalid={Boolean(error)}
        className={cn(
          'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition',
          'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100',
          error && 'border-red-500',
          className,
        )}
        {...props}
      />
      {error && <p className='text-xs text-red-600'>{error}</p>}
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  hideLabel?: boolean;
}

export function Select({
  label,
  options,
  hideLabel,
  className,
  id,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div>
      <label
        htmlFor={selectId}
        className={
          hideLabel
            ? 'sr-only'
            : 'mb-1.5 block text-sm font-medium text-slate-700'
        }
      >
        {label}
      </label>
      <select
        id={selectId}
        className={cn(
          'h-9 rounded-lg border border-slate-300 bg-white px-2 text-sm outline-none focus:border-indigo-500',
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
