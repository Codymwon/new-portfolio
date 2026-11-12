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
    <section id="projects" className="py-16 border-t border-white/10">
      <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="font-mono text-xs text-neutral-400 mb-2">... /Selected_Projects ...</div>
          <h2 className="font-mono text-3xl sm:text-5xl font-bold tracking-tight">
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
                    ? 'proj-filter-btn px-3.5 py-1.5 rounded-full bg-white text-black font-medium transition duration-200 transform scale-105 shadow-md'
                    : 'proj-filter-btn px-3.5 py-1.5 rounded-full border border-white/15 text-neutral-300 hover:border-white/40 hover:text-white transition duration-200 active:scale-95'
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
              className="project-card scanline-card group cursor-pointer rounded-3xl border border-white/15 bg-[#151515] hover:bg-[#1a1a1a] hover:border-white/40 p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(0,0,0,0.7)] h-full active:scale-[0.99]"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-3">
                  <span className="group-hover:text-neutral-200 transition-colors">0{idx + 1} // {proj.category.toUpperCase()}</span>
                  <span>{proj.year}</span>
                </div>
                <pre className="mb-4 p-3 rounded-2xl bg-black/85 border border-white/10 group-hover:border-white/20 font-mono text-[11px] leading-tight text-neutral-300 group-hover:text-white transition overflow-x-auto select-none">
                  {proj.asciiPreview.join('\n')}
                </pre>
                <h3 className="font-mono text-base sm:text-lg font-bold text-white group-hover:underline decoration-white/40 underline-offset-4 transition-colors">
                  {proj.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                  {proj.summary}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-neutral-300 group-hover:border-white/25 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="w-8 h-8 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black flex items-center justify-center font-mono text-xs transition duration-200 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 shadow">
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
