import { hslToHex, readableInk } from '../colors'
import { photoUrl } from '../demo'

export type NoiseKind = 'grain' | 'film' | 'static' | 'halftone' | 'paper' | 'scanlines'
export type NoiseBackdrop = 'gradient' | 'solid' | 'photo'
export type NoiseBlend = 'overlay' | 'soft-light' | 'normal' | 'multiply' | 'screen'

export interface NoiseState {
  kind: NoiseKind
  backdrop: NoiseBackdrop
  baseColor: string
  baseColor2: string
  noiseColor: string
  opacity: number
  size: number
  blend: NoiseBlend
  animate: boolean
  content: boolean
}

export const NOISE_KINDS: { value: NoiseKind; label: string }[] = [
  { value: 'grain', label: 'Fine grain' },
  { value: 'film', label: 'Film grain' },
  { value: 'static', label: 'TV static' },
  { value: 'halftone', label: 'Halftone' },
  { value: 'paper', label: 'Paper fibre' },
  { value: 'scanlines', label: 'CRT scanlines' }
]

export const NOISE_BACKDROPS: { value: NoiseBackdrop; label: string }[] = [
  { value: 'gradient', label: 'Gradient' },
  { value: 'solid', label: 'Solid' },
  { value: 'photo', label: 'Photo' }
]

export const NOISE_BLENDS: { value: NoiseBlend; label: string }[] = [
  { value: 'overlay', label: 'Overlay' },
  { value: 'soft-light', label: 'Soft light' },
  { value: 'normal', label: 'Normal' },
  { value: 'multiply', label: 'Multiply' },
  { value: 'screen', label: 'Screen' }
]

export const DEFAULT_NOISE: NoiseState = {
  kind: 'grain',
  backdrop: 'gradient',
  baseColor: '#0f766e',
  baseColor2: '#1e1b4b',
  noiseColor: '#ffffff',
  opacity: 35,
  size: 1,
  blend: 'overlay',
  animate: false,
  content: true
}

const pick = <T extends string>(v: unknown, list: { value: T }[], fb: T): T => (list.some((o) => o.value === v) ? (v as T) : fb)

/** Maps the old kinds (fine/coarse) onto the new set. */
export function normalizeNoise(raw: NoiseState): NoiseState {
  const legacy = raw.kind as string
  const kind = legacy === 'fine' ? 'grain' : legacy === 'coarse' ? 'film' : raw.kind
  return {
    ...DEFAULT_NOISE,
    ...raw,
    kind: pick(kind, NOISE_KINDS, 'grain'),
    backdrop: pick(raw.backdrop, NOISE_BACKDROPS, 'gradient'),
    blend: pick(raw.blend, NOISE_BLENDS, 'overlay'),
    size: Math.min(4, Math.max(0.5, Number(raw.size) || 1))
  }
}

const px = (n: number) => `${+n.toFixed(2)}px`

/** Dots on coprime tile sizes never line up, so the stack reads as random grain rather than a grid. */
function grainLayers(color: string, alt: string, k: number): { image: string[]; size: string[] } {
  const tiles = [3, 5, 7, 11, 13]
  const spots = ['23% 31%', '71% 77%', '41% 63%', '87% 13%', '9% 89%']
  const image = tiles.map((_, i) => `radial-gradient(circle at ${spots[i]}, ${i % 2 ? alt : color} ${px(0.55 * k)}, transparent ${px(0.95 * k)})`)
  return { image, size: tiles.map((t) => `${px(t * k)} ${px(t * k)}`) }
}

function backdropCss(s: NoiseState): string {
  if (s.backdrop === 'solid') return `background: ${s.baseColor};`
  if (s.backdrop === 'photo') return `background: ${s.baseColor} url('${photoUrl('valley', 1200, 800)}') center / cover;`
  return `background: linear-gradient(135deg, ${s.baseColor}, ${s.baseColor2});`
}

