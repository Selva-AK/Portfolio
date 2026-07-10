import { motion } from 'framer-motion';
import { Briefcase, Calendar, GraduationCap } from 'lucide-react';
import { experience } from '../utils/data';
import { staggerContainer, staggerItem } from '../utils/animations';
import { cn } from '../utils/cn';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Reveal from '../components/ui/Reveal';
import Parallax from '../components/ui/Parallax';

const TimelineCard = ({ item }) => {
  const Icon = item.type === 'work' ? Briefcase : GraduationCap;
  return (
    <Card hover className="p-5">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.role}</p>
        </div>
      </div>
      <Badge>
        <Calendar className="h-3.5 w-3.5" />
        {item.date}
      </Badge>
    </Card>
  );
};

const Experience = () => (
  <section id="experience" className="relative overflow-hidden bg-surface/40 py-16 md:py-24">
    <Parallax offset={70} className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />

    <Container>
      <SectionHeading eyebrow="My Journey" title="Experience & Education" />

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
