import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [easterEggText, setEasterEggText] = useState('RETOUR AU SOMMET');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);

  const funnyQuotes = [
    'ANTIGRAVITÉ ACTIVÉE // 🪐',
    'PROPULSION BIO-CINÉTIQUE // ⚡',
    'FUIR LA GRAVITÉ // ☄️',
    'ALIMENTER LE CORTEX // 🧠',
    'UP UP UP // 🚀',
    'DIRECTIVES SECRÈTES // 🤝',
    'CHASSEUR DE NUTRIMENT // 🥩',
    'COSMOS ATHLÉTIQUE // 🌟',
    'VERS LES CIMES // ⛰️'
  ];

  // Sounds generated in real-time via Web Audio API (tactile responsive chimes)
  const playTickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      // AudioContext blocked or unsupported
    }
  };

  const playAscentSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      
      // Warm synthesizer base harmonic
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(220, now); // A3
      osc1.frequency.exponentialRampToValueAtTime(880, now + 1.2); // A5
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 1.3);

      // Celestial high frequency chime
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc2.frequency.exponentialRampToValueAtTime(2637.02, now + 0.8); // E7
      gain2.gain.setValueAtTime(0.04, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
      
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 1.0);
    } catch (e) {
      // AudioContext blocked or unsupported
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = window.scrollY;
      
      setScrollProgress(currentScroll / totalScroll);
      setIsVisible(currentScroll > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    playTickSound();
    
    // Pick a random fancy quote
    const randomQuote = funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)];
    setEasterEggText(randomQuote);

    // Speed up rotation using GSAP
    if (textPathRef.current) {
      gsap.to('.rotating-text-path', {
        duration: 12,
        repeat: -1,
        ease: 'none'
      });
    }

    // Gentle magnetic float to follow local target
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.15,
        borderColor: '#ffffff',
        boxShadow: '0 0 25px rgba(255, 255, 255, 0.25)',
        duration: 0.3
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        x: 0,
        y: 0,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        boxShadow: 'none',
        duration: 0.3
      });
    }
  };

  const handleScrollToTop = () => {
    playAscentSound();
    
    // Smooth hyperspace scroll
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Animate launching launch pad
    if (buttonRef.current) {
      const tl = gsap.timeline();
      tl.to(buttonRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in'
      })
      .to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2
      });
    }
  };

  if (!isVisible) return null;

  // Circle properties
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <div 
      className="fixed bottom-8 right-8 z-[100] flex flex-col items-center pointer-events-none"
      id="ascent-scroller-pod"
    >
      {/* Floating Dynamic Dialog Text Box */}
      <div 
        className={`bg-zinc-950 text-white border border-white/10 px-3 py-1.5 font-mono text-[8px] tracking-[0.18em] uppercase rounded-none mb-3 shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-all duration-300 pointer-events-none flex items-center space-x-1.5 ${
          isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90'
        }`}
      >
        <span className="w-1 h-1 bg-white animate-ping rounded-full block shrink-0" />
        <span>{easterEggText}</span>
      </div>

      {/* Circle Scroller Command Button */}
      <button
        ref={buttonRef}
        onClick={handleScrollToTop}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-18 h-18 rounded-full bg-black/90 border border-white/10 flex items-center justify-center relative cursor-none focus:outline-none shrink-0 pointer-events-auto shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
        aria-label="Retour en haut"
      >
        {/* Background Rotating Ring text using SVG */}
        <div className="absolute inset-0">
          <svg className="w-full h-full transform -rotate-90 origin-center scale-[1.05]" viewBox="0 0 64 64">
            <defs>
              <path
                id="circlePath"
                d="M 32,32 m -28,0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0"
              />
            </defs>
            <text fill="rgba(255, 255, 255, 0.45)" className="font-mono text-[4.3px] uppercase tracking-[0.11em] rotating-text-path origin-center">
              <textPath href="#circlePath" r="28" startOffset="30%">
                • RELEVER AU SOMMET • ATHLETE DE FORCE • NUTRY.X •
              </textPath>
            </text>
          </svg>
        </div>

        {/* Circular Progress Gauge */}
        <svg className="w-full h-full absolute inset-0 -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1.5"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-150"
          />
        </svg>

        {/* Center Kinetic Arrow Indicator */}
        <div className="bg-white/5 w-10 h-10 rounded-full flex items-center justify-center border border-white/5 group relative z-10">
          <ArrowUp className={`w-4 h-4 text-white transition-transform duration-300 ${isHovered ? '-translate-y-0.5 scale-110' : 'translate-y-0'}`} />
        </div>
      </button>
    </div>
  );
};
