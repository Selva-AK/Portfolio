import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const FloatingCodeCard = ({
  filename = 'code.js',
  lines,
  className,
  floatDelay = 0,
  rotate = -4,
  cursor = true,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12, rotate }}
    animate={{ opacity: 1, y: [0, -12, 0], rotate }}
    transition={{
      opacity: { duration: 0.6, delay: 0.4 },
      y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
    }}
    className={cn(
      'pointer-events-none absolute hidden w-60 overflow-hidden rounded-xl border border-border bg-surface/90 shadow-xl backdrop-blur-sm lg:block',
      className
    )}
  >
    <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
      <span className="ml-2 truncate font-mono text-[0.65rem] text-muted-foreground">{filename}</span>
    </div>
    <pre className="p-4 font-mono text-xs leading-relaxed">
      <code>
        {lines.map((line, i) => (
          <div key={i}>
            {line.map((token, j) => (
              <span key={j} className={token.c}>
                {token.t}
              </span>
            ))}
            {cursor && i === lines.length - 1 && (
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                className="ml-1 inline-block h-3.5 w-[2px] translate-y-0.5 bg-accent align-middle"
              />
            )}
          </div>
        ))}
      </code>
    </pre>
  </motion.div>
);

export default FloatingCodeCard;
