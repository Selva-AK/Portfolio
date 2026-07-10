import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { projects } from '../utils/data';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../components/ui/Dialog';
import useTilt from '../components/ui/useTilt';
import FloatingCodeCard from '../components/ui/FloatingCodeCard';
import { GithubIcon } from '../components/ui/icons';

const lsLines = [
  [{ t: '$ ', c: 'text-accent' }, { t: 'ls projects/', c: 'text-foreground' }],
  [{ t: 'spendwise/', c: 'text-emerald-500 dark:text-emerald-400' }],
  [{ t: 'dress-store/', c: 'text-emerald-500 dark:text-emerald-400' }],
  [{ t: 'uptime-monitor/', c: 'text-emerald-500 dark:text-emerald-400' }],
];

const ShowcaseRow = ({ project, index, onOpen }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });
  const reverse = index % 2 === 1;
  const indexLabel = String(index + 1).padStart(2, '0');
  const { rotateX, rotateY, spotlight, onMouseMove, onMouseLeave } = useTilt();

  return (
    <div ref={ref} className="relative z-10 py-10 md:py-14">
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
              className={`pointer-events-none absolute -top-10 select-none text-7xl font-black leading-none text-transparent [-webkit-text-stroke:1px_var(--border)] md:-top-14 md:text-8xl ${
                reverse ? 'right-0 md:-right-4' : 'left-0 md:-left-4'
              }`}
            >
              {indexLabel}
            </span>

            <div
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              onClick={() => onOpen(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
              className="relative z-10 cursor-pointer"
            >
              <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
                <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-lg transition-shadow duration-300 hover:border-accent/40 hover:shadow-xl">
                  <div className="flex h-9 items-center gap-1.5 border-b border-border bg-surface-hover/50 px-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                    <span className="ml-3 rounded-md bg-background px-2 py-0.5 font-mono text-[0.65rem] tracking-wide text-muted-foreground">
                      {project.name.toLowerCase().replace(/\s+/g, '-')}.app
                    </span>
                  </div>

                  <div className="relative flex h-64 items-center justify-center overflow-hidden bg-black sm:h-80 md:h-96">
                    <div
                      className="absolute inset-0 scale-110 bg-cover bg-center opacity-40 blur-2xl"
                      style={{ backgroundImage: `url(${project.thumbnail})` }}
                    />
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="relative max-h-[92%] max-w-[92%] rounded-md object-contain shadow-2xl"
                    />
                    <motion.div
                      className="pointer-events-none absolute inset-0 mix-blend-overlay"
                      style={{ backgroundImage: spotlight }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
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

const ProjectModal = ({ project, open, onClose }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-w-5xl p-0">
        {project && (
          <>
            <DialogTitle className="sr-only">{project.name}</DialogTitle>
            <DialogDescription className="sr-only">{project.shortDescription}</DialogDescription>
            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr]">
              <div className="flex flex-col gap-3 p-4 md:p-6">
                <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl border border-border bg-black sm:h-80 md:h-[420px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 blur-xl"
                    style={{ backgroundImage: `url(${project.images[activeImage]})` }}
                  />
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      src={project.images[activeImage]}
                      alt={`${project.name} screenshot ${activeImage + 1}`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.3 }}
                      className="relative max-h-[92%] max-w-[92%] object-contain shadow-xl"
                    />
                  </AnimatePresence>

                  {project.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 flex gap-1.5">
                      <button
                        type="button"
                        aria-label="Previous screenshot"
                        disabled={activeImage === 0}
                        onClick={() => setActiveImage((prev) => Math.max(0, prev - 1))}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-30"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next screenshot"
                        disabled={activeImage === project.images.length - 1}
                        onClick={() => setActiveImage((prev) => Math.min(project.images.length - 1, prev + 1))}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-30"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {project.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {project.images.map((img, i) => (
                      <button
                        type="button"
                        key={img}
                        onClick={() => setActiveImage(i)}
                        aria-label={`View screenshot ${i + 1}`}
                        className={`h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 bg-black/40 transition-opacity ${
                          activeImage === i ? 'border-accent opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="h-full w-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col border-t border-border p-6 md:border-l md:border-t-0 md:p-8">
                <h3 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">{project.name}</h3>
                <div className="mb-4 flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {project.year}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {project.duration}
                  </span>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold text-foreground">Key Features</h4>
                  <ul className="flex flex-col gap-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold text-foreground">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="accent">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex gap-3">
                  {project.githubUrl && (
                    <Button as="a" href={project.githubUrl} target="_blank" rel="noreferrer" variant="outline" className="flex-1">
                      GitHub
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button as="a" href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1">
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const headerRef = useRef(null);
  const rowsRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: rowsRef, offset: ['start 0.75', 'end 0.35'] });

  const handleOpen = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
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

      <ProjectModal project={selectedProject} open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

export default Projects;
