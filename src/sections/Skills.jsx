import { Box, Container, Typography, Grid, Card } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { skills } from '../utils/data';
import { slideUp, staggerContainer } from '../utils/animations';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Circular progress component with animation
  const CircularProgress = ({ percentage, color }) => {
    const [displayPercentage, setDisplayPercentage] = useState(0);
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (displayPercentage / 100) * circumference;

    useEffect(() => {
      if (isInView) {
        // Animate from 0 to target percentage
        let startTime = null;
        const duration = 1500; // 1.5 seconds

        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function for smooth animation
          const easeOutCubic = 1 - Math.pow(1 - progress, 3);
          const currentPercentage = Math.floor(easeOutCubic * percentage);

          setDisplayPercentage(currentPercentage);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setDisplayPercentage(percentage); // Ensure final value is exact
          }
        };

        requestAnimationFrame(animate);
      }
    }, [isInView, percentage]);

    return (
      <Box sx={{ position: 'relative', width: 120, height: 120 }}>
        <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="rgba(30, 41, 59, 0.5)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.3s ease-out',
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
          />
        </svg>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '1.75rem',
              fontWeight: 800,
              background: `linear-gradient(135deg, ${color}, ${color}99)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {displayPercentage}%
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      id="skills"
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating particles */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'float 10s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(40px, -40px) scale(1.1)' },
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
          style={{ width: '100%' }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'transparent',
                background: 'linear-gradient(90deg, #6366f1, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                letterSpacing: 4,
                mb: 2,
                display: 'block',
                fontSize: '0.875rem',
              }}
            >
              ⚡ TECH STACK
            </Typography>

            <Typography
              variant="h2"
              sx={{
                mb: 3,
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '4rem' },
                background: 'linear-gradient(135deg, #f1f5f9 0%, #64748b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
              }}
            >
              Skills & Expertise
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                fontSize: '1.125rem',
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Crafting digital experiences with modern technologies
            </Typography>
          </Box>
        </motion.div>

        {/* Skills Grid */}
        <Grid container spacing={4} justifyContent="center">
          {skills.map((category, categoryIndex) => (
            <Grid item xs={12} key={categoryIndex}>
              <motion.div
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={staggerContainer}
              >
                {/* Category Title */}
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '12px',
                      background: categoryIndex % 2 === 0
                        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(99, 102, 241, 0.05))'
                        : 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(236, 72, 153, 0.05))',
                      border: '2px solid',
                      borderColor: categoryIndex % 2 === 0 ? 'rgba(99, 102, 241, 0.3)' : 'rgba(236, 72, 153, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                    }}
                  >
                    {categoryIndex === 0 ? '💻' : categoryIndex === 1 ? '🎨' : categoryIndex === 2 ? '🛠️' : '📊'}
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      background: categoryIndex % 2 === 0
                        ? 'linear-gradient(90deg, #6366f1, #a5b4fc)'
                        : 'linear-gradient(90deg, #ec4899, #fbcfe8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {category.category}
                  </Typography>
                </Box>

                {/* Skills Cards Grid */}
                <Grid container spacing={3} justifyContent="center">
                  {category.items.map((skill, skillIndex) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={skillIndex}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: skillIndex * 0.1 }}
                      >
                        <Card
                          sx={{
                            background: 'rgba(15, 23, 42, 0.6)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '20px',
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: categoryIndex % 2 === 0
                                ? 'radial-gradient(circle at top left, rgba(99, 102, 241, 0.1), transparent 60%)'
                                : 'radial-gradient(circle at top left, rgba(236, 72, 153, 0.1), transparent 60%)',
                              opacity: 0,
                              transition: 'opacity 0.4s ease',
                            },
                            '&:hover': {
                              transform: 'translateY(-8px)',
                              border: categoryIndex % 2 === 0
                                ? '1px solid rgba(99, 102, 241, 0.3)'
                                : '1px solid rgba(236, 72, 153, 0.3)',
                              boxShadow: categoryIndex % 2 === 0
                                ? '0 20px 40px rgba(99, 102, 241, 0.2)'
                                : '0 20px 40px rgba(236, 72, 153, 0.2)',
                              '&::before': {
                                opacity: 1,
                              },
                            },
                          }}
                        >
                          {/* Circular Progress */}
                          <CircularProgress
                            percentage={skill.percentage}
                            color={categoryIndex % 2 === 0 ? '#6366f1' : '#ec4899'}
                          />

                          {/* Skill Name */}
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: '#e2e8f0',
                              fontSize: '1.125rem',
                              textAlign: 'center',
                              letterSpacing: 0.5,
                            }}
                          >
                            {skill.name}
                          </Typography>

                          {/* Skill Level Indicator */}
                          <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Box
                                key={i}
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  background: i < Math.ceil(skill.percentage / 20)
                                    ? categoryIndex % 2 === 0
                                      ? 'linear-gradient(135deg, #6366f1, #a5b4fc)'
                                      : 'linear-gradient(135deg, #ec4899, #fbcfe8)'
                                    : 'rgba(30, 41, 59, 0.5)',
                                  boxShadow: i < Math.ceil(skill.percentage / 20)
                                    ? categoryIndex % 2 === 0
                                      ? '0 0 8px rgba(99, 102, 241, 0.6)'
                                      : '0 0 8px rgba(236, 72, 153, 0.6)'
                                    : 'none',
                                  transition: 'all 0.3s ease',
                                }}
                              />
                            ))}
                          </Box>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;