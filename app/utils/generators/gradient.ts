export interface GradientStop {
  h: number
  s: number
  l: number
  a: number
  pos: number
  locked: boolean
}

export type GradientType =
  | 'linear'
  | 'radial'
  | 'conic'
  | 'repeating-linear'
  | 'repeating-radial'
  | 'repeating-conic'

export interface GradientState {
  type: GradientType
  angle: number
  pos: { x: number; y: number }
  shape: 'circle' | 'ellipse'
  size: 'closest-side' | 'farthest-side' | 'closest-corner' | 'farthest-corner'
  stops: GradientStop[]
  repeating: boolean
  animate: boolean
  animationKind: 'pan' | 'rotate' | 'pulse' | 'shift'
  animationDuration: number
  animationDirection: 'normal' | 'alternate' | 'reverse' | 'alternate-reverse'
}

export const GRADIENT_TYPES: { value: GradientType; label: string }[] = [
  { value: 'linear', label: 'Linear' },
  { value: 'radial', label: 'Radial' },
  { value: 'conic', label: 'Conic' },
  { value: 'repeating-linear', label: 'Repeating Linear' },
  { value: 'repeating-radial', label: 'Repeating Radial' },
  { value: 'repeating-conic', label: 'Repeating Conic' }
]

export const DEFAULT_GRADIENT: GradientState = {
  type: 'linear',
  angle: 135,
  pos: { x: 50, y: 50 },
  shape: 'ellipse',
  size: 'farthest-corner',
  stops: [
    { h: 160, s: 84, l: 40, a: 100, pos: 0, locked: false },
    { h: 200, s: 90, l: 60, a: 100, pos: 100, locked: false }
  ],
  repeating: false,
  animate: false,
  animationKind: 'pan',
  animationDuration: 4,
  animationDirection: 'normal'
}

function stopsCss(stops: GradientStop[]): string {
  return [...stops]
    .sort((a, b) => a.pos - b.pos)
    .map((s) => `hsl(${Math.round(s.h)} ${Math.round(s.s)}% ${Math.round(s.l)}%${s.a < 100 ? ` / ${s.a / 100}` : ''}) ${Math.round(s.pos)}%`)
    .join(', ')
}

export function gradientCss(s: GradientState): string {
  const st = stopsCss(s.stops)
  switch (s.type) {
    case 'linear':
      return `linear-gradient(${Math.round(s.angle)}deg, ${st})`
    case 'radial':
      return `radial-gradient(${s.shape} ${s.size} at ${Math.round(s.pos.x)}% ${Math.round(s.pos.y)}%, ${st})`
    case 'conic':
      return `conic-gradient(from ${Math.round(s.angle)}deg at ${Math.round(s.pos.x)}% ${Math.round(s.pos.y)}%, ${st})`
    case 'repeating-linear':
      return `repeating-linear-gradient(${Math.round(s.angle)}deg, ${st})`
    case 'repeating-radial':
      return `repeating-radial-gradient(${s.shape} ${s.size} at ${Math.round(s.pos.x)}% ${Math.round(s.pos.y)}%, ${st})`
    case 'repeating-conic':
      return `repeating-conic-gradient(from ${Math.round(s.angle)}deg at ${Math.round(s.pos.x)}% ${Math.round(s.pos.y)}%, ${st})`
  }
}

export function gradientVars(s: GradientState): Record<string, string> {
  const v: Record<string, string> = {
    '--gradient-type': s.type,
    '--gradient-angle': `${Math.round(s.angle)}deg`,
    '--gradient-x': `${Math.round(s.pos.x)}%`,
    '--gradient-y': `${Math.round(s.pos.y)}%`
  }
  ;[...s.stops]
    .sort((a, b) => a.pos - b.pos)
    .forEach((stop, i) => {
      v[`--stop-${i + 1}`] = `hsl(${Math.round(stop.h)} ${Math.round(stop.s)}% ${Math.round(stop.l)}%${stop.a < 100 ? ` / ${stop.a / 100}` : ''})`
      v[`--stop-${i + 1}-pos`] = `${Math.round(stop.pos)}%`
    })
  return v
}

