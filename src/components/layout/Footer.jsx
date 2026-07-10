import { motion } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/icons';
import { personalInfo } from '../../utils/data';
import useLocalTime from '../../utils/useLocalTime';

const socialLinks = [
  { label: 'LinkedIn', href: personalInfo.social.linkedin, icon: LinkedinIcon },
  { label: 'GitHub', href: personalInfo.social.github, icon: GithubIcon },
  { label: 'Email', href: `mailto:${personalInfo.email}`, icon: Mail },
];

const TIME_ZONE = 'Asia/Kolkata';

const Footer = () => {
  const localTime = useLocalTime(TIME_ZONE);
  const city = personalInfo.location.split(',')[0];

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-6 md:flex-row md:justify-between md:px-8">
        <div className="flex items-center gap-4">
          <motion.span
            whileHover={{ rotate: [0, -4, 4, -4, 0] }}
            transition={{ duration: 0.4 }}
            className="inline-block cursor-default text-base font-bold tracking-tight text-foreground"
          >
            {personalInfo.name}
          </motion.span>

          <div className="flex items-center gap-1">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                aria-label={label}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-hover hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {localTime} in {city}
          </span>
          <span className="hidden text-border sm:inline">&middot;</span>
          <span>&copy; {new Date().getFullYear()} {personalInfo.name}</span>
          <span className="hidden text-border sm:inline">&middot;</span>
          <span className="flex items-center gap-1">
            React &amp; Tailwind
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex text-accent"
            >
              <Heart className="h-3 w-3 fill-current" />
            </motion.span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
