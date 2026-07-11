import { useEffect, useRef } from 'react';

const POINTER_SELECTOR = 'a, button, [role="button"], input, textarea, select, summary, label, .cursor-pointer';
const TEXT_SELECTOR = 'p, h1, h2, h3, h4, h5, h6, span, li, blockquote, code, pre';

const CustomCursor = () => {
  const blockRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    const root = document.documentElement;
    root.classList.add('custom-cursor');

    const block = blockRef.current;
    const ring = ringRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let rafId;

    const show = () => {
      block.style.visibility = 'visible';
      ring.style.visibility = 'visible';
    };
    const hide = () => {
      block.style.visibility = 'hidden';
      ring.style.visibility = 'hidden';
    };

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      block.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
      show();
    };

    const handleMouseOver = (e) => {
      const pointerTarget = e.target.closest(POINTER_SELECTOR);
      if (pointerTarget) {
        ring.classList.add('cursor-ring--pointer');
        block.classList.remove('cursor-block--beam');
        return;
      }
      const textTarget = e.target.closest(TEXT_SELECTOR);
      if (textTarget && !textTarget.closest(POINTER_SELECTOR)) {
        block.classList.add('cursor-block--beam');
        ring.classList.remove('cursor-ring--pointer');
        return;
      }
      block.classList.remove('cursor-block--beam');
      ring.classList.remove('cursor-ring--pointer');
    };

    const tick = () => {
      const ease = reduceMotion ? 1 : 0.18;
      ringX += (targetX - ringX) * ease;
      ringY += (targetY - ringY) * ease;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseenter', show);
    window.addEventListener('mouseleave', hide);
    rafId = requestAnimationFrame(tick);

    return () => {
      root.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseenter', show);
      window.removeEventListener('mouseleave', hide);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={blockRef} className="cursor-block" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
