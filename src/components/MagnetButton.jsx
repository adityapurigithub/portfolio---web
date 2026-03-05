import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagnetButton({ children, className = '', onClick, href, type = 'button', disabled = false }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (disabled) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setPosition({
      x: (clientX - (left + width  / 2)) * 0.3,
      y: (clientY - (top  + height / 2)) * 0.3,
    });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const Element = href ? motion.a : motion.button;

  return (
    <Element
      ref={ref}
      href={href}
      type={!href ? type : undefined}
      disabled={!href ? disabled : undefined}
      onClick={!disabled ? onClick : undefined}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-semibold text-white transition-all duration-300 border-2 border-primary-500 rounded-full group ${className}`}
    >
      {/* Slide-in arrow fill */}
      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-primary-600 to-accent group-hover:translate-x-0 ease">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
      {/* Label */}
      <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
        {children}
      </span>
      {/* Invisible spacer keeps height */}
      <span className="relative invisible">{children}</span>
    </Element>
  );
}
