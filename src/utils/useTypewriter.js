import { useEffect, useState } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

export default function useTypewriter(phrases, { typingSpeed = 70, deletingSpeed = 40, pause = 1600 } = {}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || !phrases.length) return undefined;
    const current = phrases[index % phrases.length];
    const atEnd = !deleting && subIndex === current.length;
    const delay = atEnd ? pause : deleting ? deletingSpeed : typingSpeed;

    const timeout = setTimeout(() => {
      if (atEnd) {
        setDeleting(true);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        setSubIndex((s) => s + (deleting ? -1 : 1));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, phrases, typingSpeed, deletingSpeed, pause, prefersReducedMotion]);

  if (!phrases.length) return '';
  if (prefersReducedMotion) return phrases[0];
  return phrases[index % phrases.length].slice(0, subIndex);
}
