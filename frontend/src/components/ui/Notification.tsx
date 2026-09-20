import { cn } from '@/utils/cn';

const notificationTypes = ['alert', 'success', 'neutral'] as const;
export type NotificationType = (typeof notificationTypes)[number];

export interface NotificationProps {
  type: NotificationType | string;
  message: string;
  maxWords?: number;
  className?: string;
}

const styles: Record<NotificationType, string> = {
  alert: 'border-rose-400/40 bg-rose-500/10 text-rose-100',
  success: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100',
  neutral: 'border-slate-400/40 bg-slate-500/10 text-slate-100',
};

function limitWords(message: string, maxWords: number): string {
  const words = message.trim().split(/\s+/).filter(Boolean);

  if (words.length <= maxWords) {
    return message;
  }

  return `${words.slice(0, maxWords).join(' ')}...`;
}

export function Notification({
  type,
  message,
  maxWords = 30,
  className,
}: NotificationProps) {
  const safeType: NotificationType = notificationTypes.includes(type as NotificationType)
    ? (type as NotificationType)
    : 'neutral';
  const wordLimit = Math.max(1, Math.floor(maxWords));

  return (
    <div
      className={cn(
        'animate-slide-in-up flex w-full items-start gap-3 rounded-lg border px-4 py-3 shadow-lg',
        styles[safeType],
        className,
      )}
      role={safeType === 'alert' ? 'alert' : 'status'}
    >
      <span
        aria-hidden='true'
        className='mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-current'
      />
      <p className='text-sm leading-5'>{limitWords(message, wordLimit)}</p>
    </div>
  );
}
