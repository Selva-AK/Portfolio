import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Loader2, Mail, MessageSquare, Send, User, Sparkles, MapPin, Clock } from 'lucide-react';
import { personalInfo } from '../utils/data';
import { slideUp } from '../utils/animations';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import Toast from '../components/ui/Toast';
import FloatingCodeCard from '../components/ui/FloatingCodeCard';
import MagneticWrap from '../components/ui/MagneticWrap';
import ConfettiBurst from '../components/ui/ConfettiBurst';
import { cn } from '../utils/cn';

const MAX_MESSAGE_LENGTH = 500;

const apiLines = [
  [{ t: 'POST', c: 'text-accent' }, { t: ' /api/contact', c: 'text-foreground' }],
  [{ t: '{', c: 'text-muted-foreground' }],
  [{ t: '  status', c: 'text-foreground' }, { t: ': ', c: 'text-muted-foreground' }, { t: '200', c: 'text-emerald-500 dark:text-emerald-400' }, { t: ',', c: 'text-muted-foreground' }],
  [{ t: '  message', c: 'text-foreground' }, { t: ": '", c: 'text-muted-foreground' }, { t: 'delivered', c: 'text-emerald-500 dark:text-emerald-400' }, { t: "'", c: 'text-muted-foreground' }],
  [{ t: '}', c: 'text-muted-foreground' }],
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', variant: 'success' });
  const [celebrate, setCelebrate] = useState(0);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/xqazjgvo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setToast({ open: true, message: 'Your message has been sent successfully! I will get back to you shortly.', variant: 'success' });
      setFormData({ name: '', email: '', message: '' });
      setCelebrate((c) => c + 1);
      setSent(true);
      setTimeout(() => setSent(false), 2500);
    } catch {
      setToast({ open: true, message: 'Unable to send your message at this time. Please try again.', variant: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 6000);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-24">
      <Container>
        <div className="relative mx-auto max-w-3xl">
          <FloatingCodeCard
            filename="response.json"
            lines={apiLines}
            className="-right-8 top-4 xl:-right-16 hidden md:block"
            floatDelay={0.5}
            rotate={3}
            cursor={false}
          />

          <SectionHeading
            eyebrow="Direct Connection"
            title="Let's Build Something Extraordinary"
            description="Have a high-impact role, startup idea, or technical question? Send a message directly to my inbox."
          />

          {/* Contact Info Pills */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/80 px-4 py-2 text-xs font-semibold text-foreground backdrop-blur-md transition-all hover:border-accent/40 hover:shadow-md"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-accent" />}
              <span>{copied ? 'Copied Email!' : personalInfo.email}</span>
            </button>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/80 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur-md">
              <MapPin className="h-4 w-4 text-accent" />
              <span>{personalInfo.location}</span>
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400 backdrop-blur-md">
              <Clock className="h-4 w-4" />
              <span>Typical reply &lt; 24h</span>
            </span>
          </div>

          <Reveal variants={slideUp}>
            <div className="rounded-3xl border border-white/10 bg-surface/90 p-6 shadow-2xl backdrop-blur-2xl md:p-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Input
                    icon={User}
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    aria-label="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    icon={Mail}
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    aria-label="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Textarea
                    icon={MessageSquare}
                    name="message"
                    placeholder="Project details, inquiry, or hello..."
                    aria-label="Your Message"
                    rows={5}
                    maxLength={MAX_MESSAGE_LENGTH}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <p
                    className={cn(
                      'mt-2 text-right text-xs font-mono font-medium transition-colors',
                      formData.message.length >= MAX_MESSAGE_LENGTH
                        ? 'text-red-500'
                        : formData.message.length >= MAX_MESSAGE_LENGTH * 0.85
                          ? 'text-amber-500'
                          : 'text-muted-foreground'
                    )}
                  >
                    {formData.message.length}/{MAX_MESSAGE_LENGTH}
                  </p>
                </div>

                <div className="relative">
                  <ConfettiBurst triggerKey={celebrate} />
                  <MagneticWrap strength={0.15} className="block w-full">
                    <Button type="submit" size="lg" disabled={loading} className="w-full rounded-2xl bg-accent shadow-lg shadow-accent/25 hover:bg-accent-hover active:scale-95">
                      <AnimatePresence mode="wait" initial={false}>
                        {loading ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="inline-flex items-center gap-2 font-bold"
                          >
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Dispatching Message...
                          </motion.span>
                        ) : sent ? (
                          <motion.span
                            key="sent"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="inline-flex items-center gap-2 font-bold text-emerald-300"
                          >
                            <Check className="h-5 w-5" />
                            Message Sent!
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="inline-flex items-center gap-2 font-bold"
                          >
                            Send Direct Message
                            <Send className="h-4 w-4" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </MagneticWrap>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </Container>

      <Toast open={toast.open} message={toast.message} variant={toast.variant} />
    </section>
  );
};

export default Contact;
