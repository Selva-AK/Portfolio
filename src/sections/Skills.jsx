import { motion } from 'framer-motion';
import { Cloud, Code2, Server, Sparkles } from 'lucide-react';
import { skills } from '../utils/data';
import { staggerContainer, staggerItem } from '../utils/animations';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Reveal from '../components/ui/Reveal';
import ProgressBar from '../components/ui/ProgressBar';
import Parallax from '../components/ui/Parallax';
import FloatingCodeCard from '../components/ui/FloatingCodeCard';

const categoryIcons = [Code2, Server, Cloud, Sparkles];

const terminalLines = [
  [{ t: '$ ', c: 'text-accent' }, { t: 'whoami', c: 'text-foreground' }],
  [{ t: '> ', c: 'text-muted-foreground' }, { t: 'full-stack developer', c: 'text-emerald-500 dark:text-emerald-400' }],
  [{ t: '$ ', c: 'text-accent' }, { t: 'skills --list', c: 'text-foreground' }],
];

const Skills = () => (
  <section id="skills" className="relative overflow-hidden bg-surface/40 py-6">
    <Parallax offset={70} className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />
    <Sparkles className="pointer-events-none absolute right-[8%] top-[12%] hidden h-24 w-24 -rotate-12 text-accent/[0.07] lg:block" />
    <Code2 className="pointer-events-none absolute bottom-[10%] left-[6%] hidden h-28 w-28 rotate-12 text-accent/[0.06] lg:block" />

    <Container>
      <div className="relative">
        <FloatingCodeCard
          filename="terminal"
          lines={terminalLines}
          className="-right-4 top-0 xl:right-4"
          floatDelay={0.5}
          rotate={3}
          cursor
        />
        <SectionHeading
          eyebrow="Tech Stack"
          title="Skills & Expertise"
          description="Crafting digital experiences with modern, production-grade technologies."
        />
      </div>

      <div className="flex flex-col gap-14">
        {skills.map((category, categoryIndex) => {
          const Icon = categoryIcons[categoryIndex % categoryIcons.length];
          return (
            <Reveal key={category.category} variants={staggerContainer}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {category.category.replace(/[<>/]/g, '').trim()}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((skill) => (
                  <motion.div key={skill.name} variants={staggerItem}>
                    <Card className="p-5">
                      <ProgressBar label={skill.name} percentage={skill.percentage} />
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Container>
  </section>
);

export default Skills;
