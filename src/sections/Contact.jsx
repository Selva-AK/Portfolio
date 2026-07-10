import { useState } from 'react';
import { Loader2, Mail, MessageSquare, Send, User } from 'lucide-react';
import { slideUp } from '../utils/animations';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import Toast from '../components/ui/Toast';
import Parallax from '../components/ui/Parallax';
import FloatingCodeCard from '../components/ui/FloatingCodeCard';

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

      setToast({ open: true, message: 'Message sent successfully! I will get back to you soon.', variant: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setToast({ open: true, message: 'Failed to send message. Please try again.', variant: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 6000);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-24">
      <Parallax offset={70} className="pointer-events-none absolute right-[-10%] top-0 h-80 w-80 rounded-full bg-accent/5 blur-[100px]" />

      <Container>
        <div className="relative mx-auto max-w-2xl">
          <FloatingCodeCard
            filename="response.json"
            lines={apiLines}
            className="-right-8 top-4 xl:-right-16"
            floatDelay={0.5}
            rotate={3}
            cursor={false}
          />
          <FloatingCodeCard
            filename="request.js"
            lines={[
              [{ t: 'const', c: 'text-accent' }, { t: ' res = ', c: 'text-foreground' }, { t: 'await', c: 'text-accent' }],
              [{ t: '  sendMessage(form);', c: 'text-emerald-500 dark:text-emerald-400' }],
            ]}
            className="-left-8 bottom-10 xl:-left-16"
            floatDelay={1.4}
            rotate={-3}
            cursor={false}
          />

          <SectionHeading
            eyebrow="Get in Touch"
            title="Contact Me"
            description="Have a question or want to work together? Drop me a message."
          />

          <Reveal variants={slideUp}>
            <Card className="p-6 md:p-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                <Textarea
                  icon={MessageSquare}
                  name="message"
                  placeholder="Your Message"
                  aria-label="Your Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <Button type="submit" size="lg" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </Reveal>
        </div>
      </Container>

      <Toast open={toast.open} message={toast.message} variant={toast.variant} />
    </section>
  );
};

export default Contact;
