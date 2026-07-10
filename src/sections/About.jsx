import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { personalInfo } from '../utils/data';
import { slideUp, slideRight } from '../utils/animations';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Badge from '../components/ui/Badge';
import Reveal from '../components/ui/Reveal';
import Parallax from '../components/ui/Parallax';
import FloatingCodeCard from '../components/ui/FloatingCodeCard';
import useTilt from '../components/ui/useTilt';
import aboutImage from '../assets/images/about.jpg?url';

const codeLines = [
  [{ t: '// about.js', c: 'text-muted-foreground' }],
  [{ t: 'location', c: 'text-foreground' }, { t: ": '", c: 'text-muted-foreground' }, { t: 'Chennai, IN', c: 'text-emerald-500 dark:text-emerald-400' }, { t: "',", c: 'text-muted-foreground' }],
  [{ t: 'degree', c: 'text-foreground' }, { t: ": '", c: 'text-muted-foreground' }, { t: 'BCA', c: 'text-emerald-500 dark:text-emerald-400' }, { t: "',", c: 'text-muted-foreground' }],
  [{ t: 'status', c: 'text-foreground' }, { t: ": '", c: 'text-muted-foreground' }, { t: 'open to work', c: 'text-emerald-500 dark:text-emerald-400' }, { t: "',", c: 'text-muted-foreground' }],
];

const About = () => {
  const { rotateX, rotateY, spotlight, onMouseMove, onMouseLeave } = useTilt({ maxTilt: 6 });

  return (
    <section id="about" className="relative overflow-hidden py-6">
      <Parallax offset={60} className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent/5 blur-[100px]" />

      <Container>
        <SectionHeading eyebrow="About" title="Get to know me" />

        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">
          <Reveal variants={slideRight} className="relative w-full max-w-sm shrink-0 md:max-w-md">
            <FloatingCodeCard
              filename="about.js"
              lines={codeLines}
              className="-right-8 -top-10"
              floatDelay={0.3}
              rotate={4}
            />
            <Parallax offset={30}>
              <div style={{ perspective: '1000px' }}>
                <motion.div
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                  className="relative overflow-hidden rounded-2xl border border-border shadow-lg"
                >
                  <img
                    src={aboutImage}
                    alt={`About ${personalInfo.name}`}
                    className="h-[420px] w-full object-cover md:h-[480px]"
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-0 mix-blend-overlay"
                    style={{ backgroundImage: spotlight }}
                  />
                </motion.div>
              </div>
            </Parallax>
          </Reveal>

          <Reveal variants={slideUp} className="flex-1">
            <p className="text-lg leading-relaxed text-muted-foreground">{personalInfo.bio}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge variant="accent" className="px-4 py-2 text-sm">
                <MapPin className="h-4 w-4" />
                {personalInfo.location}
              </Badge>
              <Badge variant="accent" className="px-4 py-2 text-sm">
                <GraduationCap className="h-4 w-4" />
                BCA Graduate
              </Badge>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default About;
