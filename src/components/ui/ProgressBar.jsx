import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../utils/cn';

const ProgressBar = ({ label, percentage, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={cn('w-full', className)}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-medium text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-hover">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${percentage}%` : 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
