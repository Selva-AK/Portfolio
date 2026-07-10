import { GraduationCap, MapPin } from 'lucide-react';
import { personalInfo } from '../utils/data';
import { slideUp, slideRight } from '../utils/animations';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Badge from '../components/ui/Badge';
import Reveal from '../components/ui/Reveal';
import aboutImage from '../assets/images/about.jpg?url';

const About = () => (
  <section id="about" className="relative overflow-hidden py-24 md:py-32">
    <Container>
      <SectionHeading eyebrow="About" title="Get to know me" />

      <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">
        <Reveal variants={slideRight} className="w-full max-w-sm shrink-0 md:max-w-md">
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <img
              src={aboutImage}
              alt={`About ${personalInfo.name}`}
              className="h-[420px] w-full object-cover md:h-[480px]"
            />
          </div>
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

export default About;
