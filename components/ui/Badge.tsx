import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { TransactionStatus } from '@/types';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: TransactionStatus;
}

export default function Badge({ status, className, ...props }: BadgeProps) {
  const variants = {
    PENDING: 'bg-orange-100 text-orange-700',
    APPROVED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase',
        variants[status],
        className
      )}
      {...props}
    >
      {status}
    </span>
  );
}