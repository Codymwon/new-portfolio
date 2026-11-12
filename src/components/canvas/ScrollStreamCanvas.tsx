'use client';

import React, { useEffect, useRef } from 'react';
import { usePortfolioStore } from '@/stores/usePortfolioStore';

export default function ScrollStreamCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollStreamEnabled = usePortfolioStore((s) => s.scrollStreamEnabled);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let mouseX = -9999;
    let mouseY = -9999;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const render = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (scrollStreamEnabled) {
        const w = canvas.width;
        const h = canvas.height;
        const t = now * 0.001;
        const scrollY = window.scrollY || 0;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - h);
        const scrollRatio = scrollY / maxScroll;

        const isLight = document.documentElement.classList.contains('light-theme');
        ctx.font = '10px "Fira Code", monospace';

        const numNodes = 36;
        const chars = '01.:+*#@/\\<>[]{}';

        for (let i = 0; i < numNodes; i++) {
          const progress = i / numNodes;
          const y = (progress * h + t * 24 - scrollY * 0.32) % h;
          const drawY = y < 0 ? y + h : y;

          const centerSpine = w * (0.5 + 0.38 * Math.sin(scrollRatio * Math.PI * 2.2 + progress * 4.0 + t * 0.35));
          for (let band = -2; band <= 2; band++) {
            const x = centerSpine + band * 16 + Math.cos(t * 1.8 + i) * 5;
            const dMouse = Math.hypot(x - mouseX, drawY - mouseY);
            const push = dMouse < 110 ? (1 - dMouse / 110) * 32 : 0;
            const finalX = x + (x > mouseX ? push : -push);

            const charIdx = Math.abs(i + band + Math.floor(t * 5 + scrollY * 0.02)) % chars.length;
            const alpha = (1 - Math.abs(band) / 3.5) * (dMouse < 110 ? 0.55 : 0.16);
            ctx.fillStyle = isLight
              ? (dMouse < 110 ? `rgba(2,132,199,${alpha * 1.5})` : `rgba(90,98,117,${alpha})`)
              : (dMouse < 110 ? `rgba(191,233,255,${alpha})` : `rgba(183,183,183,${alpha})`);
            ctx.fillText(chars[charIdx], finalX, drawY);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [scrollStreamEnabled]);

  return (
    <canvas
      ref={canvasRef}
      id="scrollAsciiCanvas"
      className="fixed inset-0 pointer-events-none z-20 opacity-60"
    />
  );
}
