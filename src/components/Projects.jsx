import { motion } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'E-litigation Management System',
    description: 'Developed a full-scale E-Litigation platform for one of the largest law firms in the Middle East. Managed case lifecycles, hearings, and administration panels. Improved load time by ~30% with lazy loading and added i18next localization.',
    tags: ['React', 'SharePoint', 'MUI', 'i18next', 'Lazy Loading'],
    gradient: 'from-purple-600/20 to-violet-500/10',
    accent: 'rgba(139,92,246,0.5)',
    icon: '⚖️',
  },
  {
    title: 'Clinical Trial Management System',
    description: 'Scalable front-end system optimised for large clinical datasets. Integrated GraphQL queries to reduce response time by 25%. Implemented React Hook Form with resolver-based validation.',
    tags: ['React', 'TypeScript', 'Vite', 'GraphQL', 'React Hook Form'],
    gradient: 'from-pink-600/20 to-rose-500/10',
    accent: 'rgba(217,70,239,0.5)',
    icon: '🧬',
  },
  {
    title: 'Shipment Tracking Project',
    description: 'A tracking system enabling creation, monitoring, and management of shipments with real-time location via Google Maps. Integrated with blockchain APIs for secure transaction logging.',
    tags: ['React', 'Google Maps API', 'Blockchain API'],
    gradient: 'from-indigo-600/20 to-blue-500/10',
    accent: 'rgba(99,102,241,0.5)',
    icon: '📦',
  },
  {
    title: 'GPT-Powered Chat Application',
    description: 'A dynamic AI chat interface powered by GPT, featuring history retention, contextual conversational flow, and lightning-fast response streaming via WebSockets.',
    tags: ['React', 'Node.js', 'OpenAI API', 'WebSockets', 'Tailwind CSS'],
    gradient: 'from-emerald-600/20 to-teal-500/10',
    accent: 'rgba(16,185,129,0.5)',
    icon: '🤖',
  },
  {
    title: 'Node-Based Pipeline Tool',
    description: 'An interactive drag-and-drop node graph tool that allows users to seamlessly build processing pipelines, connecting modules dynamically and visualising data flows in real-time.',
    tags: ['React', 'React Flow', 'Framer Motion', 'State Management'],
    gradient: 'from-amber-600/20 to-yellow-500/10',
    accent: 'rgba(245,158,11,0.5)',
    icon: '🔗',
  },
];

const cardVariants = {
  offscreen: { y: 60, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.25, duration: 0.8 } },
};

function ProjectCard({ project, idx }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`glass-panel rounded-2xl p-8 relative overflow-hidden group w-full${
        idx === projects.length - 1 && projects.length % 2 !== 0
          ? ' md:col-span-2 md:max-w-xl md:mx-auto'
          : ''
      }`}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.1 }}
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      data-cursor-hover
    >
      {/* Per-project gradient tint */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 pointer-events-none transition-opacity duration-500 group-hover:opacity-100`} />
      
      {/* Mouse-follow spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(250px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139,92,246,0.08), transparent 60%)`,
        }}
      />

      {/* Top edge shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {/* Corner glow on hover */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{ background: project.accent }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs font-bold tracking-widest text-gray-600">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-110 transform inline-block">
            {project.icon}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-3 text-white/95 group-hover:text-primary-300 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill px-3 py-1 text-xs font-semibold rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative overflow-hidden section-divider">
      {/* Orbs */}
      <div className="blob-glow bg-accent/25 w-[40vw] h-[40vw] top-0 right-[-10vw]" style={{ animationDelay: '1s' }} />
      <div className="blob-glow bg-primary-600/20 w-[30vw] h-[30vw] bottom-0 left-[-8vw]" style={{ animationDelay: '4s' }} />

      <div className="max-w-6xl mx-auto px-6 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white/90">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-500 text-center mb-14 max-w-lg mx-auto">
            A selection of projects I've built and contributed to.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
