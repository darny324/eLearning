import { cn } from '@/utils/cn';

export type LoadingSize = 'sm' | 'md' | 'lg';
export type LoadingAnimation = 'spin' | 'pulse' | 'bounce';

export interface LoadingProps {
  size?: LoadingSize;
  animation?: LoadingAnimation;
  label?: string;
  className?: string;
}

const sizeClasses: Record<LoadingSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-7 w-7',
  lg: 'h-10 w-10',
};

const dotSizeClasses: Record<LoadingSize, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
};

export function Loading({
  size = 'md',
  animation = 'spin',
  label = 'Loading',
  className,
}: LoadingProps) {
  const sharedClasses = cn('text-cyan-400', className);

  if (animation === 'pulse') {
    return (
      <div className={cn('flex items-center gap-1.5', sharedClasses)} role='status' aria-label={label}>
        <span className={cn('rounded-full bg-current animate-pulse', dotSizeClasses[size])} />
        <span className={cn('rounded-full bg-current animate-pulse [animation-delay:150ms]', dotSizeClasses[size])} />
        <span className={cn('rounded-full bg-current animate-pulse [animation-delay:300ms]', dotSizeClasses[size])} />
      </div>
    );
  }

  if (animation === 'bounce') {
    return (
      <div className={cn('flex items-center gap-1.5', sharedClasses)} role='status' aria-label={label}>
        <span className={cn('rounded-full bg-current animate-bounce', dotSizeClasses[size])} />
        <span className={cn('rounded-full bg-current animate-bounce [animation-delay:150ms]', dotSizeClasses[size])} />
        <span className={cn('rounded-full bg-current animate-bounce [animation-delay:300ms]', dotSizeClasses[size])} />
      </div>
    );
  }

  return (
    <span
      className={cn(
        'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        sharedClasses,
      )}
      role='status'
      aria-label={label}
    />
  );
}
