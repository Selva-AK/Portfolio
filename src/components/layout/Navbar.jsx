import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { personalInfo } from '../../utils/data';
import { cn } from '../../utils/cn';
import Container from '../ui/Container';
import ThemeToggle from '../ui/ThemeToggle';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#work' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

function useHideOnScroll() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { hidden, scrolled };
}

const Navbar = ({ onOpenCommandPalette }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { hidden, scrolled } = useHideOnScroll();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
          scrolled
            ? 'border-white/10 bg-background/75 backdrop-blur-xl shadow-lg'
            : 'border-transparent bg-transparent'
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between md:h-20">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="group flex items-center gap-2 text-lg font-extrabold tracking-tight text-foreground"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-accent to-cyan-400 text-white font-mono text-sm shadow-md transition-transform group-hover:scale-110">
                S
              </span>
              <span>
                {personalInfo.name}<span className="text-accent">.</span>
              </span>
            </a>

            <nav className="hidden items-center gap-1.5 md:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={cn(
                      'relative px-3.5 py-2 text-sm font-medium transition-colors',
                      isActive ? 'text-accent font-semibold' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-accent to-cyan-400"
                      />
                    )}
                  </a>
                );
              })}

              {/* Command Palette Trigger Button */}
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="ml-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-accent/40 hover:text-foreground hover:shadow-sm"
              >
                <Search className="h-3.5 w-3.5 text-accent" />
                <span className="hidden lg:inline">Search...</span>
                <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-foreground">
                  ⌘K
                </kbd>
              </button>

              <ThemeToggle className="ml-2" />
            </nav>

            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground hover:text-foreground"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Container>
        <motion.div
          style={{ scaleX }}
          className="h-0.5 origin-left bg-gradient-to-r from-accent via-cyan-400 to-indigo-500"
        />
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-50 w-72 border-l border-border bg-background p-6 md:hidden"
            >
              <div className="mb-8 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={cn(
                        'rounded-md px-3 py-2.5 text-base font-medium transition-colors',
                        isActive ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-surface-hover'
                      )}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
