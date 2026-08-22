import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronDown, GraduationCap, MapPin } from 'lucide-react';
import { experience } from '../utils/data';
import { staggerContainer, staggerItem } from '../utils/animations';
import { cn } from '../utils/cn';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import FloatingCodeCard from '../components/ui/FloatingCodeCard';

const gitLogLines = [
  [{ t: '$ ', c: 'text-accent' }, { t: 'git log --oneline -3', c: 'text-foreground' }],
  [{ t: 'a3f21c9 ', c: 'text-emerald-500 dark:text-emerald-400' }, { t: 'feat: Full-Stack Developer @ ImagiNET', c: 'text-muted-foreground' }],
  [{ t: '8b21e4a ', c: 'text-emerald-500 dark:text-emerald-400' }, { t: 'cert: AWS Cloud Developer', c: 'text-muted-foreground' }],
];

const blurbs = {
  work: 'Engineered scalable web applications, RESTful APIs, and cloud microservices. Collaborated with cross-functional product teams to deliver high-performance user experiences.',
  education: 'Completed Bachelor of Computer Applications (BCA) with 8.0/10 CGPA. Built core foundations in software architecture, database design, and algorithmic problem solving.',
};

const TimelineCard = ({ item }) => {
  const [expanded, setExpanded] = useState(true);
  const Icon = item.type === 'work' ? Briefcase : GraduationCap;
  const isCurrent = /present/i.test(item.date);

  return (
    <div className="group rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:shadow-accent/10">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="flex w-full items-start gap-4 text-left focus-visible:outline-none"
      >
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent shadow-md">
          <Icon className="h-6 w-6" />
          {isCurrent && (
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-surface bg-emerald-500" />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">{item.title}</h3>
            {isCurrent && (
              <span className="shrink-0 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                Active Role
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-accent">{item.role}</p>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-accent" />
              {item.date}
            </span>
          </div>
        </div>

        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-muted-foreground"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="mt-4 border-t border-border/60 pt-4 text-sm leading-relaxed text-muted-foreground">
              {blurbs[item.type]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Experience = () => {
  const [filter, setFilter] = useState('all');

  const filteredExperience = experience.filter((item) => {
    if (filter === 'work') return item.type === 'work';
    if (filter === 'education') return item.type === 'education';
    return true;
  });

  return (
    <section id="experience" className="relative overflow-hidden py-16 md:py-24">
      <Container>
        <div className="relative mb-12">
          <FloatingCodeCard
            filename="log.sh"
            lines={gitLogLines}
            className="-right-4 top-0 xl:right-8 hidden md:block"
            floatDelay={0.4}
            rotate={-3}
            cursor={false}
          />
          <SectionHeading
            eyebrow="Career Timeline"
            title="Professional Experience & Background"
            description="Proven track record of engineering web apps, managing cloud infrastructure, and solving real-world challenges."
          />

          {/* Filter Tabs */}
          <div className="mt-6 flex justify-center gap-2">
            {[
              { id: 'all', label: 'All Track' },
              { id: 'work', label: 'Work Experience' },
              { id: 'education', label: 'Education' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  filter === tab.id
                    ? 'bg-accent text-white shadow-lg shadow-accent/25 scale-105'
                    : 'border border-border bg-surface/80 text-muted-foreground hover:bg-surface-hover hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <Reveal variants={staggerContainer}>
          <ol className="relative">
            {/* Glowing Vertical Line */}
            <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-accent via-cyan-400 to-indigo-600 md:left-1/2 md:-translate-x-1/2" />

            <AnimatePresence mode="wait">
              {filteredExperience.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.li
                    key={item.title}
                    variants={staggerItem}
                    layout
                    className="relative mb-12 pl-14 last:mb-0 md:grid md:grid-cols-2 md:gap-x-12 md:pl-0"
                  >
                    <span
                      className={cn(
                        'absolute left-6 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-accent bg-background shadow-lg shadow-accent/50',
                        'md:left-1/2'
                      )}
                    />
                    <div className="md:col-start-1">{isEven && <TimelineCard item={item} />}</div>
                    <div className="md:col-start-2">{!isEven && <TimelineCard item={item} />}</div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>
        </Reveal>
      </Container>
    </section>
  );
};

export default Experience;
