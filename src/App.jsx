import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';

const VALID_SECTIONS = ['experience', 'projects', 'skills', 'contact'];

function App() {
  const scrollToSection = useRef((id, delay = 0) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const offset = 80; // navbar height
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, delay);
  });

  // Native smooth-scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      e.preventDefault();
      const id = anchor.getAttribute('href').slice(1);
      if (id) scrollToSection.current(id);
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // ?section= URL param → scroll
  useEffect(() => {
    const section = new URLSearchParams(window.location.search)
      .get('section')?.toLowerCase().trim();

    if (!section || !VALID_SECTIONS.includes(section)) return;

    scrollToSection.current(section, 400);
    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  return (
    <div className="relative w-full h-full text-gray-100 font-sans selection:bg-primary-500/30">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
