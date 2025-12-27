import { Box, Container, Typography, Button, IconButton, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { personalInfo } from '../utils/data';
import { fadeIn, slideUp, slideLeft, slideRight } from '../utils/animations';
import profileImage from '../assets/images/1690812853497.png?url';

const Hero = () => {
  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 10, md: 0 },
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-30px)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            alignItems: 'center',
          }}
        >
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Stack spacing={3}>
              <motion.div variants={slideUp}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  Hi,
                  <br />
                  I'm{' '}
                  <Box
                    component="span"
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {personalInfo.name}
                  </Box>
                  <br />
                  <Typography
                    component="span"
                    variant="h2"
                    sx={{
                      color: 'primary.light',
                      fontFamily: 'monospace',
                    }}
                  >
                    {personalInfo.title}
                  </Typography>
                </Typography>
              </motion.div>

              <motion.div variants={slideUp}>
                <Button
                  variant="contained"
                  size="large"
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4f46e5 0%, #db2777 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 32px rgba(99, 102, 241, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  View Resume
                </Button>
              </motion.div>

              <motion.div variants={slideUp}>
                <Stack direction="row" spacing={2}>
                  <IconButton
                    component="a"
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    sx={{
                      color: 'primary.main',
                      bgcolor: 'rgba(99, 102, 241, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(99, 102, 241, 0.2)',
                        transform: 'translateY(-4px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href={`mailto:${personalInfo.email}`}
                    sx={{
                      color: 'secondary.main',
                      bgcolor: 'rgba(236, 72, 153, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(236, 72, 153, 0.2)',
                        transform: 'translateY(-4px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <EmailIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href={personalInfo.social.github}
                    target="_blank"
                    sx={{
                      color: 'text.primary',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-4px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>
                </Stack>
              </motion.div>
            </Stack>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideLeft}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: '280px', sm: '350px', md: '400px' },
                  height: { xs: '280px', sm: '350px', md: '400px' },
                  borderRadius: '50%',
                  padding: '8px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                }}
              >
                {/* Profile Image */}
                <Box
                  component="img"
                  src={profileImage}
                  alt="Selva"
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
