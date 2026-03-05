import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ['rgba(5,3,15,0)', 'rgba(5,3,15,0.82)']);
  const navBlur = useTransform(scrollY, [0, 80], ['blur(0px)', 'blur(20px)']);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: 'Experience', href: '#experience' },
    { label: 'Projects',   href: '#projects'   },
    { label: 'Skills',     href: '#skills'      },
    { label: 'Contact',    href: '#contact'     },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ backgroundColor: navBg, backdropFilter: navBlur, WebkitBackdropFilter: navBlur }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 border-b border-white/[0.06] transition-shadow duration-300"
      >
        {/* Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-black tracking-tighter select-none"
        >
          A<span className="text-gradient">.</span>P
        </motion.a>

        {/* Links — desktop */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="relative group text-gray-400 hover:text-white transition-colors duration-200"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-primary-400 to-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA — desktop */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:inline-flex px-5 py-2 text-sm font-semibold rounded-full glass border border-primary-500/40 text-primary-300 hover:text-white hover:border-primary-400/70 hover:shadow-[0_0_18px_rgba(139,92,246,0.3)] transition-all duration-300"
        >
          Let's Talk
        </motion.a>

        {/* Hamburger — mobile */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[60px] left-0 right-0 z-40 glass border-b border-white/[0.06] md:hidden"
          >
            <nav className="flex flex-col items-center gap-4 py-6">
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-300 hover:text-white text-base font-medium transition-colors"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-6 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-primary-600 to-accent text-white"
              >
                Let's Talk
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
