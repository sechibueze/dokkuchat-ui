import { FileUp, MessageCircleQuestion, Sparkles } from 'lucide-react';

const STEPS = [
  {
    icon: FileUp,
    title: 'Add documents',
    description: 'Upload files or paste text below.',
  },
  {
    icon: Sparkles,
    title: 'Choose a model',
    description: 'Pick the model that fits your task.',
  },
  {
    icon: MessageCircleQuestion,
    title: 'Ask anything',
    description: 'Get answers with source references.',
  },
];

export function EmptyChatState() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-8 p-6 text-center'>
      <div>
        <h1 className='text-2xl font-semibold'>What would you like to know?</h1>
        <p className='mt-1 text-sm text-slate-500'>
          Start a new chat by adding documents or asking a question.
        </p>
      </div>
      <ul className='grid max-w-2xl gap-4 sm:grid-cols-3'>
        {STEPS.map(({ icon: Icon, title, description }) => (
          <li
            key={title}
            className='rounded-xl border border-slate-200 bg-white p-4 text-left'
          >
            <Icon className='mb-2 h-5 w-5 text-indigo-600' />
            <p className='text-sm font-medium'>{title}</p>
            <p className='text-xs text-slate-500'>{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
