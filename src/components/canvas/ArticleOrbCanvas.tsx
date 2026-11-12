'use client';

import React, { useEffect, useRef } from 'react';

export default function ArticleOrbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const isVisibleRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/assets/maps/orb-card.png';
    imgRef.current = img;

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

    const render = (now: number) => {
      if (!isVisibleRef.current) {
        animId = requestAnimationFrame(render);
        return;
      }

      const w = canvas.clientWidth || 220;
      const h = canvas.clientHeight || 210;

      // Only resize if dimensions actually changed (prevents memory churn)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);

      if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
        ctx.drawImage(imgRef.current, 0, 0, w, h);
      }

      const t = now * 0.0015;
      ctx.font = '10px "Fira Code", monospace';
      const glyphs = '.:+*#%@';
      const cx = w * 0.52;
      const cy = h * 0.52;
      const rx = w * 0.36;
      const ry = h * 0.28;

      ctx.fillStyle = 'rgba(255,255,255,0.65)';
      for (let i = 0; i < 24; i++) {
        const ang = (i / 24) * Math.PI * 2 + t;
        const x = cx + Math.cos(ang) * rx;
        const y = cy + Math.sin(ang) * ry;
        ctx.fillText(glyphs[i % glyphs.length], x, y);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="articleOrbCanvas"
      className="w-full h-full block"
    />
  );
}
