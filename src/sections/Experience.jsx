import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronDown, GraduationCap } from 'lucide-react';
import { experience } from '../utils/data';
import { staggerContainer, staggerItem } from '../utils/animations';
import { cn } from '../utils/cn';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Reveal from '../components/ui/Reveal';
import Parallax from '../components/ui/Parallax';
import FloatingCodeCard from '../components/ui/FloatingCodeCard';

const gitLogLines = [
  [{ t: '$ ', c: 'text-accent' }, { t: 'git log --oneline -3', c: 'text-foreground' }],
  [{ t: 'a3f21c9 ', c: 'text-emerald-500 dark:text-emerald-400' }, { t: 'feat: joined ImagiNET', c: 'text-muted-foreground' }],
  [{ t: '8b21e4a ', c: 'text-emerald-500 dark:text-emerald-400' }, { t: 'cert: AWS Developer', c: 'text-muted-foreground' }],
];

const blurbs = {
  work: 'Collaborated with cross-functional teams to design, build, and ship production features — from planning through deployment.',
  education: 'Built a strong foundation in computer science fundamentals, data structures, and software development practices.',
};

const TimelineCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = item.type === 'work' ? Briefcase : GraduationCap;

  return (
    <Card hover className="overflow-hidden p-5">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="flex w-full items-center gap-3 text-left focus-visible:outline-none"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-foreground">{item.title}</h3>
          <p className="truncate text-sm text-muted-foreground">{item.role}</p>
        </div>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-muted-foreground"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <div className="mt-3">
        <Badge>
          <Calendar className="h-3.5 w-3.5" />
          {item.date}
        </Badge>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
              {blurbs[item.type]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

const Experience = () => (
  <section id="experience" className="relative overflow-hidden bg-surface/40 py-6">
    <Parallax offset={70} className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />

    <Container>
      <div className="relative">
        <FloatingCodeCard
          filename="log.sh"
          lines={gitLogLines}
          className="-right-4 top-0 xl:right-8"
          floatDelay={0.4}
          rotate={-3}
          cursor={false}
        />
        <SectionHeading eyebrow="My Journey" title="Experience & Education" />
      </div>

      <Reveal variants={staggerContainer}>
        <ol className="relative">
          <div className="absolute left-5 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />

          {experience.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.li
                key={item.title}
                variants={staggerItem}
                className="relative mb-10 pl-14 last:mb-0 md:grid md:grid-cols-2 md:gap-x-12 md:pl-0"
              >
                <span
                  className={cn(
                    'absolute left-5 top-5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background',
                    'md:left-1/2'
                  )}
                />
                <div className="md:col-start-1">{isEven && <TimelineCard item={item} />}</div>
                <div className="md:col-start-2">{!isEven && <TimelineCard item={item} />}</div>
              </motion.li>
            );
          })}
        </ol>
      </Reveal>
    </Container>
  </section>
);

export default Experience;
