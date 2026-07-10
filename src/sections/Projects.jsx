import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  IconButton,
  Dialog,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
  useScroll,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { projects } from '../utils/data';

const ShowcaseRow = ({ project, index, onOpen }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });
  const reverse = index % 2 === 1;
  const accent = reverse ? '#ec4899' : '#6366f1';
  const accentLight = reverse ? '#fbcfe8' : '#a5b4fc';
  const indexLabel = String(index + 1).padStart(2, '0');

  const mvX = useMotionValue(0.5);
  const mvY = useMotionValue(0.5);
  const springOpts = { stiffness: 200, damping: 25, mass: 0.5 };
  const rotateX = useSpring(useTransform(mvY, [0, 1], [10, -10]), springOpts);
  const rotateY = useSpring(useTransform(mvX, [0, 1], [-10, 10]), springOpts);
  const spotX = useTransform(mvX, (v) => `${v * 100}%`);
  const spotY = useTransform(mvY, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${spotX} ${spotY}, rgba(255,255,255,0.14), transparent 70%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width);
    mvY.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => {
    mvX.set(0.5);
    mvY.set(0.5);
  };

  return (
    <Box ref={ref} sx={{ position: 'relative', py: { xs: 6, md: 8 }, zIndex: 1 }}>
      <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
        {/* Visual panel */}
        <Grid item xs={12} md={6} order={{ xs: 1, md: reverse ? 2 : 1 }}>
          <motion.div
            initial={{ opacity: 0, x: reverse ? 60 : -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Box sx={{ position: 'relative', perspective: '1400px' }}>
              {/* Ghost index number */}
              <Typography
                aria-hidden
                sx={{
                  position: 'absolute',
                  top: { xs: '-2.5rem', md: '-3.5rem' },
                  [reverse ? 'right' : 'left']: { xs: 0, md: '-1.5rem' },
                  fontSize: { xs: '5rem', md: '8rem' },
                  fontWeight: 900,
                  lineHeight: 1,
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,255,255,0.08)',
                  zIndex: 0,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {indexLabel}
              </Typography>

              <Box
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => onOpen(project)}
                sx={{ position: 'relative', zIndex: 1, cursor: 'pointer' }}
              >
                <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(15, 23, 42, 0.6)',
                      boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)',
                      transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                      '&:hover': {
                        borderColor: `${accent}55`,
                        boxShadow: `0 30px 60px -20px rgba(0,0,0,0.7), 0 0 40px -8px ${accent}55`,
                      },
                    }}
                  >
                    {/* Browser chrome */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2,
                        height: 38,
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        background: 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: '#ef4444' }} />
                      <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                      <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: '#22c55e' }} />
                      <Box
                        sx={{
                          ml: 1.5,
                          px: 1.5,
                          py: 0.3,
                          borderRadius: '6px',
                          bgcolor: 'rgba(255,255,255,0.04)',
                          color: 'rgba(255,255,255,0.35)',
                          fontSize: '0.65rem',
                          fontFamily: 'monospace',
                          letterSpacing: 0.5,
                        }}
                      >
                        {project.name.toLowerCase().replace(/\s+/g, '-')}.app
                      </Box>
                    </Box>

                    {/* Image stage */}
                    <Box
                      sx={{
                        position: 'relative',
                        height: { xs: 260, sm: 340, md: 400 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#050810',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url(${project.thumbnail})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          filter: 'blur(24px) brightness(0.35)',
                          transform: 'scale(1.2)',
                        }}
                      />
                      <Box
                        component="img"
                        src={project.thumbnail}
                        alt={project.name}
                        sx={{
                          position: 'relative',
                          maxWidth: '92%',
                          maxHeight: '92%',
                          objectFit: 'contain',
                          borderRadius: '8px',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                        }}
                      />
                      {/* Mouse spotlight */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: spotlight,
                          mixBlendMode: 'overlay',
                          pointerEvents: 'none',
                        }}
                      />
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </Grid>

        {/* Text panel */}
        <Grid item xs={12} md={6} order={{ xs: 2, md: reverse ? 1 : 2 }}>
          <motion.div
            initial={{ opacity: 0, x: reverse ? -60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{ width: 32, height: 2, background: accent }} />
                <Typography
                  sx={{ color: accent, fontWeight: 800, letterSpacing: 3, fontSize: '0.8rem', textTransform: 'uppercase' }}
                >
                  Project {indexLabel}
                </Typography>
              </Box>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '2.2rem', md: '2.8rem' },
                  mb: 2,
                  lineHeight: 1.1,
                  background: `linear-gradient(135deg, #f8fafc 0%, ${accentLight} 120%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {project.name}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, mb: 3 }}>
                <Chip
                  label={project.status}
                  size="small"
                  sx={{ bgcolor: `${accent}22`, color: accentLight, border: `1px solid ${accent}44`, fontWeight: 700 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                  <EventIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption">{project.year}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                  <AccessTimeIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption">{project.duration}</Typography>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
                {project.description}
              </Typography>

              <Grid container spacing={1.2} sx={{ mb: 3.5 }}>
                {project.features.slice(0, 4).map((feature, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <CheckCircleOutlineIcon sx={{ color: accent, fontSize: 18, mt: 0.2 }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {feature}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                {project.technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.04)',
                      color: 'rgba(255,255,255,0.75)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  onClick={() => onOpen(project)}
                  endIcon={<ArrowForwardIosIcon sx={{ fontSize: '0.75rem !important' }} />}
                  sx={{
                    borderRadius: '10px',
                    py: 1.3,
                    px: 3,
                    fontWeight: 700,
                    color: '#0f172a',
                    background: `linear-gradient(135deg, ${accent} 0%, ${accentLight} 100%)`,
                    boxShadow: `0 8px 24px ${accent}44`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${accent} 0%, ${accentLight} 100%)`,
                      boxShadow: `0 12px 32px ${accent}66`,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Case Study
                </Button>
                {project.githubUrl && (
                  <IconButton
                    href={project.githubUrl}
                    target="_blank"
                    sx={{ border: '1px solid rgba(255,255,255,0.15)', color: 'white', '&:hover': { borderColor: accent, color: accent } }}
                  >
                    <GitHubIcon />
                  </IconButton>
                )}
                {project.liveUrl && (
                  <IconButton
                    href={project.liveUrl}
                    target="_blank"
                    sx={{ border: '1px solid rgba(255,255,255,0.15)', color: 'white', '&:hover': { borderColor: accent, color: accent } }}
                  >
                    <OpenInNewIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

const ProjectModal = ({ project, open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [activeImage, setActiveImage] = useState(0);

  // Reset active image when project changes or modal opens
  useEffect(() => {
    setActiveImage(0);
  }, [project, open]);

  if (!project) return null;

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth="lg"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: '#0f172a',
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          borderRadius: fullScreen ? 0 : '32px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 20,
            top: 20,
            zIndex: 10,
            bgcolor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(8px)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.3)' },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Grid container>
          <Grid item xs={12} md={7}>
            <Box sx={{ p: { xs: 2, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Main Image Display */}
              <Box
                sx={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: { xs: '300px', md: '500px' },
                  position: 'relative',
                  bgcolor: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Blurred Background for Aspect Ratio Awareness */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${project.images[activeImage]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(20px) brightness(0.4)',
                    opacity: 0.5,
                    zIndex: 0,
                  }}
                />

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={project.images[activeImage]}
                    alt={`${project.name} ${activeImage}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      position: 'relative',
                      zIndex: 1,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                  />
                </AnimatePresence>

                {/* Navigation Arrows for Image */}
                <Box sx={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 1, zIndex: 2 }}>
                  <IconButton
                    size="small"
                    disabled={activeImage === 0}
                    onClick={() => setActiveImage(prev => Math.max(0, prev - 1))}
                    sx={{ bgcolor: 'rgba(15, 23, 42, 0.6)', color: 'white', backdropFilter: 'blur(4px)', '&:hover': { bgcolor: 'primary.main' } }}
                  >
                    <ArrowForwardIosIcon sx={{ transform: 'rotate(180deg)', fontSize: '1rem' }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    disabled={activeImage === project.images.length - 1}
                    onClick={() => setActiveImage(prev => Math.min(project.images.length - 1, prev + 1))}
                    sx={{ bgcolor: 'rgba(15, 23, 42, 0.6)', color: 'white', backdropFilter: 'blur(4px)', '&:hover': { bgcolor: 'primary.main' } }}
                  >
                    <ArrowForwardIosIcon sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </Box>
              </Box>

              {/* Thumbnails Strip */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  overflowX: 'auto',
                  pb: 1,
                  '&::-webkit-scrollbar': { height: '4px' },
                  '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }
                }}
              >
                {project.images.map((img, i) => (
                  <Box
                    key={i}
                    onClick={() => setActiveImage(i)}
                    sx={{
                      minWidth: '80px',
                      height: '60px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: '2px solid',
                      borderColor: activeImage === i ? 'primary.main' : 'transparent',
                      opacity: activeImage === i ? 1 : 0.6,
                      transition: 'all 0.3s ease',
                      bgcolor: 'rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': { opacity: 1, transform: 'translateY(-2px)' }
                    }}
                  >
                    <img src={img} alt={`thumb ${i}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ p: { xs: 4, md: 6 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: 'white', mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  {project.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                    <EventIcon fontSize="small" />
                    <Typography variant="caption">{project.year}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="caption">{project.duration}</Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 4 }}>
                  {project.description}
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>Key Features</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {project.features.map((feature, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleOutlineIcon sx={{ color: 'primary.light', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{feature}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 6 }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>Tech Stack</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {project.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      sx={{
                        bgcolor: 'rgba(99, 102, 241, 0.1)',
                        color: 'primary.light',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
                {project.githubUrl && (
                  <Button
                    variant="outlined"
                    fullWidth
                    href={project.githubUrl}
                    target="_blank"
                    sx={{
                      borderRadius: '12px',
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 700,
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.05)' },
                    }}
                  >
                    GitHub
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    variant="contained"
                    fullWidth
                    href={project.liveUrl}
                    target="_blank"
                    sx={{
                      borderRadius: '12px',
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                      boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5 0%, #db2777 100%)',
                        boxShadow: '0 12px 28px rgba(99, 102, 241, 0.5)',
                      },
                    }}
                  >
                    Live Demo
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Enhanced Screenshots Grid */}
          <Grid item xs={12}>
            <Box sx={{ p: { xs: 4, md: 6 }, pt: 0, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 800, mt: 4, mb: 4 }}>
                All Screenshots
              </Typography>
              <Grid container spacing={3}>
                {project.images.map((img, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Box
                      onClick={() => setActiveImage(i)}
                      sx={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        bgcolor: 'rgba(0,0,0,0.2)',
                        minHeight: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1,
                        '&:hover': {
                          transform: 'scale(1.02)',
                          borderColor: 'primary.main',
                          boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
                        }
                      }}
                    >
                      <img src={img} alt={`Screenshot ${i + 1}`} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '12px' }} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
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

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Box
      id="work"
      sx={{
        py: { xs: 12, md: 20 },
        background: '#0f172a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
        }}
      />
      {/* Giant watermark */}
      <Typography
        aria-hidden
        sx={{
          position: 'absolute',
          top: { xs: '8%', md: '4%' },
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: { xs: '6rem', md: '11rem' },
          fontWeight: 900,
          letterSpacing: 4,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          whiteSpace: 'nowrap',
          zIndex: 0,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        SELECTED WORK
      </Typography>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box ref={headerRef} sx={{ mb: { xs: 6, md: 4 }, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: 'primary.light',
                fontWeight: 800,
                letterSpacing: 4,
                mb: 2,
                display: 'block',
              }}
            >
              PORTFOLIO / ( {String(projects.length).padStart(2, '0')} PROJECTS )
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: 'white',
                fontSize: { xs: '3rem', md: '4.5rem' },
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              Featured <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Projects</span>
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', fontSize: '1.1rem' }}>
              A collection of selected works focusing on performance, user experience, and modern web technologies.
            </Typography>
          </motion.div>
        </Box>

        {/* Rows with a scroll-linked spine down the center */}
        <Box ref={rowsRef} sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '2px',
              background: 'rgba(255,255,255,0.06)',
              transform: 'translateX(-50%)',
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: 0,
              left: '50%',
              width: '2px',
              height: '100%',
              zIndex: 0,
            }}
          >
            <motion.div
              style={{
                width: '2px',
                height: '100%',
                background: 'linear-gradient(180deg, #6366f1 0%, #ec4899 100%)',
                transform: 'translateX(-50%)',
                transformOrigin: 'top',
                scaleY: scrollYProgress,
              }}
            />
          </Box>

          {projects.map((project, index) => (
            <ShowcaseRow key={project.id} project={project} index={index} onOpen={handleOpen} />
          ))}
        </Box>

        <Box sx={{ mt: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <Button
            href="https://github.com/Selva-AK"
            target="_blank"
            endIcon={<ArrowForwardIosIcon sx={{ fontSize: '0.8rem !important' }} />}
            sx={{
              color: 'white',
              fontWeight: 700,
              fontSize: '1rem',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)', color: 'primary.light' },
              transition: 'all 0.3s ease',
            }}
          >
            View More on GitHub
          </Button>
        </Box>
      </Container>

      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onClose={handleClose}
      />
    </Box>
  );
};

export default Projects;
