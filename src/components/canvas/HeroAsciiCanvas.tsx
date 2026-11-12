'use client';

import React, { useEffect, useRef } from 'react';
import {
  createEmptyMap,
  loadLuminanceMapFromUrl,
  sampleMapBilinear,
  LuminanceMap,
} from '@/utils/luminanceSampler';

const GLYPHS = '·.:-+*#%@01{}';

interface HeroParticle {
  bx: number;
  by: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  lum: number;
  normDist: number;
  size: number;
  glyphIdx: number;
  phase: number;
  isCenterCore: boolean;
}

interface OrbitNode {
  angle: number;
  radiusX: number;
  radiusY: number;
  tilt: number;
  speed: number;
  char: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

export default function HeroAsciiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mapRef = useRef<LuminanceMap>(createEmptyMap());
  const particlesRef = useRef<HeroParticle[]>([]);
  const orbitNodesRef = useRef<OrbitNode[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const builtDimRef = useRef({ w: 0, h: 0 });
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const entryStartRef = useRef<number>(performance.now());
  const isVisibleRef = useRef<boolean>(true);
  const atlasRef = useRef<HTMLCanvasElement | null>(null);

  // Pre-rasterize glyph atlas into an offscreen canvas to replace expensive fillText calls
  // Row 0: Mineral Grey #B7B7B7 (Dark Mode Standard ASCII Art)
  // Row 1: Glacier Blue #BFE9FF (Dark Mode Interactive Hover Glow)
  // Row 2: Mineral Slate #475569 (Light Mode Standard ASCII Art)
  // Row 3: Ultraviolet #6F3DFF (Light Mode Interactive Hover Glow)
  const getGlyphAtlas = () => {
    if (atlasRef.current) return atlasRef.current;
    const off = document.createElement('canvas');
    const sz = 16;
    off.width = sz * GLYPHS.length;
    off.height = sz * 4;
    const c = off.getContext('2d');
    if (!c) return off;

    c.font = '600 9px "Fira Code", monospace';
    c.textBaseline = 'middle';
    c.textAlign = 'center';

    // Row 0: Mineral Grey #B7B7B7
    c.fillStyle = '#B7B7B7';
    for (let i = 0; i < GLYPHS.length; i++) {
      c.fillText(GLYPHS[i], i * sz + sz / 2, sz / 2);
    }

    // Row 1: Glacier Blue #BFE9FF
    c.fillStyle = '#BFE9FF';
    for (let i = 0; i < GLYPHS.length; i++) {
      c.fillText(GLYPHS[i], i * sz + sz / 2, sz + sz / 2);
    }

    // Row 2: Cool Mineral Grey #5A6275 (Light Background Base)
    c.fillStyle = '#5A6275';
    for (let i = 0; i < GLYPHS.length; i++) {
      c.fillText(GLYPHS[i], i * sz + sz / 2, sz * 2 + sz / 2);
    }

    // Row 3: Glacier Blue #0284C7 (Light Background Interactive Hover/Ripple)
    c.fillStyle = '#0284C7';
    for (let i = 0; i < GLYPHS.length; i++) {
      c.fillText(GLYPHS[i], i * sz + sz / 2, sz * 3 + sz / 2);
    }

    atlasRef.current = off;
    return off;
  };

  useEffect(() => {
    loadLuminanceMapFromUrl('/assets/maps/hero-sculpture.png', mapRef.current, () => {
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
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.max(320, Math.floor(rect.width * dpr));
      const targetH = Math.max(320, Math.floor(rect.height * dpr));
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const buildParticles = () => {
      if (!mapRef.current.ready || !canvas) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      builtDimRef.current = { w, h };
      particlesRef.current = [];
      orbitNodesRef.current = [];

      // Optimized step size to ensure 60fps while retaining dense sculptural clarity
      const step = w < 640 ? 5 : w < 1280 ? 4 : 3.8;
      const cx = w * 0.5;
      const cy = h * 0.52;

      for (let y = 0; y < h; y += step) {
        const v = y / Math.max(1, h - 1);
        for (let x = 0; x < w; x += step) {
          const u = x / Math.max(1, w - 1);
          const lum = sampleMapBilinear(mapRef.current, u, v);
          if (lum <= 0.04) continue;

          const hash = Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
          const prob = Math.pow(lum, 0.68) * 0.96;
          if (prob > hash * 0.68) {
            const jx = (hash - 0.5) * step * 0.8;
            const jy = (((hash * 19.7) % 1) - 0.5) * step * 0.8;
            const bx = x + jx;
            const by = y + jy;
            const normDist = Math.hypot((bx - cx) / (w * 0.55), (by - cy) / (h * 0.55));
            const gIdx = Math.min(GLYPHS.length - 1, Math.floor(lum * GLYPHS.length));

            particlesRef.current.push({
              bx,
              by,
              x: bx,
              y: by + 16,
              vx: 0,
              vy: 0,
              lum,
              normDist,
              size: lum > 0.78 ? 2.15 : lum > 0.42 ? 1.55 : 1.15,
              glyphIdx: gIdx,
              phase: hash * Math.PI * 2,
              isCenterCore: u > 0.27 && u < 0.73 && v > 0.1 && v < 0.9,
            });
          }
        }
      }

      const codeChars = '01/:;+*#@<>[]{}';
      for (let i = 0; i < 90; i++) {
        orbitNodesRef.current.push({
          angle: (i / 90) * Math.PI * 2,
          radiusX: w * (0.18 + (i % 5) * 0.045),
          radiusY: h * (0.22 + (i % 4) * 0.05),
          tilt: i % 2 === 0 ? 0.42 : -0.42,
          speed: (0.25 + (i % 7) * 0.06) * (i % 2 === 0 ? 1 : -1),
          char: codeChars[i % codeChars.length],
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
        radius: 4,
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

      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;

      if (mapRef.current.ready && (Math.abs(w - builtDimRef.current.w) > 12 || particlesRef.current.length === 0)) {
        buildParticles();
      }

      ctx.clearRect(0, 0, w, h);

      if (mapRef.current.ready) {
        const atlas = getGlyphAtlas();
        const t = now * 0.001;
        const scanWave = Math.min(1.6, (now - entryStartRef.current) / 1100);
        const scrollY = window.scrollY || 0;
        const scrollFactor = Math.min(1.5, scrollY / Math.max(1, h));
        const cx = w * 0.5;
        const cy = h * 0.52;

        const cursorRad = 135;
        const cursorRadSq = cursorRad * cursorRad;
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;

        const globalFade = Math.min(1, scanWave);
        const lightTheme = document.documentElement.classList.contains('light-theme');
        const baseColor = lightTheme ? '#5A6275' : '#B7B7B7'; // Cool Mineral Grey
        const highlightColor = lightTheme ? '#0284C7' : '#BFE9FF'; // Glacier Blue

        // 1. Render 3D Orbital Code Rings in Glacier Blue
        ctx.font = '600 8.5px "Fira Code", monospace';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = highlightColor;

        const orbitNodes = orbitNodesRef.current;
        for (let i = 0; i < orbitNodes.length; i++) {
          const node = orbitNodes[i];
          const ang = node.angle + t * node.speed;
          const ox = Math.cos(ang) * node.radiusX;
          const oy = Math.sin(ang) * node.radiusY;
          const rx = cx + ox * Math.cos(node.tilt) - oy * Math.sin(node.tilt);
          const ry = cy + ox * Math.sin(node.tilt) + oy * Math.cos(node.tilt) + scrollFactor * 35;
          const depthAlpha = (0.2 + 0.35 * (Math.sin(ang) + 1) * 0.5) * globalFade;
          ctx.globalAlpha = depthAlpha;
          ctx.fillText(node.char, rx, ry);
        }

        // 2. Render Interactive Sculpture Particles in Mineral Grey #B7B7B7 (with Glacier Blue on hover)
        ctx.fillStyle = baseColor;
        const particles = particlesRef.current;
        const ripples = ripplesRef.current;
        const numRipples = ripples.length;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const localProgress = Math.max(0, Math.min(1, (scanWave - p.normDist * 0.55) * 1.8));
          if (localProgress <= 0.01) continue;

          const localEase = 1 - Math.pow(1 - localProgress, 3);
          const scanFrontBoost =
            localProgress > 0.1 && localProgress < 0.85
              ? (1 - Math.abs(localProgress - 0.5) * 2) * 0.45
              : 0;

          const waveAmp = p.isCenterCore ? 0.55 : 4.2;
          const waveX = Math.cos(p.by * 0.022 + t * 1.9 + p.phase) * waveAmp;
          const waveY = Math.sin(p.bx * 0.016 - t * 2.2 + p.phase) * waveAmp;

          const scrollPushX = (p.bx - cx) * scrollFactor * 0.16;
          const scrollPushY = scrollFactor * (40 + p.phase * 10);
          const riseOffset = (1 - localEase) * 14;

          const targetX = p.bx + waveX + scrollPushX;
          const targetY = p.by + waveY + scrollPushY + riseOffset;

          p.vx += (targetX - p.x) * 0.16;
          p.vy += (targetY - p.y) * 0.16;

          // Fast distance check without square root for particles outside cursor radius
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          let cursorGlow = 0;
          let isNearCursor = false;

          if (distSq < cursorRadSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = Math.pow(1 - dist / cursorRad, 1.55);
            p.vx += (dx / dist) * force * 4.5;
            p.vy += (dy / dist) * force * 4.5;
            cursorGlow = force * 0.6;
            isNearCursor = dist < 95;
          }

          // Optimized shockwave ripple math
          if (numRipples > 0) {
            for (let k = 0; k < numRipples; k++) {
              const rip = ripples[k];
              const rdx = p.x - rip.x;
              const rdy = p.y - rip.y;
              const rdSq = rdx * rdx + rdy * rdy;
              const minR = Math.max(0, rip.radius - 34);
              const maxR = rip.radius + 34;
              if (rdSq > minR * minR && rdSq < maxR * maxR) {
                const rd = Math.sqrt(rdSq);
                const band = Math.abs(rd - rip.radius);
                if (band < 34) {
                  const wf = (1 - band / 34) * rip.alpha;
                  p.vx += (rdx / rd) * wf * 3.8;
                  p.vy += (rdy / rd) * wf * 3.8;
                  cursorGlow += wf * 0.75;
                }
              }
            }
          }

          p.vx *= 0.78;
          p.vy *= 0.78;
          p.x += p.vx;
          p.y += p.vy;

          const shimmer = 0.88 + 0.12 * Math.sin(t * 3.4 + p.phase);
          const alpha = Math.min(1, Math.max(0, (p.lum * 0.98 + cursorGlow + scanFrontBoost) * shimmer * localEase));
          ctx.globalAlpha = alpha;

          // Glacier Blue highlight for cursor hover & ripples in dark mode; Ultraviolet in light mode
          const isHighlighted = isNearCursor || cursorGlow > 0.2;
          const atlasY = lightTheme ? (isHighlighted ? 48 : 32) : (isHighlighted ? 16 : 0);

          // GPU texture blit with drawImage instead of expensive fillText
          if (isNearCursor || localProgress < 0.82 || (i % 6 === 0 && p.lum > 0.45)) {
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
            ctx.fillStyle = isHighlighted ? highlightColor : baseColor;
            ctx.fillRect(p.x | 0, p.y | 0, p.size, p.size);
          }
        }

        ctx.globalAlpha = 1.0;

        // Advance ripples
        for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
          ripplesRef.current[i].radius += 7.5;
          ripplesRef.current[i].alpha *= 0.94;
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
      id="heroAsciiCanvas"
      className="absolute inset-0 w-full h-full block z-0 select-none cursor-crosshair"
    />
  );
}
