import { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '../../utils/cn';

const CursorSpotlight = ({ className, size = 500, color = 'var(--accent)' }) => {
  const ref = useRef(null);
  const mvX = useMotionValue(-9999);
  const mvY = useMotionValue(-9999);
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mvX}px ${mvY}px, color-mix(in srgb, ${color} 12%, transparent), transparent 70%)`;

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return undefined;

    const handleMouseMove = (e) => {
      const rect = parent.getBoundingClientRect();
      mvX.set(e.clientX - rect.left);
      mvY.set(e.clientY - rect.top);
    };

    parent.addEventListener('mousemove', handleMouseMove);
    return () => parent.removeEventListener('mousemove', handleMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ background }}
      className={cn('pointer-events-none absolute inset-0', className)}
    />
  );
};

export default CursorSpotlight;
