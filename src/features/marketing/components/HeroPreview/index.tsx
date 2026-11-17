import { FileText } from 'lucide-react';

const DOCUMENT_NAMES = [
  'Vendor-contract.pdf',
  'Q3-report.pdf',
  'HR-policy.docx',
];

export function HeroPreview() {
  return (
    <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-xl'>
      <div className='mb-4 flex flex-wrap gap-2'>
        {DOCUMENT_NAMES.map((name) => (
          <span
            key={name}
            className='flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700'
          >
            <FileText className='h-3 w-3' />
            {name}
          </span>
        ))}
      </div>
      <div className='space-y-3 text-sm'>
        <div className='ml-auto w-fit max-w-[85%] rounded-2xl bg-indigo-600 px-4 py-2 text-white'>
          What is the termination notice period in the vendor contract?
        </div>
        <div className='max-w-[90%] rounded-2xl border border-slate-200 px-4 py-3'>
          <p>
            Either party must give 60 days&apos; written notice, and early
            termination for cause requires a 30-day cure period.
          </p>
          <span className='mt-2 inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-1 text-xs text-indigo-700'>
            <FileText className='h-3 w-3' /> Vendor-contract.pdf · Section 12.2
          </span>
        </div>
      </div>
    </div>
  );
}
