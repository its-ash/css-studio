export type NoiseKind = 'fine' | 'coarse' | 'static' | 'halftone'

export interface NoiseState {
  kind: NoiseKind
  baseColor: string
  noiseColor: string
  opacity: number
  tileSize: number
  density: number
}

export const NOISE_KINDS: { value: NoiseKind; label: string }[] = [
  { value: 'fine', label: 'Fine Grain' },
  { value: 'coarse', label: 'Coarse Grain' },
  { value: 'static', label: 'TV Static' },
  { value: 'halftone', label: 'Halftone Dots' }
]

export const DEFAULT_NOISE: NoiseState = {
  kind: 'fine',
  baseColor: '#09090b',
  noiseColor: '#ffffff',
  opacity: 6,
  tileSize: 4,
  density: 50
}

/**
 * Pure-CSS noise via stacked, oddly-sized repeating gradients — no canvas or SVG filters.
 * Multiple prime-ish tile sizes overlapping create a pseudo-random dither pattern.
 */
export function noiseCss(s: NoiseState): string {
  const a = (s.opacity / 100).toFixed(2)
  switch (s.kind) {
    case 'fine':
      return `.noise-surface {
  background-color: ${s.baseColor};
  background-image:
    repeating-conic-gradient(${s.noiseColor}${Math.round(s.opacity * 2.55).toString(16).padStart(2, '0')} 0% 25%, transparent 0% 50%);
  background-size: ${s.tileSize}px ${s.tileSize}px;
}`
    case 'coarse':
      return `.noise-surface {
  background-color: ${s.baseColor};
  background-image:
    repeating-conic-gradient(${s.noiseColor}${Math.round(s.opacity * 2.55).toString(16).padStart(2, '0')} 0% 25%, transparent 0% 50%),
    repeating-conic-gradient(${s.noiseColor}${Math.round(s.opacity * 1.8).toString(16).padStart(2, '0')} 0% 25%, transparent 0% 50%);
  background-size: ${s.tileSize * 2}px ${s.tileSize * 2}px, ${s.tileSize * 3}px ${s.tileSize * 3}px;
  background-position: 0 0, ${Math.round(s.tileSize * 1.5)}px ${Math.round(s.tileSize * 1.1)}px;
}`
    case 'static':
      return `.noise-surface {
  background-color: ${s.baseColor};
  background-image:
    repeating-conic-gradient(${s.noiseColor}${Math.round(s.opacity * 2.55).toString(16).padStart(2, '0')} 0% 25%, transparent 0% 50%),
    repeating-conic-gradient(${s.noiseColor}${Math.round(s.opacity * 2).toString(16).padStart(2, '0')} 0% 25%, transparent 0% 50%);
  background-size: ${s.tileSize}px ${s.tileSize}px, ${s.tileSize * 5}px ${s.tileSize * 5}px;
  animation: noise-shift 0.4s steps(4) infinite;
}

@keyframes noise-shift {
  0% { background-position: 0 0, 0 0; }
  25% { background-position: ${s.tileSize}px 0, -${s.tileSize}px ${s.tileSize}px; }
  50% { background-position: 0 ${s.tileSize}px, ${s.tileSize}px 0; }
  75% { background-position: -${s.tileSize}px 0, 0 -${s.tileSize}px; }
  100% { background-position: 0 0, 0 0; }
}`
    case 'halftone':
      return `.noise-surface {
  background-color: ${s.baseColor};
  background-image: radial-gradient(${s.noiseColor}${Math.round(s.opacity * 2.55).toString(16).padStart(2, '0')} ${Math.round(
        s.density / 20
      )}px, transparent ${Math.round(s.density / 20) + 1}px);
  background-size: ${s.tileSize * 2}px ${s.tileSize * 2}px;
}`
  }
}

export function noiseHtml(): string {
  return `<div class="noise-surface">\n  <!-- content -->\n</div>`
}

