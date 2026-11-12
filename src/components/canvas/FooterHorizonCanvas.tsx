'use client';

import React, { useEffect, useRef } from 'react';
import {
  createEmptyMap,
  loadLuminanceMapFromUrl,
  sampleMapBilinear,
  LuminanceMap,
} from '@/utils/luminanceSampler';

const GLYPHS = '·.:+*#%@';

interface FooterParticle {
  bx: number;
  by: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  lum: number;
  size: number;
  glyphIdx: number;
  phase: number;
  isFigureZone: boolean;
}

interface DriftParticle {
  x: number;
  y: number;
  speed: number;
  size: number;
  alpha: number;
  isStar: boolean;
  phase: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

export default function FooterHorizonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mapRef = useRef<LuminanceMap>(createEmptyMap());
  const particlesRef = useRef<FooterParticle[]>([]);
  const driftRef = useRef<DriftParticle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const builtDimRef = useRef({ w: 0, h: 0 });
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const isVisibleRef = useRef<boolean>(false);
  const atlasRef = useRef<HTMLCanvasElement | null>(null);

  // Pre-rasterize glyph atlas into an offscreen canvas to replace expensive fillText calls
  const getGlyphAtlas = () => {
    if (atlasRef.current) return atlasRef.current;
    const off = document.createElement('canvas');
    const sz = 16;
    off.width = sz * GLYPHS.length;
    off.height = sz * 2; // Row 0: White (Dark Theme), Row 1: Dark (Light Theme)
    const c = off.getContext('2d');
    if (!c) return off;

    c.font = '600 8.5px "Fira Code", monospace';
    c.textBaseline = 'middle';
    c.textAlign = 'center';

    // Row 0: White
    c.fillStyle = '#f6f6f6';
    for (let i = 0; i < GLYPHS.length; i++) {
      c.fillText(GLYPHS[i], i * sz + sz / 2, sz / 2);
    }

    // Row 1: Dark
    c.fillStyle = '#111111';
    for (let i = 0; i < GLYPHS.length; i++) {
      c.fillText(GLYPHS[i], i * sz + sz / 2, sz + sz / 2);
    }

    atlasRef.current = off;
    return off;
  };

