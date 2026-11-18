'use client';

import { ClipboardPaste, Paperclip, SendHorizonal } from 'lucide-react';
import { useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { PasteTextDialog } from '@/features/chat/components/TextDialog';
import { useChatModels } from '@/features/chat/hooks/useChatModels';
import { useConversationMessages } from '@/features/chat/hooks/useConversationMessages';
import { useEnsureConversation } from '@/features/chat/hooks/useEnsureConversation';
import { useSendMessage } from '@/features/chat/hooks/useSendMessage';
import { UPLOAD_ACCEPT_ATTRIBUTE } from '@/features/documents/constant';
import { useDocumentUploads } from '@/features/documents/hooks/useDocumentUpload';
import { useRateLimitCountdown } from '@/features/auth/hooks/userateLimitCountdown';
import { formatRetryTime } from '@/lib/rate-limit';

const DEFAULT_PLACEHOLDER = 'Ask a question about your documents…';

export function ChatComposer({ conversationId }: { conversationId?: string }) {
  const [draft, setDraft] = useState('');
  const [isPasteDialogOpen, setIsPasteDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resolveConversationId = useEnsureConversation(conversationId);
  const { sendMessage, errorMessage } = useSendMessage(resolveConversationId);
  const { uploadFiles, addPastedText, isUploading, uploadError } =
    useDocumentUploads(resolveConversationId);
  const { isAwaitingReply } = useConversationMessages(conversationId);
  const { models, selectedModelId, selectModel } = useChatModels();
  const { isRateLimited, retryAt } = useRateLimitCountdown();

  const canSend = draft.trim().length > 0 && !isAwaitingReply && !isRateLimited;
  const placeholder =
    isRateLimited && retryAt !== null
      ? `Limit reached. You can send again at ${formatRetryTime(retryAt)}`
      : DEFAULT_PLACEHOLDER;

  const handleSend = async () => {
    if (!canSend) return;
    const content = draft.trim();
    setDraft('');
    const wasSent = await sendMessage(content);
    // Put the text back if it didn't go through, without overwriting anything typed since.
    if (!wasSent) setDraft((current) => current || content);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  };

  const handleFilesSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (files.length > 0) await uploadFiles(files);
  };

  const visibleError = uploadError ?? errorMessage;

  return (
    <div className='border-t border-slate-200 bg-white p-4'>
      {visibleError && (
        <p role='alert' className='mb-2 text-sm text-red-600'>
          {visibleError}
        </p>
      )}
      <div className='rounded-xl border border-slate-300 bg-white p-2 focus-within:border-indigo-500'>
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder={placeholder}
          aria-label='Message'
          className='w-full resize-none bg-transparent px-2 py-1 text-sm outline-none'
        />
        <div className='mt-1 flex flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center gap-1'>
            <input
              ref={fileInputRef}
              type='file'
              multiple
              accept={UPLOAD_ACCEPT_ATTRIBUTE}
              onChange={handleFilesSelected}
              className='hidden'
              data-testid='file-input'
            />
            <Button
              variant='ghost'
              size='sm'
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || isRateLimited}
            >
              {isUploading ? <Spinner /> : <Paperclip className='h-4 w-4' />}
              Upload
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsPasteDialogOpen(true)}
              disabled={isRateLimited}
            >
              <ClipboardPaste className='h-4 w-4' />
              Paste text
            </Button>
            <Select
              label='Model'
              hideLabel
              value={selectedModelId ?? ''}
              onChange={(event) => selectModel(event.target.value)}
              disabled={models.length === 0}
              options={
                models.length === 0
                  ? [{ value: '', label: 'Loading models…' }]
                  : models.map((model) => ({
                      value: model.id,
                      label: model.name,
                    }))
              }
            />
          </div>
          <Button
            size='sm'
            onClick={handleSend}
            disabled={!canSend}
            aria-label='Send message'
          >
            <SendHorizonal className='h-4 w-4' />
            Send
          </Button>
        </div>
      </div>
      <PasteTextDialog
        isOpen={isPasteDialogOpen}
        onClose={() => setIsPasteDialogOpen(false)}
        onSubmit={addPastedText}
      />
    </div>
  );
}
