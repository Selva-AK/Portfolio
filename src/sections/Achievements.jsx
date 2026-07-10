import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Trophy, ZoomIn } from 'lucide-react';
import { achievements } from '../utils/data';
import { staggerContainer, staggerItem } from '../utils/animations';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Reveal from '../components/ui/Reveal';
import { Dialog, DialogContent, DialogTitle } from '../components/ui/Dialog';
import Parallax from '../components/ui/Parallax';
import FloatingCodeCard from '../components/ui/FloatingCodeCard';
import ConfettiBurst from '../components/ui/ConfettiBurst';

const achievementLines = [
  [{ t: 'if', c: 'text-accent' }, { t: ' (achievement.', c: 'text-foreground' }, { t: 'unlocked', c: 'text-emerald-500 dark:text-emerald-400' }, { t: ') {', c: 'text-foreground' }],
  [{ t: '  celebrate();', c: 'text-muted-foreground' }],
  [{ t: '}', c: 'text-foreground' }],
];

const AchievementCard = ({ item, onOpen }) => {
  const [flipped, setFlipped] = useState(false);
  const [everFlipped, setEverFlipped] = useState(false);
  const [celebrate, setCelebrate] = useState(0);

  const handleFlip = (e) => {
    e.stopPropagation();
    setFlipped((f) => !f);
    if (!everFlipped) {
      setEverFlipped(true);
      setCelebrate((c) => c + 1);
    }
  };

  return (
    <motion.div variants={staggerItem} className="[perspective:1200px]">
      <div className="relative h-72 w-full">
        <ConfettiBurst triggerKey={celebrate} />
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative h-full w-full"
        >
          <Card
            hover
            onClick={() => onOpen(item)}
            className="group absolute inset-0 flex cursor-pointer flex-col overflow-hidden [backface-visibility:hidden]"
          >
            <div className="relative flex-1 overflow-hidden bg-surface-hover">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                <ZoomIn className="h-8 w-8 text-white" />
              </div>
              <button
                type="button"
                onClick={handleFlip}
                aria-label="Flip card"
                className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCw className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-center text-sm font-semibold text-foreground">{item.title}</p>
            </div>
          </Card>

          <Card className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-accent/5 p-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <Trophy className="h-10 w-10 text-accent" />
            <p className="font-semibold text-foreground">{item.title}</p>
            <Badge variant="accent">Unlocked</Badge>
            <button
              type="button"
              onClick={handleFlip}
              className="mt-2 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-accent hover:underline focus-visible:outline-none"
            >
              Flip back
            </button>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="achievements" className="relative overflow-hidden py-6">
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
            description="A selection of certifications and competition wins earned along the way. Tap the flip icon for a surprise."
          />
        </div>

        <Reveal variants={staggerContainer}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item) => (
              <AchievementCard key={item.title} item={item} onOpen={setSelected} />
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
