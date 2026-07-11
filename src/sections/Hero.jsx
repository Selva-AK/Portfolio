import { motion } from 'framer-motion';
import { ChevronDown, Cloud, Code2, Mail, Server } from 'lucide-react';
import { personalInfo, experience } from '../utils/data';
import { fadeIn, slideUp, slideLeft } from '../utils/animations';
import useTypewriter from '../utils/useTypewriter';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Parallax from '../components/ui/Parallax';
import FloatingBadge from '../components/ui/FloatingBadge';
import MagneticWrap from '../components/ui/MagneticWrap';
import InteractiveTerminal from '../components/ui/InteractiveTerminal';
import CursorSpotlight from '../components/ui/CursorSpotlight';
import { GithubIcon, LinkedinIcon } from '../components/ui/icons';
import profileImage from '../assets/images/1690812853497.png?url';

const socialLinks = [
  { label: 'LinkedIn', href: personalInfo.social.linkedin, icon: LinkedinIcon },
  { label: 'Email', href: `mailto:${personalInfo.email}`, icon: Mail },
  { label: 'GitHub', href: personalInfo.social.github, icon: GithubIcon },
];

const roleWords = ['Programmer', ...new Set(experience.filter((e) => e.type === 'work').map((e) => e.role))];

const floatingBadges = [
  { label: 'React', icon: Code2, className: '-right-4 top-6 sm:right-0', delay: 0 },
  { label: 'Node.js', icon: Server, className: '-left-6 bottom-28 sm:-left-10', delay: 1.3 },
  { label: 'AWS', icon: Cloud, className: 'right-2 -bottom-2 sm:right-6', delay: 2.4 },
];

const Hero = () => {
  const typedRole = useTypewriter(roleWords);

  return (
    <section
      id="home"
      className="mt-2 md:mt-20 relative flex min-h-screen flex-col items-center justify-center gap-16 overflow-hidden pb-16 pt-24 md:pt-0"
    >
      <Parallax offset={90} className="pointer-events-none absolute right-[-10%] top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
      <Parallax offset={50} className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />
      <CursorSpotlight />

      <Container>
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-8">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col gap-6">
            <motion.div variants={slideUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for new opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={slideUp}
              className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              Hi, I&apos;m <span className="text-accent">{personalInfo.name}</span>
              <br />
              <span className="inline-flex items-baseline font-mono text-2xl text-muted-foreground sm:text-3xl">
                &lt;{typedRole}
                <motion.span
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                  className="mx-0.5 h-[0.9em] w-[2px] translate-y-0.5 bg-accent"
                />
                /&gt;
              </span>
            </motion.h1>

            <motion.div variants={slideUp}>
              <MagneticWrap>
                <Button as="a" href={personalInfo.resumeUrl} target="_blank" rel="noreferrer" size="lg">
                  View Resume
                </Button>
              </MagneticWrap>
            </motion.div>

            <motion.div variants={slideUp} className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-all hover:-translate-y-1 hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideLeft}
            className="relative flex justify-center md:justify-end"
          >
            <div className="relative">
              <Parallax offset={25} className="relative rounded-full bg-accent p-2">
                <img
                  src={profileImage}
                  alt={personalInfo.name}
                  className="h-64 w-64 rounded-full object-cover sm:h-80 sm:w-80 md:h-96 md:w-96"
                />
              </Parallax>
              {floatingBadges.map((badge) => (
                <FloatingBadge key={badge.label} {...badge} />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">
            Explore the interactive terminal below — type{' '}
            <span className="text-accent">help</span> to begin
          </span>
          <InteractiveTerminal />
        </div>
      </Container>

      <motion.button
        type="button"
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to About section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
};

export default Hero;
