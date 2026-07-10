import { cn } from '../../utils/cn';

const Container = ({ className, ...props }) => (
  <div className={cn('mx-auto w-full max-w-6xl px-6 md:px-8', className)} {...props} />
);

export default Container;
