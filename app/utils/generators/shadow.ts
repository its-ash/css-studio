export interface ShadowLayer {
  x: number
  y: number
  blur: number
  spread: number
  color: string
  inset: boolean
}

export interface ShadowState {
  kind: 'box' | 'text'
  layers: ShadowLayer[]
  radius: number
  surface: string
  textColor: string
  inset: boolean
}

export const DEFAULT_SHADOW: ShadowState = {
  kind: 'box',
  layers: [{ x: 0, y: 18, blur: 40, spread: -12, color: '#00000059', inset: false }],
  radius: 16,
  surface: '#ffffff',
  textColor: '#18181b',
  inset: false
}

export function shadowValue(layers: ShadowLayer[], kind: 'box' | 'text' = 'box'): string {
  return layers
    .map((l) => `${l.inset && kind === 'box' ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px${kind === 'box' ? ` ${l.spread}px` : ''} ${l.color}`)
    .join(', ')
}

export function shadowCss(s: ShadowState): string {
  if (s.kind === 'text') {
    return `.text-shadow {\n  color: ${s.textColor};\n  text-shadow: ${shadowValue(s.layers, 'text')};\n}`
  }
  const lines = [
    `.shadow-demo {`,
    `  background: ${s.surface};`,
    `  border-radius: ${s.radius}px;`,
    `  box-shadow: ${shadowValue(s.layers)};`,
    `}`
  ]
  return lines.join('\n')
}

export function shadowPreviewStyle(s: ShadowState): Record<string, string> {
  if (s.kind === 'text') {
    return { color: s.textColor, 'text-shadow': shadowValue(s.layers, 'text') }
  }
  return { background: s.surface, 'border-radius': `${s.radius}px`, 'box-shadow': shadowValue(s.layers) }
}

export function shadowVars(s: ShadowState): Record<string, string> {
  const v: Record<string, string> = { '--shadow-radius': `${s.radius}px` }
  s.layers.forEach((l, i) => {
    v[`--shadow-${i + 1}`] = `${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}`
  })
  return v
}

export function shadowHtml(s: ShadowState): string {
  return s.kind === 'text' ? `<h1 class="text-shadow">Shadow</h1>` : `<div class="shadow-demo"></div>`
}

export function randomizeShadow(s: ShadowState, rng: import('../rng').Rng): ShadowState {
  const layers = Array.from({ length: rng.int(1, 3) }, () => ({
    x: Math.round(rng.range(-20, 20)),
    y: Math.round(rng.range(4, 32)),
    blur: Math.round(rng.range(10, 60)),
    spread: Math.round(rng.range(-14, 6)),
    color: `${rng.pick(['#00000055', '#0f766e55', '#1e293b66'])}`,
    inset: rng.chance(0.2)
  }))
  return { ...s, layers }
}