export function gradientFullCss(s: GradientState): string {
  const lines = [`.gradient {`, `  background: ${gradientCss(s)};`]
  if (s.animate) {
    const animName = `gradient-${s.animationKind}`
    lines.push(`  animation: ${animName} ${s.animationDuration}s ${s.animationDirection} infinite ease-in-out;`)
    if (s.animationKind === 'pan') {
      lines.push(`  background-size: 200% 200%;`)
    }
  }
  lines.push(`}`)
  if (s.animate) {
    lines.push(``, gradientKeyframes(s))
  }
  return lines.join('\n')
}

export function gradientKeyframes(s: GradientState): string {
  const name = `gradient-${s.animationKind}`
  switch (s.animationKind) {
    case 'pan':
      return `@keyframes ${name} {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`
    case 'rotate':
      return `@keyframes ${name} {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}`
    case 'pulse':
      return `@keyframes ${name} {
  0%, 100% { background-size: 100% 100%; }
  50% { background-size: 180% 180%; }
}`
    case 'shift':
      return `@keyframes ${name} {
  0% { background-position: 0% 0%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 0%; }
}`
  }
}

export function gradientPreviewStyle(s: GradientState): Record<string, string> {
  const st: Record<string, string> = { background: gradientCss(s) }
  if (s.animate) {
    const animName = `gradient-${s.animationKind}`
    st['animation'] = `${animName} ${s.animationDuration}s ${s.animationDirection} infinite ease-in-out`
    if (s.animationKind === 'pan' || s.animationKind === 'shift') {
      st['background-size'] = '200% 200%'
    }
  }
  return st
}

export function gradientKeyframesHtml(s: GradientState): string {
  if (!s.animate) return ''
  return `<style>${gradientKeyframes(s)}</style>`
}

export function gradientHtml(): string {
  return `<div class="gradient"></div>`
}

export function reverseGradient(s: GradientState): GradientState {
  return { ...s, stops: s.stops.map((st) => ({ ...st, pos: 100 - st.pos })) }
}

export function randomizeGradient(s: GradientState, rng: import('../rng').Rng): GradientState {
  const base = rng.range(0, 360)
  const types = GRADIENT_TYPES.map((t) => t.value)
  const type = rng.pick(types)
  return {
    ...s,
    type,
    angle: Math.round(rng.range(0, 360)),
    pos: { x: Math.round(rng.range(0, 100)), y: Math.round(rng.range(0, 100)) },
    stops: Array.from({ length: rng.int(2, 4) }, (_, i) => ({
      h: Math.round((base + i * rng.range(20, 90)) % 360),
      s: Math.round(rng.range(60, 95)),
      l: Math.round(rng.range(30, 75)),
      a: 100,
      pos: i === 0 ? 0 : i === 3 ? 100 : Math.round((100 / 3) * i + rng.range(-8, 8)),
      locked: false
    })),
    animate: rng.chance(0.3),
    animationKind: rng.pick(['pan', 'rotate', 'pulse', 'shift'] as const),
    animationDuration: Math.round(rng.range(2, 8))
  }
}

