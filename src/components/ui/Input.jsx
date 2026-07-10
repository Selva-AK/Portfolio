import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const fieldBase =
  'w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30';

export const Input = forwardRef(({ className, icon: Icon, ...props }, ref) => (
  <div className="relative">
    {Icon && (
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    )}
    <input ref={ref} className={cn(fieldBase, Icon && 'pl-10', className)} {...props} />
  </div>
));
Input.displayName = 'Input';

export const Textarea = forwardRef(({ className, icon: Icon, ...props }, ref) => (
  <div className="relative">
    {Icon && <Icon className="pointer-events-none absolute left-3.5 top-4 h-4 w-4 text-muted-foreground" />}
    <textarea ref={ref} className={cn(fieldBase, 'resize-none', Icon && 'pl-10', className)} {...props} />
  </div>
));
Textarea.displayName = 'Textarea';
