export interface NeumorphicState {
  base: string
  angle: number
  light: string
  dark: string
  blur: number
  distance: number
  radius: number
  intensity: number
  inset: boolean
  width: number
  height: number
}

export const DEFAULT_NEUMORPH: NeumorphicState = {
  base: '#e4e6ec',
  angle: 135,
  light: '#ffffff',
  dark: '#c8ccd6',
  blur: 24,
  distance: 12,
  radius: 32,
  intensity: 70,
  inset: false,
  width: 280,
  height: 280
}

/** Compute the two shadow offsets from a light angle. */
function offsets(angle: number, distance: number): { dx: number; dy: number } {
  const rad = ((angle + 180) * Math.PI) / 180
  return { dx: Math.round(Math.cos(rad) * distance), dy: Math.round(Math.sin(rad) * distance) }
}

export function neumorphShadows(s: NeumorphicState): { light: string; dark: string; dx: number; dy: number; blur: number } {
  const { dx, dy } = offsets(s.angle, s.distance)
  const blur = s.blur
  return { light: `${-dx}px ${-dy}px ${blur}px ${s.light}`, dark: `${dx}px ${dy}px ${blur}px ${s.dark}`, dx, dy, blur }
}

export function neumorphCss(s: NeumorphicState): string {
  const sh = neumorphShadows(s)
  const intensity = s.intensity / 100
  const light = s.inset ? `inset ${sh.dx}px ${sh.dy}px ${sh.blur}px ${s.dark}` : `${-sh.dx}px ${-sh.dy}px ${sh.blur}px ${s.light}`
  const dark = s.inset ? `inset ${-sh.dx}px ${-sh.dy}px ${sh.blur}px ${s.light}` : `${sh.dx}px ${sh.dy}px ${sh.blur}px ${s.dark}`
  const lines = [
    `.neumorphic {`,
    `  background: ${s.base};`,
    `  border-radius: ${s.radius}px;`,
    `  box-shadow: ${light}, ${dark};`,
    `}`
  ]
  return lines.join('\n')
}

export function neumorphPreviewStyle(s: NeumorphicState): Record<string, string> {
  const sh = neumorphShadows(s)
  const light = s.inset ? `inset ${sh.dx}px ${sh.dy}px ${sh.blur}px ${s.dark}` : `${-sh.dx}px ${-sh.dy}px ${sh.blur}px ${s.light}`
  const dark = s.inset ? `inset ${-sh.dx}px ${-sh.dy}px ${sh.blur}px ${s.light}` : `${sh.dx}px ${sh.dy}px ${sh.blur}px ${s.dark}`
  return {
    background: s.base,
    'border-radius': `${s.radius}px`,
    'box-shadow': `${light}, ${dark}`,
    width: `${s.width}px`,
    height: `${s.height}px`
  }
}

export function neumorphVars(s: NeumorphicState): Record<string, string> {
  return {
    '--neu-base': s.base,
    '--neu-light': s.light,
    '--neu-dark': s.dark,
    '--neu-distance': `${s.distance}px`,
    '--neu-blur': `${s.blur}px`,
    '--neu-radius': `${s.radius}px`
  }
}

export function neumorphHtml(): string {
  return `<div class="neumorphic"></div>`
}

export function randomizeNeumorph(s: NeumorphicState, rng: import('../rng').Rng): NeumorphicState {
  return {
    ...s,
    base: `hsl(${Math.round(rng.range(200, 230))} ${Math.round(rng.range(8, 20))}% ${Math.round(rng.range(84, 92))}%)`,
    angle: Math.round(rng.range(0, 360)),
    distance: Math.round(rng.range(6, 20)),
    blur: Math.round(rng.range(16, 40)),
    radius: Math.round(rng.range(12, 48)),
    inset: rng.chance(0.3)
  }
}

