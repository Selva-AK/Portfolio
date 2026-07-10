import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import usePrefersReducedMotion from '../../utils/usePrefersReducedMotion';

const StatCounter = ({ value, suffix = '', label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;
    let startTime;
    const duration = 1200;

    const step = (t) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };

    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, prefersReducedMotion]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {display}
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default StatCounter;
