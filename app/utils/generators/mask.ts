export type MaskKind = 'linear' | 'radial' | 'radial-inverse' | 'stripe' | 'dots' | 'text'
export type MaskRepeat = 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'

export interface MaskState {
  kind: MaskKind
  angle: number
  /** linear fade: 0 = hard cut, 100 = full gradient width */
  extent: number
  radius: number
  softness: number
  stripeWidth: number
  stripeGap: number
  dotSize: number
  repeat: MaskRepeat
  invert: boolean
  imageText: string
  accent: string
  bg: string
}

export const MASK_KINDS: { value: MaskKind; label: string }[] = [
  { value: 'linear', label: 'Linear Fade' },
  { value: 'radial', label: 'Radial Spotlight' },
  { value: 'radial-inverse', label: 'Radial Hole' },
  { value: 'stripe', label: 'Stripes' },
  { value: 'dots', label: 'Dot Grid' },
  { value: 'text', label: 'Text Knockout' }
]

export const DEFAULT_MASK: MaskState = {
  kind: 'linear',
  angle: 90,
  extent: 60,
  radius: 45,
  softness: 30,
  stripeWidth: 8,
  stripeGap: 8,
  dotSize: 6,
  repeat: 'no-repeat',
  invert: false,
  imageText: 'MASK',
  accent: '#10b981',
  bg: '#09090b'
}

export function maskCssExport(s: MaskState): string {
  const { image: img, size: sz, repeat } = maskCore(s)
  return `.mask {
  -webkit-mask-image: ${img};
  mask-image: ${img};
  -webkit-mask-size: ${sz};
  mask-size: ${sz};
  mask-repeat: ${repeat};
  -webkit-mask-repeat: ${repeat};
  background: ${s.accent};
  width: 320px;
  height: 220px;
}`
}

export function maskCore(s: MaskState): { image: string; size: string; repeat: MaskRepeat } {
  switch (s.kind) {
    case 'linear': {
      const solidAt = Math.max(1, Math.min(100, 100 - s.extent))
      const from = s.invert ? `transparent ${solidAt}%, #000 ${solidAt}%` : `#000 0%, #000 ${solidAt}%, transparent ${solidAt + 1}%`
      return { image: `linear-gradient(${s.angle}deg, ${from})`, size: '100% 100%', repeat: 'no-repeat' }
    }
    case 'radial':
      return { image: `radial-gradient(circle, #000 0%, #000 ${Math.max(0, s.radius - s.softness)}%, transparent ${s.radius}%)`, size: '100% 100%', repeat: 'no-repeat' }
    case 'radial-inverse':
      return { image: `radial-gradient(circle, transparent 0%, transparent ${Math.max(0, s.radius - s.softness)}%, #000 ${s.radius}%)`, size: '100% 100%', repeat: 'no-repeat' }
    case 'stripe':
      return { image: `repeating-linear-gradient(${s.angle}deg, #000 0 ${Math.max(1, s.stripeWidth)}px, transparent ${Math.max(1, s.stripeWidth)}px ${Math.max(2, s.stripeWidth + Math.max(0, s.stripeGap))}px)`, size: 'auto', repeat: 'repeat' }
    case 'dots': {
      const step = Math.max(4, s.dotSize * 2 + Math.max(2, s.stripeGap))
      return { image: `radial-gradient(circle at center, #000 0 ${Math.max(1, s.dotSize)}px, transparent ${Math.max(1, s.dotSize) + 1}px)`, size: `${step}px ${step}px`, repeat: 'repeat' }
    }
    case 'text':
      return { image: `linear-gradient(#000 0 0)`, size: '100% 100%', repeat: 'no-repeat' }
    default:
      return { image: '', size: '100% 100%', repeat: 'no-repeat' }
  }
}

export function maskFullCss(s: MaskState): string {
  return maskCssExport(s)
}

export function maskHtml(s: MaskState): string {
  return `<div class="mask"></div>`
}

export function maskPreviewStyle(s: MaskState): Record<string, string> {
  const { image, size, repeat } = maskCore(s)
  return {
    'mask-image': image,
    'mask-size': size,
    'mask-repeat': repeat,
    'background-color': s.accent
  }
}

export function maskVars(s: MaskState): Record<string, string> {
  return {
    '--mask-angle': `${s.angle}deg`,
    '--mask-accent': s.accent
  }
}

export function randomizeMask(s: MaskState, rng: import('../rng').Rng): MaskState {
  return {
    ...s,
    kind: rng.pick(MASK_KINDS.map((k) => k.value) as MaskKind[]),
    angle: Math.round(rng.range(0, 360)),
    extent: Math.round(rng.range(20, 100)),
    radius: Math.round(rng.range(30, 90)),
    softness: Math.round(rng.range(0, 45)),
    stripeWidth: Math.round(rng.range(2, 20)),
    stripeGap: Math.round(rng.range(0, 20)),
    dotSize: Math.round(rng.range(3, 14)),
    repeat: rng.pick(['no-repeat', 'repeat'] as const),
    invert: rng.chance(0.3),
    accent: rng.pick(['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#f43f5e', '#22d3ee'])
  }
}

export const PRESETS_MASK: { name: string; tags: string[]; state: MaskState }[] = [
  { name: 'Edge Fade', tags: ['linear'], state: { ...DEFAULT_MASK, kind: 'linear', angle: 90, extent: 40 } },
  { name: 'Bottom Fade', tags: ['linear'], state: { ...DEFAULT_MASK, kind: 'linear', angle: 180, extent: 60 } },
  { name: 'Spotlight', tags: ['radial'], state: { ...DEFAULT_MASK, kind: 'radial', radius: 55, softness: 25 } },
  { name: 'Punch Hole', tags: ['radial'], state: { ...DEFAULT_MASK, kind: 'radial-inverse', radius: 40, softness: 12, accent: '#0ea5e9' } },
  { name: 'Scanlines', tags: ['stripe'], state: { ...DEFAULT_MASK, kind: 'stripe', angle: 0, stripeWidth: 3, stripeGap: 4 } },
  { name: 'Diagonal Bars', tags: ['stripe'], state: { ...DEFAULT_MASK, kind: 'stripe', angle: 45, stripeWidth: 10, stripeGap: 14, accent: '#8b5cf6' } },
  { name: 'Dot Matrix', tags: ['dots'], state: { ...DEFAULT_MASK, kind: 'dots', dotSize: 4, stripeGap: 8, accent: '#f59e0b' } },
  { name: 'Vignette', tags: ['radial'], state: { ...DEFAULT_MASK, kind: 'radial', radius: 90, softness: 40, accent: '#f43f5e' } }
]