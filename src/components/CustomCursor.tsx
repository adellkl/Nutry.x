/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, select, textarea, .hover-target';

const isLightBackground = (element: Element | null) => {
  let current = element instanceof HTMLElement ? element : null;

  while (current && current !== document.body) {
    const forcedTheme = current.dataset.cursorTheme;
    if (forcedTheme === 'dark') return true;
    if (forcedTheme === 'light') return false;

    const background = window.getComputedStyle(current).backgroundColor;
    const match = background.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);

    if (match) {
      const alpha = match[4] === undefined ? 1 : Number(match[4]);
      if (alpha > 0.35) {
        const red = Number(match[1]);
        const green = Number(match[2]);
        const blue = Number(match[3]);
        const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
        return luminance > 0.66;
      }
    }

    current = current.parentElement;
  }

  return false;
};

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring || window.matchMedia('(hover: none)').matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPosition = { ...target };
    const ringPosition = { ...target };
    let frame = 0;
    let visible = false;
    let interactive = false;
    let darkCursor = false;

    const render = () => {
      dotPosition.x += (target.x - dotPosition.x) * 0.42;
      dotPosition.y += (target.y - dotPosition.y) * 0.42;
      ringPosition.x += (target.x - ringPosition.x) * 0.16;
      ringPosition.y += (target.y - ringPosition.y) * 0.16;

      dot.style.transform = `translate3d(${dotPosition.x}px, ${dotPosition.y}px, 0) translate(-50%, -50%) scale(${interactive ? 0.65 : 1})`;
      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0) translate(-50%, -50%) scale(${interactive ? 1.65 : 1})`;

      frame = window.requestAnimationFrame(render);
    };

    const applyTheme = (useDarkCursor: boolean) => {
      if (darkCursor === useDarkCursor) return;
      darkCursor = useDarkCursor;
      dot.style.backgroundColor = useDarkCursor ? '#080808' : '#ffffff';
      ring.style.borderColor = useDarkCursor ? 'rgba(8, 8, 8, 0.72)' : 'rgba(255, 255, 255, 0.58)';
      ring.style.backgroundColor = interactive
        ? useDarkCursor ? 'rgba(8, 8, 8, 0.10)' : 'rgba(255, 255, 255, 0.10)'
        : 'transparent';
    };

    const applyInteractiveState = (isInteractive: boolean) => {
      if (interactive === isInteractive) return;
      interactive = isInteractive;
      ring.style.backgroundColor = isInteractive
        ? darkCursor ? 'rgba(8, 8, 8, 0.10)' : 'rgba(255, 255, 255, 0.10)'
        : 'transparent';
    };

    const onPointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        dotPosition.x = event.clientX;
        dotPosition.y = event.clientY;
        ringPosition.x = event.clientX;
        ringPosition.y = event.clientY;
      }

      const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
      applyInteractiveState(Boolean(hoveredElement?.closest(INTERACTIVE_SELECTOR)));
      applyTheme(isLightBackground(hoveredElement));
    };

    const onPointerLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onPointerLeave);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="custom-cursor fixed left-0 top-0 z-[110] hidden h-2 w-2 rounded-full bg-white opacity-0 pointer-events-none transition-[opacity,background-color] duration-200 md:block"
        id="cursor-dot"
      />
      <div
        ref={cursorRingRef}
        className="custom-cursor fixed left-0 top-0 z-[109] hidden h-8 w-8 rounded-full border border-white/60 opacity-0 pointer-events-none transition-[opacity,border-color,background-color] duration-200 md:block"
        id="cursor-ring"
      />
    </>
  );
};
