export type PatternKind =
  | 'dots' | 'grid' | 'diagonal' | 'horizontal' | 'vertical' | 'checkerboard'
  | 'crosshatch' | 'zigzag' | 'halftone' | 'plus' | 'diamond' | 'waves'

export interface PatternState {
  kind: PatternKind
  size: number
  spacing: number
  thickness: number
  rotation: number
  color: string
  bg: string
  opacity: number
}

export const PATTERN_KINDS: { value: PatternKind; label: string }[] = [
  { value: 'dots', label: 'Dots' },
  { value: 'grid', label: 'Grid' },
  { value: 'diagonal', label: 'Diagonal Stripes' },
  { value: 'horizontal', label: 'Horizontal Stripes' },
  { value: 'vertical', label: 'Vertical Stripes' },
  { value: 'checkerboard', label: 'Checkerboard' },
  { value: 'crosshatch', label: 'Crosshatch' },
  { value: 'zigzag', label: 'Zigzag' },
  { value: 'halftone', label: 'Halftone' },
  { value: 'plus', label: 'Plus' },
  { value: 'diamond', label: 'Diamond' },
  { value: 'waves', label: 'Waves' }
]

export const DEFAULT_PATTERN: PatternState = {
  kind: 'dots',
  size: 24,
  spacing: 0,
  thickness: 2,
  rotation: 0,
  color: '#34d39966',
  bg: '#09090b',
  opacity: 100
}

function rHex(c: string): string {
  return c.replace('#', '').trim()
}

export function patternBackground(s: PatternState): string {
  const c = rHex(s.color)
  const b = rHex(s.bg)
  const size = s.size
  const sp = Math.max(0, s.spacing)
  switch (s.kind) {
    case 'dots': {
      const step = size + sp
      return `${c} 1.5px, transparent 1.5px`
    }
    // handled by background-image composition in patternCss — fallback:
    default:
      return ''
  }
}

/** One or more background images + sizes/positions that produce the pattern. */
export function patternCss(s: PatternState): { image: string; size: string; position: string } {
  const c = `#${rHex(s.color)}`
  const step = Math.max(4, s.size + Math.max(0, s.spacing))
  const t = Math.max(1, s.thickness)
  switch (s.kind) {
    case 'dots':
      return {
        image: `radial-gradient(${c} ${Math.max(1, Math.round(t))}px, transparent ${Math.max(1, Math.round(t)) + 0.5}px)`,
        size: `${step}px ${step}px`,
        position: `0 0`
      }
    case 'grid': {
      const line = `linear-gradient(#${rHex(s.color)} ${t}px, transparent ${t}px), linear-gradient(90deg, #${rHex(s.color)} ${t}px, transparent ${t}px)`
      return { image: line, size: `${step}px ${step}px`, position: `0 0` }
    }
    case 'diagonal':
      return {
        image: `repeating-linear-gradient(45deg, ${c} 0 ${t}px, transparent ${t}px ${step}px)`,
        size: 'auto',
        position: '0 0'
      }
    case 'horizontal':
      return {
        image: `repeating-linear-gradient(0deg, ${c} 0 ${t}px, transparent ${t}px ${step}px)`,
        size: 'auto',
        position: '0 0'
      }
    case 'vertical':
      return {
        image: `repeating-linear-gradient(90deg, ${c} 0 ${t}px, transparent ${t}px ${step}px)`,
        size: 'auto',
        position: '0 0'
      }
    case 'checkerboard': {
      const cell = step
      return {
        image: `linear-gradient(45deg, ${c} 25%, transparent 25% 75%, ${c} 75%), linear-gradient(45deg, ${c} 25%, transparent 25% 75%, ${c} 75%)`,
        size: `${cell * 2}px ${cell * 2}px`,
        position: `0 0, ${cell}px ${cell}px`
      }
    }
    case 'crosshatch':
      return {
        image: `repeating-linear-gradient(45deg, ${c} 0 ${t}px, transparent ${t}px ${step}px), repeating-linear-gradient(-45deg, ${c} 0 ${t}px, transparent ${t}px ${step}px)`,
        size: 'auto',
        position: '0 0'
      }
    case 'zigzag':
      return {
        image: `linear-gradient(135deg, ${c} ${step / 4}px, transparent ${step / 4}px) 0 0 / ${step}px ${step}px, linear-gradient(225deg, ${c} ${step / 4}px, transparent ${step / 4}px) ${step / 2}px ${step / 4}px / ${step}px ${step}px`,
        size: 'auto',
        position: '0 0'
      }
    case 'halftone': {
      const st = Math.max(6, step)
      return {
        image: `radial-gradient(${c} ${Math.round(st * 0.35)}px, transparent ${Math.round(st * 0.35) + 1}px), radial-gradient(${c} ${Math.round(st * 0.35)}px, transparent ${Math.round(st * 0.35) + 1}px)`,
        size: `${st}px ${st}px`,
        position: `0 0, ${Math.round(st / 2)}px ${Math.round(st / 2)}px`
      }
    }
    case 'plus': {
      const st = Math.max(8, step)
      const arm = Math.max(2, Math.round(st / 4))
      return {
        image: `linear-gradient(#${rHex(s.color)} ${t}px, transparent ${t}px), linear-gradient(90deg, #${rHex(s.color)} ${t}px, transparent ${t}px)`,
        size: `${st}px ${st}px, ${st}px ${st}px`,
        position: `calc(50% - ${arm}px) calc(50% - ${arm}px), calc(50% - ${arm}px) calc(50% - ${arm}px)`
      }
    }
    case 'diamond':
      return {
        image: `linear-gradient(135deg, ${c} 25%, transparent 25%), linear-gradient(225deg, ${c} 25%, transparent 25%), linear-gradient(45deg, ${c} 25%, transparent 25%), linear-gradient(315deg, ${c} 25%, transparent 25%)`,
        size: `${step * 2}px ${step * 2}px`,
        position: `0 0`
      }
    case 'waves':
      return {
        image: `repeating-radial-gradient(circle at 50% 100%, transparent 0 ${Math.round(step * 0.35)}px, ${c} ${Math.round(step * 0.35)}px ${Math.round(step * 0.35) + t}px)`,
        size: `auto`,
        position: `0 0`
      }
    default:
      return { image: '', size: '', position: '' }
  }
}

