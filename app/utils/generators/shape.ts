export type ShapeKind =
  | 'circle' | 'oval' | 'triangle' | 'diamond' | 'pentagon' | 'hexagon'
  | 'star' | 'heart' | 'arrow' | 'ribbon' | 'speech-bubble' | 'crescent'
  | 'cross' | 'trapezoid' | 'parallelogram' | 'blob'

export interface ShapeState {
  kind: ShapeKind
  size: number
  color: string
  radius: number
}

export const SHAPE_KINDS: { value: ShapeKind; label: string }[] = [
  { value: 'circle', label: 'Circle' },
  { value: 'oval', label: 'Oval' },
  { value: 'triangle', label: 'Triangle' },
  { value: 'diamond', label: 'Diamond' },
  { value: 'pentagon', label: 'Pentagon' },
  { value: 'hexagon', label: 'Hexagon' },
  { value: 'star', label: 'Star' },
  { value: 'heart', label: 'Heart' },
  { value: 'arrow', label: 'Arrow' },
  { value: 'ribbon', label: 'Ribbon' },
  { value: 'speech-bubble', label: 'Speech Bubble' },
  { value: 'crescent', label: 'Crescent' },
  { value: 'cross', label: 'Cross' },
  { value: 'trapezoid', label: 'Trapezoid' },
  { value: 'parallelogram', label: 'Parallelogram' },
  { value: 'blob', label: 'Blob' }
]

export const DEFAULT_SHAPE: ShapeState = {
  kind: 'circle',
  size: 160,
  color: '#10b981',
  radius: 0
}

/** Pure-CSS shape builders. Each returns the CSS needed beyond width/height/background. */
export function shapeStyle(kind: ShapeKind, size: number, color: string, radius: number): Record<string, string> {
  const s = size
  const bg = { background: color }
  switch (kind) {
    case 'circle':
      return { ...bg, width: `${s}px`, height: `${s}px`, 'border-radius': '50%' }
    case 'oval':
      return { ...bg, width: `${s * 1.5}px`, height: `${s}px`, 'border-radius': '50%' }
    case 'triangle':
      return {
        width: '0',
        height: '0',
        'border-left': `${s / 2}px solid transparent`,
        'border-right': `${s / 2}px solid transparent`,
        'border-bottom': `${s}px solid ${color}`
      }
    case 'diamond':
      return { ...bg, width: `${s}px`, height: `${s}px`, transform: 'rotate(45deg)' }
    case 'pentagon':
      return {
        ...bg,
        width: `${s}px`,
        height: `${s}px`,
        'clip-path': `polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)`
      }
    case 'hexagon':
      return {
        ...bg,
        width: `${s}px`,
        height: `${s * 0.577}px`,
        'clip-path': `polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)`
      }
    case 'star':
      return {
        ...bg,
        width: `${s}px`,
        height: `${s}px`,
        'clip-path': `polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)`
      }
    case 'heart':
      return {
        width: `${s}px`,
        height: `${s}px`,
        transform: 'rotate(45deg)',
        background: `radial-gradient(circle at 30% 30%, ${color} 60%, transparent 60.5%), radial-gradient(circle at 70% 70%, ${color} 60%, transparent 60.5%)`,
        'border-radius': `${s * 0.25}px`
      }
    case 'arrow':
      return {
        width: `${s}px`,
        height: `${s * 0.6}px`,
        'clip-path': `polygon(0% 35%, 60% 35%, 60% 15%, 100% 50%, 60% 85%, 60% 65%, 0% 65%)`
      }
    case 'ribbon':
      return {
        ...bg,
        width: `${s}px`,
        height: `${s * 0.35}px`,
        'clip-path': `polygon(0% 0%, 100% 0%, 85% 50%, 100% 100%, 0% 100%, 15% 50%)`
      }
    case 'speech-bubble':
      return {
        ...bg,
        width: `${s}px`,
        height: `${s * 0.65}px`,
        'border-radius': `${Math.max(12, radius)}px`,
        'clip-path': `polygon(0% 0%, 100% 0%, 100% 100%, 30% 100%, 20% 115%, 10% 100%, 0% 100%)`
      }
    case 'crescent':
      return {
        width: `${s}px`,
        height: `${s}px`,
        'border-radius': '50%',
        'box-shadow': `inset ${s * 0.25}px ${s * 0.05}px 0 0 ${color}`
      }
    case 'cross':
      return {
        ...bg,
        width: `${s}px`,
        height: `${s}px`,
        'clip-path': `polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 60% 65%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)`
      }
    case 'trapezoid':
      return {
        width: '0',
        height: '0',
        'border-left': `${s * 0.3}px solid transparent`,
        'border-right': `${s * 0.3}px solid transparent`,
        'border-bottom': `${s * 0.55}px solid ${color}`
      }
    case 'parallelogram':
      return { ...bg, width: `${s * 1.3}px`, height: `${s * 0.6}px`, transform: 'skewX(-20deg)' }
    case 'blob':
      return { ...bg, width: `${s}px`, height: `${s}px`, 'border-radius': '42% 58% 62% 38% / 55% 42% 58% 45%' }
    default:
      return { ...bg, width: `${s}px`, height: `${s}px` }
  }
}

