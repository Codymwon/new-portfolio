'use client';

import React, { useState, useEffect } from 'react';
import ArticleOrbCanvas from '@/components/canvas/ArticleOrbCanvas';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { articles } from '@/data/articles';
import { usePortfolioStore } from '@/stores/usePortfolioStore';

export default function ArticlesCarousel() {
  const activeArticleIndex = usePortfolioStore((s) => s.activeArticleIndex);
  const setActiveArticleIndex = usePortfolioStore((s) => s.setActiveArticleIndex);
  const openDetailModal = usePortfolioStore((s) => s.openDetailModal);
  const [animating, setAnimating] = useState(false);

  const total = articles.length;
  const curr = articles[activeArticleIndex] || articles[0];
  const prev = articles[(activeArticleIndex - 1 + total) % total];
  const next = articles[(activeArticleIndex + 1) % total];

  const stepCarousel = (dir: number) => {
    setAnimating(true);
    setActiveArticleIndex((prevIdx) => (prevIdx + dir + total) % total);
  };

  useEffect(() => {
    const timer = setTimeout(() => setAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [activeArticleIndex]);

  const openCurrentArticle = () => {
    openDetailModal({
      badge: curr.tag,
      title: curr.title,
      content: curr.desc,
      asciiText: curr.asciiDiagram,
      showForm: false,
    });
  };

  return (
    <ScrollReveal id="articles" className="mt-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left Dimmed Card (Prev Preview) with hover transition */}
        <div
          id="carouselPrevCard"
          onClick={() => stepCarousel(-1)}
          className="hidden md:flex md:col-span-3 rounded-3xl border border-glacier/60 bg-white/70 hover:bg-white/95 p-6 flex-col justify-between opacity-60 hover:opacity-100 hover:border-ultraviolet hover:scale-[1.01] transition duration-300 cursor-pointer relative overflow-hidden group shadow-md"
        >
          <div>
            <h3 id="prevCardTitle" className="font-mono text-sm font-semibold text-[#334155] leading-snug group-hover:text-ultraviolet transition-colors">
              {prev.title}
            </h3>
            <p id="prevCardDesc" className="mt-2.5 text-xs text-[#64748B] line-clamp-3 leading-relaxed">
              {prev.desc}
            </p>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <span className="px-4 py-1.5 rounded-full border border-glacier text-[11px] text-ultraviolet font-semibold group-hover:bg-glacier group-hover:text-[#0F172A] transition">
              Read more
            </span>
            <span className="w-7 h-7 rounded-full border border-glacier flex items-center justify-center text-xs text-ultraviolet group-hover:bg-glacier group-hover:text-[#0F172A] group-hover:translate-x-0.5 transition">
              →
            </span>
          </div>
          {/* Left Circular Arrow Overlay (Ref 2) */}
          <button
            id="carouselPrevBtn"
            onClick={(e) => {
              e.stopPropagation();
              stepCarousel(-1);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-glacier bg-white/90 hover:bg-glacier hover:text-[#0F172A] text-ultraviolet flex items-center justify-center transition duration-200 z-20 shadow-lg active:scale-90 font-bold"
            aria-label="Previous Article"
          >
            ←
          </button>
        </div>

        {/* Center Active Highlight Card */}
        <div className="md:col-span-6 rounded-3xl border-2 border-glacier bg-white overflow-hidden grid grid-cols-1 sm:grid-cols-12 shadow-xl interactive-card">
          {/* Left Visual Canvas */}
          <div className="sm:col-span-5 relative min-h-[210px] bg-[#EAF1F8] flex items-center justify-center overflow-hidden">
            <ArticleOrbCanvas />
            <span id="activeCardTag" className="absolute top-3 left-3 px-2 py-0.5 rounded bg-ultraviolet text-white font-mono text-[10px] font-semibold border border-ultraviolet/40 transition-opacity duration-300 shadow">
              {curr.tag}
            </span>
          </div>
          {/* Right Text Content with smooth transition on index change */}
          <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
            <div className={`transition-all duration-300 ${animating ? 'opacity-40 translate-y-1' : 'opacity-100 translate-y-0'}`}>
              <div className="flex items-center justify-between text-[11px] font-mono text-ultraviolet mb-1.5 font-bold">
                <span id="activeCardIndex">ARTICLE 0{activeArticleIndex + 1} / 0{total}</span>
                <span id="activeCardReadTime" className="text-[#64748B] font-medium">{curr.readTime}</span>
              </div>
              <h3 id="activeCardTitle" className="font-mono text-base sm:text-lg font-bold text-[#0F172A] leading-snug">
                {curr.title}
              </h3>
              <p id="activeCardDesc" className="mt-2.5 text-xs sm:text-[13px] text-[#475569] leading-relaxed font-medium">
                {curr.desc}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <button
                  id="openArticleModalBtn"
                  onClick={openCurrentArticle}
                  className="px-6 py-2 rounded-full bg-glacier text-[#0F172A] hover:bg-ultraviolet hover:text-white border border-glacier text-xs font-bold italic transition duration-200 transform hover:-translate-y-0.5 shadow-md active:scale-95"
                >
                  Read more
                </button>
                <button
                  id="openArticleModalIconBtn"
                  onClick={openCurrentArticle}
                  className="w-8 h-8 rounded-full bg-glacier text-[#0F172A] hover:bg-ultraviolet hover:text-white border border-glacier flex items-center justify-center text-xs font-mono font-bold transition duration-200 transform hover:scale-105 shadow-md active:scale-90"
                  aria-label="Read full article"
                >
                  →
                </button>
              </div>
              {/* Mobile Prev/Next controls */}
              <div className="flex md:hidden items-center gap-1.5">
                <button
                  id="carouselPrevBtnMobile"
                  onClick={() => stepCarousel(-1)}
                  className="w-8 h-8 rounded-full border border-glacier bg-white text-ultraviolet flex items-center justify-center text-xs active:scale-90 transition font-bold"
                >
                  ←
                </button>
                <button
                  id="carouselNextBtnMobile"
                  onClick={() => stepCarousel(1)}
                  className="w-8 h-8 rounded-full border border-glacier bg-white text-ultraviolet flex items-center justify-center text-xs active:scale-90 transition font-bold"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Dimmed Card (Next Preview) with hover transition */}
        <div
          id="carouselNextCard"
          onClick={() => stepCarousel(1)}
          className="hidden md:flex md:col-span-3 rounded-3xl border border-glacier/60 bg-white/70 hover:bg-white/95 p-6 flex-col justify-between opacity-60 hover:opacity-100 hover:border-ultraviolet hover:scale-[1.01] transition duration-300 cursor-pointer relative overflow-hidden group shadow-md"
        >
          <div>
            <h3 id="nextCardTitle" className="font-mono text-sm font-semibold text-[#334155] leading-snug group-hover:text-ultraviolet transition-colors">
              {next.title}
            </h3>
            <p id="nextCardDesc" className="mt-2.5 text-xs text-[#64748B] line-clamp-3 leading-relaxed">
              {next.desc}
            </p>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <span className="px-4 py-1.5 rounded-full border border-glacier text-[11px] text-ultraviolet font-semibold group-hover:bg-glacier group-hover:text-[#0F172A] transition">
              Read more
            </span>
            <span className="w-7 h-7 rounded-full border border-glacier flex items-center justify-center text-xs text-ultraviolet group-hover:bg-glacier group-hover:text-[#0F172A] group-hover:translate-x-0.5 transition">
              →
            </span>
          </div>
          {/* Right Circular Arrow Overlay (Ref 2) */}
          <button
            id="carouselNextBtn"
            onClick={(e) => {
              e.stopPropagation();
              stepCarousel(1);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-glacier bg-white/90 hover:bg-glacier hover:text-[#0F172A] text-ultraviolet flex items-center justify-center transition duration-200 z-20 shadow-lg active:scale-90 font-bold"
            aria-label="Next Article"
          >
            →
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
}
