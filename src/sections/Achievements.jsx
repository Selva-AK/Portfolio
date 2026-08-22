import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Award, Eye, X } from 'lucide-react';
import { achievements } from '../utils/data';
import { staggerContainer, staggerItem } from '../utils/animations';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
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
    <section id="achievements" className="relative overflow-hidden py-16 md:py-24 bg-surface/30">
      <Container>
        <div className="relative mb-12">
          <FloatingCodeCard
            filename="credentials.js"
            lines={credentialLines}
            className="-right-4 top-0 xl:right-8 hidden md:block"
            floatDelay={0.6}
            rotate={-3}
            cursor={false}
          />
          <SectionHeading
            eyebrow="Credentials & Honors"
            title="Certifications & Awards"
            description="Verified certifications and hackathon awards demonstrating commitment to engineering excellence."
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
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/80 text-left shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-accent/20 focus-visible:outline-none"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                  <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-black/60 text-accent shadow-md backdrop-blur-md">
                    <Award className="h-5 w-5" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-accent">
                      <Eye className="h-3.5 w-3.5" />
                      Click to Preview
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-white/10">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent">
                    Honors #{String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-1 font-bold text-foreground group-hover:text-accent transition-colors">{item.title}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* Lightbox Certificate Preview */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl backdrop-blur-2xl"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-20 rounded-full bg-black/60 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/90"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={selected.image}
                alt={selected.title}
                className="max-h-[80vh] w-full object-contain"
              />
              <div className="border-t border-border bg-surface-hover/50 p-4 text-center">
                <h4 className="font-bold text-foreground">{selected.title}</h4>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
