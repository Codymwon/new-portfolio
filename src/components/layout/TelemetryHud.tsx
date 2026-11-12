'use client';

import React, { useEffect } from 'react';
import { usePortfolioStore } from '@/stores/usePortfolioStore';

export default function TelemetryHud() {
  const hudSection = usePortfolioStore((s) => s.hudSection);
  const hudScrollPct = usePortfolioStore((s) => s.hudScrollPct);
  const hudCursorPos = usePortfolioStore((s) => s.hudCursorPos);
  const scrollStreamEnabled = usePortfolioStore((s) => s.scrollStreamEnabled);
  const toggleScrollStream = usePortfolioStore((s) => s.toggleScrollStream);
  const setHudData = usePortfolioStore((s) => s.setHudData);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setHudData({
        hudCursorPos: `XY: ${String(e.clientX).padStart(3, '0')},${String(e.clientY).padStart(3, '0')}`,
      });
    };

    const onScroll = () => {
      const scrollY = window.scrollY || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.round((scrollY / maxScroll) * 100));

      let section = 'SEC: 01 // HERO_ASCII';
      if (pct >= 76) section = 'SEC: 04 // HORIZON_FOOTER';
      else if (pct >= 50) section = 'SEC: 03 // PROJECTS_WORK';
      else if (pct >= 22) section = 'SEC: 02 // ABOUT_STACK';

      setHudData({
        hudScrollPct: pct,
        hudSection: section,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [setHudData]);

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden md:flex items-center gap-3 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-glacier text-[11px] font-mono text-[#334155] shadow-lg animate-fade-in-up animate-delay-500 hover:border-ultraviolet transition-colors font-medium">
      <span className="inline-block w-2 h-2 rounded-full bg-ultraviolet animate-pulse shadow-[0_0_8px_#6F3DFF]" />
      <span id="hudSectionLabel" className="text-ultraviolet font-bold">{hudSection}</span>
      <span className="text-glacier">|</span>
      <span id="hudScrollPct" className="text-[#64748B]">SCROLL: {hudScrollPct}%</span>
      <span className="text-glacier">|</span>
      <span id="hudCursorPos" className="text-ultraviolet font-bold">{hudCursorPos}</span>
      <button
        id="toggleScrollStreamBtn"
        onClick={toggleScrollStream}
        className="ml-1 px-2 py-0.5 rounded bg-glacier/35 hover:bg-ultraviolet hover:text-white text-ultraviolet border border-glacier/60 transition duration-200 active:scale-90 font-bold"
        title="Toggle Scroll ASCII Trail"
      >
        Trail: {scrollStreamEnabled ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}
