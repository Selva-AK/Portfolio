import { motion } from 'framer-motion';
import { Cloud, Code2, Server, Sparkles } from 'lucide-react';
import { skills } from '../utils/data';
import { staggerContainer, staggerItem } from '../utils/animations';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Reveal from '../components/ui/Reveal';
import ProgressBar from '../components/ui/ProgressBar';

const categoryIcons = [Code2, Server, Cloud, Sparkles];

const Skills = () => (
  <section id="skills" className="relative overflow-hidden bg-surface/40 py-24 md:py-32">
    <Container>
      <SectionHeading
        eyebrow="Tech Stack"
        title="Skills & Expertise"
        description="Crafting digital experiences with modern, production-grade technologies."
      />

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
