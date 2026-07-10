import { useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';

const SPRING = { stiffness: 200, damping: 25, mass: 0.5 };

export default function useTilt({ maxTilt = 10, spotlightSize = 480 } = {}) {
  const mvX = useMotionValue(0.5);
  const mvY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mvY, [0, 1], [maxTilt, -maxTilt]), SPRING);
  const rotateY = useSpring(useTransform(mvX, [0, 1], [-maxTilt, maxTilt]), SPRING);

  const spotX = useTransform(mvX, (v) => `${v * 100}%`);
  const spotY = useTransform(mvY, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${spotX} ${spotY}, rgba(255,255,255,0.14), transparent 70%)`;

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width);
    mvY.set((e.clientY - rect.top) / rect.height);
  };

  const onMouseLeave = () => {
    mvX.set(0.5);
    mvY.set(0.5);
  };

  return { rotateX, rotateY, spotlight, onMouseMove, onMouseLeave };
}