  useEffect(() => {
    loadLuminanceMapFromUrl('/assets/maps/horizon.png', mapRef.current, () => {
      buildParticles();
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;

    // IntersectionObserver to pause 60fps simulation when scrolled off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth || 960;
      const h = canvas.clientHeight || 480;
      const targetW = Math.floor(w * dpr);
      const targetH = Math.floor(h * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const buildParticles = () => {
      if (!mapRef.current.ready || !canvas) return;
      const w = canvas.clientWidth || 960;
      const h = canvas.clientHeight || 480;
      builtDimRef.current = { w, h };
      particlesRef.current = [];
      driftRef.current = [];

      // Optimized step size to ensure 60fps while retaining dense sculptural clarity
      const step = w < 640 ? 5 : w < 1280 ? 4 : 3.6;

      for (let y = 0; y < h; y += step) {
        const v = y / Math.max(1, h - 1);
        for (let x = 0; x < w; x += step) {
          const u = x / Math.max(1, w - 1);
          const lum = sampleMapBilinear(mapRef.current, u, v);
          if (lum <= 0.035) continue;

          const hash = Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
          const prob = Math.pow(lum, 0.72) * 0.95;
          if (prob > hash * 0.72) {
            const jitterX = (hash - 0.5) * step * 0.85;
            const jitterY = (((hash * 17.3) % 1) - 0.5) * step * 0.85;
            const bx = x + jitterX;
            const by = y + jitterY;
            const gIdx = Math.min(GLYPHS.length - 1, Math.floor(lum * GLYPHS.length));
            const isFigureZone = bx > w * 0.33 && bx < w * 0.62 && by < h * 0.65;

            particlesRef.current.push({
              bx,
              by,
              x: bx,
              y: by,
              vx: 0,
              vy: 0,
              lum,
              size: lum > 0.78 ? 2.1 : lum > 0.42 ? 1.55 : 1.15,
              glyphIdx: gIdx,
              phase: hash * Math.PI * 2,
              isFigureZone,
            });
          }
        }
      }

      for (let i = 0; i < 380; i++) {
        const isStar = i < 80;
        driftRef.current.push({
          x: Math.random() * w,
          y: isStar ? Math.random() * (h * 0.42) : h * 0.28 + Math.random() * (h * 0.68),
          speed: isStar ? 0.05 + Math.random() * 0.12 : 0.45 + Math.random() * 1.1,
          size: isStar ? 1.0 + Math.random() * 1.2 : 1.1 + Math.random() * 1.4,
          alpha: isStar ? 0.25 + Math.random() * 0.6 : 0.2 + Math.random() * 0.55,
          isStar,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();
    buildParticles();

    const onResize = () => {
      resize();
      buildParticles();
    };
    window.addEventListener('resize', onResize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripplesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 5,
        alpha: 1.0,
      });
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('click', onClick);

    const render = (now: number) => {
      // Pause computation completely when scrolled off-screen
      if (!isVisibleRef.current) {
        animId = requestAnimationFrame(render);
        return;
      }

      const w = canvas.clientWidth || 960;
      const h = canvas.clientHeight || 480;

      if (mapRef.current.ready && (Math.abs(w - builtDimRef.current.w) > 12 || particlesRef.current.length === 0)) {
        buildParticles();
      }

      const atlas = getGlyphAtlas();
      const t = now * 0.001;
      const lightTheme = document.documentElement.classList.contains('light-theme');
      const atlasY = lightTheme ? 16 : 0;
      const baseColor = lightTheme ? '#111111' : '#f6f6f6';

      ctx.fillStyle = lightTheme ? '#f5f5f7' : '#080808';
      ctx.fillRect(0, 0, w, h);

      if (mapRef.current.ready) {
        // 1. Render drift stars & particles
        const drift = driftRef.current;
        ctx.fillStyle = lightTheme ? '#222222' : '#ffffff';

        for (let i = 0; i < drift.length; i++) {
          const dp = drift[i];
          if (dp.isStar) {
            const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(t * 1.8 + dp.phase));
            ctx.globalAlpha = dp.alpha * twinkle;
            ctx.fillRect(dp.x | 0, dp.y | 0, dp.size, dp.size);
          } else {
            dp.x += dp.speed;
            dp.y += Math.sin(dp.x * 0.012 + t) * 0.28 + dp.speed * 0.18;
            if (dp.x > w) {
              dp.x = 0;
              dp.y = h * 0.25 + Math.random() * (h * 0.65);
            }
            const u = dp.x / w;
            const v = dp.y / h;
            const mapLum = sampleMapBilinear(mapRef.current, u, v);
            if (mapLum > 0.06) {
              ctx.globalAlpha = Math.min(0.9, mapLum * 0.85);
              ctx.fillRect(dp.x | 0, dp.y | 0, dp.size, dp.size);
            }
          }
        }

        // 2. Render Horizon Particles
        // Set fillStyle once outside the loop to eliminate per-particle string allocations
        ctx.fillStyle = baseColor;
        const cursorRad = 115;
        const cursorRadSq = cursorRad * cursorRad;
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;
        const particles = particlesRef.current;
        const ripples = ripplesRef.current;
        const numRipples = ripples.length;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const waveAmp = p.isFigureZone ? 0.6 : 2.4;
          const targetX = p.bx + Math.cos(p.by * 0.025 + t * 1.8 + p.phase) * waveAmp;
          const targetY = p.by + Math.sin(p.bx * 0.02 + t * 2.1 + p.phase) * waveAmp;

          p.vx += (targetX - p.x) * 0.12;
          p.vy += (targetY - p.y) * 0.12;

          // Fast distance check without square root for particles outside cursor radius
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          let cursorGlow = 0;
          let isNearCursor = false;

          if (distSq < cursorRadSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = Math.pow(1 - dist / cursorRad, 1.6);
            p.vx += (dx / dist) * force * 4.2;
            p.vy += (dy / dist) * force * 4.2;
            cursorGlow = force * 0.5;
            isNearCursor = dist < 85;
          }

          if (numRipples > 0) {
            for (let k = 0; k < numRipples; k++) {
              const rip = ripples[k];
              const rdx = p.x - rip.x;
              const rdy = p.y - rip.y;
              const rdSq = rdx * rdx + rdy * rdy;
              const minR = Math.max(0, rip.radius - 32);
              const maxR = rip.radius + 32;
              if (rdSq > minR * minR && rdSq < maxR * maxR) {
                const rd = Math.sqrt(rdSq);
                const band = Math.abs(rd - rip.radius);
                if (band < 32 && rd > 0.1) {
                  const wf = (1 - band / 32) * rip.alpha;
                  p.vx += (rdx / rd) * wf * 3.0;
                  p.vy += (rdy / rd) * wf * 3.0;
                  cursorGlow += wf * 0.65;
                }
              }
            }
          }

          p.vx *= 0.8;
          p.vy *= 0.8;
          p.x += p.vx;
          p.y += p.vy;

          const shimmer = 0.88 + 0.12 * Math.sin(t * 3 + p.phase);
          const alpha = Math.min(1, Math.max(0, (p.lum * 0.98 + cursorGlow) * shimmer));
          ctx.globalAlpha = alpha;

          // GPU texture blit with drawImage instead of expensive fillText
          if (isNearCursor || (i % 8 === 0 && p.lum > 0.48)) {
            ctx.drawImage(
              atlas,
              p.glyphIdx * 16,
              atlasY,
              16,
              16,
              (p.x - 8) | 0,
              (p.y - 8) | 0,
              16,
              16
            );
          } else {
            ctx.fillRect(p.x | 0, p.y | 0, p.size, p.size);
          }
        }

        ctx.globalAlpha = 1.0;

        for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
          ripplesRef.current[i].radius += 7.5;
          ripplesRef.current[i].alpha *= 0.95;
          if (ripplesRef.current[i].alpha < 0.03) {
            ripplesRef.current.splice(i, 1);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="footerHorizonCanvas"
      className="w-full h-full block"
    />
  );
}
