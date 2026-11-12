'use client';

import React from 'react';
import FooterHorizonCanvas from '@/components/canvas/FooterHorizonCanvas';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { usePortfolioStore } from '@/stores/usePortfolioStore';

export default function DirectoryFooter() {
  const firstName = usePortfolioStore((s) => s.firstName);
  const lastName = usePortfolioStore((s) => s.lastName);
  const email = usePortfolioStore((s) => s.email);
  const openDetailModal = usePortfolioStore((s) => s.openDetailModal);
  const setCustomizerOpen = usePortfolioStore((s) => s.setCustomizerOpen);
  const showToast = usePortfolioStore((s) => s.showToast);

  const openScheduleModal = () => {
    openDetailModal({
      badge: 'SCHEDULE DEMO // CONTACT',
      title: 'Provide your customers the assistance they need',
      content: `Send a direct message or schedule an architecture walkthrough with ${firstName} ${lastName} (${email}).`,
      asciiText: null,
      showForm: true,
    });
  };

  const copyEmail = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    } catch {
      // fallback
    }
    showToast(`Copied ${email} to clipboard!`);
  };

  const handleSceneJump = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contacts" className="mt-6 bg-[#080808] border-t border-white/10 relative overflow-hidden">
      {/* 100% FULL-SCREEN INTERACTIVE STIPPLED PARTICLE & ASCII HORIZON ARTWORK (Edge-to-Edge 100vw x 90vh) */}
      <div
        className="relative w-screen left-1/2 -translate-x-1/2 h-[78vh] sm:h-[92vh] min-h-[540px] cursor-crosshair select-none"
        title="Move cursor across the particle dunes & figures • Click anywhere to trigger a connection shockwave"
      >
        <FooterHorizonCanvas />
      </div>

      {/* CTA & 4-Column Directory (Strictly matching Reference 1 layout & typography) */}
      <div className="max-w-7xl mx-auto px-5 sm:px-12 pt-4 pb-16 relative z-20">
        <ScrollReveal className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-20">
          <h2 className="font-sans text-3xl sm:text-[44px] font-normal tracking-tight leading-[1.18] text-[#5e5e5e] max-w-lg">
            Provide your <span className="text-[#f3f3f3] font-normal">customers</span><br />
            the assistance<br />
            they need
          </h2>

          <div className="flex items-center gap-3 pt-2">
            <button
              id="scheduleDemoBtn"
              onClick={openScheduleModal}
              className="px-7 py-3.5 bg-[#f5f5f5] text-[#0b0b0b] font-sans text-xs sm:text-[13px] font-medium hover:bg-white transition duration-200 shadow-xl transform hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,255,255,0.2)] active:scale-95"
            >
              Schedule a demo
            </button>
            <button
              id="copyEmailBtn"
              onClick={copyEmail}
              className="px-5 py-3.5 border border-white/20 text-neutral-200 font-mono text-xs hover:bg-white/10 hover:border-white/40 transition duration-200 transform hover:-translate-y-0.5 active:scale-95"
            >
              Copy Email
            </button>
          </div>
        </ScrollReveal>

        {/* 4-Column Minimalist Footer Links with Staggered ScrollReveal */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-16 text-xs">
          <ScrollReveal delay={100} distance={16}>
            <div className="font-mono uppercase tracking-wider text-[#5e5e5e] mb-5 text-[11px]">SYSTEM</div>
            <ul className="space-y-3 text-neutral-200 font-sans">
              <li><a href="#hero" className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block">Interactive Chat</a></li>
              <li><a href="#about" className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block">Video & Audio Calling</a></li>
              <li><a href="#projects" className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block">Task Management</a></li>
              <li><a href="#work" className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block">Call Handling</a></li>
              <li><a href="#articles" className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block">Email Support</a></li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={160} distance={16}>
            <div className="font-mono uppercase tracking-wider text-[#5e5e5e] mb-5 text-[11px]">ITEMS</div>
            <ul className="space-y-3 text-neutral-200 font-sans">
              <li><button onClick={handleSceneJump} className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block text-left">Creation Hands Shader</button></li>
              <li><button onClick={handleSceneJump} className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block text-left">Scanline Halftone Agent</button></li>
              <li><button onClick={handleSceneJump} className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block text-left">Stippled Horizon Field</button></li>
              <li><button onClick={handleSceneJump} className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block text-left">3D Torus Glyph Matrix</button></li>
              <li><button onClick={() => setCustomizerOpen(true)} className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block text-left">Customize Placeholders</button></li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={220} distance={16}>
            <div className="font-mono uppercase tracking-wider text-[#5e5e5e] mb-5 text-[11px]">HELP CENTER</div>
            <ul className="space-y-3 text-neutral-200 font-sans">
              <li><a href="#about" className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block">Support Chat</a></li>
              <li><a href="#about" className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block">Video Calling & Voice</a></li>
              <li><a href="#projects" className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block">Task Flows</a></li>
              <li><a href="#work" className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block">Call Management</a></li>
              <li><a href="#contacts" className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block">Email Communication</a></li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={280} distance={16}>
            <div className="font-mono uppercase tracking-wider text-[#5e5e5e] mb-5 text-[11px]">GET STARTED TODAY</div>
            <ul className="space-y-3 text-neutral-200 font-sans">
              <li><button onClick={openScheduleModal} className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block text-left">Schedule Architecture Call</button></li>
              <li><a href="#projects" className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block">Video & Voice Calls</a></li>
              <li><a href="#work" className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block">Automated Workflows</a></li>
              <li><a href="#articles" className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block">Call Routing</a></li>
              <li><a href="#hero" className="hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-block">Correspondence ↑</a></li>
            </ul>
          </ScrollReveal>
        </div>

        {/* Bottom Hairline & Copyright */}
        <ScrollReveal delay={320} distance={12} className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#555555]">
          <div id="footerCopyright">
            © 2026 ACQUIRE // {`${firstName} ${lastName}`.toUpperCase()} PLACEHOLDER. ALL RIGHTS RESERVED.
          </div>
          <div>HIGH-DEFINITION REFERENCE ASCII ENGINE</div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
