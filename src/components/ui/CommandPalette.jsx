import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search,
  Home,
  User,
  Cpu,
  Briefcase,
  FolderGit2,
  Award,
  Mail,
  FileText,
  Sun,
  Moon,
  X,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import { personalInfo } from '../../utils/data';
import { useTheme } from '../../theme/useTheme';
import { GithubIcon, LinkedinIcon } from './icons';

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isDark, toggleTheme } = useTheme();

  const commands = [
    {
      id: 'home',
      label: 'Go to Home',
      category: 'Navigation',
      icon: Home,
      action: () => scrollToSection('#home'),
    },
    {
      id: 'about',
      label: 'Go to About',
      category: 'Navigation',
      icon: User,
      action: () => scrollToSection('#about'),
    },
    {
      id: 'skills',
      label: 'Go to Skills',
      category: 'Navigation',
      icon: Cpu,
      action: () => scrollToSection('#skills'),
    },
    {
      id: 'experience',
      label: 'Go to Experience',
      category: 'Navigation',
      icon: Briefcase,
      action: () => scrollToSection('#experience'),
    },
    {
      id: 'work',
      label: 'Go to Projects',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => scrollToSection('#work'),
    },
    {
      id: 'achievements',
      label: 'Go to Achievements',
      category: 'Navigation',
      icon: Award,
      action: () => scrollToSection('#achievements'),
    },
    {
      id: 'contact',
      label: 'Go to Contact',
      category: 'Navigation',
      icon: Mail,
      action: () => scrollToSection('#contact'),
    },
    {
      id: 'resume',
      label: 'View / Download Resume',
      category: 'Actions',
      icon: FileText,
      action: () => window.open(personalInfo.resumeUrl, '_blank'),
    },
    {
      id: 'theme',
      label: isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      category: 'Actions',
      icon: isDark ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'github',
      label: 'Visit GitHub Profile',
      category: 'Socials',
      icon: GithubIcon,
      action: () => window.open(personalInfo.social.github, '_blank'),
    },
    {
      id: 'linkedin',
      label: 'Visit LinkedIn Profile',
      category: 'Socials',
      icon: LinkedinIcon,
      action: () => window.open(personalInfo.social.linkedin, '_blank'),
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const scrollToSection = (href) => {
    onClose();
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-surface/95 p-0 shadow-2xl backdrop-blur-xl dark:bg-[#12151e]/95"
          >
            {/* Search Bar Input */}
            <div className="flex items-center border-b border-border px-4 py-3.5">
              <Search className="mr-3 h-5 w-5 text-accent" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or section..."
                autoFocus
                className="w-full bg-transparent text-base font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No matching command found.
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      type="button"
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-all ${
                        isSelected
                          ? 'bg-accent/15 text-accent font-semibold dark:bg-accent/20'
                          : 'text-foreground hover:bg-surface-hover'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                            isSelected
                              ? 'bg-accent text-white'
                              : 'bg-surface-hover text-muted-foreground'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <span>{cmd.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground opacity-60">
                          {cmd.category}
                        </span>
                        {isSelected && <ArrowRight className="h-4 w-4 text-accent" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Legend */}
            <div className="flex items-center justify-between border-t border-border bg-surface-hover/50 px-4 py-2 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono">↑↓</kbd>{' '}
                  Navigate
                </span>
                <span>
                  <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono">↵</kbd>{' '}
                  Select
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Terminal className="h-3 w-3 text-accent" />
                <span className="font-mono text-[10px]">Selva OS v2.5</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
