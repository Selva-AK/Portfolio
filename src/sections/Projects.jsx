import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  Heart,
  Eye,
  Sparkles,
  Layers,
  Calendar,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { projects } from '../utils/data';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import useTilt from '../components/ui/useTilt';
import ProjectModal from '../components/ui/ProjectModal';
import FloatingCodeCard from '../components/ui/FloatingCodeCard';
import { GithubIcon } from '../components/ui/icons';

const lsLines = [
  [{ t: '$ ', c: 'text-accent' }, { t: 'ls projects/', c: 'text-foreground' }],
  [{ t: 'spendwise/', c: 'text-emerald-500 dark:text-emerald-400' }],
  [{ t: 'dress-store/', c: 'text-emerald-500 dark:text-emerald-400' }],
  [{ t: 'uptime-monitor/', c: 'text-emerald-500 dark:text-emerald-400' }],
  [{ t: 'venture-track/', c: 'text-emerald-500 dark:text-emerald-400' }],
  [{ t: 'local-document-rag/', c: 'text-emerald-500 dark:text-emerald-400' }],
];

const LIKED_KEY = 'liked-projects';

const readLikedIds = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(LIKED_KEY) || '[]'));
  } catch {
    return new Set();
  }
};

const ShowcaseRow = ({ project, index, onOpen }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });
  const reverse = index % 2 === 1;
  const indexLabel = String(index + 1).padStart(2, '0');
  const { rotateX, rotateY, spotlight, onMouseMove, onMouseLeave } = useTilt();
  const [hovered, setHovered] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [liked, setLiked] = useState(() => readLikedIds().has(project.id));

  useEffect(() => {
    if (!hovered || project.images.length <= 1) return undefined;
    const id = setInterval(() => {
      setPreviewIndex((i) => (i + 1) % project.images.length);
    }, 1000);
    return () => clearInterval(id);
  }, [hovered, project.images.length]);

  const handleMouseEnter = () => {
    setPreviewIndex(0);
    setHovered(true);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked((prev) => {
      const next = !prev;
      const ids = readLikedIds();
      if (next) ids.add(project.id);
      else ids.delete(project.id);
      localStorage.setItem(LIKED_KEY, JSON.stringify([...ids]));
      return next;
    });
  };

  const displayedImage = hovered && project.images[previewIndex] ? project.images[previewIndex] : project.thumbnail;

  return (
    <div ref={ref} className="relative z-10 py-10 md:py-16">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: reverse ? 60 : -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={reverse ? 'md:order-2' : 'md:order-1'}
        >
          <div className="relative" style={{ perspective: '1400px' }}>
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-10 select-none text-7xl font-black leading-none text-transparent [-webkit-text-stroke:1px_var(--border)] md:-top-14 md:text-8xl opacity-40 ${
                reverse ? 'right-0 md:-right-4' : 'left-0 md:-left-4'
              }`}
            >
              {indexLabel}
            </span>

            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={onMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => {
                onMouseLeave();
                setHovered(false);
              }}
              onClick={() => onOpen(project)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-surface/80 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-accent/50 hover:shadow-accent/20"
            >
              <motion.div
                className="pointer-events-none absolute inset-0 mix-blend-overlay z-10"
                style={{ backgroundImage: spotlight }}
              />
              <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                <motion.img
                  key={displayedImage}
                  src={displayedImage}
                  alt={project.name}
                  initial={{ scale: 1.05, opacity: 0.9 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-60" />

                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-mono font-medium text-white backdrop-blur-md">
                    {project.year}
                  </span>
                  <span className="rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    {project.status}
                  </span>
                </div>

                <div className="absolute right-4 top-4 flex gap-2">
                  <button
                    type="button"
                    onClick={toggleLike}
                    className={`rounded-full p-2.5 backdrop-blur-md transition-transform active:scale-95 ${
                      liked
                        ? 'bg-rose-500/90 text-white'
                        : 'bg-black/60 text-white/80 hover:bg-black/90 hover:text-white'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Eye className="h-3.5 w-3.5 text-accent" />
                  View Showcase
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className={reverse ? 'md:order-1' : 'md:order-2'}
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Project {indexLabel}
            </span>
          </div>

          <h3 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {project.name}
          </h3>

          <div className="mb-4 flex flex-wrap items-center gap-4">
            <Badge variant="accent">{project.status}</Badge>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {project.year}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {project.duration}
            </span>
          </div>

          <p className="mb-5 leading-relaxed text-muted-foreground">{project.description}</p>

          <ul className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {project.features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mb-7 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => onOpen(project)}>
              Case Study
              <ArrowRight className="h-4 w-4" />
            </Button>
            {project.githubUrl && (
              <Button as="a" href={project.githubUrl} target="_blank" rel="noreferrer" variant="outline" size="icon">
                <GithubIcon className="h-4 w-4" />
              </Button>
            )}
            {project.liveUrl && (
              <Button as="a" href={project.liveUrl} target="_blank" rel="noreferrer" variant="outline" size="icon">
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const headerRef = useRef(null);
  const rowsRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: rowsRef, offset: ['start 0.75', 'end 0.35'] });

  const handleOpen = (project) => {
    setSelectedProject(project);
  };

  return (
    <section id="work" className="relative overflow-hidden py-6">
      <Container>
        <div className="relative mb-16">
          <FloatingCodeCard
            filename="shell"
            lines={lsLines}
            className="-right-4 top-0 xl:right-8"
            floatDelay={0.5}
            rotate={3}
            cursor={false}
          />
          <div ref={headerRef} className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
                Portfolio &middot; {String(projects.length).padStart(2, '0')} Projects
              </span>
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Featured Projects
              </h2>
              <p className="mx-auto max-w-xl text-lg text-muted-foreground">
                A collection of selected works focusing on performance, user experience, and modern
                web technologies.
              </p>
            </motion.div>
          </div>
        </div>

        <div ref={rowsRef} className="relative">
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-border md:block" />
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block">
            <motion.div
              className="w-px origin-top bg-accent"
              style={{ height: '100%', scaleY: scrollYProgress }}
            />
          </div>

          {projects.map((project, index) => (
            <ShowcaseRow key={project.id} project={project} index={index} onOpen={handleOpen} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button as="a" href="https://github.com/Selva-AK" target="_blank" rel="noreferrer" variant="ghost">
            View More on GitHub
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default Projects;
