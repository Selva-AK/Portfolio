import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, skills, experience, projects } from '../../utils/data';
import { cn } from '../../utils/cn';

const PROMPT = 'guest@portfolio';

const commands = {
  help: () => [
    'Available commands:',
    '  about      ->  who I am',
    '  skills       ->  tech I work with',
    '  experience   ->  where I’ve worked',
    '  projects     ->  things I’ve built',
    '  contact      ->  how to reach me',
    '  resume       ->  open my resume',
    '  clear        ->  clear the terminal',
  ],
  about: () => [personalInfo.bio],
  skills: () =>
    skills.flatMap((category) => [
      `${category.category.replace(/[<>/]/g, '').trim()}:`,
      ...category.items.map((item) => `  ${item.name} — ${item.percentage}%`),
    ]),
  experience: () => experience.map((item) => `${item.date}  ${item.title} — ${item.role}`),
  projects: () => projects.map((project) => `${project.name} — ${project.shortDescription}`),
  contact: () => [`Email: ${personalInfo.email}`, `LinkedIn: ${personalInfo.social.linkedin}`],
  resume: () => {
    window.open(personalInfo.resumeUrl, '_blank', 'noopener');
    return ['Opening resume in a new tab...'];
  },
  whoami: () => [personalInfo.name],
  'sudo make coffee': () => ['Sorry, I’m a developer, not a barista. ☕'],
};

const WELCOME = [`Welcome. Type "help" to see what I can do.`];

const InteractiveTerminal = ({ className }) => {
  const [history, setHistory] = useState(() => WELCOME.map((text) => ({ type: 'output', text })));
  const [value, setValue] = useState('');
  const [pastCommands, setPastCommands] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    const handler = commands[trimmed.toLowerCase()];
    const output = handler ? handler() : [`command not found: ${trimmed}`, 'Type "help" for a list of commands.'];

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: trimmed },
      ...output.map((text) => ({ type: 'output', text })),
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(value);
      setPastCommands((prev) => [...prev, value].filter(Boolean));
      setHistoryIndex(-1);
      setValue('');
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!pastCommands.length) return;
      const nextIndex = historyIndex === -1 ? pastCommands.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setValue(pastCommands[nextIndex]);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= pastCommands.length) {
        setHistoryIndex(-1);
        setValue('');
      } else {
        setHistoryIndex(nextIndex);
        setValue(pastCommands[nextIndex]);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      onClick={() => inputRef.current?.focus()}
      className={cn(
        'w-full max-w-xl overflow-hidden rounded-xl border border-border bg-surface/95 shadow-xl backdrop-blur-sm',
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-2 font-mono text-[0.65rem] text-muted-foreground">{PROMPT}:~</span>
      </div>

      <div
        ref={scrollRef}
        aria-live="polite"
        className="max-h-64 cursor-text overflow-y-auto p-4 font-mono text-xs leading-relaxed"
      >
        {history.map((line, i) => (
          <div key={i} className={line.type === 'input' ? 'text-foreground' : 'text-muted-foreground'}>
            {line.type === 'input' ? (
              <>
                <span className="text-accent">{PROMPT}</span>
                <span className="text-muted-foreground">:~$ </span>
                {line.text}
              </>
            ) : (
              line.text
            )}
          </div>
        ))}

        <div className="flex items-center">
          <span className="text-accent">{PROMPT}</span>
          <span className="text-muted-foreground">:~$&nbsp;</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-foreground outline-none"
          />
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            className="h-3.5 w-[2px] shrink-0 bg-accent"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;
