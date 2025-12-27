import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Modal,
  IconButton,
  Chip,
  Fade,
  Backdrop,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { awards } from '../utils/data';
import { slideUp, staggerContainer, staggerItem } from '../utils/animations';

const Awards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <Box
      id="awards"
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #0a0e1a 0%, #0f172a 50%, #1a1f35 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 60%)
          `,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.light',
                letterSpacing: 3,
                fontWeight: 600,
                fontSize: '0.875rem',
                mb: 2,
                display: 'block',
              }}
            >
              ACHIEVEMENTS
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: 'gradient 3s ease infinite',
                '@keyframes gradient': {
                  '0%, 100%': { backgroundPosition: '0% center' },
                  '50%': { backgroundPosition: '100% center' },
                },
                mb: 1,
              }}
            >
              Awards & Recognition
            </Typography>
            <Box
              sx={{
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, #6366f1, #ec4899)',
                margin: '0 auto',
                borderRadius: '2px',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)',
              }}
            />
          </Box>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <Grid container spacing={4} justifyContent="center">
            {awards.map((award, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  variants={staggerItem}
                  whileHover={{ y: -12, rotateY: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Card
                    onClick={() => handleImageClick(award.image)}
                    sx={{
                      cursor: 'pointer',
                      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid',
                      borderColor: 'rgba(99, 102, 241, 0.2)',
                      borderRadius: '20px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                        zIndex: 1,
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '-2px',
                        left: '-2px',
                        right: '-2px',
                        bottom: '-2px',
                        background: 'linear-gradient(45deg, #6366f1, #a855f7, #ec4899, #6366f1)',
                        backgroundSize: '300% 300%',
                        borderRadius: '20px',
                        zIndex: -1,
                        opacity: 0,
                        animation: 'borderGlow 3s ease infinite',
                        '@keyframes borderGlow': {
                          '0%, 100%': { backgroundPosition: '0% 50%' },
                          '50%': { backgroundPosition: '100% 50%' },
                        },
                      },
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.03)',
                        boxShadow: `
                          0 25px 70px rgba(99, 102, 241, 0.4),
                          0 0 0 1px rgba(99, 102, 241, 0.5),
                          inset 0 1px 0 rgba(255, 255, 255, 0.1)
                        `,
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                        '&::before': {
                          opacity: 1,
                        },
                        '&::after': {
                          opacity: 1,
                        },
                        '& .award-image': {
                          transform: 'scale(1.1)',
                        },
                        '& .zoom-icon': {
                          opacity: 1,
                        },
                      },
                    }}
                  >
                    {/* Trophy Badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.3))',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid rgba(255, 215, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4)',
                        zIndex: 2,
                        animation: 'float 3s ease-in-out infinite',
                        '@keyframes float': {
                          '0%, 100%': { transform: 'translateY(0px)' },
                          '50%': { transform: 'translateY(-8px)' },
                        },
                      }}
                    >
                      <EmojiEventsIcon sx={{ color: '#ffd700', fontSize: '1.5rem' }} />
                    </Box>

                    {/* Image Container */}
                    <Box
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        height: 250,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={award.image}
                        alt={award.title}
                        className="award-image"
                        sx={{
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                        }}
                      />

                      {/* Zoom Icon Overlay */}
                      <Box
                        className="zoom-icon"
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          background: 'rgba(99, 102, 241, 0.9)',
                          backdropFilter: 'blur(10px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.6)',
                        }}
                      >
                        <ZoomInIcon sx={{ color: '#fff', fontSize: '2rem' }} />
                      </Box>

                      {/* Gradient Overlay */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '50%',
                          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 100%)',
                          pointerEvents: 'none',
                        }}
                      />
                    </Box>

                    <CardContent sx={{ position: 'relative', zIndex: 2, flexGrow: 1, p: 3 }}>
                      <Typography
                        variant="h6"
                        align="center"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1rem',
                          background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          lineHeight: 1.4,
                          mb: 1,
                        }}
                      >
                        {award.title}
                      </Typography>

                      {award.year && (
                        <Chip
                          label={award.year}
                          size="small"
                          sx={{
                            background: 'rgba(99, 102, 241, 0.15)',
                            border: '1px solid rgba(99, 102, 241, 0.3)',
                            color: '#a5b4fc',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            height: '24px',
                            mt: 1,
                          }}
                        />
                      )}
                    </CardContent>

                    {/* Bottom Accent */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent, #6366f1, #ec4899, transparent)',
                        opacity: 0.5,
                      }}
                    />
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Enhanced Modal for full-size image */}
        <Modal
          open={!!selectedImage}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
              sx: {
                backdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(10, 14, 26, 0.9)',
              },
            },
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Fade in={!!selectedImage}>
            <Box
              sx={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                outline: 'none',
              }}
            >
              <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  top: -60,
                  right: 0,
                  color: 'white',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(236, 72, 153, 0.8))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(99, 102, 241, 0.5)',
                  boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 1), rgba(236, 72, 153, 1))',
                    transform: 'scale(1.1) rotate(90deg)',
                    boxShadow: '0 6px 30px rgba(99, 102, 241, 0.6)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CloseIcon />
              </IconButton>
              {selectedImage && (
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '2px solid',
                    borderColor: 'rgba(99, 102, 241, 0.5)',
                    boxShadow: `
                      0 25px 80px rgba(0, 0, 0, 0.8),
                      0 0 0 1px rgba(99, 102, 241, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1)
                    `,
                  }}
                >
                  <img
                    src={selectedImage}
                    alt="Award certificate"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '90vh',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </Box>
              )}
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Box>
  );
};

export default Awards;
