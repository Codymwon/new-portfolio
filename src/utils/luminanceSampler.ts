export interface LuminanceMap {
  ready: boolean;
  w: number;
  h: number;
  data: Float32Array | null;
}

export function createEmptyMap(): LuminanceMap {
  return { ready: false, w: 0, h: 0, data: null };
}

export function loadLuminanceMapFromUrl(
  url: string,
  targetObj: LuminanceMap,
  onComplete?: () => void
): void {
  if (typeof window === 'undefined') return;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = url;

  const process = () => {
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    if (!w || !h) return;

    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const ctx = off.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, w, h).data;
    const lum = new Float32Array(w * h);

    for (let i = 0, j = 0; i < imgData.length; i += 4, j++) {
      lum[j] = (imgData[i] * 0.299 + imgData[i + 1] * 0.587 + imgData[i + 2] * 0.114) / 255.0;
    }

    targetObj.w = w;
    targetObj.h = h;
    targetObj.data = lum;
    targetObj.ready = true;
    if (onComplete) onComplete();
  };

  if (img.complete && img.naturalWidth > 0) {
    process();
  } else {
    img.addEventListener('load', process);
  }
}

export function sampleMapBilinear(mapObj: LuminanceMap, u: number, v: number): number {
  if (!mapObj.ready || !mapObj.data || u < 0 || u > 1 || v < 0 || v > 1) return 0;
  const x = u * (mapObj.w - 1);
  const y = v * (mapObj.h - 1);
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = Math.min(mapObj.w - 1, x0 + 1);
  const y1 = Math.min(mapObj.h - 1, y0 + 1);
  const fx = x - x0;
  const fy = y - y0;
  const d = mapObj.data;
  const w = mapObj.w;
  const v00 = d[y0 * w + x0];
  const v10 = d[y0 * w + x1];
  const v01 = d[y1 * w + x0];
  const v11 = d[y1 * w + x1];
  return (v00 * (1 - fx) + v10 * fx) * (1 - fy) + (v01 * (1 - fx) + v11 * fx) * fy;
}
