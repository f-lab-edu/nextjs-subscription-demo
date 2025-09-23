import { cn } from '@/utils/cn';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-[3px]',
};

export default function Loader({ size = 'md', className, text }: LoaderProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div
        className={cn('animate-spin rounded-full border-primary border-t-transparent', sizeClasses[size])}
        aria-label='로딩 중'
        role='status'
      />
      {text && <p className='text-sm text-muted-foreground animate-pulse'>{text}</p>}
    </div>
  );
}
