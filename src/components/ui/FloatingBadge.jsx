import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const FloatingBadge = ({ label, icon: Icon, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
    transition={{
      opacity: { duration: 0.5, delay: 0.5 + delay * 0.15 },
      scale: { duration: 0.5, delay: 0.5 + delay * 0.15 },
      y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay },
    }}
    className={cn(
      'pointer-events-none absolute hidden items-center gap-1.5 rounded-full border border-border bg-surface/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-md backdrop-blur-sm sm:flex',
      className
    )}
  >
    {Icon && <Icon className="h-3.5 w-3.5 text-accent" />}
    {label}
  </motion.div>
);

export default FloatingBadge;
