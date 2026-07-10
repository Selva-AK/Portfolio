import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cloud, Code2, Search, Server, Sparkles, X } from 'lucide-react';
import { skills } from '../utils/data';
import { staggerContainer, staggerItem } from '../utils/animations';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Reveal from '../components/ui/Reveal';
import ProgressBar from '../components/ui/ProgressBar';
import Parallax from '../components/ui/Parallax';
import FloatingCodeCard from '../components/ui/FloatingCodeCard';
import { Input } from '../components/ui/Input';

const categoryIcons = [Code2, Server, Cloud, Sparkles];

const terminalLines = [
  [{ t: '$ ', c: 'text-accent' }, { t: 'whoami', c: 'text-foreground' }],
  [{ t: '> ', c: 'text-muted-foreground' }, { t: 'full-stack developer', c: 'text-emerald-500 dark:text-emerald-400' }],
  [{ t: '$ ', c: 'text-accent' }, { t: 'skills --list', c: 'text-foreground' }],
];

const cleanLabel = (label) => label.replace(/[<>/]/g, '').trim();

const Skills = () => {
  const [query, setQuery] = useState('');

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return skills;
    return skills
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => item.name.toLowerCase().includes(q)),
      }))
      .filter((category) => category.items.length > 0);
  }, [query]);

  const totalMatches = filteredCategories.reduce((sum, c) => sum + c.items.length, 0);

  return (
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

        <div className="mx-auto mb-10 max-w-sm">
          <div className="relative">
            <Input
              icon={Search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a skill..."
              aria-label="Search skills"
              className="pr-9"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredCategories.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-10 text-center text-muted-foreground"
            >
              No skills match <span className="text-accent">&ldquo;{query}&rdquo;</span>.
            </motion.p>
          ) : (
            <motion.div
              key={query ? `results-${totalMatches}` : 'all'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-14"
            >
              {filteredCategories.map((category) => {
                const categoryIndex = skills.findIndex((c) => c.category === category.category);
                const Icon = categoryIcons[categoryIndex % categoryIcons.length];
                return (
                  <Reveal key={category.category} variants={staggerContainer}>
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {cleanLabel(category.category)}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {category.items.map((skill) => (
                        <motion.div key={skill.name} variants={staggerItem} layout>
                          <Card className="p-5">
                            <ProgressBar label={skill.name} percentage={skill.percentage} />
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </Reveal>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default Skills;
