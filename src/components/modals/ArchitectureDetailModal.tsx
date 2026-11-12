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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
    >
      <div className="w-full max-w-lg rounded-2xl border-2 border-glacier bg-white p-6 shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between pb-3 border-b border-glacier/40">
          <span id="detailModalBadge" className="px-2.5 py-0.5 rounded bg-ultraviolet text-white font-mono text-[11px] font-semibold shadow">
            {detailModal.badge}
          </span>
          <button
            id="closeDetailModalBtn"
            onClick={closeDetailModal}
            className="w-8 h-8 rounded-full border border-glacier bg-white flex items-center justify-center text-[#64748B] hover:text-ultraviolet hover:border-ultraviolet transition"
          >
            ✕
          </button>
        </div>

        <h3 id="detailModalTitle" className="mt-4 font-mono text-lg sm:text-xl font-bold text-ultraviolet">
          {detailModal.title}
        </h3>
        <p id="detailModalContent" className="mt-3 text-sm text-[#475569] leading-relaxed whitespace-pre-line font-medium">
          {detailModal.content}
        </p>

        {detailModal.asciiText && (
          <pre
            id="detailModalAscii"
            className="mt-4 p-4 rounded-xl bg-[#0e0e16] border border-glacier/30 font-mono text-[11px] text-mineral overflow-x-auto leading-tight shadow-inner"
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
              className="w-full px-3 py-2 rounded-lg bg-[#F0F5FA] border border-glacier/80 text-xs font-mono text-[#0F172A] focus:outline-none focus:border-ultraviolet placeholder:text-[#94A3B8]"
            />
            <input
              id="contactEmailInput"
              type="email"
              required
              placeholder="your@email.com"
              className="w-full px-3 py-2 rounded-lg bg-[#F0F5FA] border border-glacier/80 text-xs font-mono text-[#0F172A] focus:outline-none focus:border-ultraviolet placeholder:text-[#94A3B8]"
            />
            <textarea
              id="contactMsgInput"
              rows={3}
              required
              placeholder="Project scope, stack, or timeline..."
              className="w-full px-3 py-2 rounded-lg bg-[#F0F5FA] border border-glacier/80 text-xs font-mono text-[#0F172A] focus:outline-none focus:border-ultraviolet placeholder:text-[#94A3B8]"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-ultraviolet text-white font-mono text-xs font-bold hover:bg-glacier hover:text-[#0F172A] transition shadow-md"
            >
              Send Transmission →
            </button>
          </form>
        )}

        <div className="mt-5 flex justify-end">
          <button
            id="detailModalActionBtn"
            onClick={closeDetailModal}
            className="px-5 py-2 rounded-full bg-glacier text-[#0F172A] border border-glacier text-xs font-mono font-bold hover:bg-ultraviolet hover:text-white transition shadow-sm"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
