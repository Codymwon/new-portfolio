'use client';

import React, { useEffect, useRef } from 'react';
import {
  createEmptyMap,
  loadLuminanceMapFromUrl,
  sampleMapBilinear,
  LuminanceMap,
} from '@/utils/luminanceSampler';
import { usePortfolioStore } from '@/stores/usePortfolioStore';

export default function PortraitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const mapRef = useRef<LuminanceMap>(createEmptyMap());
  const mouseRef = useRef({ x: -999, y: -999 });
  const isVisibleRef = useRef<boolean>(false);

  const portraitMode = usePortfolioStore((s) => s.portraitMode);
  const cyclePortraitMode = usePortfolioStore((s) => s.cyclePortraitMode);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/assets/maps/portrait.png';
    imgRef.current = img;

    loadLuminanceMapFromUrl('/assets/maps/portrait.png', mapRef.current);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = -999;
      mouseRef.current.y = -999;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const render = (now: number) => {
      if (!isVisibleRef.current) {
        animId = requestAnimationFrame(render);
        return;
      }

      const w = canvas.clientWidth || 330;
      const h = canvas.clientHeight || 390;

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      const t = now * 0.001;
      ctx.fillStyle = '#0c0c0c';
      ctx.fillRect(0, 0, w, h);

      // Mode 1: Photo + Interactive ASCII X-Ray Lens on Hover
      if (
        portraitMode === 'lens' &&
        imgRef.current &&
        imgRef.current.complete &&
        imgRef.current.naturalWidth > 0
      ) {
        ctx.drawImage(imgRef.current, 0, 0, w, h);

        const pmX = mouseRef.current.x;
        const pmY = mouseRef.current.y;
        const lensX = pmX > 0 ? pmX : w * (0.5 + 0.28 * Math.cos(t * 1.1));
        const lensY = pmY > 0 ? pmY : h * (0.48 + 0.25 * Math.sin(t * 1.4));
        const lensR = pmX > 0 ? 95 : 68;

        ctx.save();
        ctx.beginPath();
        ctx.arc(lensX, lensY, lensR, 0, Math.PI * 2);
        ctx.clip();

        ctx.fillStyle = '#090909';
        ctx.fillRect(lensX - lensR, lensY - lensR, lensR * 2, lensR * 2);

        if (mapRef.current.ready) {
          const chars = ' .:-=+*#%@';
          ctx.font = '600 9px "Fira Code", monospace';
          ctx.textBaseline = 'top';
          for (let y = Math.max(0, Math.floor((lensY - lensR) / 8) * 8); y < Math.min(h, lensY + lensR); y += 8) {
            for (let x = Math.max(0, Math.floor((lensX - lensR) / 6) * 6); x < Math.min(w, lensX + lensR); x += 6) {
              const lum = sampleMapBilinear(mapRef.current, x / w, y / h);
              const idx = Math.min(chars.length - 1, Math.floor(lum * chars.length));
              ctx.fillStyle = `rgba(245,245,245,${0.25 + lum * 0.75})`;
              ctx.fillText(chars[idx], x, y);
            }
          }
        }

        ctx.strokeStyle = 'rgba(255,255,255,0.45)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        animId = requestAnimationFrame(render);
        return;
      }

      // Mode 2 ('halftone') or Mode 3 ('ascii') across full portrait
      if (mapRef.current.ready) {
        const stepY = portraitMode === 'halftone' ? 5 : 9;
        const stepX = portraitMode === 'halftone' ? 6 : 6;
        const chars = ' .·:-=+*#%@';
        ctx.font = '600 9px "Fira Code", monospace';
        ctx.textBaseline = 'top';

        for (let y = 0; y < h; y += stepY) {
          for (let x = 0; x < w; x += stepX) {
            let lum = sampleMapBilinear(mapRef.current, x / w, y / h);
            const dm = Math.hypot(x - mouseRef.current.x, y - mouseRef.current.y);
            if (dm < 90) lum = Math.min(1, lum + (1 - dm / 90) * 0.35);

            if (portraitMode === 'halftone') {
              const barH = Math.max(0.8, lum * (stepY - 1.0));
              ctx.fillStyle = `rgba(242,242,239,${0.15 + lum * 0.85})`;
              ctx.fillRect(x, y + (stepY - barH) * 0.5, stepX - 0.8, barH);
            } else {
              const cIdx = Math.min(chars.length - 1, Math.floor(lum * chars.length));
              if (cIdx > 0) {
                ctx.fillStyle = `rgba(242,242,239,${0.2 + lum * 0.8})`;
                ctx.fillText(chars[cIdx], x, y);
              }
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [portraitMode]);

  return (
    <canvas
      ref={canvasRef}
      id="portraitAsciiCanvas"
      onClick={cyclePortraitMode}
      className="w-full h-full block cursor-pointer"
      title="Move cursor for ASCII X-Ray Lens • Click to switch Portrait Render Style"
    />
  );
}
