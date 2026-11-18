import { ButtonLink } from '@/components/ui/Button';
import { HeroPreview } from '@/features/marketing/components/HeroPreview';

export function Hero() {
  return (
    <section className='mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-6 py-12 lg:grid-cols-2'>
      <div className='space-y-6'>
        <span className='rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700'>
          Evidence-grounded AI for your documents
        </span>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
          Ask your documents.
          <br />
          Trust every answer.
        </h1>
        <p className='max-w-xl text-lg text-slate-600'>
          dokkuchat turns your PDFs, contracts, reports, and policies into a
          searchable knowledge base. Get answers grounded in your own evidence,
          with the sources to prove it.
        </p>
        <div className='flex flex-wrap gap-3'>
          <ButtonLink href='/signup' size='lg'>
            Get started free
          </ButtonLink>
          <ButtonLink href='/login' size='lg' variant='secondary'>
            Log in
          </ButtonLink>
        </div>
      </div>
      <HeroPreview />
    </section>
  );
}