export const PRESETS_GRADIENT: { name: string; tags: string[]; state: GradientState }[] = [
  {
    name: 'Sunset',
    tags: ['warm', 'brand'],
    state: {
      type: 'linear',
      angle: 135,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 12, s: 85, l: 55, a: 100, pos: 0, locked: false },
        { h: 330, s: 80, l: 60, a: 100, pos: 55, locked: false },
        { h: 260, s: 70, l: 45, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Ocean',
    tags: ['cool', 'brand'],
    state: {
      type: 'linear',
      angle: 160,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 190, s: 90, l: 45, a: 100, pos: 0, locked: false },
        { h: 210, s: 80, l: 30, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Aurora',
    tags: ['cool', 'brand'],
    state: {
      type: 'linear',
      angle: 120,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 150, s: 80, l: 45, a: 100, pos: 0, locked: false },
        { h: 190, s: 90, l: 50, a: 100, pos: 45, locked: false },
        { h: 270, s: 75, l: 55, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Neon',
    tags: ['brand'],
    state: {
      type: 'linear',
      angle: 90,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 320, s: 100, l: 55, a: 100, pos: 0, locked: false },
        { h: 260, s: 100, l: 60, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Pastel',
    tags: ['soft'],
    state: {
      type: 'linear',
      angle: 135,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 340, s: 70, l: 85, a: 100, pos: 0, locked: false },
        { h: 200, s: 70, l: 88, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Candy',
    tags: ['playful'],
    state: {
      type: 'conic',
      angle: 0,
      pos: { x: 50, y: 50 },
      shape: 'circle',
      size: 'farthest-corner',
      stops: [
        { h: 350, s: 90, l: 70, a: 100, pos: 0, locked: false },
        { h: 40, s: 95, l: 70, a: 100, pos: 30, locked: false },
        { h: 130, s: 80, l: 70, a: 100, pos: 60, locked: false },
        { h: 210, s: 90, l: 70, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Dark',
    tags: ['dark'],
    state: {
      type: 'linear',
      angle: 180,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 0, s: 0, l: 8, a: 100, pos: 0, locked: false },
        { h: 220, s: 25, l: 18, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Glass',
    tags: ['soft', 'dark'],
    state: {
      type: 'linear',
      angle: 145,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 200, s: 30, l: 92, a: 48, pos: 0, locked: false },
        { h: 210, s: 40, l: 75, a: 32, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Metallic',
    tags: ['mono'],
    state: {
      type: 'linear',
      angle: 110,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 210, s: 10, l: 90, a: 100, pos: 0, locked: false },
        { h: 210, s: 8, l: 60, a: 100, pos: 22, locked: false },
        { h: 210, s: 6, l: 85, a: 100, pos: 48, locked: false },
        { h: 210, s: 10, l: 55, a: 100, pos: 78, locked: false },
        { h: 210, s: 12, l: 80, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Cyberpunk',
    tags: ['brand', 'dark'],
    state: {
      type: 'linear',
      angle: 70,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 300, s: 100, l: 30, a: 100, pos: 0, locked: false },
        { h: 190, s: 100, l: 50, a: 100, pos: 55, locked: false },
        { h: 45, s: 100, l: 60, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Emerald',
    tags: ['brand', 'cool'],
    state: {
      type: 'linear',
      angle: 160,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 152, s: 76, l: 30, a: 100, pos: 0, locked: false },
        { h: 168, s: 84, l: 50, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Peach',
    tags: ['warm', 'soft'],
    state: {
      type: 'linear',
      angle: 20,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 28, s: 95, l: 75, a: 100, pos: 0, locked: false },
        { h: 350, s: 85, l: 80, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Deep Space',
    tags: ['dark', 'cool'],
    state: {
      type: 'radial',
      angle: 0,
      pos: { x: 30, y: 20 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 250, s: 60, l: 20, a: 100, pos: 0, locked: false },
        { h: 280, s: 50, l: 8, a: 100, pos: 60, locked: false },
        { h: 0, s: 0, l: 3, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Mint Fresh',
    tags: ['cool', 'soft'],
    state: {
      type: 'linear',
      angle: 100,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 160, s: 90, l: 80, a: 100, pos: 0, locked: false },
        { h: 190, s: 85, l: 65, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Rose Gold',
    tags: ['warm', 'luxury'],
    state: {
      type: 'linear',
      angle: 120,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 18, s: 55, l: 82, a: 100, pos: 0, locked: false },
        { h: 30, s: 45, l: 70, a: 100, pos: 50, locked: false },
        { h: 350, s: 40, l: 75, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Vaporwave',
    tags: ['playful', 'brand'],
    state: {
      type: 'linear',
      angle: 180,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 315, s: 95, l: 65, a: 100, pos: 0, locked: false },
        { h: 260, s: 90, l: 60, a: 100, pos: 45, locked: false },
        { h: 195, s: 95, l: 55, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Forest',
    tags: ['dark', 'cool'],
    state: {
      type: 'linear',
      angle: 145,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 140, s: 55, l: 22, a: 100, pos: 0, locked: false },
        { h: 100, s: 45, l: 35, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Sunrise',
    tags: ['warm'],
    state: {
      type: 'linear',
      angle: 90,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 45, s: 100, l: 60, a: 100, pos: 0, locked: false },
        { h: 15, s: 95, l: 55, a: 100, pos: 50, locked: false },
        { h: 330, s: 80, l: 50, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Lavender Mist',
    tags: ['soft', 'cool'],
    state: {
      type: 'linear',
      angle: 135,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 260, s: 60, l: 85, a: 100, pos: 0, locked: false },
        { h: 210, s: 65, l: 80, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Copper Steel',
    tags: ['mono', 'metallic'],
    state: {
      type: 'linear',
      angle: 100,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 25, s: 30, l: 80, a: 100, pos: 0, locked: false },
        { h: 25, s: 25, l: 45, a: 100, pos: 45, locked: false },
        { h: 25, s: 35, l: 75, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Toxic Slime',
    tags: ['brand', 'playful'],
    state: {
      type: 'radial',
      angle: 0,
      pos: { x: 50, y: 80 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 95, s: 95, l: 45, a: 100, pos: 0, locked: false },
        { h: 130, s: 85, l: 25, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Royal Purple',
    tags: ['dark', 'luxury'],
    state: {
      type: 'linear',
      angle: 160,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 270, s: 65, l: 30, a: 100, pos: 0, locked: false },
        { h: 290, s: 45, l: 12, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Candy Cane',
    tags: ['playful', 'repeating'],
    state: {
      type: 'repeating-linear',
      angle: 45,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 0, s: 85, l: 55, a: 100, pos: 0, locked: false },
        { h: 0, s: 85, l: 55, a: 100, pos: 12, locked: false },
        { h: 0, s: 0, l: 98, a: 100, pos: 12, locked: false },
        { h: 0, s: 0, l: 98, a: 100, pos: 25, locked: false }
      ],
      repeating: true
    }
  },
  {
    name: 'Rainbow Sweep',
    tags: ['playful', 'conic'],
    state: {
      type: 'conic',
      angle: 0,
      pos: { x: 50, y: 50 },
      shape: 'circle',
      size: 'farthest-corner',
      stops: [
        { h: 0, s: 90, l: 60, a: 100, pos: 0, locked: false },
        { h: 60, s: 90, l: 60, a: 100, pos: 20, locked: false },
        { h: 120, s: 90, l: 60, a: 100, pos: 40, locked: false },
        { h: 180, s: 90, l: 60, a: 100, pos: 60, locked: false },
        { h: 240, s: 90, l: 60, a: 100, pos: 80, locked: false },
        { h: 300, s: 90, l: 60, a: 100, pos: 100, locked: false }
      ],
      repeating: false
    }
  },
  {
    name: 'Midnight Oil',
    tags: ['dark', 'mono'],
    state: {
      type: 'linear',
      angle: 200,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 0, s: 0, l: 16, a: 100, pos: 0, locked: false },
        { h: 0, s: 0, l: 5, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: false,
      animationKind: 'pan',
      animationDuration: 4,
      animationDirection: 'normal'
    }
  },
  {
    name: 'Liquid Aurora',
    tags: ['animated', 'cool'],
    state: {
      type: 'linear',
      angle: 90,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 150, s: 80, l: 45, a: 100, pos: 0, locked: false },
        { h: 190, s: 90, l: 50, a: 100, pos: 50, locked: false },
        { h: 270, s: 75, l: 55, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: true,
      animationKind: 'pan',
      animationDuration: 5,
      animationDirection: 'alternate'
    }
  },
  {
    name: 'Hue Shift',
    tags: ['animated', 'playful'],
    state: {
      type: 'linear',
      angle: 135,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 320, s: 90, l: 55, a: 100, pos: 0, locked: false },
        { h: 260, s: 90, l: 60, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: true,
      animationKind: 'rotate',
      animationDuration: 6,
      animationDirection: 'normal'
    }
  },
  {
    name: 'Breathing Pulse',
    tags: ['animated', 'soft'],
    state: {
      type: 'radial',
      angle: 0,
      pos: { x: 50, y: 50 },
      shape: 'circle',
      size: 'farthest-corner',
      stops: [
        { h: 340, s: 80, l: 70, a: 100, pos: 0, locked: false },
        { h: 290, s: 70, l: 50, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: true,
      animationKind: 'pulse',
      animationDuration: 3,
      animationDirection: 'alternate'
    }
  },
  {
    name: 'Orbit Shift',
    tags: ['animated', 'conic'],
    state: {
      type: 'conic',
      angle: 0,
      pos: { x: 50, y: 50 },
      shape: 'circle',
      size: 'farthest-corner',
      stops: [
        { h: 0, s: 90, l: 55, a: 100, pos: 0, locked: false },
        { h: 120, s: 90, l: 55, a: 100, pos: 33, locked: false },
        { h: 240, s: 90, l: 55, a: 100, pos: 66, locked: false },
        { h: 0, s: 90, l: 55, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: true,
      animationKind: 'shift',
      animationDuration: 8,
      animationDirection: 'normal'
    }
  },
  {
    name: 'Cyber Flow',
    tags: ['animated', 'brand', 'dark'],
    state: {
      type: 'linear',
      angle: 45,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 300, s: 100, l: 35, a: 100, pos: 0, locked: false },
        { h: 190, s: 100, l: 50, a: 100, pos: 50, locked: false },
        { h: 45, s: 100, l: 55, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: true,
      animationKind: 'pan',
      animationDuration: 4,
      animationDirection: 'alternate'
    }
  },
  {
    name: 'Emerald Wave',
    tags: ['animated', 'brand'],
    state: {
      type: 'linear',
      angle: 120,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 155, s: 90, l: 40, a: 100, pos: 0, locked: false },
        { h: 170, s: 85, l: 55, a: 100, pos: 50, locked: false },
        { h: 145, s: 80, l: 50, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: true,
      animationKind: 'shift',
      animationDuration: 6,
      animationDirection: 'alternate'
    }
  },
  {
    name: 'Solar Flare',
    tags: ['animated', 'warm'],
    state: {
      type: 'radial',
      angle: 0,
      pos: { x: 50, y: 50 },
      shape: 'circle',
      size: 'farthest-corner',
      stops: [
        { h: 45, s: 100, l: 60, a: 100, pos: 0, locked: false },
        { h: 15, s: 95, l: 50, a: 100, pos: 60, locked: false },
        { h: 0, s: 90, l: 35, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: true,
      animationKind: 'pulse',
      animationDuration: 4,
      animationDirection: 'alternate'
    }
  },
  {
    name: 'Holographic',
    tags: ['wow', 'animated'],
    state: {
      type: 'linear',
      angle: 45,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 180, s: 100, l: 50, a: 100, pos: 0, locked: false },
        { h: 300, s: 100, l: 50, a: 100, pos: 50, locked: false },
        { h: 60, s: 100, l: 50, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: true,
      animationKind: 'pan',
      animationDuration: 3,
      animationDirection: 'alternate'
    }
  },
  {
    name: 'Plasma Beam',
    tags: ['wow', 'animated'],
    state: {
      type: 'conic',
      angle: 0,
      pos: { x: 50, y: 50 },
      shape: 'circle',
      size: 'farthest-corner',
      stops: [
        { h: 280, s: 100, l: 40, a: 100, pos: 0, locked: false },
        { h: 320, s: 100, l: 50, a: 100, pos: 25, locked: false },
        { h: 190, s: 100, l: 50, a: 100, pos: 50, locked: false },
        { h: 260, s: 100, l: 40, a: 100, pos: 75, locked: false },
        { h: 280, s: 100, l: 40, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: true,
      animationKind: 'rotate',
      animationDuration: 6,
      animationDirection: 'normal'
    }
  },
  {
    name: 'Bioluminescent',
    tags: ['wow', 'animated', 'brand'],
    state: {
      type: 'radial',
      angle: 0,
      pos: { x: 50, y: 50 },
      shape: 'circle',
      size: 'farthest-corner',
      stops: [
        { h: 160, s: 100, l: 35, a: 100, pos: 0, locked: false },
        { h: 175, s: 100, l: 50, a: 100, pos: 40, locked: false },
        { h: 0, s: 0, l: 3, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: true,
      animationKind: 'pulse',
      animationDuration: 3,
      animationDirection: 'alternate'
    }
  },
  {
    name: 'Cosmic Dust',
    tags: ['wow', 'dark'],
    state: {
      type: 'radial',
      angle: 0,
      pos: { x: 30, y: 30 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 260, s: 70, l: 25, a: 100, pos: 0, locked: false },
        { h: 220, s: 50, l: 10, a: 100, pos: 50, locked: false },
        { h: 0, s: 0, l: 2, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: false,
      animationKind: 'pan',
      animationDuration: 4,
      animationDirection: 'normal'
    }
  },
  {
    name: 'Liquid Gold',
    tags: ['wow', 'animated', 'luxury'],
    state: {
      type: 'linear',
      angle: 90,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 45, s: 100, l: 50, a: 100, pos: 0, locked: false },
        { h: 35, s: 90, l: 60, a: 100, pos: 30, locked: false },
        { h: 50, s: 100, l: 45, a: 100, pos: 60, locked: false },
        { h: 30, s: 85, l: 55, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: true,
      animationKind: 'pan',
      animationDuration: 5,
      animationDirection: 'alternate'
    }
  },
  {
    name: 'Inferno',
    tags: ['wow', 'animated', 'warm'],
    state: {
      type: 'linear',
      angle: 0,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 0, s: 100, l: 30, a: 100, pos: 0, locked: false },
        { h: 20, s: 100, l: 45, a: 100, pos: 40, locked: false },
        { h: 45, s: 100, l: 55, a: 100, pos: 70, locked: false },
        { h: 0, s: 100, l: 25, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: true,
      animationKind: 'shift',
      animationDuration: 4,
      animationDirection: 'alternate'
    }
  },
  {
    name: 'Aurora Borealis',
    tags: ['wow', 'animated', 'cool'],
    state: {
      type: 'linear',
      angle: 100,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 140, s: 80, l: 40, a: 100, pos: 0, locked: false },
        { h: 175, s: 90, l: 50, a: 100, pos: 30, locked: false },
        { h: 210, s: 85, l: 45, a: 100, pos: 60, locked: false },
        { h: 270, s: 75, l: 40, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: true,
      animationKind: 'shift',
      animationDuration: 8,
      animationDirection: 'alternate'
    }
  },
  {
    name: 'Vapor Dream',
    tags: ['wow', 'animated', 'playful'],
    state: {
      type: 'linear',
      angle: 180,
      pos: { x: 50, y: 50 },
      shape: 'ellipse',
      size: 'farthest-corner',
      stops: [
        { h: 320, s: 100, l: 60, a: 100, pos: 0, locked: false },
        { h: 280, s: 90, l: 50, a: 100, pos: 40, locked: false },
        { h: 200, s: 100, l: 55, a: 100, pos: 100, locked: false }
      ],
      repeating: false,
      animate: true,
      animationKind: 'pan',
      animationDuration: 6,
      animationDirection: 'alternate'
    }
  }
]