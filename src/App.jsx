import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './theme/ThemeContext';
import Navbar from './components/layout/Navbar';
import ScrollToTop from './components/layout/ScrollToTop';
import BootScreen from './components/ui/BootScreen';
import CustomCursor from './components/ui/CustomCursor';
import BackgroundGlow from './components/ui/BackgroundGlow';
import CommandPalette from './components/ui/CommandPalette';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Footer from './components/layout/Footer';

const VISITED_KEY = 'portfolio-visited';

function App() {
  const [booting, setBooting] = useState(
    () => typeof window !== 'undefined' && !window.localStorage.getItem(VISITED_KEY)
  );
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const handleBootComplete = () => {
    window.localStorage.setItem(VISITED_KEY, '1');
    setBooting(false);
  };

  return (
    <ThemeProvider>
      <CustomCursor />
      <BackgroundGlow />
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
      <AnimatePresence>
        {booting && <BootScreen onComplete={handleBootComplete} />}
      </AnimatePresence>
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  );
}

export default App;

