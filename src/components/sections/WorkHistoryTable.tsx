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
    <section id="work" className="pt-14 pb-16 border-t border-glacier/30">
      <ScrollReveal className="flex items-end justify-between mb-8">
        <div className="font-mono text-xs text-ultraviolet font-bold">
          ... /Work_History ...
        </div>
        <h2 className="font-mono text-5xl sm:text-7xl font-bold tracking-tight text-right text-ultraviolet drop-shadow-[0_2px_20px_rgba(111,61,255,0.25)]">
          Work
        </h2>
      </ScrollReveal>

      {/* Work Rows Container (Exact Ref 2 layout with inverted active row in Ultraviolet) */}
      <ScrollReveal delay={120} distance={18}>
        <div id="workTableContainer" className="border-t border-b border-glacier/30 divide-y divide-glacier/20 font-mono">
          {workHistory.map((item, idx) => {
            const isActive = idx === activeWorkIndex;
            return (
              <div
                key={item.company + item.period}
                data-work-idx={idx}
                onClick={() => handleSelectWork(idx)}
                className={`work-row ${isActive ? 'active-row shadow-inner' : 'hover:bg-glacier/25 text-[#0F172A]'} px-5 sm:px-8 py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center cursor-pointer transition-all duration-200`}
              >
                <div className="sm:col-span-3">
                  <div className="text-xs sm:text-sm font-bold">{item.period}</div>
                  <div className="work-muted text-[11px] text-[#64748B] font-medium">{item.duration}</div>
                </div>
                <div className="sm:col-span-4 text-xs sm:text-sm font-semibold flex items-center justify-between sm:justify-start gap-4">
                  <span>{item.company}</span>
                  {isActive && <span className="text-xs text-glacier animate-bounce">◣</span>}
                </div>
                <div className="sm:col-span-5 text-xs sm:text-sm sm:text-left flex items-center justify-between gap-2">
                  <span>{item.role}</span>
                  <span className={`text-xs transition-transform duration-200 ${isActive ? 'translate-x-1 opacity-100 font-bold text-glacier' : 'opacity-60 text-[#64748B]'}`}>→</span>
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
          className="mt-5 rounded-2xl border border-glacier/70 bg-white p-5 font-mono text-xs sm:text-sm text-[#334155] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 hover:border-ultraviolet shadow-md"
        >
          <div className={`transition-all duration-250 ${panelAnim ? 'opacity-40 translate-y-1' : 'opacity-100 translate-y-0'}`}>
            <div id="workDetailHeader" className="text-ultraviolet font-bold text-sm sm:text-base">
              {active.company} — {active.role} ({active.period})
            </div>
            <p id="workDetailBody" className="mt-1.5 text-[#475569] font-sans text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
              {active.details}
            </p>
          </div>
          <div id="workDetailBadges" className="flex flex-wrap gap-2 shrink-0">
            {active.badges.map((badge) => (
              <span key={badge} className="px-3 py-1 rounded-full border border-glacier text-ultraviolet bg-glacier/30 text-xs font-semibold hover:border-ultraviolet hover:bg-ultraviolet hover:text-white transition duration-200">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Bottom Right Total Work Experience Summary (Exact Ref 2) */}
      <ScrollReveal delay={250} distance={14} className="mt-6 flex justify-end text-right">
        <div className="text-xs font-sans text-[#64748B] font-medium">
          <div>Work experience</div>
          <div id="totalExperienceLabel" className="italic font-serif text-ultraviolet font-bold text-sm mt-0.5">
            4 years 9 months
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
