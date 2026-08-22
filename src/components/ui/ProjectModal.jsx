import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2, Calendar, Clock, Layers } from 'lucide-react';
import { GithubIcon } from './icons';

const ProjectModal = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) return null;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl backdrop-blur-2xl dark:bg-[#12151e]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-accent" />
              <h3 className="text-xl font-bold text-foreground">{project.name}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="overflow-y-auto p-6 md:p-8">
            {/* Image Gallery Showcase */}
            {project.images && project.images.length > 0 && (
              <div className="relative mb-8 overflow-hidden rounded-2xl border border-border bg-black/40">
                <div className="relative aspect-video w-full overflow-hidden">
                  <motion.img
                    key={activeImageIndex}
                    src={project.images[activeImageIndex]}
                    alt={`${project.name} screenshot ${activeImageIndex + 1}`}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full object-contain"
                  />
                </div>

                {project.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/90"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/90"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Thumbnail strip */}
                    <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-black/40 p-3">
                      {project.images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`h-12 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                            activeImageIndex === idx
                              ? 'border-accent scale-105 opacity-100'
                              : 'border-transparent opacity-50 hover:opacity-80'
                          }`}
                        >
                          <img src={img} alt="thumb" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Quick Metadata Bar */}
            <div className="mb-6 grid grid-cols-2 gap-4 rounded-xl border border-border bg-surface-hover/40 p-4 sm:grid-cols-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" />
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground">Year</div>
                  <div className="text-sm font-semibold text-foreground">{project.year}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground">Duration</div>
                  <div className="text-sm font-semibold text-foreground">{project.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground">Status</div>
                  <div className="text-sm font-semibold text-foreground">{project.status}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-accent" />
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground">Stack</div>
                  <div className="text-sm font-semibold text-foreground">
                    {project.technologies.slice(0, 2).join(', ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="mb-2 text-lg font-bold text-foreground">Overview</h4>
              <p className="leading-relaxed text-muted-foreground">{project.description}</p>
            </div>

            {/* Features List */}
            {project.features && project.features.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-3 text-lg font-bold text-foreground">Key Capabilities</h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-background/50 p-2.5 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="mb-8">
              <h4 className="mb-3 text-lg font-bold text-foreground">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 border-t border-border pt-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-accent-hover active:scale-95"
                >
                  <ExternalLink className="h-4 w-4" />
                  Launch Live App
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-105 hover:bg-surface-hover active:scale-95"
                >
                  <GithubIcon className="h-4 w-4" />
                  View Source Code
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
