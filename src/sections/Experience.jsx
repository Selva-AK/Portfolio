import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import { experience } from '../utils/data';
import { slideUp, staggerContainer, staggerItem } from '../utils/animations';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Box
      id="experience"
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
            radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)
          `,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '2px',
          height: '100%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.3) 20%, rgba(236, 72, 153, 0.3) 80%, transparent 100%)',
          transform: 'translateX(-50%)',
          display: { xs: 'none', md: 'block' },
        },
      }}
    >
      <Container maxWidth="lg">
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
              MY JOURNEY
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
              Experience & Education
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
          <Timeline position="alternate">
            {experience.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{
                    m: 'auto 0',
                    display: { xs: 'none', md: 'block' },
                    px: 3,
                  }}
                  align={index % 2 === 0 ? 'right' : 'left'}
                >
                  <motion.div variants={staggerItem}>
                    <Chip
                      label={item.date}
                      sx={{
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        px: 1,
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </motion.div>
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineConnector
                    sx={{
                      background: 'linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.6) 50%, rgba(236, 72, 153, 0.6) 100%)',
                      width: '3px',
                      boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
                    }}
                  />
                  <TimelineDot
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                      boxShadow: `
                        0 0 0 4px rgba(15, 23, 42, 0.8),
                        0 0 0 8px rgba(99, 102, 241, 0.2),
                        0 0 30px rgba(99, 102, 241, 0.6),
                        0 0 50px rgba(236, 72, 153, 0.4)
                      `,
                      p: 1.5,
                      border: 'none',
                      animation: 'pulse 2s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%, 100%': {
                          boxShadow: `
                            0 0 0 4px rgba(15, 23, 42, 0.8),
                            0 0 0 8px rgba(99, 102, 241, 0.2),
                            0 0 30px rgba(99, 102, 241, 0.6),
                            0 0 50px rgba(236, 72, 153, 0.4)
                          `,
                        },
                        '50%': {
                          boxShadow: `
                            0 0 0 4px rgba(15, 23, 42, 0.8),
                            0 0 0 12px rgba(99, 102, 241, 0.3),
                            0 0 40px rgba(99, 102, 241, 0.8),
                            0 0 60px rgba(236, 72, 153, 0.6)
                          `,
                        },
                      },
                    }}
                  >
                    {item.type === 'work' ? <WorkIcon /> : <SchoolIcon />}
                  </TimelineDot>
                  <TimelineConnector
                    sx={{
                      background: 'linear-gradient(180deg, rgba(236, 72, 153, 0.6) 0%, rgba(99, 102, 241, 0.6) 50%, transparent 100%)',
                      width: '3px',
                      boxShadow: '0 0 10px rgba(236, 72, 153, 0.5)',
                    }}
                  />
                </TimelineSeparator>

                <TimelineContent sx={{ py: '12px', px: { xs: 2, md: 3 } }}>
                  <motion.div
                    variants={staggerItem}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Card
                      sx={{
                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid',
                        borderColor: 'rgba(99, 102, 241, 0.3)',
                        borderRadius: '16px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
                          opacity: 0,
                          transition: 'opacity 0.4s ease',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent)',
                          transition: 'left 0.6s ease',
                        },
                        '&:hover': {
                          transform: 'translateY(-8px) rotateX(2deg)',
                          boxShadow: `
                            0 20px 60px rgba(99, 102, 241, 0.3),
                            0 0 0 1px rgba(99, 102, 241, 0.5),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1)
                          `,
                          borderColor: 'rgba(99, 102, 241, 0.6)',
                          '&::before': {
                            opacity: 1,
                          },
                          '&::after': {
                            left: '100%',
                          },
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box
                            sx={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '12px',
                              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 4px 16px rgba(99, 102, 241, 0.4)',
                            }}
                          >
                            {item.type === 'work' ? (
                              <WorkIcon sx={{ color: '#fff', fontSize: '1.5rem' }} />
                            ) : (
                              <SchoolIcon sx={{ color: '#fff', fontSize: '1.5rem' }} />
                            )}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                fontSize: '1.25rem',
                                background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 0.5,
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'rgba(168, 85, 247, 0.9)',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                              }}
                            >
                              {item.role}
                            </Typography>
                          </Box>
                        </Box>

                        <Chip
                          label={item.date}
                          size="small"
                          sx={{
                            display: { xs: 'inline-flex', md: 'none' },
                            background: 'rgba(99, 102, 241, 0.15)',
                            border: '1px solid rgba(99, 102, 241, 0.3)',
                            color: '#a5b4fc',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            mt: 1,
                          }}
                        />

                        <Box
                          sx={{
                            mt: 2,
                            pt: 2,
                            borderTop: '1px solid rgba(99, 102, 241, 0.1)',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(226, 232, 240, 0.7)',
                              lineHeight: 1.6,
                            }}
                          >
                            {item.description || 'Contributed to innovative projects and gained valuable experience in the field.'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Experience;
