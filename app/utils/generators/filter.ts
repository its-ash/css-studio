import { PHOTO_OPTIONS, photoAlt, photoUrl } from '../demo'
import type { PhotoKey } from '../demo'

export type TintBlend = 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'color' | 'hue'

export interface FilterState {
  photo: PhotoKey
  blur: number
  brightness: number
  contrast: number
  saturate: number
  grayscale: number
  sepia: number
  hueRotate: number
  invert: number
  opacity: number
  useDuotone: boolean
  duotoneShadow: string
  duotoneHighlight: string
  tint: string
  tintOpacity: number
  tintBlend: TintBlend
  vignette: number
  radius: number
}

export const TINT_BLENDS: { value: TintBlend; label: string }[] = [
  { value: 'soft-light', label: 'Soft light' },
  { value: 'overlay', label: 'Overlay' },
  { value: 'multiply', label: 'Multiply' },
  { value: 'screen', label: 'Screen' },
  { value: 'color', label: 'Color' },
  { value: 'hue', label: 'Hue' }
]

export { PHOTO_OPTIONS }

export const DEFAULT_FILTER: FilterState = {
  photo: 'fjord',
  blur: 0,
  brightness: 100,
  contrast: 100,
  saturate: 100,
  grayscale: 0,
  sepia: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 100,
  useDuotone: false,
  duotoneShadow: '#0f172a',
  duotoneHighlight: '#34d399',
  tint: '#f97316',
  tintOpacity: 0,
  tintBlend: 'soft-light',
  vignette: 0,
  radius: 16
}

export function normalizeFilter(s: FilterState): FilterState {
  return {
    ...DEFAULT_FILTER,
    ...s,
    photo: PHOTO_OPTIONS.some((p) => p.value === s.photo) ? s.photo : 'fjord',
    tintBlend: TINT_BLENDS.some((b) => b.value === s.tintBlend) ? s.tintBlend : 'soft-light'
  }
}

export function filterValue(raw: FilterState): string {
  const s = normalizeFilter(raw)
  const parts: string[] = []
  if (s.blur) parts.push(`blur(${s.blur}px)`)
  if (s.brightness !== 100) parts.push(`brightness(${s.brightness}%)`)
  if (s.contrast !== 100) parts.push(`contrast(${s.contrast}%)`)
  if (s.saturate !== 100) parts.push(`saturate(${s.saturate}%)`)
  if (s.grayscale) parts.push(`grayscale(${s.grayscale}%)`)
  if (s.sepia) parts.push(`sepia(${s.sepia}%)`)
  if (s.hueRotate) parts.push(`hue-rotate(${s.hueRotate}deg)`)
  if (s.invert) parts.push(`invert(${s.invert}%)`)
  if (s.opacity !== 100) parts.push(`opacity(${s.opacity}%)`)
  return parts.length ? parts.join(' ') : 'none'
}

export function filterCss(raw: FilterState): string {
  const s = normalizeFilter(raw)
  const stack = filterValue(s)
  const out = [
    `.filter-photo {
  position: relative;
  width: 100%;
  max-width: 40rem;
  aspect-ratio: 3 / 2;
  margin: 0;
  overflow: hidden;
  border-radius: ${s.radius}px;
  isolation: isolate;${s.useDuotone ? `\n  background: ${s.duotoneHighlight};` : ''}
}`,
    `.filter-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: ${s.useDuotone ? `grayscale(100%) ${stack === 'none' ? 'contrast(110%)' : stack}` : stack};${s.useDuotone ? '\n  mix-blend-mode: multiply;' : ''}
}`
  ]
  if (s.useDuotone) {
    out.push(`/* Duotone: highlight shows through the multiplied photo, shadow colour lifts the blacks. */
.filter-photo::before {
  content: '';
  position: absolute;
  inset: 0;
  background: ${s.duotoneShadow};
  mix-blend-mode: lighten;
  pointer-events: none;
}`)
  } else if (s.tintOpacity > 0) {
    out.push(`.filter-photo::before {
  content: '';
  position: absolute;
  inset: 0;
  background: ${s.tint};
  opacity: ${s.tintOpacity / 100};
  mix-blend-mode: ${s.tintBlend};
  pointer-events: none;
}`)
  }
  if (s.vignette > 0) {
    out.push(`.filter-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent ${Math.round(70 - s.vignette * 0.35)}%, rgb(0 0 0 / ${(s.vignette / 100).toFixed(2)}) 100%);
  pointer-events: none;
}`)
  }
  return out.join('\n\n')
}

export function filterHtml(raw: FilterState): string {
  const s = normalizeFilter(raw)
  return `<figure class="filter-photo">
  <img src="${photoUrl(s.photo)}" alt="${photoAlt(s.photo)}" width="960" height="640" loading="lazy" />
</figure>`
}

