import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cloud, Code2, Search, Server, Sparkles, X, Cpu } from 'lucide-react';
import { skills } from '../utils/data';
import { staggerContainer, staggerItem } from '../utils/animations';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import ProgressBar from '../components/ui/ProgressBar';
import FloatingCodeCard from '../components/ui/FloatingCodeCard';

const categoryIcons = [Code2, Server, Cloud, Cpu];

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
    <section id="skills" className="relative overflow-hidden py-16 md:py-24 bg-surface/30">
      <Container>
        <div className="relative mb-12">
          <FloatingCodeCard
            filename="terminal"
            lines={terminalLines}
            className="-right-4 top-0 xl:right-4 hidden md:block"
            floatDelay={0.5}
            rotate={3}
            cursor
          />
          <SectionHeading
            eyebrow="Tech Stack & Matrix"
            title="Skills & Engineering Proficiency"
            description="Production-tested technologies across modern front-end frameworks, backend systems, database architecture, and cloud infrastructure."
          />
        </div>

        {/* Search Skill Input */}
        <div className="mx-auto mb-12 max-w-md">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-4 w-4 text-accent" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a technology (e.g. React, AWS, Node...)"
              className="w-full rounded-full border border-border bg-surface/80 py-3 pl-11 pr-10 text-sm font-medium text-foreground shadow-sm backdrop-blur-md placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3.5 text-muted-foreground hover:text-foreground"
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
              className="py-12 text-center text-muted-foreground"
            >
              No skills match <span className="text-accent font-semibold">&ldquo;{query}&rdquo;</span>.
            </motion.p>
          ) : (
            <motion.div
              key={query ? `results-${totalMatches}` : 'all'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-12"
            >
              {filteredCategories.map((category) => {
                const categoryIndex = skills.findIndex((c) => c.category === category.category);
                const Icon = categoryIcons[categoryIndex % categoryIcons.length];
                return (
                  <Reveal key={category.category} variants={staggerContainer}>
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent shadow-md">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        {cleanLabel(category.category)}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {category.items.map((skill) => (
                        <motion.div key={skill.name} variants={staggerItem} layout>
                          <div className="group rounded-2xl border border-white/10 bg-surface/80 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:shadow-accent/10 hover:-translate-y-1">
                            <ProgressBar label={skill.name} percentage={skill.percentage} />
                          </div>
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
