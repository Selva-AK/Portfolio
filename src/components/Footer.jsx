import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { personalInfo } from '../utils/data';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderTop: '1px solid rgba(99, 102, 241, 0.2)',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center">
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {personalInfo.name}
          </Typography>

          <Stack direction="row" spacing={2}>
            <IconButton
              component="a"
              href={personalInfo.social.facebook}
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
              <FacebookIcon />
            </IconButton>
            <IconButton
              component="a"
              href={personalInfo.social.instagram}
              target="_blank"
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
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href={personalInfo.social.linkedin}
              target="_blank"
              sx={{
                color: '#0077b5',
                bgcolor: 'rgba(0, 119, 181, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(0, 119, 181, 0.2)',
                  transform: 'translateY(-4px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            © {personalInfo.name}. All rights reserved
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
