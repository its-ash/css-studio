export interface BlobState {
  width: number
  height: number
  radiusCount: 8
  distortion: number
  rotation: number
  scale: number
  posX: number
  posY: number
  fill: string
  gradient: { enabled: boolean; angle: number; stops: { h: number; s: number; l: number }[] }
  opacity: number
  blur: number
  shadow: { enabled: boolean; x: number; y: number; blur: number; color: string }
  border: { enabled: boolean; width: number; color: string }
  animate: boolean
  animationSpeed: number
  animationDirection: 'normal' | 'alternate' | 'reverse'
  animationIntensity: number
  seed: number
}

export const DEFAULT_BLOB: BlobState = {
  width: 320,
  height: 320,
  radiusCount: 8,
  distortion: 30,
  rotation: 0,
  scale: 100,
  posX: 50,
  posY: 50,
  fill: 'oklch(0.696 0.17 162.48)',
  gradient: { enabled: true, angle: 135, stops: [{ h: 158, s: 84, l: 42 }, { h: 190, s: 90, l: 58 }] },
  opacity: 100,
  blur: 0,
  shadow: { enabled: false, x: 0, y: 24, blur: 48, color: '#34d39955' },
  border: { enabled: false, width: 2, color: '#10b981' },
  animate: false,
  animationSpeed: 8,
  animationDirection: 'normal',
  animationIntensity: 60,
  seed: 1289
}

/** Deterministic organic border-radius from seed. CSS allows max 4 values per side of `/`, one per corner (missing values cycle). */
export function blobRadius(s: BlobState): string {
  const r = makeR(s.seed)
  const d = s.distortion
  const base = 50 - d / 2
  const corners = Math.max(1, Math.min(4, Math.floor(s.radiusCount / 2)))
  const vals: string[] = []
  for (let i = 0; i < corners; i++) {
    const v = base + r() * d
    vals.push(`${Math.round(v * 10) / 10}%`)
  }
  return `${vals.join(' ')} / ${vals.join(' ')}`
}

function makeR(seed: number): () => number {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let x = t
    x = Math.imul(x ^ (x >>> 15), x | 1)
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61)
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

export function blobBackground(s: BlobState): string {
  if (s.gradient.enabled) {
    const st = s.gradient.stops.map((c) => `hsl(${c.h} ${c.s}% ${c.l}%)`).join(', ')
    return `linear-gradient(${s.gradient.angle}deg, ${st})`
  }
  return s.fill
}

export function blobVars(s: BlobState): Record<string, string> {
  const v: Record<string, string> = {
    '--blob-width': `${s.width}px`,
    '--blob-height': `${s.height}px`,
    '--blob-radius': blobRadius(s),
    '--blob-background': blobBackground(s),
    '--blob-rotation': `${s.rotation}deg`,
    '--blob-scale': `${s.scale / 100}`,
    '--blob-x': `${s.posX}%`,
    '--blob-y': `${s.posY}%`
  }
  if (s.shadow.enabled) v['--blob-shadow'] = `${s.shadow.x}px ${s.shadow.y}px ${s.shadow.blur}px ${s.shadow.color}`
  if (s.border.enabled) {
    v['--blob-border'] = `${s.border.width}px solid ${s.border.color}`
  }
  return v
}

export function blobPreviewStyle(s: BlobState): Record<string, string> {
  const st: Record<string, string> = {
    width: `${s.width}px`,
    height: `${s.height}px`,
    'border-radius': blobRadius(s),
    background: blobBackground(s),
    opacity: `${s.opacity / 100}`,
    transform: `translate(-50%, -50%) rotate(${s.rotation}deg) scale(${s.scale / 100})`
  }
  if (s.blur > 0) st['filter'] = `blur(${s.blur}px)`
  if (s.shadow.enabled) st['box-shadow'] = `${s.shadow.x}px ${s.shadow.y}px ${s.shadow.blur}px ${s.shadow.color}`
  if (s.border.enabled) st['border'] = `${s.border.width}px solid ${s.border.color}`
  if (s.animate) {
    st['animation'] = `blob-morph ${Math.max(1, 12 - s.animationSpeed)}s ${s.animationDirection} infinite ease-in-out`
  }
  return st
}

