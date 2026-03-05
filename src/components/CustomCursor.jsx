import { useEffect, useRef, useCallback } from 'react';

/**
 * Ultra-performant custom cursor using raw DOM + requestAnimationFrame.
 * No React state updates on mouse move = zero re-renders = zero lag.
 *
 * Features:
 *  - Smooth-following glow orb (spring physics via lerp)
 *  - Glowing dot at exact cursor position
 *  - Expands + changes color on interactive elements
 *  - GPU-accelerated with will-change + translate3d
 *  - Hidden on mobile / touch devices
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const clicking = useRef(false);
  const visible = useRef(false);
  const raf = useRef(null);

  const render = useCallback(() => {
    // Lerp positions for smooth follow
    pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
    pos.current.y += (mouse.current.y - pos.current.y) * 0.15;
    trail.current.x += (mouse.current.x - trail.current.x) * 0.08;
    trail.current.y += (mouse.current.y - trail.current.y) * 0.08;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
    }
    if (ringRef.current) {
      const scale = clicking.current ? 0.6 : hovering.current ? 2.2 : 1;
      ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${scale})`;
      ringRef.current.style.opacity = hovering.current ? '1' : '0.6';
    }
    if (trailRef.current) {
      const trailScale = hovering.current ? 2.8 : 1;
      trailRef.current.style.transform = `translate3d(${trail.current.x}px, ${trail.current.y}px, 0) scale(${trailScale})`;
      trailRef.current.style.opacity = hovering.current ? '0.4' : '0.15';
    }

    raf.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    // Don't render on touch-only devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '0.6';
        if (trailRef.current) trailRef.current.style.opacity = '0.15';
      }
    };

    const onOver = (e) => {
      const t = e.target;
      if (
        t.tagName === 'A' || t.tagName === 'BUTTON' ||
        t.closest('a') || t.closest('button') ||
        t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' ||
        t.closest('[data-cursor-hover]')
      ) {
        hovering.current = true;
        if (dotRef.current) dotRef.current.classList.add('cursor-hovered');
        if (ringRef.current) ringRef.current.classList.add('cursor-hovered');
        if (trailRef.current) trailRef.current.classList.add('cursor-hovered');
      } else {
        hovering.current = false;
        if (dotRef.current) dotRef.current.classList.remove('cursor-hovered');
        if (ringRef.current) ringRef.current.classList.remove('cursor-hovered');
        if (trailRef.current) trailRef.current.classList.remove('cursor-hovered');
      }
    };

    const onDown = () => {
      clicking.current = true;
      if (dotRef.current) dotRef.current.classList.add('cursor-clicking');
    };
    const onUp = () => {
      clicking.current = false;
      if (dotRef.current) dotRef.current.classList.remove('cursor-clicking');
    };

    const onLeave = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (trailRef.current) trailRef.current.style.opacity = '0';
    };

    const onEnter = () => {
      visible.current = true;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.body.addEventListener('mouseleave', onLeave);
    document.body.addEventListener('mouseenter', onEnter);

    raf.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.body.removeEventListener('mouseleave', onLeave);
      document.body.removeEventListener('mouseenter', onEnter);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [render]);

  return (
    <>
      {/* Outer glow trail — largest, slowest */}
      <div
        ref={trailRef}
        className="cursor-trail hidden md:block"
        style={{ opacity: 0 }}
      />
      {/* Mid ring — follows with slight delay */}
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        style={{ opacity: 0 }}
      />
      {/* Inner dot — snaps to cursor */}
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        style={{ opacity: 0 }}
      />
    </>
  );
}
