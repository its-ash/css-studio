export type ClipKind = 'polygon' | 'circle' | 'ellipse' | 'inset'

export interface ClipState {
  kind: ClipKind
  /** polygon points as percent pairs, flat [x,y,x,y,...] in 0-100 */
  points: number[]
  /** circle radius % + center */
  circleR: number
  circleX: number
  circleY: number
  /** inset values px */
  inset: [number, number, number, number]
  round: number
  accent: string
  bg: string
  showGuides: boolean
}

export const CLIP_KINDS: { value: ClipKind; label: string }[] = [
  { value: 'polygon', label: 'Polygon' },
  { value: 'circle', label: 'Circle' },
  { value: 'ellipse', label: 'Ellipse' },
  { value: 'inset', label: 'Inset' }
]

export const DEFAULT_CLIP: ClipState = {
  kind: 'polygon',
  points: [50, 0, 100, 38, 82, 100, 18, 100, 0, 38],
  circleR: 40,
  circleX: 50,
  circleY: 50,
  inset: [16, 16, 16, 16],
  round: 0,
  accent: '#10b981',
  bg: '#09090b',
  showGuides: true
}

export function clipPathValue(s: ClipState): string {
  switch (s.kind) {
    case 'polygon': {
      const pts: string[] = []
      for (let i = 0; i < s.points.length; i += 2) {
        pts.push(`${Math.round(s.points[i]! * 10) / 10}% ${Math.round(s.points[i + 1]! * 10) / 10}%`)
      }
      return `polygon(${pts.join(', ')})`
    }
    case 'circle':
      return `circle(${Math.max(1, s.circleR)}% at ${s.circleX}% ${s.circleY}%)`
    case 'ellipse':
      return `ellipse(${s.circleR}% ${Math.max(1, Math.round(s.circleR * 0.72))}% at ${s.circleX}% ${s.circleY}%)`
    case 'inset': {
      const [t, r, b, l] = s.inset
      return `inset(${t}px ${r}px ${b}px ${l}px round ${s.round}px)`
    }
    default:
      return ''
  }
}

export function clipCss(s: ClipState): string {
  return `.clip {
  width: 280px;
  height: 280px;
  background: ${s.accent};
  clip-path: ${clipPathValue(s)};
}`
}

export function clipHtml(): string {
  return `<div class="clip"></div>`
}

export function clipVars(s: ClipState): Record<string, string> {
  return {
    '--clip-path': clipPathValue(s),
    '--clip-accent': s.accent
  }
}

export function clipPreviewStyle(s: ClipState): Record<string, string> {
  return {
    'clip-path': clipPathValue(s),
    'background-color': s.accent
  }
}

/** CSS polygon() source string, used for the guides overlay. */
export function clipPolygonPoints(s: ClipState): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i < s.points.length; i += 2) {
    pts.push({ x: s.points[i]!, y: s.points[i + 1]! })
  }
  return pts
}

export function setPoint(s: ClipState, index: number, x: number, y: number): ClipState {
  const points = [...s.points]
  points[index * 2] = Math.min(100, Math.max(0, Math.round(x * 10) / 10))
  points[index * 2 + 1] = Math.min(100, Math.max(0, Math.round(y * 10) / 10))
  return { ...s, points }
}

export function addPoint(s: ClipState): ClipState {
  const n = s.points.length / 2
  const x = s.points[(n - 1) * 2]!
  const y = s.points[(n - 1) * 2 + 1]!
  const nx = 50 + (x - 50) * 0.8
  const ny = 50 + (50 - (s.points[1] ?? 0)) * 0.2 + 10
  return { ...s, points: [...s.points, Math.round(nx), Math.round(ny)] }
}

export function removePoint(s: ClipState, index: number): ClipState {
  if (s.points.length <= 6) return s
  const points = [...s.points]
  points.splice(index * 2, 2)
  return { ...s, points }
}

export function randomizeClip(s: ClipState, rng: import('../rng').Rng): ClipState {
  const kind = rng.pick(CLIP_KINDS.map((k) => k.value) as ClipKind[])
  const n = rng.int(3, 8)
  const points: number[] = []
  for (let i = 0; i < n; i++) {
    points.push(Math.round(rng.range(5, 95)), Math.round(rng.range(5, 95)))
  }
  return {
    ...s,
    kind,
    points,
    circleR: Math.round(rng.range(25, 48)),
    circleX: Math.round(rng.range(30, 70)),
    circleY: Math.round(rng.range(30, 70)),
    inset: [Math.round(rng.range(0, 40)), Math.round(rng.range(0, 40)), Math.round(rng.range(0, 40)), Math.round(rng.range(0, 40))],
    round: rng.pick([0, 0, 12, 24]),
    accent: rng.pick(['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#f43f5e', '#22d3ee'])
  }
}

export const PRESETS_CLIP: { name: string; tags: string[]; state: ClipState }[] = [
  { name: 'Star', tags: ['polygon'], state: { ...DEFAULT_CLIP, points: [50, 0, 61, 35, 98, 35, 68, 57, 79, 91, 50, 70, 21, 91, 32, 57, 2, 35, 39, 35] } },
  { name: 'Hexagon', tags: ['polygon'], state: { ...DEFAULT_CLIP, points: [50, 0, 93, 25, 93, 56, 50, 100, 7, 56, 7, 25] } },
  { name: 'Speech Bubble', tags: ['polygon'], state: { ...DEFAULT_CLIP, points: [0, 0, 100, 0, 100, 75, 45, 75, 30, 100, 25, 75, 0, 75] } },
  { name: 'Chevron Arrow', tags: ['polygon'], state: { ...DEFAULT_CLIP, points: [0, 0, 75, 0, 100, 50, 75, 100, 0, 100, 25, 50] } },
  { name: 'Perfect Circle', tags: ['circle'], state: { ...DEFAULT_CLIP, kind: 'circle', circleR: 50, circleX: 50, circleY: 50 } },
  { name: 'Off-Center Orb', tags: ['circle'], state: { ...DEFAULT_CLIP, kind: 'circle', circleR: 35, circleX: 35, circleY: 40, accent: '#0ea5e9' } },
  { name: 'Rounded Card', tags: ['inset'], state: { ...DEFAULT_CLIP, kind: 'inset', inset: [0, 0, 0, 0], round: 24 } },
  { name: 'Notch Corner', tags: ['inset'], state: { ...DEFAULT_CLIP, kind: 'inset', inset: [0, 0, 24, 0], round: 0, accent: '#8b5cf6' } },
  { name: 'Ellipse Badge', tags: ['ellipse'], state: { ...DEFAULT_CLIP, kind: 'ellipse', circleR: 50, accent: '#f59e0b' } }
]