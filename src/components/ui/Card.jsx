import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Card = forwardRef(({ className, glass = false, hover = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border border-border bg-surface shadow-sm',
      glass && 'border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] backdrop-blur-xl',
      hover &&
        'transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

export default Card;
