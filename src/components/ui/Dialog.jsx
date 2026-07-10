import { forwardRef } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

const Dialog = RadixDialog.Root;
const DialogTrigger = RadixDialog.Trigger;
const DialogClose = RadixDialog.Close;
const DialogTitle = RadixDialog.Title;
const DialogDescription = RadixDialog.Description;

const DialogContent = forwardRef(
  ({ className, children, showClose = true, overlayClassName, ...props }, ref) => (
    <RadixDialog.Portal>
      <RadixDialog.Overlay
        className={cn(
          'fixed inset-0 z-50 bg-black/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 data-[state=open]:opacity-100',
          overlayClassName
        )}
      />
      <RadixDialog.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 scale-95 overflow-auto rounded-xl border border-border bg-surface opacity-0 shadow-2xl outline-none transition-all duration-300 data-[state=open]:scale-100 data-[state=open]:opacity-100',
          className
        )}
        {...props}
      >
        {children}
        {showClose && (
          <RadixDialog.Close
            aria-label="Close dialog"
            className="absolute right-4 top-4 z-10 rounded-md bg-background/60 p-1.5 text-muted-foreground backdrop-blur transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-5 w-5" />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  )
);
DialogContent.displayName = 'DialogContent';

export { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle, DialogDescription };