export function patternFullCss(s: PatternState): string {
  const { image, size, position } = patternCss(s)
  const lines = [`background-color: #${rHex(s.bg)};`]
  if (image) {
    lines.push(`background-image: ${image};`)
    if (size && size !== 'auto') lines.push(`background-size: ${size};`)
    if (position && position !== '0 0') lines.push(`background-position: ${position};`)
  }
  if (s.rotation !== 0) lines.push(`/* rotate container or use a wrapper with transform: rotate(${s.rotation}deg) */`)
  const body = lines.map((l) => `  ${l}`).join('\n')
  return `.pattern {\n${body}\n}`
}

export function patternVars(s: PatternState): Record<string, string> {
  return {
    '--pattern-color': s.color,
    '--pattern-bg': s.bg,
    '--pattern-size': `${s.size}px`,
    '--pattern-spacing': `${s.spacing}px`
  }
}

export function patternPreviewStyle(s: PatternState): Record<string, string> {
  const { image, size, position } = patternCss(s)
  const st: Record<string, string> = { 'background-color': `#${rHex(s.bg)}` }
  if (image) st['background-image'] = image
  if (size && size !== 'auto') st['background-size'] = size
  if (position && position !== '0 0') st['background-position'] = position
  if (s.opacity < 100) st['opacity'] = `${s.opacity / 100}`
  if (s.rotation !== 0) st['--pattern-rotation'] = `${s.rotation}deg`
  return st
}

export function randomizePattern(s: PatternState, rng: import('../rng').Rng): PatternState {
  const hue = Math.floor(rng.range(0, 360))
  return {
    ...s,
    kind: rng.pick(PATTERN_KINDS.map((k) => k.value)),
    size: Math.round(rng.range(10, 60)),
    thickness: Math.round(rng.range(1, 4)),
    color: `#${((Math.floor(rng.range(0.3, 1) * 0xffffff) << 8) | Math.floor(rng.range(0x33, 0x99))).toString(16).padStart(6, '0')}`,
    bg: `#${Math.floor(rng.range(0, 0x222222)).toString(16).padStart(6, '0')}`,
    rotation: rng.pick([0, 45, 90, 135])
  }
}