function overlay(s: NoiseState): { image: string; size: string; extra: string } {
  const k = s.size
  const c = s.noiseColor
  const alt = readableInk(c, '#000000', '#ffffff')
  const g = grainLayers(c, alt, k)
  switch (s.kind) {
    case 'film': {
      const coarse = grainLayers(c, alt, k * 1.8)
      return { image: [...g.image, ...coarse.image.slice(0, 3)].join(',\n    '), size: [...g.size, ...coarse.size.slice(0, 3)].join(', '), extra: '' }
    }
    case 'static':
      return { image: g.image.join(',\n    '), size: g.size.join(', '), extra: '' }
    case 'halftone':
      return {
        image: `radial-gradient(circle, ${c} ${px(1.6 * k)}, transparent ${px(2 * k)})`,
        size: `${px(6 * k)} ${px(6 * k)}`,
        extra: `\n  -webkit-mask-image: linear-gradient(135deg, #000 10%, transparent 85%);\n  mask-image: linear-gradient(135deg, #000 10%, transparent 85%);`
      }
    case 'paper':
      return {
        image: [
          `repeating-linear-gradient(37deg, ${c} 0 ${px(0.6)}, transparent ${px(0.6)} ${px(9 * k)})`,
          `repeating-linear-gradient(-53deg, ${alt} 0 ${px(0.5)}, transparent ${px(0.5)} ${px(7 * k)})`,
          ...g.image.slice(0, 3)
        ].join(',\n    '),
        size: ['auto', 'auto', ...g.size.slice(0, 3)].join(', '),
        extra: ''
      }
    case 'scanlines':
      return {
        image: [`repeating-linear-gradient(0deg, ${alt} 0 ${px(1)}, transparent ${px(1)} ${px(3 * k)})`, ...g.image.slice(0, 3)].join(',\n    '),
        size: ['auto', ...g.size.slice(0, 3)].join(', '),
        extra: ''
      }
    default:
      return { image: g.image.join(',\n    '), size: g.size.join(', '), extra: '' }
  }
}

export function noiseCss(raw: NoiseState): string {
  const s = normalizeNoise(raw)
  const o = overlay(s)
  const ink = s.backdrop === 'photo' ? '#ffffff' : readableInk(s.baseColor)
  const moving = s.animate || s.kind === 'static'
  const speed = s.kind === 'static' ? '0.35s steps(5)' : '0.9s steps(6)'
  const anim = moving
    ? `
  animation: noise-shift ${speed} infinite;`
    : ''

  return `.noise-surface {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  align-content: end;
  gap: 0.5rem;
  width: 100%;
  min-height: 20rem;
  padding: 2.5rem;
  border-radius: 20px;
  ${backdropCss(s)}
  color: ${ink};
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

.noise-surface::after {
  content: '';
  position: absolute;
  inset: ${moving ? '-20%' : '0'};
  z-index: -1;
  pointer-events: none;
  background-image:
    ${o.image};
  background-size: ${o.size};
  opacity: ${(s.opacity / 100).toFixed(2)};
  mix-blend-mode: ${s.blend};${o.extra}${anim}
}

.noise-surface > * {
  margin: 0;
}

.noise-eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.8;
}

.noise-title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
}
${
  moving
    ? `
@keyframes noise-shift {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-3%, 2%); }
  40% { transform: translate(2%, -3%); }
  60% { transform: translate(-2%, -1%); }
  80% { transform: translate(3%, 3%); }
  100% { transform: translate(0, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .noise-surface::after { animation: none; }
}
`
    : ''
}`.trim()
}

export function noiseHtml(raw: NoiseState): string {
  const s = normalizeNoise(raw)
  return s.content
    ? `<section class="noise-surface">
  <p class="noise-eyebrow">Field notes · Issue 07</p>
  <h2 class="noise-title">Texture makes flat colour feel printed.</h2>
</section>`
    : `<section class="noise-surface" aria-hidden="true"></section>`
}

export function noiseVars(raw: NoiseState): Record<string, string> {
  const s = normalizeNoise(raw)
  return { '--noise-base': s.baseColor, '--noise-color': s.noiseColor, '--noise-opacity': `${s.opacity}%` }
}

