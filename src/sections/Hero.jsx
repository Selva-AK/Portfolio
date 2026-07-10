import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { personalInfo } from '../utils/data';
import { fadeIn, slideUp, slideLeft } from '../utils/animations';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { GithubIcon, LinkedinIcon } from '../components/ui/icons';
import profileImage from '../assets/images/1690812853497.png?url';

const socialLinks = [
  { label: 'LinkedIn', href: personalInfo.social.linkedin, icon: LinkedinIcon },
  { label: 'Email', href: `mailto:${personalInfo.email}`, icon: Mail },
  { label: 'GitHub', href: personalInfo.social.github, icon: GithubIcon },
];

const Hero = () => (
  <section
    id="home"
    className="relative flex min-h-screen items-center overflow-hidden pt-24 md:pt-0"
  >
    <div className="pointer-events-none absolute right-[-10%] top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />

    <Container>
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-8">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col gap-6">
          <motion.h1
            variants={slideUp}
            className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            Hi, I&apos;m <span className="text-accent">{personalInfo.name}</span>
            <br />
            <span className="font-mono text-2xl text-muted-foreground sm:text-3xl">
              {personalInfo.title}
            </span>
          </motion.h1>

          <motion.div variants={slideUp}>
            <Button as="a" href={personalInfo.resumeUrl} target="_blank" rel="noreferrer" size="lg">
              View Resume
            </Button>
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
          className="flex justify-center md:justify-end"
        >
          <div className="rounded-full bg-accent p-2">
            <img
              src={profileImage}
              alt={personalInfo.name}
              className="h-64 w-64 rounded-full object-cover sm:h-80 sm:w-80 md:h-96 md:w-96"
            />
          </div>
        </motion.div>
      </div>
    </Container>
  </section>
);

export default Hero;
