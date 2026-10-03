export interface SquircleState {
  size: number
  /** corner smoothing 0–1 (0 = normal border-radius, 1 = squircle) */
  smoothing: number
  radius: number
  bg: string
  accent: string
  showRadiusComparison: boolean
}

export const DEFAULT_SQUIRCLE: SquircleState = {
  size: 160,
  smoothing: 0.6,
  radius: 40,
  bg: '#10b981',
  accent: '#22d3ee',
  showRadiusComparison: true
}

/**
 * Approximate iOS-style squircle using layered border-radius + a subtle inset radial.
 * A true superellipse needs SVG paths; CSS approximation uses the "nested radius" trick.
 */
export function squircleCss(s: SquircleState): string {
  // nested-radius trick: outer radius = R, inner radius = R - (R * smoothing)
  const r = s.radius
  const k = Math.min(1, Math.max(0, s.smoothing))
  const inner = Math.round(r * (1 - k))
  return `.squircle {
  width: ${s.size}px;
  height: ${s.size}px;
  background: ${s.bg};
  border-radius: ${r}px;
}

.squircle::before {
  content: '';
  position: absolute;
  inset: ${Math.max(1, Math.round(s.size * 0.02))}px;
  border-radius: ${Math.max(1, inner)}px;
  background: inherit;
}

.squircle-plain {
  width: ${s.size}px;
  height: ${s.size}px;
  background: ${s.accent};
  border-radius: ${r}px;
}`
}

export function squircleHtml(s: SquircleState): string {
  return s.showRadiusComparison
    ? `<div class="squircle"></div>\n<div class="squircle-plain"></div>`
    : `<div class="squircle"></div>`
}

export function squircleVars(s: SquircleState): Record<string, string> {
  return { '--squircle-radius': `${s.radius}px`, '--squircle-smoothing': `${s.smoothing}` }
}

export function randomizeSquircle(s: SquircleState, rng: import('../rng').Rng): SquircleState {
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    size: Math.round(rng.range(120, 200)),
    smoothing: Number(rng.range(0.2, 0.95).toFixed(2)),
    radius: Math.round(rng.range(20, 60)),
    bg: `hsl(${h} 75% 52%)`,
    accent: `hsl(${(h + 160) % 360} 75% 52%)`
  }
}

export const PRESETS_SQUIRCLE: { name: string; tags: string[]; state: SquircleState }[] = [
  { name: 'iOS Icon', tags: ['apple'], state: { ...DEFAULT_SQUIRCLE, bg: '#0a84ff', accent: '#5e5ce6', radius: 44, smoothing: 0.6 } },
  { name: 'Emerald Smooth', tags: ['brand'], state: { ...DEFAULT_SQUIRCLE } },
  { name: 'Subtle Smooth', tags: ['minimal'], state: { ...DEFAULT_SQUIRCLE, smoothing: 0.25, bg: '#f4f4f5', accent: '#a1a1aa' } },
  { name: 'Max Squircle', tags: ['extreme'], state: { ...DEFAULT_SQUIRCLE, smoothing: 0.95, radius: 48, bg: '#8b5cf6' } },
  { name: 'Neon Tile', tags: ['neon'], state: { ...DEFAULT_SQUIRCLE, bg: '#22d3ee', accent: '#083344', radius: 36 } },
  { name: 'Tiny Chip', tags: ['chip'], state: { ...DEFAULT_SQUIRCLE, size: 96, radius: 24, smoothing: 0.5 } },
  { name: 'Plain Radius', tags: ['compare'], state: { ...DEFAULT_SQUIRCLE, smoothing: 0, bg: '#f43f5e' } },
  { name: 'Amber Blob', tags: ['warm', 'soft'], state: { ...DEFAULT_SQUIRCLE, size: 180, radius: 60, smoothing: 0.8, bg: '#f59e0b' } }
]