export function noisePreviewStyle(s: NoiseState): Record<string, string> {
  const a = (s.opacity / 100).toFixed(2)
  const hexA = Math.round(s.opacity * 2.55).toString(16).padStart(2, '0')
  switch (s.kind) {
    case 'fine':
      return {
        backgroundColor: s.baseColor,
        backgroundImage: `repeating-conic-gradient(${s.noiseColor}${hexA} 0% 25%, transparent 0% 50%)`,
        backgroundSize: `${s.tileSize}px ${s.tileSize}px`
      }
    case 'coarse':
      return {
        backgroundColor: s.baseColor,
        backgroundImage: `repeating-conic-gradient(${s.noiseColor}${hexA} 0% 25%, transparent 0% 50%), repeating-conic-gradient(${s.noiseColor}${Math.round(
          s.opacity * 1.8
        )
          .toString(16)
          .padStart(2, '0')} 0% 25%, transparent 0% 50%)`,
        backgroundSize: `${s.tileSize * 2}px ${s.tileSize * 2}px, ${s.tileSize * 3}px ${s.tileSize * 3}px`,
        backgroundPosition: `0 0, ${Math.round(s.tileSize * 1.5)}px ${Math.round(s.tileSize * 1.1)}px`
      }
    case 'static':
      return {
        backgroundColor: s.baseColor,
        backgroundImage: `repeating-conic-gradient(${s.noiseColor}${hexA} 0% 25%, transparent 0% 50%), repeating-conic-gradient(${s.noiseColor}${Math.round(
          s.opacity * 2
        )
          .toString(16)
          .padStart(2, '0')} 0% 25%, transparent 0% 50%)`,
        backgroundSize: `${s.tileSize}px ${s.tileSize}px, ${s.tileSize * 5}px ${s.tileSize * 5}px`,
        animation: 'noise-shift 0.4s steps(4) infinite'
      }
    case 'halftone':
      return {
        backgroundColor: s.baseColor,
        backgroundImage: `radial-gradient(${s.noiseColor}${hexA} ${Math.round(s.density / 20)}px, transparent ${Math.round(s.density / 20) + 1}px)`,
        backgroundSize: `${s.tileSize * 2}px ${s.tileSize * 2}px`
      }
  }
}

export function noiseVars(s: NoiseState): Record<string, string> {
  return { '--noise-base': s.baseColor, '--noise-color': s.noiseColor, '--noise-opacity': `${s.opacity}%` }
}

export function randomizeNoise(s: NoiseState, rng: import('../rng').Rng): NoiseState {
  const kinds = NOISE_KINDS.map((k) => k.value)
  return {
    ...s,
    kind: rng.pick(kinds),
    opacity: Math.round(rng.range(3, 15)),
    tileSize: Math.round(rng.range(2, 8)),
    density: Math.round(rng.range(30, 80))
  }
}

export const PRESETS_NOISE: { name: string; tags: string[]; state: NoiseState }[] = [
  { name: 'Subtle Grain', tags: ['dark', 'minimal'], state: { ...DEFAULT_NOISE } },
  { name: 'Film Grain', tags: ['coarse', 'retro'], state: { ...DEFAULT_NOISE, kind: 'coarse', opacity: 10 } },
  { name: 'TV Static', tags: ['static', 'animated'], state: { ...DEFAULT_NOISE, kind: 'static', opacity: 12 } },
  { name: 'Print Halftone', tags: ['halftone'], state: { ...DEFAULT_NOISE, kind: 'halftone', baseColor: '#f4f4f5', noiseColor: '#18181b', opacity: 40 } },
  { name: 'Heavy Grain', tags: ['coarse', 'dark'], state: { ...DEFAULT_NOISE, kind: 'coarse', opacity: 18, tileSize: 6 } },
  { name: 'Light Paper', tags: ['light'], state: { ...DEFAULT_NOISE, baseColor: '#faf9f6', noiseColor: '#18181b', opacity: 5 } }
]
