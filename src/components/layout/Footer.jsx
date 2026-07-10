import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/icons';
import { personalInfo } from '../../utils/data';

const socialLinks = [
  { label: 'LinkedIn', href: personalInfo.social.linkedin, icon: LinkedinIcon },
  { label: 'GitHub', href: personalInfo.social.github, icon: GithubIcon },
  { label: 'Email', href: `mailto:${personalInfo.email}`, icon: Mail },
];

const Footer = () => (
  <footer className="border-t border-border bg-surface/40">
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-10 md:px-8">
      <span className="text-lg font-bold tracking-tight text-foreground">{personalInfo.name}</span>

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

      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
