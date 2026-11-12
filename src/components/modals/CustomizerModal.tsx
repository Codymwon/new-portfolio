'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '@/stores/usePortfolioStore';

export default function CustomizerModal() {
  const isCustomizerOpen = usePortfolioStore((s) => s.isCustomizerOpen);
  const setCustomizerOpen = usePortfolioStore((s) => s.setCustomizerOpen);
  const firstName = usePortfolioStore((s) => s.firstName);
  const lastName = usePortfolioStore((s) => s.lastName);
  const yearsExp = usePortfolioStore((s) => s.yearsExp);
  const email = usePortfolioStore((s) => s.email);
  const frontendStack = usePortfolioStore((s) => s.frontendStack);
  const backendStack = usePortfolioStore((s) => s.backendStack);
  const setProfile = usePortfolioStore((s) => s.setProfile);
  const showToast = usePortfolioStore((s) => s.showToast);
  const heroFont = usePortfolioStore((s) => s.heroFont);
  const setHeroFont = usePortfolioStore((s) => s.setHeroFont);

  const [formFirstName, setFormFirstName] = useState(firstName);
  const [formLastName, setFormLastName] = useState(lastName);
  const [formYears, setFormYears] = useState(yearsExp);
  const [formEmail, setFormEmail] = useState(email);
  const [formFrontend, setFormFrontend] = useState(frontendStack);
  const [formBackend, setFormBackend] = useState(backendStack);

  useEffect(() => {
    if (isCustomizerOpen) {
      setFormFirstName(firstName);
      setFormLastName(lastName);
      setFormYears(yearsExp);
      setFormEmail(email);
      setFormFrontend(frontendStack);
      setFormBackend(backendStack);
    }
  }, [isCustomizerOpen, firstName, lastName, yearsExp, email, frontendStack, backendStack]);

  if (!isCustomizerOpen) return null;

  const loadPresetRef = () => {
    setFormFirstName('Nikita');
    setFormLastName('Khvatov');
    setFormYears('5 years');
    setFormEmail('hello@khvatov.dev');
  };

  const loadPresetAlex = () => {
    setFormFirstName('Alex');
    setFormLastName('Mercer');
    setFormYears('5 years');
    setFormEmail('hello@alexmercer.dev');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFirst = formFirstName.trim() || 'Nikita';
    const updatedLast = formLastName.trim() || 'Khvatov';
    setProfile({
      firstName: updatedFirst,
      lastName: updatedLast,
      yearsExp: formYears.trim() || '5 years',
      email: formEmail.trim() || 'hello@khvatov.dev',
      frontendStack: formFrontend.trim() || frontendStack,
      backendStack: formBackend.trim() || backendStack,
    });
    setCustomizerOpen(false);
    showToast(`Updated portfolio: ${updatedFirst} ${updatedLast}`);
  };

  return (
    <div
      id="customizerModal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
    >
      <div className="w-full max-w-xl rounded-2xl border-2 border-glacier bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between pb-4 border-b border-glacier/30">
          <div>
            <h3 className="font-mono text-base font-bold text-ultraviolet">Customize Portfolio Placeholders</h3>
            <p className="text-xs text-[#64748B] mt-0.5 font-medium">Switch presets, fonts, or enter your own details anytime — updates live across the site.</p>
          </div>
          <button
            id="closeCustomizerBtn"
            onClick={() => setCustomizerOpen(false)}
            className="w-8 h-8 rounded-full border border-glacier bg-white flex items-center justify-center text-[#64748B] hover:text-ultraviolet hover:border-ultraviolet transition"
          >
            ✕
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            id="presetRefBtn"
            type="button"
            onClick={loadPresetRef}
            className="px-3 py-1.5 rounded-lg border border-glacier bg-glacier/30 hover:bg-ultraviolet hover:text-white text-xs font-mono text-ultraviolet font-bold transition shadow-xs"
          >
            Load Ref 2 Exact (Nikita Khvatov)
          </button>
          <button
            id="presetPlaceholderBtn"
            type="button"
            onClick={loadPresetAlex}
            className="px-3 py-1.5 rounded-lg border border-glacier bg-glacier/30 hover:bg-ultraviolet hover:text-white text-xs font-mono text-ultraviolet font-bold transition shadow-xs"
          >
            Load Default Placeholder (Alex Mercer)
          </button>
        </div>

        {/* Hero Title Typeface Selection */}
        <div className="mt-4 pt-3 border-t border-glacier/30">
          <div className="text-[11px] font-mono text-ultraviolet font-bold mb-2">HERO TITLE TYPEFACE:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'display', label: 'Space Grotesk', desc: 'Architectural (Recommended)' },
              { id: 'syne', label: 'Syne', desc: 'Avant-Garde' },
              { id: 'spaceMono', label: 'Space Mono', desc: 'Retro-Futurist' },
              { id: 'mono', label: 'Fira Code', desc: 'IDE Monospace' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setHeroFont(f.id as any);
                  showToast(`Switched Hero Typeface to ${f.label}`);
                }}
                className={`px-2.5 py-2 rounded-xl border text-left transition ${
                  heroFont === f.id
                    ? 'border-ultraviolet bg-ultraviolet text-white shadow-md'
                    : 'border-glacier bg-[#F0F5FA] text-[#334155] hover:border-ultraviolet'
                }`}
              >
                <div className="font-bold text-xs">{f.label}</div>
                <div className="text-[9px] opacity-80 mt-0.5">{f.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <form id="customizerForm" onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#334155] font-semibold mb-1">First Name</label>
              <input
                id="inputFirstName"
                type="text"
                value={formFirstName}
                onChange={(e) => setFormFirstName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F0F5FA] border border-glacier/80 text-[#0F172A] focus:outline-none focus:border-ultraviolet font-medium"
              />
            </div>
            <div>
              <label className="block text-[#334155] font-semibold mb-1">Last Name</label>
              <input
                id="inputLastName"
                type="text"
                value={formLastName}
                onChange={(e) => setFormLastName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F0F5FA] border border-glacier/80 text-[#0F172A] focus:outline-none focus:border-ultraviolet font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#334155] font-semibold mb-1">Years of Experience</label>
              <input
                id="inputYears"
                type="text"
                value={formYears}
                onChange={(e) => setFormYears(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F0F5FA] border border-glacier/80 text-[#0F172A] focus:outline-none focus:border-ultraviolet font-medium"
              />
            </div>
            <div>
              <label className="block text-[#334155] font-semibold mb-1">Contact Email (Placeholder)</label>
              <input
                id="inputEmail"
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F0F5FA] border border-glacier/80 text-[#0F172A] focus:outline-none focus:border-ultraviolet font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#334155] font-semibold mb-1">Front-end Stack</label>
            <input
              id="inputFrontend"
              type="text"
              value={formFrontend}
              onChange={(e) => setFormFrontend(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#F0F5FA] border border-glacier/80 text-[#0F172A] focus:outline-none focus:border-ultraviolet font-medium"
            />
          </div>

          <div>
            <label className="block text-[#334155] font-semibold mb-1">Back-end Stack</label>
            <input
              id="inputBackend"
              type="text"
              value={formBackend}
              onChange={(e) => setFormBackend(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#F0F5FA] border border-glacier/80 text-[#0F172A] focus:outline-none focus:border-ultraviolet font-medium"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-glacier/30">
            <button
              type="button"
              id="cancelCustomizerBtn"
              onClick={() => setCustomizerOpen(false)}
              className="px-4 py-2 rounded-full border border-glacier text-[#64748B] hover:text-[#0F172A] hover:border-ultraviolet transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-ultraviolet text-white font-mono text-xs font-bold hover:bg-glacier hover:text-[#0F172A] transition shadow-md"
            >
              Save & Apply Live
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