export function randomizeNoise(s: NoiseState, rng: import('../rng').Rng): NoiseState {
  const h = Math.round(rng.range(0, 360))
  return {
    ...normalizeNoise(s),
    kind: rng.pick(NOISE_KINDS.map((k) => k.value)),
    backdrop: rng.pick(['gradient', 'gradient', 'solid', 'photo'] as const),
    baseColor: hslToHex({ h, s: 60, l: rng.range(22, 45) }),
    baseColor2: hslToHex({ h: (h + rng.pick([40, 90, 180])) % 360, s: 55, l: rng.range(12, 30) }),
    opacity: Math.round(rng.range(20, 55)),
    size: rng.pick([0.75, 1, 1.25, 1.5, 2]),
    blend: rng.pick(['overlay', 'soft-light', 'normal'] as const),
    animate: rng.chance(0.25)
  }
}

const p = (o: Partial<NoiseState>): NoiseState => ({ ...DEFAULT_NOISE, ...o })

export const PRESETS_NOISE: { name: string; tags: string[]; state: NoiseState }[] = [
  { name: 'Teal Grain', tags: ['gradient'], state: p({}) },
  { name: 'Subtle Dark', tags: ['dark', 'minimal'], state: p({ backdrop: 'solid', baseColor: '#111113', opacity: 18, blend: 'normal' }) },
  { name: 'Film Grain', tags: ['retro'], state: p({ kind: 'film', baseColor: '#7c2d12', baseColor2: '#1c1917', opacity: 45, animate: true }) },
  { name: 'TV Static', tags: ['animated'], state: p({ kind: 'static', backdrop: 'solid', baseColor: '#27272a', opacity: 60, blend: 'normal', size: 1.25 }) },
  { name: 'Photo Grain', tags: ['photo'], state: p({ backdrop: 'photo', kind: 'film', opacity: 40 }) },
  { name: 'Risograph', tags: ['print'], state: p({ kind: 'halftone', backdrop: 'solid', baseColor: '#f472b6', noiseColor: '#1e3a8a', opacity: 70, blend: 'multiply', size: 1.5 }) },
  { name: 'Print Halftone', tags: ['print', 'light'], state: p({ kind: 'halftone', backdrop: 'solid', baseColor: '#f4f4f5', noiseColor: '#18181b', opacity: 55, blend: 'normal' }) },
  { name: 'Recycled Paper', tags: ['light'], state: p({ kind: 'paper', backdrop: 'solid', baseColor: '#efe9dd', noiseColor: '#78716c', opacity: 30, blend: 'multiply' }) },
  { name: 'Kraft', tags: ['warm'], state: p({ kind: 'paper', backdrop: 'solid', baseColor: '#b88a5a', noiseColor: '#3f2a14', opacity: 35, blend: 'multiply' }) },
  { name: 'CRT Monitor', tags: ['retro'], state: p({ kind: 'scanlines', backdrop: 'solid', baseColor: '#052e16', noiseColor: '#4ade80', opacity: 40, blend: 'screen', animate: true }) },
  { name: 'Synthwave', tags: ['gradient'], state: p({ kind: 'scanlines', baseColor: '#db2777', baseColor2: '#312e81', opacity: 30 }) },
  { name: 'Sunset Grain', tags: ['gradient', 'warm'], state: p({ baseColor: '#f97316', baseColor2: '#9d174d', opacity: 40, size: 1.25 }) },
  { name: 'Mint Soft', tags: ['gradient', 'light'], state: p({ baseColor: '#a7f3d0', baseColor2: '#bae6fd', noiseColor: '#0f172a', opacity: 25, blend: 'soft-light' }) },
  { name: 'Heavy Grain', tags: ['bold'], state: p({ kind: 'film', baseColor: '#4338ca', baseColor2: '#0f172a', opacity: 65, size: 2 }) },
  { name: 'Texture Only', tags: ['overlay'], state: p({ content: false, backdrop: 'solid', baseColor: '#18181b', opacity: 30, blend: 'normal' }) }
]
