interface StatCardProps {
  label: string;
  value: string;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className='rounded-xl border border-slate-200 bg-white p-5'>
      <p className='text-sm text-slate-500'>{label}</p>
      <p className='mt-1 text-2xl font-semibold'>{value}</p>
    </div>
  );
}
