import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SIZE = 104;
const STROKE = 7;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const RadialProgress = ({ percentage, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 text-center">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} className="-rotate-90">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--surface-hover)"
            strokeWidth={STROKE}
          />
          <motion.circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{
              strokeDashoffset: isInView ? CIRCUMFERENCE * (1 - percentage / 100) : CIRCUMFERENCE,
            }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-foreground">
          {percentage}%
        </div>
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
};

export default RadialProgress;
