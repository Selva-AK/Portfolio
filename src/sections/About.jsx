import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { personalInfo } from '../utils/data';
import { slideUp, slideRight } from '../utils/animations';
import aboutImage from '../assets/images/about.jpg?url';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4 } }
  };

  return (
    <Box
      id="about"
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '20%',
          right: '0%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '20%',
          left: '0%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
        },
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 8,
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              display: 'inline-block',
              width: '100%',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '5px',
                background: 'linear-gradient(90deg, #6366f1, #ec4899)',
                borderRadius: 10,
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
              },
            }}
          >
            About
          </Typography>
        </motion.div>

        <Box
          alignItems="center"
          flexDirection={"row"}
          flexWrap={"wrap"}
          sx={{
            display: 'flex',
            gap: { xs: 6, md: 8 },
            position: 'relative',
            zIndex: 1,
          }}
        >
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideRight}
            style={{
              flex: '0 0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -3,
                  left: -3,
                  right: -3,
                  bottom: -3,
                  background: 'linear-gradient(135deg, #6366f1, #ec4899, #f59e0b, #6366f1)',
                  backgroundSize: '400% 400%',
                  animation: 'gradientRotate 8s ease infinite',
                  borderRadius: 4,
                  zIndex: -1,
                },
                '@keyframes gradientRotate': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' },
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: '#1e293b',
                  p: 0.8,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(236, 72, 153, 0.25) 100%)',
                      zIndex: 1,
                      opacity: 0.7,
                      mixBlendMode: 'overlay',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={aboutImage}
                    alt="About Selva"
                    sx={{
                      width: '100%',
                      maxWidth: '100%',
                      height: { xs: '400px', sm: '500px', md: '550px' },
                      display: 'block',
                      objectFit: 'cover',
                      filter: 'grayscale(15%) contrast(1.1) brightness(0.95)',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideUp}
            style={{ flex: 1, minWidth: '300px' }}
          >
            <Box sx={{ pl: { xs: 0, md: 4 } }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'transparent',
                  background: 'linear-gradient(90deg, #6366f1, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                  letterSpacing: 3,
                  mb: 2,
                  display: 'inline-block',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                }}
              >
                ✦ Get to know me
              </Typography>

              {/* <Typography
                variant="h3"
                sx={{
                  mb: 4,
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  background: 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2,
                }}
              >
                I am {personalInfo.name}
              </Typography> */}

              <Box
                sx={{
                  position: 'relative',
                  mb: 4,
                  pl: 4,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '5px',
                    height: '85%',
                    background: 'linear-gradient(180deg, #6366f1, #ec4899)',
                    borderRadius: 10,
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: '#cbd5e1',
                    lineHeight: 2,
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    letterSpacing: 0.3,
                  }}
                >
                  {personalInfo.bio}
                </Typography>
              </Box>

              <motion.div
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={badgeVariants}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 3,
                    flexWrap: 'wrap',
                  }}
                >
                  <Box
                    sx={{
                      px: 4,
                      py: 2,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.05) 100%)',
                      border: '2px solid rgba(99, 102, 241, 0.3)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'default',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 40px rgba(99, 102, 241, 0.35)',
                        border: '2px solid rgba(99, 102, 241, 0.6)',
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.08) 100%)',
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#a5b4fc',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      <span style={{ fontSize: '1.25rem' }}>📍</span>
                      {personalInfo.location}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      px: 4,
                      py: 2,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(236, 72, 153, 0.05) 100%)',
                      border: '2px solid rgba(236, 72, 153, 0.3)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'default',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 40px rgba(236, 72, 153, 0.35)',
                        border: '2px solid rgba(236, 72, 153, 0.6)',
                        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.08) 100%)',
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#fbcfe8',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      <span style={{ fontSize: '1.25rem' }}>🎓</span>
                      BCA Graduate
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box >
  );
};

export default About;
