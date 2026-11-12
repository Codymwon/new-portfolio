'use client';

import React from 'react';
import HeroAsciiCanvas from '@/components/canvas/HeroAsciiCanvas';
import { usePortfolioStore } from '@/stores/usePortfolioStore';

export default function HeroSection() {
  const lang = usePortfolioStore((s) => s.lang);
  const showToast = usePortfolioStore((s) => s.showToast);

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, platform: string) => {
    e.preventDefault();
    showToast(`Placeholder ${platform} link — editable in "Edit Details"`);
  };

  return (
    <section id="hero" className="relative pb-14">
      {/* 100% FULL-VIEWPORT HERO STAGE (100vw x 100vh) */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 min-h-[calc(100vh-76px)] flex flex-col justify-between py-8 sm:py-12 overflow-hidden">
        {/* 100% Full-Screen Edge-to-Edge Interactive ASCII & Particle Sculpture Canvas */}
        <HeroAsciiCanvas />

        {/* Top Display Typography Layer (Full-stack / Projects / Developer) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-y-4 gap-x-6 items-center pointer-events-none">
          {/* Row 1 Left: "Full-stack" with smooth entry animation */}
          <div className="lg:col-span-8 animate-fade-in-up">
            <h1 id="heroTitleLine1" className="font-mono text-5xl sm:text-7xl md:text-[96px] font-bold tracking-tight leading-none text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)] select-none">
              {lang === 'ge' ? 'Full-Stack' : 'Full-stack'}
            </h1>
          </div>

          {/* Row 1 Right: Long White Pill "Projects" + Circle Arrow Button with entry animation */}
          <div className="lg:col-span-4 flex items-center lg:justify-end gap-3 pointer-events-auto animate-fade-in-up animate-delay-200">
            <a
              href="#projects"
              className="flex-1 sm:flex-initial sm:min-w-[230px] py-3.5 px-8 rounded-full bg-[#f3f3f3] text-[#0d0d0d] hover:bg-white font-sans italic font-medium text-sm sm:text-base text-center shadow-2xl transition duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,255,255,0.2)] active:scale-95"
            >
              Projects
            </a>
            <a
              href="#projects"
              className="w-12 h-12 rounded-full bg-[#f3f3f3] text-[#0d0d0d] hover:bg-white flex items-center justify-center text-lg font-mono transition duration-300 transform hover:rotate-45 hover:-translate-y-0.5 shrink-0 shadow-2xl active:scale-90"
              aria-label="Jump to Projects"
            >
              →
            </a>
          </div>

          {/* Row 2 Left: Mission Quote with Italicized Highlights */}
          <div className="lg:col-span-5 order-3 lg:order-2 pt-2 animate-fade-in-up animate-delay-300">
            <p id="heroSubtitle" className="text-sm sm:text-[15px] text-neutral-200 leading-relaxed max-w-sm drop-shadow-[0_2px_14px_rgba(0,0,0,0.98)]">
              My goal is to <em className="text-white font-serif italic">write maintainable, clean</em> and <em className="text-white font-serif italic">understandable code</em> so process development was enjoyable.
            </p>
          </div>

          {/* Row 2 Right: "Developer" with staggered entrance */}
          <div className="lg:col-span-7 order-2 lg:order-3 lg:text-right animate-fade-in-up animate-delay-150">
            <div id="heroTitleLine2" className="font-mono text-5xl sm:text-7xl md:text-[96px] font-bold tracking-tight leading-none text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)] select-none">
              {lang === 'ge' ? 'Entwickler' : 'Developer'}
            </div>
          </div>
        </div>

        {/* Spacer so the 100% full-screen sculpture breathes in the center of the viewport */}
        <div className="relative z-10 flex-1 min-h-[260px] sm:min-h-[340px] pointer-events-none" />

        {/* Bottom Social Links Pill Row anchored inside the 100vh Hero Stage */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-12 flex flex-wrap items-center justify-center sm:justify-between gap-3">
          <a
            href="#contacts"
            onClick={(e) => handleSocialClick(e, 'GitHub')}
            className="social-pill animate-fade-in-up animate-delay-300 px-6 py-2.5 rounded-full text-xs font-mono flex items-center gap-2.5 text-neutral-200"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>Github</span>
          </a>
          <a
            href="#contacts"
            onClick={(e) => handleSocialClick(e, 'LinkedIn')}
            className="social-pill animate-fade-in-up animate-delay-350 px-6 py-2.5 rounded-full text-xs font-mono flex items-center gap-2.5 text-neutral-200"
          >
            <span className="font-bold text-sm leading-none">in</span>
            <span>LinkedIn</span>
          </a>
          <a
            href="#contacts"
            onClick={(e) => handleSocialClick(e, 'Telegram')}
            className="social-pill animate-fade-in-up animate-delay-400 px-6 py-2.5 rounded-full text-xs font-mono flex items-center gap-2.5 text-neutral-200"
          >
            <span>✈</span>
            <span>Telegram</span>
          </a>
          <a
            href="#contacts"
            onClick={(e) => handleSocialClick(e, 'Facebook')}
            className="social-pill animate-fade-in-up animate-delay-500 px-6 py-2.5 rounded-full text-xs font-mono flex items-center gap-2.5 text-neutral-200"
          >
            <span className="font-bold">f</span>
            <span>Facebook</span>
          </a>
          <a
            href="#contacts"
            onClick={(e) => handleSocialClick(e, 'Instagram')}
            className="social-pill animate-fade-in-up animate-delay-500 px-6 py-2.5 rounded-full text-xs font-mono flex items-center gap-2.5 text-neutral-200"
          >
            <span>◎</span>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