/** The morph keyframes as a standalone top-level rule (injectable into the preview DOM). */
export function blobKeyframes(s: BlobState): string {
  if (!s.animate) return ''
  return [
    `@keyframes blob-morph {`,
    `  0%, 100% { border-radius: ${blobRadius(s)}; }`,
    `  50% { border-radius: ${reverseRadius(s)}; }`,
    `}`
  ].join('\n')
}

export function blobCss(s: BlobState): string {
  const lines = [
    `.blob {`,
    `  position: relative;`,
    `  width: ${s.width}px;`,
    `  height: ${s.height}px;`,
    `  border-radius: ${blobRadius(s)};`,
    `  background: ${blobBackground(s)};`,
    `  opacity: ${s.opacity / 100};`,
    `  transform: rotate(${s.rotation}deg) scale(${s.scale / 100});`
  ]
  if (s.blur > 0) lines.push(`  filter: blur(${s.blur}px);`)
  if (s.shadow.enabled) lines.push(`  box-shadow: ${s.shadow.x}px ${s.shadow.y}px ${s.shadow.blur}px ${s.shadow.color};`)
  if (s.border.enabled) lines.push(`  border: ${s.border.width}px solid ${s.border.color};`)
  if (s.animate) {
    lines.push(`  animation: blob-morph ${Math.max(1, 12 - s.animationSpeed)}s ${s.animationDirection} infinite ease-in-out;`)
  }
  lines.push(`}`)
  if (s.animate) {
    lines.push(
      ``,
      `@keyframes blob-morph {`,
      `  0%, 100% { border-radius: ${blobRadius(s)}; }`,
      `  50% { border-radius: ${reverseRadius(s)}; }`,
      `}`
    )
  }
  return lines.join('\n')
}

function reverseRadius(s: BlobState): string {
  const r = makeR(s.seed + 7)
  const d = s.distortion
  const base = 50 - d / 2
  const corners = Math.max(1, Math.min(4, Math.floor(s.radiusCount / 2)))
  const vals: string[] = []
  for (let i = 0; i < corners; i++) {
    vals.push(`${Math.round((base + r() * d) * 10) / 10}%`)
  }
  return `${vals.join(' ')} / ${vals.join(' ')}`
}

export function blobHtml(): string {
  return `<div class="blob"></div>`
}

export function randomizeBlob(s: BlobState, rng: import('../rng').Rng): BlobState {
  const base = rng.range(0, 360)
  return {
    ...s,
    seed: rng.int(1, 0xfffffff),
    radiusCount: rng.pick([4, 6, 6, 8]),
    distortion: Math.round(rng.range(15, 55)),
    rotation: Math.round(rng.range(0, 360)),
    scale: 100,
    gradient: {
      enabled: true,
      angle: Math.round(rng.range(0, 360)),
      stops: [
        { h: Math.round(base) % 360, s: Math.round(rng.range(60, 95)), l: Math.round(rng.range(30, 50)) },
        { h: Math.round(base + rng.range(30, 120)) % 360, s: Math.round(rng.range(60, 95)), l: Math.round(rng.range(50, 75)) }
      ]
    },
    animate: rng.chance(0.4),
    animationSpeed: Math.round(rng.range(3, 9)),
    animationIntensity: Math.round(rng.range(20, 90))
  }
}

