import { useMemo } from 'react';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../../utils/usePrefersReducedMotion';

const COLORS = ['bg-accent', 'bg-emerald-500', 'bg-amber-400', 'bg-sky-400', 'bg-pink-400'];
const COUNT = 18;

const ConfettiBurst = ({ triggerKey }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const angle = (i / COUNT) * Math.PI * 2;
        const distance = 50 + ((i * 37) % 50);
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          rotate: (i * 53) % 360,
          color: COLORS[i % COLORS.length],
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [triggerKey]
  );

  if (!triggerKey || prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {particles.map((p) => (
        <motion.span
          key={`${triggerKey}-${p.id}`}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: 0, rotate: p.rotate }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`absolute h-2 w-2 rounded-sm ${p.color}`}
        />
      ))}
    </div>
  );
};

export default ConfettiBurst;
