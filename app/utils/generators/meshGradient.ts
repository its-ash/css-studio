export interface MeshPoint {
  id: string
  x: number
  y: number
  h: number
  s: number
  l: number
  a: number
  radius: number
}

export interface MeshGradientState {
  points: MeshPoint[]
  blur: number
  bg: string
  opacity: number
}

export const DEFAULT_MESH_GRADIENT: MeshGradientState = {
  points: [
    { id: 'p1', x: 20, y: 20, h: 330, s: 90, l: 60, a: 80, radius: 60 },
    { id: 'p2', x: 80, y: 30, h: 190, s: 90, l: 55, a: 80, radius: 55 },
    { id: 'p3', x: 50, y: 80, h: 270, s: 80, l: 55, a: 75, radius: 65 },
    { id: 'p4', x: 15, y: 75, h: 150, s: 85, l: 50, a: 70, radius: 50 }
  ],
  blur: 0,
  bg: '#09090b',
  opacity: 100
}

let meshUid = 0
function makePoint(x: number, y: number, h: number): MeshPoint {
  meshUid += 1
  return { id: `mp-${Date.now().toString(36)}-${meshUid}`, x, y, h, s: 85, l: 55, a: 75, radius: 55 }
}

export function meshGradientCss(s: MeshGradientState): string {
  const layers = s.points.map((p) => {
    const color = `hsl(${Math.round(p.h)} ${Math.round(p.s)}% ${Math.round(p.l)}%${p.a < 100 ? ` / ${p.a / 100}` : ''})`
    return `radial-gradient(circle at ${Math.round(p.x)}% ${Math.round(p.y)}%, ${color} 0%, transparent ${Math.round(p.radius)}%)`
  })
  return layers.join(', ')
}

export function meshGradientPreviewStyle(s: MeshGradientState): Record<string, string> {
  const st: Record<string, string> = {
    'background-color': s.bg,
    'background-image': meshGradientCss(s)
  }
  if (s.blur > 0) st['filter'] = `blur(${s.blur}px)`
  if (s.opacity < 100) st['opacity'] = `${s.opacity / 100}`
  return st
}

export function meshGradientFullCss(s: MeshGradientState): string {
  const lines = [`.mesh-gradient {`, `  background-color: ${s.bg};`, `  background-image: ${meshGradientCss(s)};`]
  if (s.blur > 0) lines.push(`  filter: blur(${s.blur}px);`)
  if (s.opacity < 100) lines.push(`  opacity: ${s.opacity / 100};`)
  lines.push(`}`)
  return lines.join('\n')
}

export function meshGradientVars(s: MeshGradientState): Record<string, string> {
  const v: Record<string, string> = { '--mesh-bg': s.bg }
  s.points.forEach((p, i) => {
    v[`--mesh-point-${i + 1}-x`] = `${Math.round(p.x)}%`
    v[`--mesh-point-${i + 1}-y`] = `${Math.round(p.y)}%`
    v[`--mesh-point-${i + 1}`] = `hsl(${Math.round(p.h)} ${Math.round(p.s)}% ${Math.round(p.l)}%)`
  })
  return v
}

export function meshGradientHtml(): string {
  return `<div class="mesh-gradient"></div>`
}

export function addMeshPoint(s: MeshGradientState): MeshGradientState {
  const h = Math.floor(Math.random() * 360)
  return { ...s, points: [...s.points, makePoint(50, 50, h)] }
}

export function removeMeshPoint(s: MeshGradientState, id: string): MeshGradientState {
  if (s.points.length <= 2) return s
  return { ...s, points: s.points.filter((p) => p.id !== id) }
}

export function updateMeshPoint(s: MeshGradientState, id: string, patch: Partial<MeshPoint>): MeshGradientState {
  return { ...s, points: s.points.map((p) => (p.id === id ? { ...p, ...patch } : p)) }
}

