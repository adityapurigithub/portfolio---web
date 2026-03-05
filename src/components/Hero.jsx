import { motion } from 'framer-motion';
import { useMemo } from 'react';
import MagnetButton from './MagnetButton';
import { Github, Linkedin, Mail, Sparkles } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};
const item = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 45, damping: 10 } },
};

const socials = [
  { Icon: Github,   href: 'https://adityapurigithub.com',   label: 'GitHub'   },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/aditya-p-a92771202',  label: 'LinkedIn' },
  { Icon: Mail,     href: 'mailto:adityapuri85@gmail.com', label: 'Email' },
];

// Generate static particle data so it doesn't regenerate on each render
const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 12 + 8,
  color: i % 3 === 0 ? 'rgba(139,92,246,0.5)' : i % 3 === 1 ? 'rgba(217,70,239,0.4)' : 'rgba(129,140,248,0.35)',
}));

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-10 overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              bottom: '-10px',
              background: p.color,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }}
          />
        ))}
      </div>

      {/* Orbs */}
      <div className="blob-glow bg-primary-600/50 w-[45vw] h-[45vw] top-[-5vw] left-[-10vw]" />
      <div className="blob-glow bg-accent/35 w-[35vw] h-[35vw] bottom-[-5vw] right-[-5vw]" style={{ animationDelay: '2s' }} />
      <div className="blob-glow bg-indigo-500/20 w-[25vw] h-[25vw] top-1/2 left-1/2" style={{ animationDelay: '5s' }} />

      {/* Grid lattice overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left — text */}
        <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col gap-6">
          {/* Badge */}
          <motion.div variants={item} className="inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase glass border border-primary-500/30 text-primary-300">
              <Sparkles size={14} className="text-accent" />
              MERN Stack Developer
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={item} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08]">
            Hello, I'm <br />
            <span className="text-gradient">Aditya Puri</span>
          </motion.h1>

          {/* Sub */}
          <motion.p variants={item} className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
            A Frontend Developer with 3 years of experience building scalable,
            high‑performance applications. I specialize in React, TypeScript, and
            delivering accessible, user‑centric solutions.
          </motion.p>

          {/* Actions */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-5 mt-1">
            <MagnetButton href="#projects" className="!rounded-full">View Projects</MagnetButton>

            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 glass rounded-full text-gray-400 hover:text-white hover:border-primary-500/40 hover:shadow-[0_0_16px_rgba(139,92,246,0.3)] transition-all duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div variants={item} className="flex gap-8 mt-4">
            {[
              { num: '3+', label: 'Years Exp' },
              { num: '10+', label: 'Projects' },
              { num: '5+', label: 'Clients' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-gradient">{stat.num}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — avatar card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, type: 'spring', damping: 14 }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Floating card */}
          <motion.div
            animate={{ y: [-14, 14, -14] }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
            className="relative w-72 h-[400px] md:w-80 md:h-[440px] rounded-[2.5rem] overflow-hidden glass-panel glow-ring"
          >
            {/* Inner gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-accent/20" />
            {/* Top shine */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-24 h-24 rounded-full glass border border-white/15 flex items-center justify-center text-5xl mb-5 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                👨‍💻
              </div>
              <p className="text-xl font-bold text-white mb-1">Aditya Puri</p>
              <p className="text-sm text-primary-300 tracking-wide">Frontend Developer</p>

              <div className="mt-6 w-full space-y-2">
                {['React', 'TypeScript', 'Node.js'].map((s) => (
                  <div key={s} className="flex items-center justify-between px-4 py-2 rounded-xl glass border border-white/[0.07]">
                    <span className="text-xs text-gray-400">{s}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i < 4 ? 'bg-primary-500' : 'bg-white/10'}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status badge */}
              <div className="mt-5 flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <span className="text-xs text-emerald-300 font-medium">Available for work</span>
              </div>
            </div>

            {/* Decorative blurs */}
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-primary-500 rounded-full filter blur-[50px] opacity-30" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-accent rounded-full filter blur-[50px] opacity-30" />
          </motion.div>

          {/* Halo ring behind card */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary-500/10 to-accent/10 blur-[40px] -z-10 scale-110" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-600 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary-400/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
