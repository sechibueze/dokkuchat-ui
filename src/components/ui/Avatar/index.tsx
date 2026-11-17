import { cn } from '@/lib/cn';

interface AvatarProps {
  name: string;
  className?: string;
}

export function Avatar({ name, className }: AvatarProps) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <span
      aria-hidden='true'
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white',
        className,
      )}
    >
      {initials}
    </span>
  );
}
