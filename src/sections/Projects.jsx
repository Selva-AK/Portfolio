import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { projects } from '../utils/data';

const ProjectCard = ({ project, onOpen }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Box
        onClick={() => onOpen(project)}
        sx={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          cursor: 'pointer',
          background: 'rgba(30, 41, 59, 0.4)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-10px)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.2)',
            '& .project-image': {
              transform: 'scale(1.1)',
            },
            '& .overlay': {
              opacity: 1,
            },
          },
        }}
      >
        <Box sx={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
          <Box
            component="img"
            src={project.thumbnail}
            alt={project.name}
            className="project-image"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          <Box
            className="overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)',
              opacity: 0.6,
              transition: 'opacity 0.4s ease',
              display: 'flex',
              alignItems: 'flex-end',
              p: 3,
            }}
          >
            <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              View Details
            </Typography>
          </Box>
          <Chip
            label={project.status}
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: 'rgba(99, 102, 241, 0.9)',
              color: 'white',
              fontWeight: 600,
              backdropFilter: 'blur(4px)',
            }}
          />
        </Box>

        <Box sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: 'white' }}>
            {project.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineClamp: 2, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
            {project.shortDescription}
          </Typography>

          <Box sx={{ mt: 'auto', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {project.technologies.slice(0, 3).map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.7rem',
                }}
              />
            ))}
            {project.technologies.length > 3 && (
              <Typography variant="caption" sx={{ alignSelf: 'center', color: 'text.disabled', ml: 0.5 }}>
                +{project.technologies.length - 3}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
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
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

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

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
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
              PORTFOLIO
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

        <Grid container spacing={4} ref={containerRef}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard project={project} onOpen={handleOpen} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 10, textAlign: 'center' }}>
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
