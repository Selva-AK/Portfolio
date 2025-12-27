import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import { slideUp } from '../utils/animations';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit to Formspree API
      const response = await fetch('https://formspree.io/f/xqazjgvo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Message sent successfully! I will get back to you soon.',
          severity: 'success',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      id="contact"
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #1a1f35 0%, #0f172a 50%, #0a0e1a 100%)',
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
            radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 60%)
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
            radial-gradient(circle, rgba(99, 102, 241, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
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
              GET IN TOUCH
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
              Contact Me
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
            <Typography
              variant="body1"
              sx={{
                mt: 3,
                color: 'rgba(226, 232, 240, 0.7)',
                fontSize: '1.1rem',
                maxWidth: '600px',
                margin: '24px auto 0',
              }}
            >
              Have a question or want to work together? Drop me a message!
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: 'rgba(99, 102, 241, 0.3)',
              borderRadius: '24px',
              p: { xs: 3, md: 5 },
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
                opacity: 0.8,
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
                borderRadius: '24px',
                zIndex: -1,
                opacity: 0,
                animation: 'borderGlow 3s ease infinite',
                '@keyframes borderGlow': {
                  '0%, 100%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                },
              },
              '&:hover::after': {
                opacity: 0.3,
              },
              transition: 'all 0.4s ease',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ position: 'relative', width: '100%' }}>
                <PersonIcon
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(99, 102, 241, 0.6)',
                    zIndex: 1,
                  }}
                />
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      pl: 6,
                      background: 'rgba(15, 23, 42, 0.5)',
                      borderRadius: '12px',
                      '& fieldset': {
                        borderColor: 'rgba(99, 102, 241, 0.3)',
                        borderWidth: '2px',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#6366f1',
                        boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(226, 232, 240, 0.7)',
                      pl: 5,
                      '&.Mui-focused': {
                        color: '#a5b4fc',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#fff',
                    },
                  }}
                />
              </Box>

              <Box sx={{ position: 'relative', width: '100%' }}>
                <EmailIcon
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(99, 102, 241, 0.6)',
                    zIndex: 1,
                  }}
                />
                <TextField
                  fullWidth
                  label="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      pl: 6,
                      background: 'rgba(15, 23, 42, 0.5)',
                      borderRadius: '12px',
                      '& fieldset': {
                        borderColor: 'rgba(99, 102, 241, 0.3)',
                        borderWidth: '2px',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#6366f1',
                        boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(226, 232, 240, 0.7)',
                      pl: 5,
                      '&.Mui-focused': {
                        color: '#a5b4fc',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#fff',
                    },
                  }}
                />
              </Box>

              <Box sx={{ position: 'relative', width: '100%' }}>
                <MessageIcon
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: 24,
                    color: 'rgba(99, 102, 241, 0.6)',
                    zIndex: 1,
                  }}
                />
                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={6}
                  variant="outlined"
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      pl: 6,
                      background: 'rgba(15, 23, 42, 0.5)',
                      borderRadius: '12px',
                      '& fieldset': {
                        borderColor: 'rgba(99, 102, 241, 0.3)',
                        borderWidth: '2px',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#6366f1',
                        boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(226, 232, 240, 0.7)',
                      pl: 5,
                      '&.Mui-focused': {
                        color: '#a5b4fc',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#fff',
                    },
                  }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                  color: 'white',
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    transition: 'left 0.6s ease',
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 50%, #db2777 100%)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 40px rgba(99, 102, 241, 0.6)',
                    '&::before': {
                      left: '100%',
                    },
                  },
                  '&:disabled': {
                    background: 'rgba(99, 102, 241, 0.3)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            background: snackbar.severity === 'success'
              ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.9))'
              : 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9))',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: snackbar.severity === 'success'
              ? 'rgba(34, 197, 94, 0.5)'
              : 'rgba(239, 68, 68, 0.5)',
            color: '#fff',
            fontWeight: 600,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            '& .MuiAlert-icon': {
              color: '#fff',
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box >
  );
};

export default Contact;
