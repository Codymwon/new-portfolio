'use client';

import React from 'react';
import { usePortfolioStore } from '@/stores/usePortfolioStore';

export default function ArchitectureDetailModal() {
  const detailModal = usePortfolioStore((s) => s.detailModal);
  const closeDetailModal = usePortfolioStore((s) => s.closeDetailModal);
  const showToast = usePortfolioStore((s) => s.showToast);

  if (!detailModal.isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeDetailModal();
    showToast('Transmission received! We will respond shortly.');
  };

  return (
    <div
      id="detailModal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
    >
      <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-[#141414] p-6 shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <span id="detailModalBadge" className="px-2.5 py-0.5 rounded bg-white/10 font-mono text-[11px] text-neutral-300">
            {detailModal.badge}
          </span>
          <button
            id="closeDetailModalBtn"
            onClick={closeDetailModal}
            className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-neutral-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <h3 id="detailModalTitle" className="mt-4 font-mono text-lg sm:text-xl font-bold text-white">
          {detailModal.title}
        </h3>
        <p id="detailModalContent" className="mt-3 text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
          {detailModal.content}
        </p>

        {detailModal.asciiText && (
          <pre
            id="detailModalAscii"
            className="mt-4 p-4 rounded-xl bg-black border border-white/10 font-mono text-[11px] text-neutral-300 overflow-x-auto leading-tight"
          >
            {detailModal.asciiText}
          </pre>
        )}

        {detailModal.showForm && (
          <form id="contactModalForm" onSubmit={handleContactSubmit} className="mt-4 space-y-3">
            <input
              id="contactNameInput"
              type="text"
              required
              placeholder="Your Name or Team"
              className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-white"
            />
            <input
              id="contactEmailInput"
              type="email"
              required
              placeholder="your@email.com"
              className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-white"
            />
            <textarea
              id="contactMsgInput"
              rows={3}
              required
              placeholder="Project scope, stack, or timeline..."
              className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold hover:bg-neutral-200 transition"
            >
              Send Transmission →
            </button>
          </form>
        )}

        <div className="mt-5 flex justify-end">
          <button
            id="detailModalActionBtn"
            onClick={closeDetailModal}
            className="px-5 py-2 rounded-full bg-white text-black text-xs font-mono font-semibold hover:bg-neutral-200 transition"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
