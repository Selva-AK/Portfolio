import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../../utils/usePrefersReducedMotion';

const BOOT_LINES = [
  'booting portfolio_os v1.0.0',
  'loading kernel modules ......... [OK]',
  'mounting filesystem ............ [OK]',
  'starting network services ...... [OK]',
];

const PASSWORD_LENGTH = 8;

const BootScreen = ({ onComplete }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [phase, setPhase] = useState('boot');
  const [passwordDots, setPasswordDots] = useState(0);
  const [progress, setProgress] = useState(0);
  const timers = useRef([]);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    timers.current.forEach(clearTimeout);
    onComplete();
  };

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return undefined;
    }

    const timerIds = [];
    timers.current = timerIds;
    const schedule = (fn, at) => {
      timerIds.push(setTimeout(fn, at));
    };

    let t = 250;
    BOOT_LINES.forEach((_, i) => {
      schedule(() => setLineIndex(i + 1), t);
      t += 300;
    });

    t += 200;
    schedule(() => setPhase('login'), t);

    t += 450;
    schedule(() => setPhase('password'), t);

    for (let i = 1; i <= PASSWORD_LENGTH; i += 1) {
      schedule(() => setPasswordDots(i), t + i * 90);
    }
    t += PASSWORD_LENGTH * 90 + 250;

    schedule(() => setPhase('auth'), t);
    schedule(() => setProgress(100), t + 30);
    t += 750;

    schedule(() => setPhase('granted'), t);
    t += 700;

    schedule(() => setPhase('exit'), t);
    t += 500;

    schedule(finish, t);

    return () => timerIds.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  useEffect(() => {
    const handleKeyDown = () => finish();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      onClick={finish}
      role="button"
      tabIndex={0}
      aria-label="Skip intro animation"
      className="fixed inset-0 z-[999] flex cursor-pointer flex-col items-center justify-center bg-background p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: phase === 'exit' ? 1.04 : 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 font-mono text-[0.65rem] text-muted-foreground">system boot</span>
        </div>

        <div className="min-h-[220px] p-6 font-mono text-sm">
          {BOOT_LINES.slice(0, lineIndex).map((line) => (
            <div key={line} className="text-muted-foreground">
              {line}
            </div>
          ))}

          {phase !== 'boot' && (
            <div className="mt-3 text-foreground">
              user login: <span className="text-emerald-500 dark:text-emerald-400">guest</span>
            </div>
          )}

          {(phase === 'password' || phase === 'auth' || phase === 'granted') && (
            <div className="flex items-center text-foreground">
              password:&nbsp;
              <span className="text-emerald-500 dark:text-emerald-400">
                {'•'.repeat(passwordDots)}
              </span>
              {phase === 'password' && (
                <motion.span
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                  className="ml-0.5 h-3.5 w-[2px] bg-accent"
                />
              )}
            </div>
          )}

          {(phase === 'auth' || phase === 'granted') && (
            <div className="mt-3">
              <div className="mb-1.5 text-muted-foreground">authenticating...</div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}

          {phase === 'granted' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-emerald-500 dark:text-emerald-400"
            >
              access granted ✓
              <br />
              welcome, guest.
            </motion.div>
          )}
        </div>
      </motion.div>

      <span className="mt-6 font-mono text-xs text-muted-foreground">
        click or press any key to skip
      </span>
    </motion.div>
  );
};

export default BootScreen;
