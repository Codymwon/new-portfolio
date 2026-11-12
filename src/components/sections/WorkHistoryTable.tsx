'use client';

import React, { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { workHistory } from '@/data/workHistory';
import { usePortfolioStore } from '@/stores/usePortfolioStore';

export default function WorkHistoryTable() {
  const activeWorkIndex = usePortfolioStore((s) => s.activeWorkIndex);
  const setActiveWorkIndex = usePortfolioStore((s) => s.setActiveWorkIndex);
  const [panelAnim, setPanelAnim] = useState(false);

  const active = workHistory[activeWorkIndex] || workHistory[0];

  const handleSelectWork = (idx: number) => {
    setPanelAnim(true);
    setActiveWorkIndex(idx);
  };

  useEffect(() => {
    const timer = setTimeout(() => setPanelAnim(false), 250);
    return () => clearTimeout(timer);
  }, [activeWorkIndex]);

  return (
    <section id="work" className="pt-14 pb-16 border-t border-white/10">
      <ScrollReveal className="flex items-end justify-between mb-8">
        <div className="font-mono text-xs text-neutral-400">
          ... /Work_History ...
        </div>
        <h2 className="font-mono text-5xl sm:text-7xl font-bold tracking-tight text-right">
          Work
        </h2>
      </ScrollReveal>

      {/* Work Rows Container (Exact Ref 2 layout with inverted active row) */}
      <ScrollReveal delay={120} distance={18}>
        <div id="workTableContainer" className="border-t border-b border-white/15 divide-y divide-white/15 font-mono">
          {workHistory.map((item, idx) => {
            const isActive = idx === activeWorkIndex;
            return (
              <div
                key={item.company + item.period}
                data-work-idx={idx}
                onClick={() => handleSelectWork(idx)}
                className={`work-row ${isActive ? 'active-row shadow-inner' : ''} px-5 sm:px-8 py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center cursor-pointer transition-all duration-200`}
              >
                <div className="sm:col-span-3">
                  <div className="text-xs sm:text-sm font-bold">{item.period}</div>
                  <div className="work-muted text-[11px] text-neutral-500">{item.duration}</div>
                </div>
                <div className="sm:col-span-4 text-xs sm:text-sm font-semibold flex items-center justify-between sm:justify-start gap-4">
                  <span>{item.company}</span>
                  {isActive && <span className="text-xs animate-bounce">◣</span>}
                </div>
                <div className="sm:col-span-5 text-xs sm:text-sm sm:text-left flex items-center justify-between gap-2">
                  <span>{item.role}</span>
                  <span className={`text-xs transition-transform duration-200 ${isActive ? 'translate-x-1 opacity-100 font-bold' : 'opacity-60'}`}>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Selected Work Row Expandable Drawer with smooth state transition */}
      <ScrollReveal delay={200} distance={16}>
        <div
          id="workDetailPanel"
          className="mt-5 rounded-2xl border border-white/15 bg-[#161616] p-5 font-mono text-xs sm:text-sm text-neutral-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 hover:border-white/30 shadow-xl"
        >
          <div className={`transition-all duration-250 ${panelAnim ? 'opacity-40 translate-y-1' : 'opacity-100 translate-y-0'}`}>
            <div id="workDetailHeader" className="text-white font-bold text-sm sm:text-base">
              {active.company} — {active.role} ({active.period})
            </div>
            <p id="workDetailBody" className="mt-1.5 text-neutral-400 font-sans text-xs sm:text-sm leading-relaxed max-w-2xl">
              {active.details}
            </p>
          </div>
          <div id="workDetailBadges" className="flex flex-wrap gap-2 shrink-0">
            {active.badges.map((badge) => (
              <span key={badge} className="px-3 py-1 rounded-full border border-white/15 text-xs hover:border-white/40 hover:bg-white/5 transition duration-200">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Bottom Right Total Work Experience Summary (Exact Ref 2) */}
      <ScrollReveal delay={250} distance={14} className="mt-6 flex justify-end text-right">
        <div className="text-xs font-sans text-neutral-400">
          <div>Work experience</div>
          <div id="totalExperienceLabel" className="italic font-serif text-white text-sm mt-0.5">
            4 years 9 months
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
