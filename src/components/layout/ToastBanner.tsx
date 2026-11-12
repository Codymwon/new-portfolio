'use client';

import React, { useEffect } from 'react';
import { usePortfolioStore } from '@/stores/usePortfolioStore';

export default function ToastBanner() {
  const toast = usePortfolioStore((s) => s.toast);
  const hideToast = usePortfolioStore((s) => s.hideToast);

  useEffect(() => {
    if (toast.isOpen) {
      const timer = setTimeout(() => {
        hideToast();
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [toast.isOpen, hideToast]);

  if (!toast.isOpen) return null;

  return (
    <div
      id="toastBanner"
      className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl bg-white text-black font-mono text-xs shadow-2xl border border-black/10 animate-fade-in-down transition-all duration-200"
    >
      {toast.message}
    </div>
  );
}
