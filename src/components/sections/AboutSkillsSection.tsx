'use client';

import React from 'react';
import PortraitCanvas from '@/components/canvas/PortraitCanvas';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { usePortfolioStore } from '@/stores/usePortfolioStore';

export default function AboutSkillsSection() {
  const firstName = usePortfolioStore((s) => s.firstName);
  const yearsExp = usePortfolioStore((s) => s.yearsExp);
  const frontendStack = usePortfolioStore((s) => s.frontendStack);
  const stylesStack = usePortfolioStore((s) => s.stylesStack);
  const backendStack = usePortfolioStore((s) => s.backendStack);
  const devopsStack = usePortfolioStore((s) => s.devopsStack);
  const portraitMode = usePortfolioStore((s) => s.portraitMode);
  const cyclePortraitMode = usePortfolioStore((s) => s.cyclePortraitMode);
  const setFilter = usePortfolioStore((s) => s.setFilter);

  const handleSkillCardClick = (group: 'frontend' | 'styles' | 'backend' | 'devops') => {
    const filterTarget = group === 'styles' ? 'frontend' : group;
    setFilter(filterTarget);
    const projSection = document.getElementById('projects');
    if (projSection) {
      projSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const portraitModeLabels: Record<'lens' | 'halftone' | 'ascii', string> = {
    lens: 'Style: Halftone ASCII',
    halftone: 'Style: Scanline Halftone',
    ascii: 'Style: Pure ASCII Matrix',
  };

  return (
    <section id="about" className="py-16 border-t border-white/10 relative">
      {/* Top Row: `... /About me ...` + Bio Intro */}
      <ScrollReveal className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-5 font-mono text-xs sm:text-sm text-neutral-400">
          ... /About me ...
        </div>
        <div className="md:col-span-7">
          <p id="aboutIntroText" className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-md">
            Hello! I&apos;m <span id="aboutNameInline" className="text-white font-medium">{firstName}</span>, I&apos;m a <em className="italic font-serif text-white">full-stack developer</em>.<br />
            More than <em id="aboutYearsInline" className="italic font-serif text-white">{yearsExp}</em> experience.
          </p>
        </div>
      </ScrollReveal>

      {/* Main Grid: Left Asymmetric Stack Cards + Right Portrait */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: 4 Asymmetric Skill Cards with staggered scroll reveals */}
        <div className="lg:col-span-7 space-y-5">
          {/* Card 1: Front-end */}
          <ScrollReveal delay={100} distance={18}>
            <div
              data-skill-group="frontend"
              onClick={() => handleSkillCardClick('frontend')}
              className="skill-card group cursor-pointer rounded-3xl p-6 bg-[#f2f2ef] text-[#0d0d0d] border border-white transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(255,255,255,0.15)] shadow-xl active:scale-[0.99]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-bold tracking-tight">Front-end</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/10 text-black/80 group-hover:bg-black group-hover:text-white transition duration-200">
                  Click to filter projects ↓
                </span>
              </div>
              <p id="skillsFrontend" className="font-mono text-xs sm:text-[13px] leading-relaxed text-neutral-800">
                {frontendStack}
              </p>
            </div>
          </ScrollReveal>

          {/* Middle Row: Styles Card (Left) + Floating Badges */}
          <ScrollReveal delay={200} distance={18}>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div
                data-skill-group="styles"
                onClick={() => handleSkillCardClick('styles')}
                className="skill-card sm:col-span-7 cursor-pointer rounded-3xl p-5 bg-[#151515] hover:bg-[#1e1e1e] border border-white/15 hover:border-white/35 transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.99]"
              >
                <div className="font-mono text-sm font-semibold text-neutral-200 mb-2">Styles</div>
                <p id="skillsStyles" className="font-mono text-xs leading-relaxed text-neutral-400">
                  {stylesStack}
                </p>
              </div>

              {/* Overlapping Circular Action Badges from Ref 2 with hover bounce */}
              <div className="sm:col-span-5 flex items-center justify-center sm:justify-center">
                <a
                  href="#projects"
                  className="w-11 h-11 rounded-full border border-white/25 bg-[#181818] flex items-center justify-center text-white hover:bg-white hover:text-black transition duration-200 transform hover:scale-110 shadow-lg active:scale-95"
                  title="View Code Repositories"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="#projects"
                  className="-ml-3 w-11 h-11 rounded-full bg-[#f3f3f3] text-[#0d0d0d] flex items-center justify-center font-mono text-sm font-bold shadow-lg hover:scale-110 transition duration-200 active:scale-95"
                  title="Explore Stack in Action"
                >
                  ↗
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Back-end */}
          <ScrollReveal delay={250} distance={18}>
            <div
              data-skill-group="backend"
              onClick={() => handleSkillCardClick('backend')}
              className="skill-card cursor-pointer rounded-3xl p-6 bg-[#151515] hover:bg-[#1e1e1e] border border-white/15 hover:border-white/35 transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.99]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-semibold text-neutral-200">Back-end</span>
                <span className="text-[11px] font-mono text-neutral-500">Distributed & Microservices</span>
              </div>
              <p id="skillsBackend" className="font-mono text-xs sm:text-[13px] leading-relaxed text-neutral-400">
                {backendStack}
              </p>
            </div>
          </ScrollReveal>

          {/* Bottom Row: Left Note + Right DevOps Card */}
          <ScrollReveal delay={300} distance={18}>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-5 text-xs text-neutral-400 leading-relaxed pr-2">
                Some of my <em className="italic font-serif text-white">favorite technologies, topics, or tools</em> that I worked with
              </div>
              <div
                data-skill-group="devops"
                onClick={() => handleSkillCardClick('devops')}
                className="skill-card sm:col-span-7 cursor-pointer rounded-3xl p-5 bg-[#151515] hover:bg-[#1e1e1e] border border-white/15 hover:border-white/35 transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.99]"
              >
                <div className="font-mono text-sm font-semibold text-neutral-200 mb-1.5">DevOps</div>
                <p id="skillsDevops" className="font-mono text-xs leading-relaxed text-neutral-400">
                  {devopsStack}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Developer Portrait Card with Live ASCII / Scanline Dither Switcher */}
        <ScrollReveal delay={200} distance={24} className="lg:col-span-5 relative flex justify-center">
          {/* Decorative Orbital Ring with smooth ambient rotation */}
          <div className="orbital-circle absolute -top-14 -left-10 w-80 h-80 animate-spin-slow" />

          <div className="relative z-10 w-full max-w-[330px] rounded-3xl overflow-hidden border border-white/20 bg-[#141414] shadow-2xl transition duration-300 hover:border-white/40">
            <div className="relative h-[390px] w-full bg-[#0a0a0a]">
              <PortraitCanvas />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-neutral-200 pointer-events-none">
                HOVER FOR ASCII LENS
              </div>
              <button
                id="togglePortraitModeBtn"
                onClick={cyclePortraitMode}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white text-black font-mono text-[11px] font-medium shadow-lg hover:bg-neutral-200 transition duration-200 transform hover:scale-105 active:scale-95"
              >
                {portraitModeLabels[portraitMode]}
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
