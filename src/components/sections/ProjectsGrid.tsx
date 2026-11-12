'use client';

import React from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { projects } from '@/data/projects';
import { Project } from '@/types/portfolio';
import { usePortfolioStore } from '@/stores/usePortfolioStore';

export default function ProjectsGrid() {
  const activeFilter = usePortfolioStore((s) => s.activeFilter);
  const setFilter = usePortfolioStore((s) => s.setFilter);
  const openDetailModal = usePortfolioStore((s) => s.openDetailModal);

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handleProjectClick = (proj: Project) => {
    openDetailModal({
      badge: `PROJECT // ${proj.year}`,
      title: proj.title,
      content: `${proj.summary}\n\nEngineered with ${proj.tech.join(', ')}. Built for deterministic performance, clean modularity, and zero-downtime scalability.`,
      asciiText: proj.asciiPreview.join('\n'),
      showForm: false,
    });
  };

  const filterButtons: Array<{ id: 'all' | 'frontend' | 'backend' | 'devops'; label: string }> = [
    { id: 'all', label: 'All (6)' },
    { id: 'frontend', label: 'Front-end' },
    { id: 'backend', label: 'Back-end' },
    { id: 'devops', label: 'Systems & AI' },
  ];

  return (
    <section id="projects" className="py-16 border-t border-glacier/30">
      <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="font-mono text-xs text-ultraviolet font-bold mb-2">... /Selected_Projects ...</div>
          <h2 className="font-mono text-3xl sm:text-5xl font-bold tracking-tight text-ultraviolet drop-shadow-[0_2px_20px_rgba(111,61,255,0.25)]">
            Projects
          </h2>
        </div>

        {/* Project Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {filterButtons.map((btn) => {
            const isActive = activeFilter === btn.id;
            return (
              <button
                key={btn.id}
                data-filter={btn.id}
                onClick={() => setFilter(btn.id)}
                className={
                  isActive
                    ? 'proj-filter-btn px-3.5 py-1.5 rounded-full bg-ultraviolet text-white font-semibold transition duration-200 transform scale-105 shadow-[0_4px_16px_rgba(111,61,255,0.35)]'
                    : 'proj-filter-btn px-3.5 py-1.5 rounded-full border border-glacier bg-white text-ultraviolet hover:bg-glacier/40 transition duration-200 active:scale-95 shadow-xs font-semibold'
                }
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Projects Grid with Staggered ScrollReveal and Card Lift */}
      <div id="projectsGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj, idx) => (
          <ScrollReveal
            key={proj.id}
            delay={Math.min(400, idx * 80)}
            distance={20}
            className="h-full"
          >
            <article
              data-proj-id={proj.id}
              onClick={() => handleProjectClick(proj)}
              className="project-card scanline-card group cursor-pointer rounded-3xl border border-glacier/70 bg-white hover:bg-white/95 hover:border-ultraviolet p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(111,61,255,0.15)] h-full active:scale-[0.99] shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-ultraviolet mb-3 font-bold">
                  <span className="group-hover:text-ultraviolet transition-colors">0{idx + 1} // {proj.category.toUpperCase()}</span>
                  <span className="text-[#64748B] font-medium">{proj.year}</span>
                </div>
                <pre className="mb-4 p-3 rounded-2xl bg-[#0e0e16] border border-glacier/25 group-hover:border-glacier/40 font-mono text-[11px] leading-tight text-mineral group-hover:text-glacier transition overflow-x-auto select-none shadow-inner">
                  {proj.asciiPreview.join('\n')}
                </pre>
                <h3 className="font-mono text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-ultraviolet group-hover:underline decoration-glacier underline-offset-4 transition-colors">
                  {proj.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed group-hover:text-[#1E293B] transition-colors font-medium">
                  {proj.summary}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-glacier/30 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-glacier/35 border border-glacier font-mono text-[10px] text-ultraviolet font-bold group-hover:border-ultraviolet transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="w-8 h-8 rounded-full border border-glacier bg-white text-ultraviolet group-hover:bg-ultraviolet group-hover:text-white flex items-center justify-center font-mono text-xs transition duration-200 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 shadow-xs font-bold">
                  ↗
                </span>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