export function filterVars(raw: FilterState): Record<string, string> {
  const s = normalizeFilter(raw)
  return { '--filter-stack': filterValue(s), '--filter-tint': s.tint, '--filter-radius': `${s.radius}px` }
}

export function randomizeFilter(s: FilterState, rng: import('../rng').Rng): FilterState {
  const duo = rng.chance(0.2)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...normalizeFilter(s),
    blur: rng.chance(0.15) ? Math.round(rng.range(1, 4)) : 0,
    brightness: Math.round(rng.range(90, 120)),
    contrast: Math.round(rng.range(85, 135)),
    saturate: Math.round(rng.range(50, 160)),
    grayscale: rng.chance(0.2) ? Math.round(rng.range(40, 100)) : 0,
    sepia: rng.chance(0.3) ? Math.round(rng.range(10, 50)) : 0,
    hueRotate: rng.chance(0.15) ? Math.round(rng.range(0, 360)) : 0,
    invert: 0,
    useDuotone: duo,
    duotoneShadow: `hsl(${h} 70% 12%)`,
    duotoneHighlight: `hsl(${(h + 150) % 360} 85% 65%)`,
    tint: `hsl(${h} 85% 55%)`,
    tintOpacity: duo || rng.chance(0.5) ? 0 : Math.round(rng.range(15, 45)),
    tintBlend: rng.pick(TINT_BLENDS.map((b) => b.value)),
    vignette: rng.chance(0.5) ? Math.round(rng.range(20, 60)) : 0
  }
}

const p = (o: Partial<FilterState>): FilterState => ({ ...DEFAULT_FILTER, ...o })

export const PRESETS_FILTER: { name: string; tags: string[]; state: FilterState }[] = [
  { name: 'Original', tags: ['none'], state: p({}) },
  { name: 'Golden Hour', tags: ['warm'], state: p({ brightness: 106, contrast: 108, saturate: 125, sepia: 12, tint: '#f59e0b', tintOpacity: 22, tintBlend: 'soft-light', vignette: 25 }) },
  { name: 'Clarendon', tags: ['social'], state: p({ contrast: 120, saturate: 135, tint: '#7dd3fc', tintOpacity: 18, tintBlend: 'overlay' }) },
  { name: 'Gingham', tags: ['social', 'soft'], state: p({ brightness: 105, contrast: 90, saturate: 85, hueRotate: 350, tint: '#e6e6fa', tintOpacity: 25, tintBlend: 'soft-light' }) },
  { name: 'Moon', tags: ['mono'], state: p({ grayscale: 100, contrast: 112, brightness: 108, vignette: 30 }) },
  { name: 'Noir', tags: ['mono', 'dramatic'], state: p({ grayscale: 100, contrast: 150, brightness: 88, vignette: 65 }) },
  { name: 'Vintage', tags: ['warm', 'retro'], state: p({ sepia: 45, contrast: 105, brightness: 105, saturate: 85, vignette: 35 }) },
  { name: 'Faded Film', tags: ['retro', 'soft'], state: p({ contrast: 82, brightness: 110, saturate: 70, sepia: 15, tint: '#fde68a', tintOpacity: 15, tintBlend: 'screen' }) },
  { name: 'Teal & Orange', tags: ['cinematic'], state: p({ contrast: 115, saturate: 120, tint: '#0d9488', tintOpacity: 30, tintBlend: 'soft-light', vignette: 30 }) },
  { name: 'Arctic', tags: ['cool'], state: p({ brightness: 108, saturate: 80, tint: '#38bdf8', tintOpacity: 28, tintBlend: 'color', contrast: 105 }) },
  { name: 'Vivid Pop', tags: ['bold'], state: p({ contrast: 125, saturate: 180, brightness: 104 }) },
  { name: 'Dreamy Soft', tags: ['soft'], state: p({ blur: 1, brightness: 112, saturate: 90, contrast: 92, tint: '#f9a8d4', tintOpacity: 20, tintBlend: 'screen' }) },
  { name: 'Emerald Duotone', tags: ['duotone', 'brand'], state: p({ useDuotone: true, duotoneShadow: '#052e1a', duotoneHighlight: '#34d399' }) },
  { name: 'Sunset Duotone', tags: ['duotone', 'warm'], state: p({ useDuotone: true, duotoneShadow: '#3b0764', duotoneHighlight: '#fb923c' }) },
  { name: 'Spotify Duotone', tags: ['duotone'], state: p({ useDuotone: true, duotoneShadow: '#1e1b4b', duotoneHighlight: '#1ed760', photo: 'portrait' }) },
  { name: 'Cyber Hue', tags: ['playful'], state: p({ hueRotate: 260, saturate: 160, contrast: 115, photo: 'city' }) },
  { name: 'Infrared', tags: ['experimental'], state: p({ invert: 100, hueRotate: 180, saturate: 140, photo: 'valley' }) },
  { name: 'Frosted', tags: ['blur'], state: p({ blur: 6, brightness: 115, saturate: 120 }) }
]
