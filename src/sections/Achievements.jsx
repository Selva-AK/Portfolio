import { useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { achievements } from '../utils/data';
import { staggerContainer, staggerItem } from '../utils/animations';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Reveal from '../components/ui/Reveal';
import { Dialog, DialogContent, DialogTitle } from '../components/ui/Dialog';
import Parallax from '../components/ui/Parallax';
import FloatingCodeCard from '../components/ui/FloatingCodeCard';

const achievementLines = [
  [{ t: 'if', c: 'text-accent' }, { t: ' (achievement.', c: 'text-foreground' }, { t: 'unlocked', c: 'text-emerald-500 dark:text-emerald-400' }, { t: ') {', c: 'text-foreground' }],
  [{ t: '  celebrate();', c: 'text-muted-foreground' }],
  [{ t: '}', c: 'text-foreground' }],
];

const Achievements = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="achievements" className="relative overflow-hidden py-16 md:py-24">
      <Parallax offset={60} className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />

      <Container>
        <div className="relative">
          <FloatingCodeCard
            filename="unlock.js"
            lines={achievementLines}
            className="-right-4 top-0 xl:right-8"
            floatDelay={0.6}
            rotate={-3}
          />
          <SectionHeading
            eyebrow="Achievements"
            title="Certifications & Recognition"
            description="A selection of certifications and competition wins earned along the way."
          />
        </div>

        <Reveal variants={staggerContainer}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <Card
                  hover
                  className="group cursor-pointer overflow-hidden"
                  onClick={() => setSelected(item)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-hover">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                      <ZoomIn className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-center text-sm font-semibold text-foreground">{item.title}</p>
                  </div>
                </Card>
              </motion.div>
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
