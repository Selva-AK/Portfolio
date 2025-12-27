import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import theme from './theme/theme';
import GlobalStyles from './theme/GlobalStyles.jsx';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Awards from './sections/Awards';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import SplashCursor from './components/SplashCursor'

function App() {
  return (
    <ThemeProvider theme={theme}>

      <SplashCursor />
      <CssBaseline />
      <GlobalStyles />
      <Box sx={{ position: 'relative' }}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Awards />
        <Contact />
        <Footer />
        <ScrollToTop />
      </Box>
    </ThemeProvider>
  );
}

export default App;
