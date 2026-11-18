'use client';

import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Input';
import { FormError } from '@/features/auth/components/FormError';
import {
  pasteTextSchema,
  type PasteTextInput,
} from '@/features/documents/document.schema';
import { useForm } from '@/hooks/useForm';

interface PasteTextDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: PasteTextInput) => Promise<void>;
}

export function PasteTextDialog({
  isOpen,
  onClose,
  onSubmit,
}: PasteTextDialogProps) {
  const { getFieldProps, handleSubmit, isSubmitting, serverError } = useForm({
    initialValues: { title: 'Pasted text', content: '' },
    schema: pasteTextSchema,
    onSubmit: async (input) => {
      await onSubmit(input);
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} title='Paste text' onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate className='space-y-4'>
        <FormError message={serverError} />
        <InputField label='Title' {...getFieldProps('title')} />
        <Textarea label='Content' rows={8} {...getFieldProps('content')} />
        <div className='flex justify-end gap-2'>
          <Button variant='ghost' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit' isLoading={isSubmitting}>
            Add to chat
          </Button>
        </div>
      </form>
    </Modal>
  );
}