export function shapeCss(s: ShapeState): string {
  const st = shapeStyle(s.kind, s.size, s.color, s.radius)
  const lines = [`.shape {`]
  for (const [k, v] of Object.entries(st)) lines.push(`  ${kebab(k)}: ${v};`)
  lines.push(`}`)
  return lines.join('\n')
}

function kebab(k: string): string {
  return k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
}

export function shapeVars(s: ShapeState): Record<string, string> {
  return {
    '--shape-size': `${s.size}px`,
    '--shape-color': s.color
  }
}

export function shapeHtml(): string {
  return `<div class="shape"></div>`
}

export function randomizeShape(s: ShapeState, rng: import('../rng').Rng): ShapeState {
  return {
    ...s,
    kind: rng.pick(SHAPE_KINDS.map((k) => k.value)),
    size: Math.round(rng.range(80, 240)),
    color: `#${Math.floor(rng.range(0.15, 1) * 0xffffff).toString(16).padStart(6, '0')}`
  }
}

export const PRESETS_SHAPE: { name: string; tags: string[]; state: ShapeState }[] = [
  { name: 'Badge Circle', tags: ['circle'], state: { ...DEFAULT_SHAPE } },
  { name: 'Star Mark', tags: ['star'], state: { ...DEFAULT_SHAPE, kind: 'star', color: '#fbbf24' } },
  { name: 'Chat Tail', tags: ['bubble'], state: { ...DEFAULT_SHAPE, kind: 'speech-bubble', radius: 24 } },
  { name: 'Ribbon Tag', tags: ['ribbon'], state: { ...DEFAULT_SHAPE, kind: 'ribbon', color: '#f43f5e' } },
  { name: 'Moon Crescent', tags: ['crescent'], state: { ...DEFAULT_SHAPE, kind: 'crescent', color: '#e2e8f0' } },
  { name: 'Organic Blob', tags: ['blob'], state: { ...DEFAULT_SHAPE, kind: 'blob' } },
  { name: 'Hex Nut', tags: ['hexagon'], state: { ...DEFAULT_SHAPE, kind: 'hexagon', color: '#94a3b8' } },
  { name: 'Down Arrow', tags: ['arrow'], state: { ...DEFAULT_SHAPE, kind: 'arrow', color: '#0ea5e9', size: 200 } },
  { name: 'Medical Cross', tags: ['cross'], state: { ...DEFAULT_SHAPE, kind: 'cross', color: '#ef4444' } },
  { name: 'Diamond Gem', tags: ['diamond'], state: { ...DEFAULT_SHAPE, kind: 'diamond', color: '#38bdf8', size: 140 } },
  { name: 'Trapezoid Base', tags: ['trapezoid'], state: { ...DEFAULT_SHAPE, kind: 'trapezoid', color: '#a78bfa' } },
  { name: 'Skew Card', tags: ['parallelogram'], state: { ...DEFAULT_SHAPE, kind: 'parallelogram', color: '#f472b6' } },
  { name: 'Pentagon Badge', tags: ['pentagon'], state: { ...DEFAULT_SHAPE, kind: 'pentagon', color: '#fbbf24' } },
  { name: 'Oval Egg', tags: ['oval'], state: { ...DEFAULT_SHAPE, kind: 'oval', color: '#fcd34d' } },
  { name: 'Sharp Triangle', tags: ['triangle'], state: { ...DEFAULT_SHAPE, kind: 'triangle', color: '#34d399' } },
  { name: 'Heart Love', tags: ['heart'], state: { ...DEFAULT_SHAPE, kind: 'heart', color: '#fb7185', size: 180 } },
  { name: 'Zigzag Ribbon', tags: ['ribbon'], state: { ...DEFAULT_SHAPE, kind: 'ribbon', color: '#8b5cf6' } },
  { name: 'Dark Crescent', tags: ['crescent'], state: { ...DEFAULT_SHAPE, kind: 'crescent', color: '#facc15', size: 200 } },
  { name: 'Mint Circle', tags: ['circle'], state: { ...DEFAULT_SHAPE, kind: 'circle', color: '#6ee7b7', size: 120 } },
  { name: 'Coral Blob', tags: ['blob'], state: { ...DEFAULT_SHAPE, kind: 'blob', color: '#fb923c', size: 200 } },
  { name: 'Sky Arrow', tags: ['arrow'], state: { ...DEFAULT_SHAPE, kind: 'arrow', color: '#f59e0b', size: 160 } }
]