export const PRESETS_SHADOW: { name: string; tags: string[]; state: ShadowState }[] = [
  {
    name: 'Soft Card',
    tags: ['card'],
    state: { ...DEFAULT_SHADOW, layers: [{ x: 0, y: 18, blur: 40, spread: -12, color: '#00000033', inset: false }] }
  },
  {
    name: 'Layered Pop',
    tags: ['elevation'],
    state: {
      ...DEFAULT_SHADOW,
      layers: [
        { x: 0, y: 4, blur: 6, spread: -2, color: '#00000026', inset: false },
        { x: 0, y: 12, blur: 24, spread: -6, color: '#00000033', inset: false },
        { x: 0, y: 24, blur: 48, spread: -12, color: '#00000040', inset: false }
      ]
    }
  },
  {
    name: 'Inset Well',
    tags: ['inset'],
    state: { ...DEFAULT_SHADOW, layers: [{ x: 0, y: 2, blur: 8, spread: 0, color: '#00000045', inset: true }] }
  },
  {
    name: 'Neon Glow',
    tags: ['glow'],
    state: { ...DEFAULT_SHADOW, layers: [{ x: 0, y: 0, blur: 28, spread: 2, color: '#34d39988', inset: false }] }
  },
  {
    name: 'Long Text',
    tags: ['text'],
    state: {
      ...DEFAULT_SHADOW,
      kind: 'text',
      layers: [
        { x: 2, y: 2, blur: 0, spread: 0, color: '#00000055', inset: false },
        { x: 0, y: 12, blur: 24, spread: 0, color: '#10b98144', inset: false }
      ]
    }
  },
  {
    name: 'Material Elevation',
    tags: ['elevation'],
    state: {
      ...DEFAULT_SHADOW,
      layers: [
        { x: 0, y: 1, blur: 3, spread: 0, color: '#00000030', inset: false },
        { x: 0, y: 4, blur: 8, spread: -1, color: '#00000030', inset: false },
        { x: 0, y: 8, blur: 16, spread: -2, color: '#00000030', inset: false }
      ]
    }
  },
  {
    name: 'Inset Press',
    tags: ['inset', 'button'],
    state: {
      ...DEFAULT_SHADOW,
      layers: [
        { x: 0, y: 1, blur: 4, spread: 0, color: '#00000040', inset: true },
        { x: 0, y: -1, blur: 2, spread: 0, color: '#ffffff30', inset: true }
      ]
    }
  },
  {
    name: 'Emerald Glow',
    tags: ['glow'],
    state: {
      ...DEFAULT_SHADOW,
      layers: [
        { x: 0, y: 0, blur: 12, spread: 1, color: '#10b98166', inset: false },
        { x: 0, y: 0, blur: 36, spread: 4, color: '#34d39933', inset: false }
      ]
    }
  },
  {
    name: 'Paper Lift',
    tags: ['card'],
    state: {
      ...DEFAULT_SHADOW,
      radius: 8,
      layers: [
        { x: 0, y: 1, blur: 2, spread: 0, color: '#0000001a', inset: false },
        { x: 0, y: 6, blur: 14, spread: -4, color: '#00000026', inset: false }
      ]
    }
  },
  {
    name: 'Rose Haze',
    tags: ['glow'],
    state: {
      ...DEFAULT_SHADOW,
      layers: [
        { x: 0, y: 0, blur: 16, spread: 0, color: '#f43f5e55', inset: false },
        { x: 0, y: 0, blur: 48, spread: 6, color: '#f43f5e22', inset: false }
      ]
    }
  },
  {
    name: 'Sunlit Drop',
    tags: ['warm', 'elevation'],
    state: {
      ...DEFAULT_SHADOW,
      radius: 18,
      layers: [
        { x: 0, y: 8, blur: 20, spread: -6, color: '#7c2d1240', inset: false },
        { x: 0, y: 2, blur: 6, spread: -2, color: '#fbbf2433', inset: false }
      ]
    }
  },
  {
    name: 'Ghost Inset',
    tags: ['inset', 'dark'],
    state: {
      ...DEFAULT_SHADOW,
      surface: '#18181b',
      radius: 14,
      layers: [
        { x: 0, y: 2, blur: 6, spread: 0, color: '#00000066', inset: true },
        { x: 0, y: -1, blur: 1, spread: 0, color: '#ffffff14', inset: true }
      ]
    }
  },
  {
    name: 'Layered Glow',
    tags: ['glow', 'brand'],
    state: {
      ...DEFAULT_SHADOW,
      radius: 20,
      layers: [
        { x: 0, y: 4, blur: 12, spread: -2, color: '#00000040', inset: false },
        { x: 0, y: 0, blur: 24, spread: 0, color: '#10b98133', inset: false },
        { x: 0, y: 0, blur: 64, spread: 12, color: '#34d3991a', inset: false }
      ]
    }
  },
  {
    name: 'Chisel Text',
    tags: ['text', 'inset'],
    state: {
      ...DEFAULT_SHADOW,
      kind: 'text',
      textColor: '#e4e4e7',
      layers: [
        { x: 1, y: 1, blur: 0, spread: 0, color: '#ffffff', inset: true },
        { x: -1, y: -1, blur: 0, spread: 0, color: '#71717a', inset: true }
      ]
    }
  },
  {
    name: 'Floating Island',
    tags: ['wow', 'elevation'],
    state: {
      ...DEFAULT_SHADOW,
      radius: 24,
      surface: '#1a1a2e',
      layers: [
        { x: 0, y: 40, blur: 80, spread: -20, color: '#000000aa', inset: false },
        { x: 0, y: 20, blur: 40, spread: -10, color: '#00000066', inset: false },
        { x: 0, y: 8, blur: 16, spread: -4, color: '#00000044', inset: false }
      ]
    }
  },
  {
    name: 'Neon Halo',
    tags: ['wow', 'glow'],
    state: {
      ...DEFAULT_SHADOW,
      radius: 20,
      surface: '#09090b',
      layers: [
        { x: 0, y: 0, blur: 8, spread: 2, color: '#34d399', inset: false },
        { x: 0, y: 0, blur: 24, spread: 4, color: '#34d39988', inset: false },
        { x: 0, y: 0, blur: 64, spread: 8, color: '#34d39944', inset: false },
        { x: 0, y: 0, blur: 120, spread: 16, color: '#34d39922', inset: false }
      ]
    }
  },
  {
    name: 'Fire Shadow',
    tags: ['wow', 'warm'],
    state: {
      ...DEFAULT_SHADOW,
      radius: 16,
      surface: '#0d0a00',
      layers: [
        { x: 0, y: 0, blur: 16, spread: 0, color: '#f97316aa', inset: false },
        { x: 0, y: 0, blur: 48, spread: 8, color: '#dc262666', inset: false },
        { x: 0, y: 8, blur: 32, spread: 0, color: '#fbbf2444', inset: false }
      ]
    }
  },
  {
    name: 'Glass Elevate',
    tags: ['wow', 'card'],
    state: {
      ...DEFAULT_SHADOW,
      radius: 20,
      surface: '#ffffff',
      layers: [
        { x: 0, y: 2, blur: 4, spread: 0, color: '#0000000d', inset: false },
        { x: 0, y: 12, blur: 24, spread: -6, color: '#0000001a', inset: false },
        { x: 0, y: 32, blur: 64, spread: -16, color: '#00000026', inset: false }
      ]
    }
  },
  {
    name: 'Glitch Text',
    tags: ['wow', 'text'],
    state: {
      ...DEFAULT_SHADOW,
      kind: 'text',
      textColor: '#ffffff',
      layers: [
        { x: -2, y: 0, blur: 0, spread: 0, color: '#ff0000', inset: true },
        { x: 2, y: 0, blur: 0, spread: 0, color: '#00ffff', inset: true }
      ]
    }
  }
]