export const PRESETS_NEUMORPH: { name: string; tags: string[]; state: NeumorphicState }[] = [
  {
    name: 'Classic Soft',
    tags: ['raised'],
    state: { ...DEFAULT_NEUMORPH }
  },
  {
    name: 'Pressed',
    tags: ['inset'],
    state: { ...DEFAULT_NEUMORPH, inset: true, distance: 8, blur: 16 }
  },
  {
    name: 'Dark Slate',
    tags: ['dark'],
    state: { ...DEFAULT_NEUMORPH, base: '#2d2d34', light: '#3a3a44', dark: '#1f1f26', radius: 24 }
  },
  {
    name: 'Minimal Button',
    tags: ['button'],
    state: { ...DEFAULT_NEUMORPH, width: 200, height: 64, radius: 32, distance: 8, blur: 20 }
  },
  {
    name: 'Warm Sand',
    tags: ['warm'],
    state: { ...DEFAULT_NEUMORPH, base: '#e8e0d4', light: '#fffaf0', dark: '#c9bfae', radius: 40, blur: 30, distance: 14 }
  },
  {
    name: 'Mint Pad',
    tags: ['cool'],
    state: { ...DEFAULT_NEUMORPH, base: '#d7e8dc', light: '#f2fbf5', dark: '#b3cdbc', radius: 28, distance: 10, blur: 22 }
  },
  {
    name: 'Deep Press',
    tags: ['inset', 'dark'],
    state: { ...DEFAULT_NEUMORPH, base: '#1c1c22', light: '#2e2e38', dark: '#0d0d11', radius: 24, inset: true, distance: 10, blur: 28 }
  },
  {
    name: 'Toggle Pill',
    tags: ['button', 'inset'],
    state: { ...DEFAULT_NEUMORPH, width: 220, height: 56, radius: 28, distance: 6, blur: 16 }
  },
  {
    name: 'Rose Clay',
    tags: ['warm', 'light'],
    state: { ...DEFAULT_NEUMORPH, base: '#f2d8d8', light: '#fff4f4', dark: '#d9b3b8', radius: 36, blur: 26, distance: 12 }
  },
  {
    name: 'Ocean Foam',
    tags: ['cool', 'light'],
    state: { ...DEFAULT_NEUMORPH, base: '#d6e5ee', light: '#f0f8fc', dark: '#b0c5d4', radius: 30, distance: 10, blur: 24 }
  },
  {
    name: 'Graphite Slab',
    tags: ['dark'],
    state: { ...DEFAULT_NEUMORPH, base: '#2a2a30', light: '#3a3a42', dark: '#17171c', radius: 18, blur: 34, distance: 16 }
  },
  {
    name: 'Input Well',
    tags: ['inset', 'form'],
    state: { ...DEFAULT_NEUMORPH, width: 320, height: 72, radius: 16, inset: true, distance: 7, blur: 18 }
  },
  {
    name: 'Soft Square',
    tags: ['card'],
    state: { ...DEFAULT_NEUMORPH, width: 240, height: 240, radius: 12, distance: 12, blur: 28 }
  },
  {
    name: 'Deep Press Pro',
    tags: ['wow', 'inset'],
    state: { ...DEFAULT_NEUMORPH, base: '#e8e6e0', light: '#ffffff', dark: '#c0bdb5', width: 280, height: 280, radius: 40, inset: true, distance: 14, blur: 40, intensity: 100 }
  },
  {
    name: 'Floating Orb',
    tags: ['wow', 'raised'],
    state: { ...DEFAULT_NEUMORPH, base: '#d6e4ee', light: '#f8fcff', dark: '#a3bdd0', width: 260, height: 260, radius: 999, distance: 20, blur: 50, intensity: 90 }
  },
  {
    name: 'Dark Carbon',
    tags: ['wow', 'dark'],
    state: { ...DEFAULT_NEUMORPH, base: '#1a1a20', light: '#33333d', dark: '#08080c', width: 280, height: 280, radius: 28, distance: 16, blur: 44, intensity: 100 }
  },
  {
    name: 'Sage Mist',
    tags: ['wow', 'cool'],
    state: { ...DEFAULT_NEUMORPH, base: '#d4e0d8', light: '#f0f8f2', dark: '#a8bfb0', width: 260, height: 260, radius: 32, distance: 12, blur: 36, intensity: 85 }
  },
  {
    name: 'Blush Clay',
    tags: ['wow', 'warm'],
    state: { ...DEFAULT_NEUMORPH, base: '#ecd4d8', light: '#fff5f6', dark: '#c9adb2', width: 280, height: 280, radius: 36, distance: 14, blur: 42, intensity: 95 }
  }
]