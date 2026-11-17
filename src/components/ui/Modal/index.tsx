'use client';

import { X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) =>
      event.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4'
      onClick={onClose}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-label={title}
        className='w-full max-w-lg rounded-xl bg-white p-6 shadow-xl'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <button
            type='button'
            onClick={onClose}
            aria-label='Close'
            className='rounded p-1 hover:bg-slate-100'
          >
            <X className='h-4 w-4' />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
