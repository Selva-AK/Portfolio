import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { buttonVariants } from './button-variants';

const Button = forwardRef(({ className, variant, size, as: Comp = 'button', ...props }, ref) => (
  <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = 'Button';

export default Button;
