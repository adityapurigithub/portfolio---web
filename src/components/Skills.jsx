import { motion } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { category: 'Languages',              icon: '🔤', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript'] },
  { category: 'Frameworks & Libraries', icon: '⚛️', items: ['React.js', 'Next.js', 'Redux', 'React Query', 'Tailwind CSS', 'Node.js', 'Express.js'] },
  { category: 'API Integrations',       icon: '🔌', items: ['REST API', 'GraphQL'] },
  { category: 'Databases',              icon: '🗄️', items: ['MongoDB', 'Firebase'] },
  { category: 'Version Control',        icon: '🌿', items: ['Git', 'GitHub', 'Bitbucket'] },
  { category: 'Others',                 icon: '🛠️', items: ['Performance Optimization', 'Localization (i18next)', 'AD Auth', 'SharePoint Uploads', 'Complex Forms'] },
  { category: 'AI Tools',               icon: '🤖', items: ['ChatGPT', 'Gemini', 'AI Studio', 'Cursor', 'AntiGravity', 'OpenClaw', 'Testsprite'] },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 12 } },
};

function SkillCard({ group }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariant}
      whileHover={{ y: -4 }}
      onMouseMove={handleMouseMove}
      className="glass-panel rounded-2xl p-6 w-full relative overflow-hidden group"
      data-cursor-hover
    >
      {/* Top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
      
      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139,92,246,0.06), transparent 60%)`,
        }}
      />

      {/* Hover inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent/0 group-hover:from-primary-500/5 group-hover:to-accent/5 transition-all duration-500 pointer-events-none rounded-2xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl group-hover:scale-110 transition-transform duration-300 inline-block">{group.icon}</span>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary-400">
            {group.category}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {group.items.map((item) => (
            <span key={item} className="skill-tag px-3 py-1 text-xs font-medium rounded-full cursor-default">
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden section-divider">
      {/* Subtle section background */}
      <div className="absolute inset-0 bg-white/[0.015] backdrop-blur-none border-t border-b border-white/[0.05]" />
      <div className="blob-glow bg-primary-600/15 w-[50vw] h-[30vw] top-0 left-1/2 -translate-x-1/2" style={{ animationDelay: '2s' }} />

      <div className="max-w-6xl mx-auto px-6 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white/90">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-gray-500 text-center mb-14 max-w-lg mx-auto">
            Technologies and tools I work with daily.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {skills.map((group, idx) => (
            <SkillCard key={idx} group={group} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
