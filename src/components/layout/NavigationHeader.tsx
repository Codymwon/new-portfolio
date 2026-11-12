'use client';

import React, { useState } from 'react';
import { usePortfolioStore } from '@/stores/usePortfolioStore';

export default function NavigationHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const firstName = usePortfolioStore((s) => s.firstName);
  const lastName = usePortfolioStore((s) => s.lastName);
  const lang = usePortfolioStore((s) => s.lang);
  const setLang = usePortfolioStore((s) => s.setLang);
  const toggleTheme = usePortfolioStore((s) => s.toggleTheme);
  const setCustomizerOpen = usePortfolioStore((s) => s.setCustomizerOpen);
  const showToast = usePortfolioStore((s) => s.showToast);

  const handleLang = (newLang: 'en' | 'ge') => {
    setLang(newLang);
    showToast(newLang === 'en' ? 'Language: English (En)' : 'Sprache: Deutsch (Ge)');
  };

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-[#0e0e0e]/85 border-b border-white/10 transition-colors animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-5 sm:px-12 py-5 flex items-center justify-between">
        {/* Developer Name (2-line stacked monospace like Nikita Khvatov in Ref 2) */}
        <a href="#hero" className="group flex items-center gap-3 text-left focus:outline-none">
          <div className="font-mono text-sm sm:text-base leading-tight tracking-tight font-medium">
            <div id="navFirstName" className="text-white group-hover:opacity-80 transition-opacity duration-200">{firstName}</div>
            <div id="navLastName" className="text-neutral-300 group-hover:text-white transition-colors duration-200">{lastName}</div>
          </div>
          <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-white/15 text-neutral-400 group-hover:border-white/30 transition-colors">
            [Placeholder]
          </span>
        </a>

        {/* Center Nav Links (About, Projects, Articles, Contacts — Exact Ref 2) */}
        <nav className="hidden md:flex items-center gap-8 text-xs sm:text-[13px] font-sans text-neutral-300">
          <a href="#about" className="hover:text-white transition-colors duration-200 py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-250">About</a>
          <a href="#projects" className="hover:text-white transition-colors duration-200 py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-250">Projects</a>
          <a href="#articles" className="hover:text-white transition-colors duration-200 py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-250">Articles</a>
          <a href="#work" className="hover:text-white transition-colors duration-200 py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-250">Work</a>
          <a href="#contacts" className="hover:text-white transition-colors duration-200 py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-250">Contacts</a>
        </nav>

        {/* Right Controls: Edit Placeholders, Theme Mode, and En/Ge Language Switcher inside circle (Ref 2) */}
        <div className="flex items-center gap-2.5">
          <button
            id="openCustomizerBtn"
            onClick={() => setCustomizerOpen(true)}
            className="px-3 py-1.5 rounded-full text-xs font-mono border border-white/20 bg-white/5 hover:bg-white hover:text-black transition duration-200 flex items-center gap-1.5 active:scale-95"
          >
            <span>✎</span>
            <span className="hidden sm:inline">Edit Details</span>
          </button>

          <button
            id="themeToggleBtn"
            onClick={toggleTheme}
            className="px-2.5 py-1.5 rounded-full text-xs font-mono border border-white/15 hover:border-white/40 text-neutral-300 transition duration-200 active:scale-95"
            title="Switch Dark / Light ASCII Aesthetic (Ref 1/2 vs Ref 3/4)"
          >
            ◐ Mode
          </button>

          {/* Ref 2 Language Switcher inside subtle circle */}
          <div className="relative w-11 h-11 rounded-full border border-white/15 flex flex-col items-center justify-center text-[11px] font-mono leading-none select-none hover:border-white/35 transition-colors">
            <button
              id="langEnBtn"
              onClick={() => handleLang('en')}
              className={lang === 'en' ? 'font-bold text-white hover:opacity-80 transition' : 'text-neutral-500 hover:text-neutral-300 transition'}
            >
              En
            </button>
            <button
              id="langGeBtn"
              onClick={() => handleLang('ge')}
              className={lang === 'ge' ? 'font-bold text-white hover:opacity-80 transition mt-0.5' : 'text-neutral-500 hover:text-neutral-300 transition mt-0.5'}
            >
              Ge
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobileMenuBtn"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg border border-white/15 text-neutral-300 hover:text-white active:scale-95 transition"
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      <div id="mobileMenu" className={`${mobileOpen ? 'block' : 'hidden'} md:hidden border-t border-white/10 bg-[#111111] px-6 py-4 space-y-2 text-sm font-mono animate-fade-in`}>
        <a href="#about" onClick={() => setMobileOpen(false)} className="block py-1.5 text-neutral-300 hover:text-white">01 // About</a>
        <a href="#projects" onClick={() => setMobileOpen(false)} className="block py-1.5 text-neutral-300 hover:text-white">02 // Projects</a>
        <a href="#articles" onClick={() => setMobileOpen(false)} className="block py-1.5 text-neutral-300 hover:text-white">03 // Articles</a>
        <a href="#work" onClick={() => setMobileOpen(false)} className="block py-1.5 text-neutral-300 hover:text-white">04 // Work</a>
        <a href="#contacts" onClick={() => setMobileOpen(false)} className="block py-1.5 text-neutral-300 hover:text-white">05 // Contacts</a>
      </div>
    </header>
  );
}
