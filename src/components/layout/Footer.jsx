import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/icons';
import { personalInfo } from '../../utils/data';

const socialLinks = [
  { label: 'LinkedIn', href: personalInfo.social.linkedin, icon: LinkedinIcon },
  { label: 'GitHub', href: personalInfo.social.github, icon: GithubIcon },
  { label: 'Email', href: `mailto:${personalInfo.email}`, icon: Mail },
];

const TIME_ZONE = 'Asia/Kolkata';
const timeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
});

function useLocalTime() {
  const [time, setTime] = useState(() => timeFormatter.format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(timeFormatter.format(new Date())), 30000);
    return () => clearInterval(id);
  }, []);

  return time;
}

const Footer = () => {
  const localTime = useLocalTime();
  const city = personalInfo.location.split(',')[0];

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-10 md:px-8">
        <motion.span
          whileHover={{ rotate: [0, -4, 4, -4, 0] }}
          transition={{ duration: 0.4 }}
          className="inline-block cursor-default text-lg font-bold tracking-tight text-foreground"
        >
          {personalInfo.name}
        </motion.span>

        <div className="flex items-center gap-2">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-hover hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          {localTime} local time in {city}
        </span>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>

        <p className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          Built with React, Tailwind &amp; a bit of
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex text-accent"
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
          </motion.span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
