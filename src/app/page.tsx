import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ArticlesCarousel from '@/components/sections/ArticlesCarousel';
import AboutSkillsSection from '@/components/sections/AboutSkillsSection';
import ProjectsGrid from '@/components/sections/ProjectsGrid';
import WorkHistoryTable from '@/components/sections/WorkHistoryTable';
import DirectoryFooter from '@/components/layout/DirectoryFooter';

export default function HomePage() {
  return (
    <>
      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
        {/* SECTION 1: 100% FULL-SCREEN INTEGRATED HERO SECTION */}
        <HeroSection />

        {/* FEATURED ARTICLES CAROUSEL */}
        <ArticlesCarousel />

        {/* SECTION 2: /About me & SKILLS MATRIX */}
        <AboutSkillsSection />

        {/* SECTION 3: FEATURED FULL-STACK PROJECTS */}
        <ProjectsGrid />

        {/* SECTION 4: Work EXPERIENCE TABLE */}
        <WorkHistoryTable />
      </main>

      {/* SECTION 5: FULL-BLEED ULTRA-DETAILED PARTICLE & ASCII HORIZON FOOTER */}
      <DirectoryFooter />
    </>
  );
}
