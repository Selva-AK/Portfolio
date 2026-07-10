import { cn } from '../../utils/cn';

const SectionHeading = ({ eyebrow, title, description, align = 'center', className }) => (
  <div
    className={cn(
      'mb-10 md:mb-14',
      align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left',
      className
    )}
  >
    {eyebrow && (
      <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
        {eyebrow}
      </span>
    )}
    <h2 className="text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-5xl">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>
    )}
  </div>
);

export default SectionHeading;
