import { Hero } from '@/features/marketing/components/Hero';
import { Navbar } from '@/features/marketing/components/Navbar';

export default function HomePage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <Hero />
    </div>
  );
}