export function randomizeMeshGradient(s: MeshGradientState, rng: import('../rng').Rng): MeshGradientState {
  const base = rng.range(0, 360)
  const count = rng.int(3, 6)
  return {
    ...s,
    points: Array.from({ length: count }, (_, i) => ({
      id: `mp-${Date.now().toString(36)}-${i}`,
      x: Math.round(rng.range(10, 90)),
      y: Math.round(rng.range(10, 90)),
      h: Math.round((base + i * rng.range(40, 120)) % 360),
      s: Math.round(rng.range(70, 95)),
      l: Math.round(rng.range(40, 65)),
      a: Math.round(rng.range(60, 90)),
      radius: Math.round(rng.range(40, 75))
    }))
  }
}

export const PRESETS_MESH_GRADIENT: { name: string; tags: string[]; state: MeshGradientState }[] = [
  {
    name: 'Aurora Mesh',
    tags: ['cool', 'brand'],
    state: {
      points: [
        { id: 'm1', x: 20, y: 20, h: 150, s: 90, l: 50, a: 80, radius: 60 },
        { id: 'm2', x: 80, y: 30, h: 190, s: 90, l: 55, a: 80, radius: 55 },
        { id: 'm3', x: 50, y: 80, h: 270, s: 80, l: 55, a: 75, radius: 65 },
        { id: 'm4', x: 15, y: 75, h: 330, s: 85, l: 60, a: 70, radius: 50 }
      ],
      blur: 0, bg: '#09090b', opacity: 100
    }
  },
  {
    name: 'Sunset Mesh',
    tags: ['warm'],
    state: {
      points: [
        { id: 'm1', x: 25, y: 25, h: 15, s: 95, l: 55, a: 85, radius: 60 },
        { id: 'm2', x: 75, y: 25, h: 45, s: 100, l: 60, a: 80, radius: 55 },
        { id: 'm3', x: 50, y: 75, h: 330, s: 85, l: 50, a: 75, radius: 65 }
      ],
      blur: 0, bg: '#1a0a0a', opacity: 100
    }
  },
  {
    name: 'Soft Pastel',
    tags: ['soft', 'light'],
    state: {
      points: [
        { id: 'm1', x: 20, y: 20, h: 340, s: 70, l: 85, a: 70, radius: 70 },
        { id: 'm2', x: 80, y: 30, h: 200, s: 70, l: 85, a: 70, radius: 65 },
        { id: 'm3', x: 50, y: 80, h: 260, s: 65, l: 80, a: 65, radius: 70 },
        { id: 'm4', x: 80, y: 80, h: 50, s: 75, l: 85, a: 65, radius: 60 }
      ],
      blur: 0, bg: '#fafafa', opacity: 100
    }
  },
  {
    name: 'Neon Cloud',
    tags: ['dark', 'brand'],
    state: {
      points: [
        { id: 'm1', x: 30, y: 30, h: 155, s: 100, l: 45, a: 85, radius: 55 },
        { id: 'm2', x: 70, y: 40, h: 190, s: 100, l: 50, a: 85, radius: 55 },
        { id: 'm3', x: 40, y: 75, h: 280, s: 95, l: 50, a: 80, radius: 60 },
        { id: 'm4', x: 85, y: 80, h: 320, s: 100, l: 45, a: 80, radius: 50 }
      ],
      blur: 0, bg: '#050505', opacity: 90
    }
  },
  {
    name: 'Coral Reef',
    tags: ['warm', 'organic'],
    state: {
      points: [
        { id: 'm1', x: 25, y: 30, h: 12, s: 90, l: 55, a: 80, radius: 60 },
        { id: 'm2', x: 70, y: 25, h: 350, s: 85, l: 60, a: 75, radius: 55 },
        { id: 'm3', x: 50, y: 70, h: 180, s: 80, l: 45, a: 70, radius: 65 }
      ],
      blur: 0, bg: '#0d0808', opacity: 100
    }
  },
  {
    name: 'Vapor Mesh',
    tags: ['playful', 'dark'],
    state: {
      points: [
        { id: 'm1', x: 20, y: 25, h: 315, s: 95, l: 60, a: 80, radius: 60 },
        { id: 'm2', x: 80, y: 30, h: 260, s: 90, l: 55, a: 80, radius: 55 },
        { id: 'm3', x: 30, y: 80, h: 195, s: 95, l: 50, a: 75, radius: 60 },
        { id: 'm4', x: 75, y: 75, h: 280, s: 90, l: 50, a: 75, radius: 50 }
      ],
      blur: 0, bg: '#0a0510', opacity: 100
    }
  },
  {
    name: 'Galaxy Nebula',
    tags: ['wow', 'dark'],
    state: {
      points: [
        { id: 'g1', x: 15, y: 20, h: 260, s: 90, l: 35, a: 85, radius: 55 },
        { id: 'g2', x: 75, y: 15, h: 220, s: 85, l: 30, a: 80, radius: 60 },
        { id: 'g3', x: 50, y: 50, h: 300, s: 80, l: 25, a: 70, radius: 70 },
        { id: 'g4', x: 25, y: 80, h: 195, s: 90, l: 40, a: 75, radius: 50 },
        { id: 'g5', x: 85, y: 85, h: 340, s: 75, l: 30, a: 70, radius: 55 }
      ],
      blur: 0, bg: '#020005', opacity: 100
    }
  },
  {
    name: 'Molten Core',
    tags: ['wow', 'warm'],
    state: {
      points: [
        { id: 'c1', x: 50, y: 50, h: 15, s: 100, l: 50, a: 95, radius: 50 },
        { id: 'c2', x: 20, y: 30, h: 45, s: 100, l: 55, a: 80, radius: 60 },
        { id: 'c3', x: 80, y: 70, h: 350, s: 95, l: 45, a: 85, radius: 55 },
        { id: 'c4', x: 70, y: 20, h: 25, s: 100, l: 50, a: 75, radius: 50 }
      ],
      blur: 0, bg: '#0d0000', opacity: 100
    }
  },
  {
    name: 'Bioluminescent',
    tags: ['wow', 'brand'],
    state: {
      points: [
        { id: 'b1', x: 25, y: 30, h: 155, s: 100, l: 40, a: 90, radius: 50 },
        { id: 'b2', x: 75, y: 25, h: 175, s: 100, l: 45, a: 90, radius: 55 },
        { id: 'b3', x: 40, y: 75, h: 195, s: 100, l: 50, a: 85, radius: 60 },
        { id: 'b4', x: 85, y: 80, h: 145, s: 95, l: 35, a: 80, radius: 45 }
      ],
      blur: 0, bg: '#000a06', opacity: 95
    }
  },
  {
    name: 'Cosmic Bloom',
    tags: ['wow', 'dark'],
    state: {
      points: [
        { id: 'cb1', x: 50, y: 15, h: 320, s: 95, l: 55, a: 85, radius: 65 },
        { id: 'cb2', x: 15, y: 60, h: 260, s: 90, l: 45, a: 80, radius: 60 },
        { id: 'cb3', x: 85, y: 60, h: 200, s: 90, l: 45, a: 80, radius: 60 },
        { id: 'cb4', x: 50, y: 90, h: 280, s: 85, l: 35, a: 75, radius: 55 },
        { id: 'cb5', x: 50, y: 50, h: 340, s: 70, l: 25, a: 60, radius: 70 }
      ],
      blur: 0, bg: '#040008', opacity: 100
    }
  },
  {
    name: 'Cotton Candy',
    tags: ['wow', 'playful'],
    state: {
      points: [
        { id: 'cc1', x: 20, y: 25, h: 320, s: 90, l: 75, a: 85, radius: 70 },
        { id: 'cc2', x: 80, y: 30, h: 200, s: 85, l: 75, a: 85, radius: 65 },
        { id: 'cc3', x: 30, y: 80, h: 260, s: 80, l: 70, a: 80, radius: 65 },
        { id: 'cc4', x: 75, y: 80, h: 50, s: 90, l: 80, a: 80, radius: 60 }
      ],
      blur: 0, bg: '#fdf2fd', opacity: 100
    }
  },
  {
    name: 'Deep Abyss',
    tags: ['wow', 'dark'],
    state: {
      points: [
        { id: 'da1', x: 50, y: 50, h: 210, s: 60, l: 15, a: 90, radius: 80 },
        { id: 'da2', x: 20, y: 20, h: 180, s: 70, l: 20, a: 70, radius: 55 },
        { id: 'da3', x: 80, y: 80, h: 240, s: 50, l: 12, a: 70, radius: 55 }
      ],
      blur: 0, bg: '#000002', opacity: 100
    }
  }
]