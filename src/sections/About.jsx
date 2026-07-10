import { motion } from 'framer-motion';
import { Clock3, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { personalInfo, experience } from '../utils/data';
import { staggerContainer, staggerItem } from '../utils/animations';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Reveal from '../components/ui/Reveal';
import Parallax from '../components/ui/Parallax';
import useTilt from '../components/ui/useTilt';
import useLocalTime from '../utils/useLocalTime';
import aboutImage from '../assets/images/about.jpg?url';

const TIME_ZONE = 'Asia/Kolkata';

const education = experience.find((item) => item.type === 'education');

const PhotoCell = () => {
  const { rotateX, rotateY, spotlight, onMouseMove, onMouseLeave } = useTilt({ maxTilt: 6 });

  return (
    <motion.div variants={staggerItem} className="md:col-span-2 md:row-span-2">
      <div style={{ perspective: '1000px' }} className="h-full">
        <motion.div
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-border shadow-lg"
        >
          <img
            src={aboutImage}
            alt={`About ${personalInfo.name}`}
            className="h-full w-full object-cover"
          />
          <motion.div
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{ backgroundImage: spotlight }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
            <p className="font-mono text-sm text-white/90">{personalInfo.name}</p>
            <p className="font-mono text-xs text-white/60">{personalInfo.title}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const BentoCell = ({ className, children }) => (
  <motion.div variants={staggerItem} className={className}>
    <Card hover className="flex h-full flex-col justify-center gap-2 p-6">
      {children}
    </Card>
  </motion.div>
);

const About = () => {
  const localTime = useLocalTime(TIME_ZONE);

  return (
    <section id="about" className="relative overflow-hidden py-6">
      <Parallax offset={60} className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent/5 blur-[100px]" />

      <Container>
        <SectionHeading eyebrow="About" title="Get to know me" />

        <Reveal variants={staggerContainer} className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <PhotoCell />

          <motion.div variants={staggerItem} className="md:col-span-2 md:row-span-2">
            <Card className="flex h-full flex-col justify-center gap-4 p-6 md:p-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                Bio
              </span>
              <p className="text-lg leading-relaxed text-muted-foreground">{personalInfo.bio}</p>
            </Card>
          </motion.div>

          <BentoCell>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <MapPin className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold text-foreground">{personalInfo.location}</p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock3 className="h-3 w-3" />
              {localTime} local time
            </p>
          </BentoCell>

          <BentoCell>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <GraduationCap className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              {education ? education.title.replace(/^BCA at /, 'BCA — ') : 'BCA Graduate'}
            </p>
            <p className="text-xs text-muted-foreground">{education?.role}</p>
          </BentoCell>

          <BentoCell>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <p className="text-sm font-semibold text-foreground">Available for work</p>
            <p className="text-xs text-muted-foreground">Open to full-time &amp; freelance</p>
          </BentoCell>

          <BentoCell>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Sparkles className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold text-foreground">What I value</p>
            <p className="text-xs text-muted-foreground">Clean code &amp; great UX</p>
          </BentoCell>
        </Reveal>
      </Container>
    </section>
  );
};

export default About;
