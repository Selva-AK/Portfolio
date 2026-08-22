import { motion } from 'framer-motion';

const BackgroundGlow = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Orb 1: Upper Left Glow */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[120px]"
      />

      {/* Orb 2: Middle Right Cyber Cyan Glow */}
      <motion.div
        animate={{
          x: [0, -70, 0],
          y: [0, 80, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -right-32 top-1/3 h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[140px]"
      />

      {/* Orb 3: Bottom Left Purple Accent Glow */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-32 left-1/4 h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[150px]"
      />

      {/* Subtle Noise / Ambient Mesh Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};

export default BackgroundGlow;
