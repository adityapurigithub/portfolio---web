import { motion } from 'framer-motion';

const exp = {
  role: 'Frontend Developer',
  company: 'Wow Labz',
  period: '2023 – Present',
  bullets: [
    'Specialize in building and maintaining user interfaces using React.js.',
    'Develop responsive and dynamic web applications ensuring cross-browser compatibility and performance optimization.',
    'Collaborate with designers and back-end developers to implement functional and user-friendly features.',
    'Utilize modern React practices (hooks, context API) to enhance scalability and maintainability.',
    'Work closely with product teams & clients to meet business requirements and project deadlines.',
    'Optimized core web vitals (LCP, CLS, FID) by leveraging lazy loading, code-splitting, and memoization.',
    'Engineered WCAG-compliant, responsive UI components using Tailwind CSS and Framer Motion.',
    'Spearheaded the migration of legacy interfaces into modern component-driven architectures, reducing technical debt by 30%.',
  ],
};

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative overflow-hidden section-divider">
      <div className="blob-glow bg-primary-600/20 w-[50vw] h-[50vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-6 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white/90">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-gray-500 text-center mb-14 max-w-lg mx-auto">
            Building products that matter, one pixel at a time.
          </p>
        </motion.div>

        <div className="relative pl-8 md:pl-0">
          {/* Centre timeline line */}
          <div className="hidden md:block absolute left-1/2 w-px h-full bg-gradient-to-b from-primary-500/60 via-accent/30 to-transparent -translate-x-1/2" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 50, damping: 12 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6 md:gap-0"
          >
            {/* Left — meta */}
            <div className="order-1 md:w-[45%] text-left md:text-right md:pr-12 z-10">
              <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
              <h4 className="text-lg font-semibold text-primary-400 mb-3">{exp.company}</h4>
              <span className="inline-flex items-center gap-2 glass border border-white/[0.08] text-xs font-semibold text-gray-400 px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {exp.period}
              </span>
            </div>

            {/* Centre dot */}
            <div className="order-2 hidden md:flex items-center justify-center w-5 h-5 rounded-full bg-background border-2 border-primary-500 shadow-[0_0_16px_rgba(139,92,246,0.7)] z-20 flex-shrink-0"
              style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
            />

            {/* Right — detail card */}
            <div className="order-3 md:w-[45%] md:pl-12 z-10 w-full">
              <div className="glass-panel rounded-2xl p-7 relative overflow-hidden group" data-cursor-hover>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent/0 group-hover:from-primary-500/5 group-hover:to-accent/5 transition-all duration-500 pointer-events-none rounded-2xl" />
                <ul className="space-y-3 relative z-10">
                  {exp.bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      className="flex gap-3 text-gray-300 text-sm leading-relaxed"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0 shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
