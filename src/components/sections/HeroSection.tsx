'use client';

import React from 'react';
import HeroAsciiCanvas from '@/components/canvas/HeroAsciiCanvas';
import { usePortfolioStore, HeroFontChoice } from '@/stores/usePortfolioStore';

export default function HeroSection() {
  const lang = usePortfolioStore((s) => s.lang);
  const heroFont = usePortfolioStore((s) => s.heroFont);
  const cycleHeroFont = usePortfolioStore((s) => s.cycleHeroFont);
  const showToast = usePortfolioStore((s) => s.showToast);

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, platform: string) => {
    e.preventDefault();
    showToast(`Placeholder ${platform} link — editable in "Edit Details"`);
  };

  const fontConfig: Record<HeroFontChoice, { fontClass: string; tracking: string; label: string }> = {
    display: { fontClass: 'font-display', tracking: 'tracking-[-0.04em]', label: 'Space Grotesk' },
    syne: { fontClass: 'font-syne', tracking: 'tracking-[-0.025em]', label: 'Syne' },
    spaceMono: { fontClass: 'font-spaceMono', tracking: 'tracking-tight', label: 'Space Mono' },
    mono: { fontClass: 'font-mono', tracking: 'tracking-tight', label: 'Fira Code' },
  };

  const currentFont = fontConfig[heroFont] || fontConfig.display;

  const handleFontCycle = () => {
    cycleHeroFont();
    const nextFonts: Record<HeroFontChoice, string> = {
      display: 'Syne (Avant-Garde)',
      syne: 'Space Mono (Retro-Futurist)',
      spaceMono: 'Fira Code (IDE Monospace)',
      mono: 'Space Grotesk (Architectural)',
    };
    showToast(`Hero Typeface: ${nextFonts[heroFont]}`);
  };

  return (
    <section id="hero" className="relative pb-14">
      {/* 100% FULL-VIEWPORT HERO STAGE (100vw x 100vh) */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 min-h-[calc(100vh-76px)] flex flex-col justify-between py-8 sm:py-12 overflow-hidden">
        {/* 100% Full-Screen Edge-to-Edge Interactive ASCII & Particle Sculpture Canvas */}
        <HeroAsciiCanvas />

        {/* Top Display Typography Layer (Full-stack / Projects / Developer) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-y-4 gap-x-6 items-center pointer-events-none">
          {/* Row 1 Left: "Full-stack" in Ultraviolet #6F3DFF with Glacier Blue metadata */}
          <div className="lg:col-span-8 animate-fade-in-up">
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest mb-2 select-none">
              <span className="inline-block w-2 h-2 rounded-full bg-ultraviolet animate-pulse" />
              <span className="px-2.5 py-0.5 rounded-full bg-glacier/40 border border-glacier/70 text-ultraviolet font-bold">SYS // ARCHITECTURE & CREATIVE SYSTEMS</span>
            </div>
            <h1
              id="heroTitleLine1"
              className={`${currentFont.fontClass} text-5xl sm:text-7xl md:text-[104px] font-bold ${currentFont.tracking} leading-[0.92] text-ultraviolet drop-shadow-[0_4px_36px_rgba(111,61,255,0.25)] select-none`}
            >
              {lang === 'ge' ? 'Full-Stack' : 'Full-stack'}
            </h1>
          </div>

          {/* Row 1 Right: Glacier Blue #BFE9FF "Projects" CTA + Circle Arrow Button */}
          <div className="lg:col-span-4 flex items-center lg:justify-end gap-3 pointer-events-auto animate-fade-in-up animate-delay-200">
            <a
              href="#projects"
              className="flex-1 sm:flex-initial sm:min-w-[230px] py-3.5 px-8 rounded-full bg-glacier text-[#0F172A] hover:bg-ultraviolet hover:text-white border border-glacier/80 font-sans italic font-bold text-sm sm:text-base text-center shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(111,61,255,0.25)] active:scale-95"
            >
              Projects
            </a>
            <a
              href="#projects"
              className="w-12 h-12 rounded-full bg-glacier text-[#0F172A] hover:bg-ultraviolet hover:text-white border border-glacier/80 flex items-center justify-center text-lg font-mono font-bold transition duration-300 transform hover:rotate-45 hover:-translate-y-0.5 shrink-0 shadow-lg active:scale-90"
              aria-label="Jump to Projects"
            >
              →
            </a>
          </div>

          {/* Row 2 Left: Mission Quote with Ultraviolet & Glacier Blue accents */}
          <div className="lg:col-span-5 order-3 lg:order-2 pt-2 animate-fade-in-up animate-delay-300">
            <p id="heroSubtitle" className="text-sm sm:text-[15px] text-[#334155] leading-relaxed max-w-sm font-medium">
              My goal is to <em className="text-ultraviolet font-serif italic font-bold">write maintainable, clean</em> and <em className="text-ultraviolet font-serif italic font-bold underline decoration-glacier decoration-2">understandable code</em> so process development was enjoyable.
            </p>
            {/* Quick Typeface Switcher Pill in Glacier & Ultraviolet */}
            <div className="mt-3 pointer-events-auto">
              <button
                type="button"
                onClick={handleFontCycle}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-glacier/70 bg-white/80 hover:bg-white backdrop-blur-md text-[10px] font-mono text-[#1E293B] hover:border-ultraviolet transition duration-200 active:scale-95 shadow-sm"
                title="Click to preview alternative hero title typefaces (Space Grotesk / Syne / Space Mono / Fira Code)"
              >
                <span className="text-[#64748B]">Typeface:</span>
                <span className="text-ultraviolet font-bold">{currentFont.label}</span>
                <span className="text-ultraviolet ml-0.5 font-bold">⟳</span>
              </button>
            </div>
          </div>

          {/* Row 2 Right: "Developer" in Ultraviolet #6F3DFF */}
          <div className="lg:col-span-7 order-2 lg:order-3 lg:text-right animate-fade-in-up animate-delay-150">
            <div className="hidden sm:flex items-center lg:justify-end gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest mb-2 select-none">
              <span className="px-2.5 py-0.5 rounded-full bg-glacier/30 border border-glacier/70 text-ultraviolet font-bold">INDEX // 47K STIPPLED PARTICLES</span>
              <span className="text-ultraviolet font-bold">•</span>
              <span className="text-[#64748B] font-medium">EST. 2026</span>
            </div>
            <div
              id="heroTitleLine2"
              className={`${currentFont.fontClass} text-5xl sm:text-7xl md:text-[104px] font-bold ${currentFont.tracking} leading-[0.92] text-ultraviolet drop-shadow-[0_4px_36px_rgba(111,61,255,0.25)] select-none`}
            >
              {lang === 'ge' ? 'Entwickler' : 'Developer'}
            </div>
          </div>
        </div>

        {/* Spacer so the 100% full-screen sculpture breathes in the center of the viewport */}
        <div className="relative z-10 flex-1 min-h-[260px] sm:min-h-[340px] pointer-events-none" />

        {/* Bottom Social Links Pill Row with Glacier Blue & Mineral Grey */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-12 flex flex-wrap items-center justify-center sm:justify-between gap-3">
          <a
            href="#contacts"
            onClick={(e) => handleSocialClick(e, 'GitHub')}
            className="social-pill animate-fade-in-up animate-delay-300 px-6 py-2.5 rounded-full text-xs font-mono flex items-center gap-2.5 bg-white/70 border border-glacier/60 text-[#334155] hover:text-white hover:bg-ultraviolet hover:border-ultraviolet shadow-xs font-medium"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>Github</span>
          </a>
          <a
            href="#contacts"
            onClick={(e) => handleSocialClick(e, 'LinkedIn')}
            className="social-pill animate-fade-in-up animate-delay-350 px-6 py-2.5 rounded-full text-xs font-mono flex items-center gap-2.5 bg-white/70 border border-glacier/60 text-[#334155] hover:text-white hover:bg-ultraviolet hover:border-ultraviolet shadow-xs font-medium"
          >
            <span className="font-bold text-sm leading-none">in</span>
            <span>LinkedIn</span>
          </a>
          <a
            href="#contacts"
            onClick={(e) => handleSocialClick(e, 'Telegram')}
            className="social-pill animate-fade-in-up animate-delay-400 px-6 py-2.5 rounded-full text-xs font-mono flex items-center gap-2.5 bg-white/70 border border-glacier/60 text-[#334155] hover:text-white hover:bg-ultraviolet hover:border-ultraviolet shadow-xs font-medium"
          >
            <span>✈</span>
            <span>Telegram</span>
          </a>
          <a
            href="#contacts"
            onClick={(e) => handleSocialClick(e, 'Facebook')}
            className="social-pill animate-fade-in-up animate-delay-500 px-6 py-2.5 rounded-full text-xs font-mono flex items-center gap-2.5 bg-white/70 border border-glacier/60 text-[#334155] hover:text-white hover:bg-ultraviolet hover:border-ultraviolet shadow-xs font-medium"
          >
            <span className="font-bold">f</span>
            <span>Facebook</span>
          </a>
          <a
            href="#contacts"
            onClick={(e) => handleSocialClick(e, 'Instagram')}
            className="social-pill animate-fade-in-up animate-delay-500 px-6 py-2.5 rounded-full text-xs font-mono flex items-center gap-2.5 bg-white/70 border border-glacier/60 text-[#334155] hover:text-white hover:bg-ultraviolet hover:border-ultraviolet shadow-xs font-medium"
          >
            <span>◎</span>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