export const PRESETS_BLOB: { name: string; tags: string[]; state: BlobState }[] = [
  {
    name: 'Emerald Organism',
    tags: ['organic', 'brand'],
    state: { ...DEFAULT_BLOB, seed: 1289, gradient: { enabled: true, angle: 135, stops: [{ h: 158, s: 84, l: 42 }, { h: 190, s: 90, l: 58 }] } }
  },
  {
    name: 'Aurora Mist',
    tags: ['soft'],
    state: {
      ...DEFAULT_BLOB,
      seed: 7742,
      distortion: 44,
      blur: 40,
      opacity: 70,
      gradient: { enabled: true, angle: 120, stops: [{ h: 150, s: 80, l: 50 }, { h: 260, s: 80, l: 65 }] }
    }
  },
  {
    name: 'Coral Reef',
    tags: ['warm'],
    state: {
      ...DEFAULT_BLOB,
      seed: 3391,
      radiusCount: 10,
      distortion: 52,
      gradient: { enabled: true, angle: 45, stops: [{ h: 12, s: 90, l: 55 }, { h: 330, s: 85, l: 65 }] }
    }
  },
  {
    name: 'Midnight Pulse',
    tags: ['dark', 'animated'],
    state: {
      ...DEFAULT_BLOB,
      seed: 5521,
      animate: true,
      animationSpeed: 5,
      gradient: { enabled: true, angle: 200, stops: [{ h: 230, s: 60, l: 25 }, { h: 280, s: 70, l: 45 }] },
      shadow: { enabled: true, x: 0, y: 20, blur: 60, color: '#8b5cf655' }
    }
  },
  {
    name: 'Ink Blot',
    tags: ['mono'],
    state: { ...DEFAULT_BLOB, seed: 9114, gradient: { enabled: false, angle: 0, stops: [] }, fill: '#18181b', distortion: 38, border: { enabled: false, width: 0, color: '#000' } }
  },
  {
    name: 'Emerald Wave',
    tags: ['organic'],
    state: { ...DEFAULT_BLOB, seed: 4210, radiusCount: 8, distortion: 46, width: 380, height: 260, gradient: { enabled: true, angle: 90, stops: [{ h: 160, s: 90, l: 35 }, { h: 175, s: 80, l: 65 }] } }
  },
  {
    name: 'Lava Lamp',
    tags: ['warm', 'animated'],
    state: { ...DEFAULT_BLOB, seed: 6021, animate: true, animationSpeed: 4, blur: 12, opacity: 85, gradient: { enabled: true, angle: 20, stops: [{ h: 8, s: 95, l: 45 }, { h: 40, s: 100, l: 55 }] }, shadow: { enabled: true, x: 0, y: 16, blur: 56, color: '#f9731655' } }
  },
  {
    name: 'Bubble Gum',
    tags: ['playful'],
    state: { ...DEFAULT_BLOB, seed: 8125, width: 240, height: 240, distortion: 55, gradient: { enabled: true, angle: 135, stops: [{ h: 330, s: 95, l: 75 }, { h: 300, s: 90, l: 85 }] }, border: { enabled: true, width: 3, color: '#f9a8d4' } }
  },
  {
    name: 'Deep Sea',
    tags: ['dark', 'cool'],
    state: { ...DEFAULT_BLOB, seed: 3338, distortion: 40, blur: 6, gradient: { enabled: true, angle: 200, stops: [{ h: 220, s: 80, l: 25 }, { h: 195, s: 85, l: 50 }] }, shadow: { enabled: true, x: 0, y: 24, blur: 60, color: '#0ea5e944' } }
  },
  {
    name: 'Neon Organism',
    tags: ['brand', 'animated'],
    state: { ...DEFAULT_BLOB, seed: 7070, animate: true, animationSpeed: 6, radiusCount: 8, distortion: 50, gradient: { enabled: true, angle: 45, stops: [{ h: 155, s: 100, l: 45 }, { h: 190, s: 100, l: 60 }] }, shadow: { enabled: true, x: 0, y: 0, blur: 48, color: '#34d39966' } }
  },
  {
    name: 'Soft Pastel',
    tags: ['soft', 'light'],
    state: { ...DEFAULT_BLOB, seed: 2244, width: 300, height: 300, distortion: 34, opacity: 90, gradient: { enabled: true, angle: 120, stops: [{ h: 340, s: 80, l: 80 }, { h: 265, s: 75, l: 85 }] }, shadow: { enabled: false, x: 0, y: 0, blur: 0, color: '#00000000' } }
  },
  {
    name: 'Golden Sun',
    tags: ['warm', 'animated'],
    state: { ...DEFAULT_BLOB, seed: 5115, animate: true, animationSpeed: 7, animationDirection: 'alternate', distortion: 28, gradient: { enabled: true, angle: 180, stops: [{ h: 48, s: 100, l: 55 }, { h: 20, s: 95, l: 50 }] }, shadow: { enabled: true, x: 0, y: 20, blur: 60, color: '#f59e0b55' } }
  },
  {
    name: 'Glass Puddle',
    tags: ['glass', 'soft'],
    state: { ...DEFAULT_BLOB, seed: 8989, width: 360, height: 220, distortion: 42, opacity: 55, blur: 2, gradient: { enabled: true, angle: 145, stops: [{ h: 200, s: 30, l: 80 }, { h: 180, s: 40, l: 65 }] }, border: { enabled: true, width: 1, color: '#ffffff55' } }
  },
  {
    name: 'Toxic Ooze',
    tags: ['brand', 'organic'],
    state: { ...DEFAULT_BLOB, seed: 3131, radiusCount: 8, distortion: 58, gradient: { enabled: true, angle: 90, stops: [{ h: 95, s: 90, l: 35 }, { h: 140, s: 85, l: 55 }] } }
  },
  {
    name: 'Rose Mist',
    tags: ['warm', 'soft'],
    state: { ...DEFAULT_BLOB, seed: 6442, width: 280, height: 340, distortion: 46, blur: 18, opacity: 70, gradient: { enabled: true, angle: 30, stops: [{ h: 350, s: 85, l: 70 }, { h: 320, s: 80, l: 85 }] } }
  },
  {
    name: 'Plasma Storm',
    tags: ['wow', 'animated'],
    state: { ...DEFAULT_BLOB, seed: 1111, animate: true, animationSpeed: 3, animationDirection: 'alternate', radiusCount: 8, distortion: 60, width: 400, height: 400, blur: 8, opacity: 85, gradient: { enabled: true, angle: 45, stops: [{ h: 280, s: 100, l: 30 }, { h: 320, s: 100, l: 50 }, { h: 190, s: 100, l: 55 }] }, shadow: { enabled: true, x: 0, y: 0, blur: 80, color: '#a855f788' } }
  },
  {
    name: 'Galaxy Swirl',
    tags: ['wow', 'dark'],
    state: { ...DEFAULT_BLOB, seed: 7777, radiusCount: 8, distortion: 55, width: 360, height: 360, gradient: { enabled: true, angle: 200, stops: [{ h: 250, s: 90, l: 20 }, { h: 280, s: 80, l: 40 }, { h: 310, s: 70, l: 55 }] }, shadow: { enabled: true, x: 0, y: 24, blur: 60, color: '#6366f144' } }
  },
  {
    name: 'Molten Gold',
    tags: ['wow', 'animated', 'warm'],
    state: { ...DEFAULT_BLOB, seed: 3333, animate: true, animationSpeed: 5, animationDirection: 'alternate', distortion: 48, width: 320, height: 320, gradient: { enabled: true, angle: 90, stops: [{ h: 45, s: 100, l: 40 }, { h: 25, s: 100, l: 55 }, { h: 15, s: 95, l: 45 }] }, shadow: { enabled: true, x: 0, y: 20, blur: 60, color: '#f59e0b66' } }
  },
  {
    name: 'Bioluminescent',
    tags: ['wow', 'animated', 'brand'],
    state: { ...DEFAULT_BLOB, seed: 4444, animate: true, animationSpeed: 4, animationDirection: 'alternate', distortion: 52, blur: 6, opacity: 80, gradient: { enabled: true, angle: 135, stops: [{ h: 160, s: 100, l: 35 }, { h: 175, s: 100, l: 50 }] }, shadow: { enabled: true, x: 0, y: 0, blur: 72, color: '#10b98177' } }
  },
  {
    name: 'Cosmic Dust',
    tags: ['wow', 'dark'],
    state: { ...DEFAULT_BLOB, seed: 8888, radiusCount: 8, distortion: 58, width: 380, height: 380, blur: 4, opacity: 75, gradient: { enabled: true, angle: 160, stops: [{ h: 210, s: 80, l: 25 }, { h: 260, s: 70, l: 40 }, { h: 200, s: 60, l: 55 }] }, shadow: { enabled: true, x: 0, y: 30, blur: 80, color: '#1e40af44' } }
  }
]