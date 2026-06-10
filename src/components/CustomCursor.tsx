/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Set initial custom mouse position
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      // Immediate follow for dot
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      // Smooth lag target follow for the luxury outer ring
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power3.out'
      });
    };

    const onMouseOverLink = () => {
      gsap.to(ring, {
        scale: 1.8,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderColor: '#ffffff',
        borderWidth: 1,
        duration: 0.3
      });
      gsap.to(dot, {
        scale: 0.5,
        backgroundColor: '#ffffff',
        duration: 0.3
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
        duration: 0.3
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: '#ffffff',
        duration: 0.3
      });
    };

    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, [role="button"], input, select, textarea, .hover-target');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', onMouseOverLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    addHoverListeners();

    // Re-bind hover listeners dynamically since pages will load or rebuild DOM components
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Small dot cursor */}
      <div
        ref={cursorDotRef}
        className="custom-cursor fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        id="cursor-dot"
      />
      {/* Outer elegant ring */}
      <div
        ref={cursorRingRef}
        className="custom-cursor fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-50 hidden md:block"
        id="cursor-ring"
      />
    </>
  );
};
