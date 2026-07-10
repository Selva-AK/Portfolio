import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import usePrefersReducedMotion from '../../utils/usePrefersReducedMotion';
import { slideUp } from '../../utils/animations';

const Reveal = ({
  children,
  variants = slideUp,
  as = 'div',
  className,
  once = true,
  margin = '-100px',
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });
  const prefersReducedMotion = usePrefersReducedMotion();
  const MotionComponent = motion[as] || motion.div;

  if (prefersReducedMotion) {
    const Comp = as;
    return (
      <Comp ref={ref} className={className} {...props}>
        {children}
      </Comp>
    );
  }

  return (
    <MotionComponent
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default Reveal;