export const PRESETS_PATTERN: { name: string; tags: string[]; state: PatternState }[] = [
  { name: 'Emerald Dots', tags: ['dots'], state: { ...DEFAULT_PATTERN } },
  { name: 'Blueprint Grid', tags: ['grid'], state: { ...DEFAULT_PATTERN, kind: 'grid', color: '#10b98155', size: 40, thickness: 1 } },
  { name: 'Hazard Stripes', tags: ['stripes'], state: { ...DEFAULT_PATTERN, kind: 'diagonal', color: '#fbbf24cc', size: 12, thickness: 6, bg: '#18181b' } },
  { name: 'Halftone Fade', tags: ['halftone'], state: { ...DEFAULT_PATTERN, kind: 'halftone', color: '#34d39988', size: 14, thickness: 5 } },
  { name: 'Graph Paper', tags: ['grid'], state: { ...DEFAULT_PATTERN, kind: 'grid', color: '#3f3f46', size: 32, thickness: 1, bg: '#fafafa' } },
  { name: 'Carbon Crosshatch', tags: ['crosshatch'], state: { ...DEFAULT_PATTERN, kind: 'crosshatch', color: '#52525b88', size: 8, thickness: 1 } },
  { name: 'Polka Party', tags: ['dots'], state: { ...DEFAULT_PATTERN, kind: 'dots', color: '#f472b6cc', size: 18, thickness: 4, bg: '#fdf2f8' } },
  { name: 'Diagonal Rib', tags: ['stripes'], state: { ...DEFAULT_PATTERN, kind: 'diagonal', color: '#0ea5e988', size: 10, thickness: 3, bg: '#0c4a6e' } },
  { name: 'Isometric Grid', tags: ['grid'], state: { ...DEFAULT_PATTERN, kind: 'crosshatch', color: '#7dd3fc66', size: 28, thickness: 1, bg: '#082f49' } },
  { name: 'Checker Night', tags: ['checkerboard'], state: { ...DEFAULT_PATTERN, kind: 'checkerboard', color: '#334155cc', size: 24, thickness: 2, bg: '#0f172a' } },
  { name: 'Wavy Line', tags: ['waves'], state: { ...DEFAULT_PATTERN, kind: 'waves', color: '#22d3ee66', size: 22, thickness: 2, bg: '#083344' } },
  { name: 'Diamond Tile', tags: ['diamond'], state: { ...DEFAULT_PATTERN, kind: 'diamond', color: '#a78bfa44', size: 16, thickness: 2, bg: '#1e1b4b' } },
  { name: 'Zigzag Energy', tags: ['zigzag'], state: { ...DEFAULT_PATTERN, kind: 'zigzag', color: '#fbbf2488', size: 14, thickness: 3, bg: '#1c1917' } },
  { name: 'Plus Mark', tags: ['plus'], state: { ...DEFAULT_PATTERN, kind: 'plus', color: '#34d39966', size: 26, thickness: 2, bg: '#022c22' } },
  { name: 'Vertical Ribbon', tags: ['stripes'], state: { ...DEFAULT_PATTERN, kind: 'vertical', color: '#a78bfa55', size: 8, thickness: 2, bg: '#18181b' } },
  { name: 'Horizontal Band', tags: ['stripes'], state: { ...DEFAULT_PATTERN, kind: 'horizontal', color: '#f9731644', size: 12, thickness: 3, bg: '#1c1917' } },
  { name: 'Dot Matrix', tags: ['dots'], state: { ...DEFAULT_PATTERN, kind: 'dots', color: '#e4e4e788', size: 8, thickness: 1, bg: '#09090b' } },
  { name: 'Terracotta Grid', tags: ['grid', 'warm'], state: { ...DEFAULT_PATTERN, kind: 'grid', color: '#c2755d55', size: 36, thickness: 2, bg: '#faf7f5' } },
  { name: 'Sunset Checker', tags: ['checkerboard', 'warm'], state: { ...DEFAULT_PATTERN, kind: 'checkerboard', color: '#fb923caa', size: 18, thickness: 2, bg: '#431407' } },
  { name: 'Deep Halftone', tags: ['halftone', 'dark'], state: { ...DEFAULT_PATTERN, kind: 'halftone', color: '#64748b88', size: 10, thickness: 3, bg: '#020617' } },
  { name: 'Candy Stripes', tags: ['stripes', 'playful'], state: { ...DEFAULT_PATTERN, kind: 'diagonal', color: '#f9a8d4aa', size: 14, thickness: 7, bg: '#fdf2f8' } },
  { name: 'Neon Crosshatch', tags: ['crosshatch', 'brand'], state: { ...DEFAULT_PATTERN, kind: 'crosshatch', color: '#34d39955', size: 18, thickness: 1, bg: '#052e26' } },
  { name: 'Cyber Matrix', tags: ['wow', 'dots', 'dark'], state: { ...DEFAULT_PATTERN, kind: 'dots', color: '#22d3ee88', size: 10, thickness: 2, bg: '#020617' } },
  { name: 'Lava Cracks', tags: ['wow', 'crosshatch', 'warm'], state: { ...DEFAULT_PATTERN, kind: 'crosshatch', color: '#f9731666', size: 14, thickness: 1, bg: '#0d0000' } },
  { name: 'Electric Grid', tags: ['wow', 'grid', 'brand'], state: { ...DEFAULT_PATTERN, kind: 'grid', color: '#34d39944', size: 24, thickness: 1, bg: '#021410' } },
  { name: 'Poison Dots', tags: ['wow', 'dots'], state: { ...DEFAULT_PATTERN, kind: 'dots', color: '#a3e635cc', size: 14, thickness: 3, bg: '#0a0f00' } },
  { name: 'Magenta Waves', tags: ['wow', 'waves'], state: { ...DEFAULT_PATTERN, kind: 'waves', color: '#ec489966', size: 20, thickness: 3, bg: '#0d0010' } },
  { name: 'Galaxy Dots', tags: ['wow', 'dots', 'dark'], state: { ...DEFAULT_PATTERN, kind: 'halftone', color: '#a78bfa55', size: 12, thickness: 4, bg: '#050010' } },
  { name: 'Vapor Checker', tags: ['wow', 'checkerboard', 'playful'], state: { ...DEFAULT_PATTERN, kind: 'checkerboard', color: '#c084fc88', size: 20, thickness: 2, bg: '#1a0a2e' } }
]