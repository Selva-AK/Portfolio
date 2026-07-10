import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import { achievements } from '../utils/data';
import { staggerContainer, staggerItem } from '../utils/animations';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import { Dialog, DialogContent, DialogTitle } from '../components/ui/Dialog';
import Parallax from '../components/ui/Parallax';
import FloatingCodeCard from '../components/ui/FloatingCodeCard';

const credentialLines = [
  [{ t: 'const', c: 'text-accent' }, { t: ' credentials = [', c: 'text-foreground' }],
  [{ t: "  'AWS Certified',", c: 'text-emerald-500 dark:text-emerald-400' }],
  [{ t: "  'Full-Stack Hero',", c: 'text-emerald-500 dark:text-emerald-400' }],
  [{ t: '];', c: 'text-foreground' }],
];

const Achievements = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="achievements" className="relative overflow-hidden py-6">
      <Parallax offset={60} className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />

      <Container>
        <div className="relative">
          <FloatingCodeCard
            filename="credentials.js"
            lines={credentialLines}
            className="-right-4 top-0 xl:right-8"
            floatDelay={0.6}
            rotate={-3}
            cursor={false}
          />
          <SectionHeading
            eyebrow="Achievements"
            title="Certifications & Recognition"
            description="A selection of certifications and competition awards earned throughout my career."
          />
        </div>

        <Reveal variants={staggerContainer}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item, i) => (
              <motion.button
                key={item.title}
                type="button"
                variants={staggerItem}
                onClick={() => setSelected(item)}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-surface-hover">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-accent shadow-sm backdrop-blur">
                    <Award className="h-4 w-4" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                      View
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Certificate {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-1 font-semibold text-foreground">{item.title}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </Reveal>
      </Container>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none" showClose>
          <DialogTitle className="sr-only">{selected?.title ?? 'Certificate preview'}</DialogTitle>
          {selected && (
            <img
              src={selected.image}
              alt={selected.title}
              className="max-h-[85vh] w-full rounded-xl border border-border object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Achievements;
