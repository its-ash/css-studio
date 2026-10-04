import { makeRng } from '../rng'
import type { Rng } from '../rng'

export type SvgBgKind =
  | 'layered-waves' | 'stacked-waves' | 'layered-peaks' | 'layered-steps' | 'blob-scene' | 'blob-corners'
  | 'layered-blobs' | 'blurry-gradient' | 'spot-gradient' | 'low-poly' | 'circle-scatter' | 'wave-rings'
  | 'symbol-scatter' | 'pixel-grid' | 'bubbles' | 'sound-bars' | 'contours' | 'sunburst' | 'dunes'
  | 'mountains' | 'flow-lines' | 'layered-stripes' | 'blob-ring' | 'isometric-hills'
  | 'gradient-waves' | 'stacked-peaks' | 'liquid-drip' | 'halftone' | 'concentric-squares' | 'radial-rays'
  | 'starfield' | 'aurora' | 'cloudscape' | 'skyline' | 'hex-grid' | 'triangle-mosaic' | 'spiral' | 'orbits'
  | 'grain-gradient' | 'bokeh' | 'bauhaus-arcs' | 'checker-fade' | 'ribbons' | 'corner-circles'

export type SvgBgPos = 'bottom' | 'top' | 'left' | 'right'

export interface SvgBgState {
  kind: SvgBgKind
  bg: string
  c1: string
  c2: string
  width: number
  height: number
  layers: number
  complexity: number
  amplitude: number
  position: SvgBgPos
  blur: number
  seed: number
}

export const SVG_BG_KINDS: { value: SvgBgKind; label: string }[] = [
  { value: 'layered-waves', label: 'Layered Waves' },
  { value: 'stacked-waves', label: 'Stacked Waves' },
  { value: 'layered-peaks', label: 'Layered Peaks' },
  { value: 'layered-steps', label: 'Layered Steps' },
  { value: 'blob-scene', label: 'Blob Scene' },
  { value: 'blob-corners', label: 'Blob Corners' },
  { value: 'layered-blobs', label: 'Layered Blobs' },
  { value: 'blob-ring', label: 'Blob Ring' },
  { value: 'blurry-gradient', label: 'Blurry Gradient' },
  { value: 'spot-gradient', label: 'Spot Gradient' },
  { value: 'low-poly', label: 'Low Poly Grid' },
  { value: 'circle-scatter', label: 'Circle Scatter' },
  { value: 'wave-rings', label: 'Wave Rings' },
  { value: 'symbol-scatter', label: 'Symbol Scatter' },
  { value: 'pixel-grid', label: 'Pixel Grid' },
  { value: 'bubbles', label: 'Bubbles' },
  { value: 'sound-bars', label: 'Sound Bars' },
  { value: 'contours', label: 'Contour Lines' },
  { value: 'sunburst', label: 'Sunburst' },
  { value: 'dunes', label: 'Dunes' },
  { value: 'mountains', label: 'Mountains & Sun' },
  { value: 'flow-lines', label: 'Flow Lines' },
  { value: 'layered-stripes', label: 'Layered Stripes' },
  { value: 'isometric-hills', label: 'Isometric Hills' },
  { value: 'gradient-waves', label: 'Gradient Waves' },
  { value: 'stacked-peaks', label: 'Stacked Peaks' },
  { value: 'liquid-drip', label: 'Liquid Drip' },
  { value: 'halftone', label: 'Halftone' },
  { value: 'concentric-squares', label: 'Concentric Squares' },
  { value: 'radial-rays', label: 'Radial Rays' },
  { value: 'starfield', label: 'Starfield' },
  { value: 'aurora', label: 'Aurora' },
  { value: 'cloudscape', label: 'Cloudscape' },
  { value: 'skyline', label: 'City Skyline' },
  { value: 'hex-grid', label: 'Hex Grid' },
  { value: 'triangle-mosaic', label: 'Triangle Mosaic' },
  { value: 'spiral', label: 'Spiral' },
  { value: 'orbits', label: 'Orbits' },
  { value: 'grain-gradient', label: 'Grain Gradient' },
  { value: 'bokeh', label: 'Bokeh' },
  { value: 'bauhaus-arcs', label: 'Bauhaus Arcs' },
  { value: 'checker-fade', label: 'Checker Fade' },
  { value: 'ribbons', label: 'Ribbons' },
  { value: 'corner-circles', label: 'Corner Circles' }
]

export const SVG_BG_POSITIONS: { value: SvgBgPos; label: string }[] = [
  { value: 'bottom', label: 'Bottom' },
  { value: 'top', label: 'Top' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' }
]

export const DEFAULT_SVG_BG: SvgBgState = {
  kind: 'layered-waves',
  bg: '#1a1020',
  c1: '#f9a8d4',
  c2: '#7c3aed',
  width: 900,
  height: 600,
  layers: 5,
  complexity: 6,
  amplitude: 40,
  position: 'bottom',
  blur: 80,
  seed: 1337
}

type P = [number, number]

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Number.isFinite(v) ? v : lo))
const r1 = (v: number) => Math.round(v * 10) / 10
const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
const safeHex = (c: string, fb: string) => (HEX.test(c?.trim() ?? '') ? c.trim() : fb)

function toRgb(hex: string): number[] {
  const h = hex.slice(1)
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16))
}

/** Linear blend between two hex colors, t in [0,1]. */
function mix(a: string, b: string, t: number): string {
  const [x, y] = [toRgb(a), toRgb(b)]
  return `#${x.map((v, i) => Math.round(v + (y[i]! - v) * clamp(t, 0, 1)).toString(16).padStart(2, '0')).join('')}`
}

/** Closed or open smooth path through points (Catmull-Rom → cubic Bézier). */
function smooth(pts: P[], closed: boolean): string {
  const n = pts.length
  const at = (i: number) => (closed ? pts[(i + n) % n]! : pts[clamp(i, 0, n - 1)]!)
  let d = `M${r1(pts[0]![0])} ${r1(pts[0]![1])}`
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)]
    d += `C${r1(p1[0] + (p2[0] - p0[0]) / 6)} ${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(p2[0] - (p3[0] - p1[0]) / 6)} ${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${r1(p2[0])} ${r1(p2[1])}`
  }
  return closed ? `${d}Z` : d
}

function blob(rng: Rng, cx: number, cy: number, r: number, pts: number, jitter: number): string {
  const p: P[] = Array.from({ length: pts }, (_, i) => {
    const a = (i / pts) * Math.PI * 2
    const rr = r * (1 - jitter / 2 + rng() * jitter)
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]
  })
  return smooth(p, true)
}

interface Ctx { rng: Rng; w: number; h: number; s: SvgBgState; col: (t: number) => string }

/** Bottom-anchored edge layers; transformed later for other positions. */
function edgeLayers({ h, s, col }: Ctx, edge: (y: number) => string): string {
  const L = s.layers
  return Array.from({ length: L }, (_, i) => {
    const t = L > 1 ? i / (L - 1) : 0
    return `<path d="${edge(L > 1 ? h * (0.35 + 0.5 * t) : h * 0.6)}" fill="${col(t)}"/>`
  }).join('')
}

function waveEdge(ctx: Ctx, y: number): string {
  const { rng, w, h, s } = ctx
  const k = s.complexity + 1
  const pts: P[] = Array.from({ length: k + 1 }, (_, j) => [(w * j) / k, y + (rng() * 2 - 1) * s.amplitude])
  return `${smooth(pts, false)}L${w} ${h}L0 ${h}Z`
}

const SCENES: Record<SvgBgKind, (c: Ctx) => string> = {
  'layered-waves': (c) => edgeLayers(c, (y) => waveEdge(c, y)),
  'stacked-waves': (c) => {
    const half = Math.max(1, Math.ceil(c.s.layers / 2))
    const sub = { ...c, s: { ...c.s, layers: half } }
    const squash = (y: number) => waveEdge(c, c.h * 0.68 + (y - c.h * 0.35) * 0.5)
    const bottom = edgeLayers(sub, squash)
    const top = edgeLayers(sub, squash)
    return `${bottom}<g transform="rotate(180 ${c.w / 2} ${c.h / 2})">${top}</g>`
  },
  'layered-peaks': (c) =>
    edgeLayers(c, (y) => {
      const k = c.s.complexity + 1
      const pts = Array.from({ length: k + 1 }, (_, j) => `L${r1((c.w * j) / k)} ${r1(y + (j % 2 ? -1 : 1) * c.s.amplitude * (0.5 + c.rng()))}`)
      return `M0 ${c.h}${pts.join('')}L${c.w} ${c.h}Z`
    }),
  'layered-steps': (c) =>
    edgeLayers(c, (y) => {
      const k = c.s.complexity + 1
      let d = `M0 ${c.h}`
      for (let j = 0; j < k; j++) {
        const yy = r1(y + (c.rng() * 2 - 1) * c.s.amplitude)
        d += `L${r1((c.w * j) / k)} ${yy}L${r1((c.w * (j + 1)) / k)} ${yy}`
      }
      return `${d}L${c.w} ${c.h}Z`
    }),
  'blob-scene': (c) =>
    Array.from({ length: c.s.layers }, (_, i) =>
      `<path d="${blob(c.rng, c.rng() * c.w, c.rng() * c.h, Math.min(c.w, c.h) * (0.12 + c.rng() * 0.18), c.s.complexity + 3, 0.5)}" fill="${c.col(i / Math.max(1, c.s.layers - 1))}"/>`
    ).join(''),
  'blob-corners': (c) => {
    const m = Math.min(c.w, c.h)
    return [
      [0, 0], [c.w, c.h]
    ].flatMap(([x, y], k) =>
      Array.from({ length: c.s.layers }, (_, i) =>
        `<path d="${blob(c.rng, x!, y!, m * (0.6 - (0.45 * i) / c.s.layers), c.s.complexity + 4, 0.35)}" fill="${c.col(k ? i / c.s.layers : 1 - i / c.s.layers)}"/>`)
    ).join('')
  },
  'layered-blobs': (c) => {
    const m = Math.max(c.w, c.h)
    return Array.from({ length: c.s.layers }, (_, i) =>
      `<path d="${blob(c.rng, c.w / 2, c.h / 2, m * (0.65 - (0.55 * i) / c.s.layers), c.s.complexity + 4, 0.3)}" fill="${c.col(i / Math.max(1, c.s.layers - 1))}"/>`
    ).join('')
  },
  'blob-ring': (c) => {
    const m = Math.min(c.w, c.h)
    return Array.from({ length: c.s.layers }, (_, i) =>
      `<path d="${blob(c.rng, c.w / 2, c.h / 2, m * (0.42 - 0.04 * i), c.s.complexity + 6, 0.25)}" fill="none" stroke="${c.col(i / Math.max(1, c.s.layers - 1))}" stroke-width="${r1(m * 0.025)}"/>`
    ).join('')
  },
  'blurry-gradient': (c) =>
    `<g filter="url(#b)">${Array.from({ length: c.s.layers + 1 }, (_, i) =>
      `<circle cx="${r1(c.rng() * c.w)}" cy="${r1(c.rng() * c.h)}" r="${r1(Math.min(c.w, c.h) * (0.2 + c.rng() * 0.2))}" fill="${c.col(i / c.s.layers)}"/>`).join('')}</g>`,
  'spot-gradient': (c) =>
    Array.from({ length: c.s.layers }, (_, i) => {
      const id = `s${i}`
      const col = c.col(i / Math.max(1, c.s.layers - 1))
      return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${col}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient></defs><circle cx="${r1(c.rng() * c.w)}" cy="${r1(c.rng() * c.h)}" r="${r1(Math.max(c.w, c.h) * (0.3 + c.rng() * 0.3))}" fill="url(#${id})"/>`
    }).join(''),
  'low-poly': (c) => {
    const cols = c.s.complexity + 2
    const rows = Math.max(2, Math.round((cols * c.h) / c.w))
    const [dx, dy] = [c.w / cols, c.h / rows]
    const g: P[][] = Array.from({ length: rows + 1 }, (_, y) =>
      Array.from({ length: cols + 1 }, (_, x) => [
        x * dx + (x > 0 && x < cols ? (c.rng() - 0.5) * dx * 0.8 : 0),
        y * dy + (y > 0 && y < rows ? (c.rng() - 0.5) * dy * 0.8 : 0)
      ] as P))
    const tri = (a: P, b: P, d: P) => {
      const t = ((a[0] + b[0] + d[0]) / 3 / c.w + (a[1] + b[1] + d[1]) / 3 / c.h) / 2
      return `<path d="M${r1(a[0])} ${r1(a[1])}L${r1(b[0])} ${r1(b[1])}L${r1(d[0])} ${r1(d[1])}Z" fill="${c.col(t + (c.rng() - 0.5) * 0.15)}" stroke="${c.col(t)}" stroke-width=".5"/>`
    }
    let out = ''
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++) {
        const [a, b, d, e] = [g[y]![x]!, g[y]![x + 1]!, g[y + 1]![x]!, g[y + 1]![x + 1]!]
        out += tri(a, b, e) + tri(a, e, d)
      }
    return out
  },
  'circle-scatter': (c) =>
    Array.from({ length: c.s.complexity * 6 }, () =>
      `<circle cx="${r1(c.rng() * c.w)}" cy="${r1(c.rng() * c.h)}" r="${r1(4 + c.rng() * c.s.amplitude)}" fill="${c.col(c.rng())}" fill-opacity="${r1(0.4 + c.rng() * 0.6)}"/>`).join(''),
  'wave-rings': (c) => {
    const m = Math.max(c.w, c.h)
    const n = c.s.layers + 3
    return Array.from({ length: n }, (_, i) => {
      const r = m * (0.75 - (0.7 * i) / n)
      return `<path d="${blob(c.rng, c.w / 2, c.h, r, c.s.complexity + 8, 0.08)}" fill="${c.col(i / (n - 1))}"/>`
    }).join('')
  },
  'symbol-scatter': (c) => {
    const sz = 6 + c.s.amplitude / 3
    const sym = [
      (x: number, y: number, f: string) => `<circle cx="${x}" cy="${y}" r="${r1(sz / 2)}" fill="none" stroke="${f}" stroke-width="2"/>`,
      (x: number, y: number, f: string) => `<path d="M${x - sz / 2} ${y}h${sz}M${x} ${y - sz / 2}v${sz}" stroke="${f}" stroke-width="2" stroke-linecap="round"/>`,
      (x: number, y: number, f: string) => `<path d="M${x} ${r1(y - sz / 2)}L${r1(x + sz / 2)} ${r1(y + sz / 2)}L${r1(x - sz / 2)} ${r1(y + sz / 2)}Z" fill="none" stroke="${f}" stroke-width="2" stroke-linejoin="round"/>`,
      (x: number, y: number, f: string) => `<rect x="${r1(x - sz / 2)}" y="${r1(y - sz / 2)}" width="${r1(sz)}" height="${r1(sz)}" fill="${f}" transform="rotate(45 ${x} ${y})"/>`
    ]
    return Array.from({ length: c.s.complexity * 7 }, () =>
      c.rng.pick(sym)(r1(c.rng() * c.w), r1(c.rng() * c.h), c.col(c.rng()))).join('')
  },
  'pixel-grid': (c) => {
    const n = c.s.complexity * 3 + 4
    const sz = c.w / n
    let out = ''
    for (let y = 0; y < Math.ceil(c.h / sz); y++)
      for (let x = 0; x < n; x++)
        if (c.rng() < 0.55) out += `<rect x="${r1(x * sz)}" y="${r1(y * sz)}" width="${r1(sz + 0.5)}" height="${r1(sz + 0.5)}" fill="${c.col((y * sz) / c.h + (c.rng() - 0.5) * 0.3)}"/>`
    return out
  },
  bubbles: (c) =>
    Array.from({ length: c.s.complexity * 4 }, (_, i) => {
      const t = i / (c.s.complexity * 4)
      return `<circle cx="${r1(c.rng() * c.w)}" cy="${r1(c.h - Math.pow(c.rng(), 2) * c.h)}" r="${r1(Math.min(c.w, c.h) * (0.02 + c.rng() * 0.08))}" fill="${c.col(t)}" fill-opacity="${r1(0.35 + c.rng() * 0.5)}"/>`
    }).join(''),
  'sound-bars': (c) => {
    const n = c.s.complexity * 5 + 10
    const bw = c.w / n
    return Array.from({ length: n }, (_, i) => {
      const bh = c.h * (0.08 + Math.abs(Math.sin(i * 0.35 + c.rng())) * (c.s.amplitude / 100) + c.rng() * 0.15)
      return `<rect x="${r1(i * bw + bw * 0.15)}" y="${r1((c.h - bh) / 2)}" width="${r1(bw * 0.7)}" height="${r1(bh)}" rx="${r1(bw * 0.35)}" fill="${c.col(i / (n - 1))}"/>`
    }).join('')
  },
  contours: (c) => {
    const n = c.s.layers * 3
    const cx = c.rng() * c.w
    const cy = c.rng() * c.h
    return Array.from({ length: n }, (_, i) =>
      `<path d="${blob(c.rng, cx, cy, (Math.max(c.w, c.h) * (i + 1)) / n, c.s.complexity + 4, 0.18)}" fill="none" stroke="${c.col(i / (n - 1))}" stroke-width="1.5"/>`).join('')
  },
  sunburst: (c) => {
    const n = (c.s.complexity + 2) * 2
    const R = Math.hypot(c.w, c.h)
    const [cx, cy] = [c.w / 2, c.h * 1.05]
    return Array.from({ length: n }, (_, i) => {
      const [a0, a1] = [Math.PI + (Math.PI * i) / n, Math.PI + (Math.PI * (i + 1)) / n]
      return `<path d="M${r1(cx)} ${r1(cy)}L${r1(cx + Math.cos(a0) * R)} ${r1(cy + Math.sin(a0) * R)}L${r1(cx + Math.cos(a1) * R)} ${r1(cy + Math.sin(a1) * R)}Z" fill="${c.col(i % 2 ? 0.15 : 0.85)}" fill-opacity="${i % 2 ? 0.9 : 0.6}"/>`
    }).join('')
  },
  dunes: (c) =>
    edgeLayers(c, (y) => {
      const pts: P[] = [[0, y + c.s.amplitude], [c.w * (0.3 + c.rng() * 0.2), y - c.s.amplitude], [c.w, y + (c.rng() - 0.5) * c.s.amplitude]]
      return `${smooth(pts, false)}L${c.w} ${c.h}L0 ${c.h}Z`
    }),
  mountains: (c) => {
    const sun = `<circle cx="${r1(c.w * (0.25 + c.rng() * 0.5))}" cy="${r1(c.h * 0.28)}" r="${r1(Math.min(c.w, c.h) * 0.14)}" fill="${c.s.c1}"/>`
    return sun + edgeLayers({ ...c, col: (t) => mix(c.s.c2, c.s.bg, 0.6 - t * 0.6) }, (y0) => {
      const k = c.s.complexity
      const y = c.h * 0.6 + (y0 - c.h * 0.35) * 0.7
      let d = `M0 ${c.h}L0 ${r1(y)}`
      for (let j = 1; j <= k; j++) d += `L${r1((c.w * (j - 0.5)) / k)} ${r1(y - c.s.amplitude * (1 + c.rng() * 2))}L${r1((c.w * j) / k)} ${r1(y + c.rng() * c.s.amplitude * 0.5)}`
      return `${d}L${c.w} ${c.h}Z`
    })
  },
  'flow-lines': (c) => {
    const n = c.s.layers * 4
    return Array.from({ length: n }, (_, i) => {
      const y = (c.h * (i + 0.5)) / n
      const k = c.s.complexity
      const ph = c.rng() * 0.6
      const pts: P[] = Array.from({ length: k + 1 }, (_, j) => [(c.w * j) / k, y + Math.sin(j * 0.9 + i * 0.25 + ph) * c.s.amplitude * 1.5])
      return `<path d="${smooth(pts, false)}" fill="none" stroke="${c.col(i / (n - 1))}" stroke-width="2" stroke-linecap="round"/>`
    }).join('')
  },
  'layered-stripes': (c) => {
    const n = c.s.layers + 2
    const D = c.w + c.h
    return `<g transform="rotate(-${20 + Math.round(c.rng() * 25)} ${c.w / 2} ${c.h / 2})">${Array.from({ length: n }, (_, i) =>
      `<rect x="${-D / 2}" y="${r1(-D / 2 + (i * 2 * D) / n)}" width="${D * 2}" height="${r1(D / n + c.rng() * c.s.amplitude)}" fill="${c.col(i / (n - 1))}"/>`).join('')}</g>`
  },
  'isometric-hills': (c) =>
    edgeLayers(c, (y) => {
      const k = Math.max(2, Math.round(c.s.complexity / 2))
      let d = `M0 ${c.h}L0 ${r1(y)}`
      for (let j = 0; j < k; j++) {
        const x0 = (c.w * j) / k
        d += `L${r1(x0 + c.w / k / 2)} ${r1(y - c.s.amplitude * (0.8 + c.rng()))}L${r1(x0 + c.w / k)} ${r1(y)}`
      }
      return `${d}L${c.w} ${c.h}Z`
    }),
  'gradient-waves': (c) => {
    const L = c.s.layers
    const defs = Array.from({ length: L }, (_, i) => {
      const t = L > 1 ? i / (L - 1) : 0
      return `<linearGradient id="g${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.col(t)}"/><stop offset="1" stop-color="${c.col(1 - t)}"/></linearGradient>`
    }).join('')
    let i = 0
    return `<defs>${defs}</defs>` + edgeLayers({ ...c, col: () => `url(#g${i++})` }, (y) => waveEdge(c, y))
  },
  'stacked-peaks': (c) => {
    const half = Math.max(1, Math.ceil(c.s.layers / 2))
    const sub = { ...c, s: { ...c.s, layers: half } }
    const edge = (y0: number) => {
      const y = c.h * 0.68 + (y0 - c.h * 0.35) * 0.5
      const k = c.s.complexity + 1
      const pts = Array.from({ length: k + 1 }, (_, j) => `L${r1((c.w * j) / k)} ${r1(y + (j % 2 ? -1 : 1) * c.s.amplitude * (0.3 + c.rng() * 0.7))}`)
      return `M0 ${c.h}${pts.join('')}L${c.w} ${c.h}Z`
    }
    return `${edgeLayers(sub, edge)}<g transform="rotate(180 ${c.w / 2} ${c.h / 2})">${edgeLayers(sub, edge)}</g>`
  },
  'liquid-drip': (c) =>
    Array.from({ length: c.s.layers }, (_, i) => {
      const t = c.s.layers > 1 ? i / (c.s.layers - 1) : 0
      const base = c.h * (0.45 - 0.3 * t)
      const k = c.s.complexity + 2
      const pts: P[] = []
      for (let j = 0; j <= k; j++) {
        const x = (c.w * j) / k
        pts.push([x, base + (j % 2 ? c.rng() * c.s.amplitude * 3 : -c.rng() * c.s.amplitude * 0.3)])
      }
      return `<path d="${smooth(pts, false)}L${c.w} 0L0 0Z" fill="${c.col(t)}"/>`
    }).join(''),
  halftone: (c) => {
    const n = c.s.complexity * 3 + 6
    const sz = c.w / n
    let out = ''
    for (let y = 0; y <= Math.ceil(c.h / sz); y++)
      for (let x = 0; x <= n; x++) {
        const t = (x / n + (y * sz) / c.h) / 2
        out += `<circle cx="${r1(x * sz)}" cy="${r1(y * sz)}" r="${r1((sz / 2) * (1 - t) * 0.95)}" fill="${c.col(t)}"/>`
      }
    return out
  },
  'concentric-squares': (c) => {
    const n = c.s.layers + 4
    const m = Math.max(c.w, c.h) * 1.2
    const rot = Math.round(c.rng() * 45)
    return Array.from({ length: n }, (_, i) => {
      const sz = m * (1 - i / n)
      return `<rect x="${r1(c.w / 2 - sz / 2)}" y="${r1(c.h / 2 - sz / 2)}" width="${r1(sz)}" height="${r1(sz)}" fill="${c.col(i / (n - 1))}" transform="rotate(${rot + i * (c.s.amplitude / 20)} ${c.w / 2} ${c.h / 2})"/>`
    }).join('')
  },
  'radial-rays': (c) => {
    const n = (c.s.complexity + 2) * 6
    const R = Math.hypot(c.w, c.h)
    return Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2
      const r0 = R * 0.05 + c.rng() * R * 0.1
      return `<path d="M${r1(c.w / 2 + Math.cos(a) * r0)} ${r1(c.h / 2 + Math.sin(a) * r0)}L${r1(c.w / 2 + Math.cos(a) * R)} ${r1(c.h / 2 + Math.sin(a) * R)}" stroke="${c.col(c.rng())}" stroke-width="${r1(1 + c.rng() * 3)}" stroke-linecap="round" opacity="${r1(0.4 + c.rng() * 0.6)}"/>`
    }).join('')
  },
  starfield: (c) => {
    const glow = `<defs><filter id="sg" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2"/></filter></defs>`
    const stars = Array.from({ length: c.s.complexity * 20 }, () => {
      const [x, y, r] = [r1(c.rng() * c.w), r1(c.rng() * c.h), r1(0.4 + Math.pow(c.rng(), 3) * 2.5)]
      const f = c.col(c.rng())
      return r > 1.8 ? `<circle cx="${x}" cy="${y}" r="${r * 2}" fill="${f}" filter="url(#sg)"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/>` : `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`
    }).join('')
    return glow + stars
  },
  aurora: (c) => {
    const defs = `<defs><filter id="au" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="${r1(c.s.blur / 2)}"/></filter></defs>`
    return defs + `<g filter="url(#au)">${Array.from({ length: c.s.layers }, (_, i) => {
      const k = c.s.complexity
      const y = c.h * (0.25 + c.rng() * 0.4)
      const pts: P[] = Array.from({ length: k + 1 }, (_, j) => [(c.w * j) / k, y + (c.rng() * 2 - 1) * c.s.amplitude * 2])
      return `<path d="${smooth(pts, false)}" fill="none" stroke="${c.col(i / Math.max(1, c.s.layers - 1))}" stroke-width="${r1(c.h * (0.06 + c.rng() * 0.08))}" stroke-linecap="round" opacity=".8"/>`
    }).join('')}</g>`
  },
  cloudscape: (c) =>
    edgeLayers(c, (y) => {
      const k = c.s.complexity + 2
      const step = c.w / k
      let d = `M0 ${c.h}L0 ${r1(y)}`
      for (let j = 0; j < k; j++) {
        const r = step / 2
        d += `A${r1(r)} ${r1(r * (0.6 + c.rng() * 0.6))} 0 0 1 ${r1(step * (j + 1))} ${r1(y + (c.rng() - 0.5) * c.s.amplitude * 0.3)}`
      }
      return `${d}L${c.w} ${c.h}Z`
    }),
  skyline: (c) =>
    edgeLayers(c, (y) => {
      let d = `M0 ${c.h}`
      let x = 0
      while (x < c.w) {
        const bw = c.w / (c.s.complexity * 2) * (0.5 + c.rng())
        const top = r1(y - c.rng() * c.s.amplitude * 2.5)
        d += `L${r1(x)} ${top}L${r1(Math.min(c.w, x + bw))} ${top}`
        x += bw
      }
      return `${d}L${c.w} ${c.h}Z`
    }),
  'hex-grid': (c) => {
    const r = c.w / (c.s.complexity * 2 + 4)
    const [hw, hh] = [Math.sqrt(3) * r, 1.5 * r]
    let out = ''
    for (let row = -1; row * hh < c.h + r; row++)
      for (let col = -1; col * hw < c.w + hw; col++) {
        const cx = col * hw + (row % 2 ? hw / 2 : 0)
        const cy = row * hh
        const pts = Array.from({ length: 6 }, (_, k) => {
          const a = Math.PI / 6 + (k * Math.PI) / 3
          return `${r1(cx + Math.cos(a) * r * 0.94)} ${r1(cy + Math.sin(a) * r * 0.94)}`
        })
        out += `<path d="M${pts.join('L')}Z" fill="${c.col(cy / c.h + (c.rng() - 0.5) * 0.25)}"/>`
      }
    return out
  },
  'triangle-mosaic': (c) => {
    const n = c.s.complexity + 3
    const tw = c.w / n
    const th = tw * 0.866
    let out = ''
    for (let row = 0; row * th < c.h; row++)
      for (let col = -1; col <= n * 2; col++) {
        const x = (col * tw) / 2
        const up = (col + row) % 2 === 0
        const [y0, y1] = up ? [row * th + th, row * th] : [row * th, row * th + th]
        out += `<path d="M${r1(x)} ${r1(y0)}L${r1(x + tw / 2)} ${r1(y1)}L${r1(x + tw)} ${r1(y0)}Z" fill="${c.col(x / c.w + (c.rng() - 0.5) * 0.3)}"/>`
      }
    return out
  },
  spiral: (c) => {
    const turns = c.s.complexity / 2 + 2
    const R = Math.hypot(c.w, c.h) / 2
    const pts: P[] = Array.from({ length: Math.round(turns * 24) }, (_, i) => {
      const t = i / (turns * 24)
      const a = t * turns * Math.PI * 2
      return [c.w / 2 + Math.cos(a) * R * t, c.h / 2 + Math.sin(a) * R * t]
    })
    return Array.from({ length: c.s.layers }, (_, i) =>
      `<path d="${smooth(pts, false)}" fill="none" stroke="${c.col(i / Math.max(1, c.s.layers - 1))}" stroke-width="${r1(2 + c.s.amplitude / 10)}" stroke-linecap="round" transform="rotate(${(360 / c.s.layers) * i} ${c.w / 2} ${c.h / 2})"/>`).join('')
  },
  orbits: (c) => {
    const m = Math.min(c.w, c.h)
    const n = c.s.layers + 2
    return Array.from({ length: n }, (_, i) => {
      const rx = m * (0.15 + (0.6 * i) / n)
      const a = c.rng() * Math.PI * 2
      return `<ellipse cx="${c.w / 2}" cy="${c.h / 2}" rx="${r1(rx)}" ry="${r1(rx * 0.35)}" fill="none" stroke="${c.col(i / (n - 1))}" stroke-width="1.5" transform="rotate(${Math.round(c.rng() * 180)} ${c.w / 2} ${c.h / 2})"/><circle cx="${r1(c.w / 2 + Math.cos(a) * rx)}" cy="${c.h / 2}" r="${r1(3 + c.s.amplitude / 10)}" fill="${c.col(i / (n - 1))}" transform="rotate(${Math.round(c.rng() * 180)} ${c.w / 2} ${c.h / 2})"/>`
    }).join('')
  },
  'grain-gradient': (c) =>
    `<defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.s.c1}"/><stop offset="1" stop-color="${c.s.c2}"/></linearGradient><filter id="gn"><feTurbulence type="fractalNoise" baseFrequency="${r1(0.4 + c.s.complexity / 20)}" numOctaves="3" seed="${c.s.seed % 1000}" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="${r1(c.s.amplitude / 200 + 0.1)}"/></feComponentTransfer></filter></defs><rect width="${c.w}" height="${c.h}" fill="url(#gg)"/><rect width="${c.w}" height="${c.h}" filter="url(#gn)"/>`,
  bokeh: (c) =>
    `<defs><filter id="bk" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${r1(c.s.blur / 8)}"/></filter></defs><g filter="url(#bk)">${Array.from({ length: c.s.complexity * 3 }, () =>
      `<circle cx="${r1(c.rng() * c.w)}" cy="${r1(c.rng() * c.h)}" r="${r1(Math.min(c.w, c.h) * (0.03 + c.rng() * 0.1))}" fill="${c.col(c.rng())}" fill-opacity="${r1(0.3 + c.rng() * 0.6)}"/>`).join('')}</g>`,
  'bauhaus-arcs': (c) => {
    const n = c.s.complexity + 1
    const sz = c.w / n
    let out = ''
    for (let y = 0; y * sz < c.h; y++)
      for (let x = 0; x < n; x++) {
        const [x0, y0] = [x * sz, y * sz]
        const corner = c.rng.int(0, 3)
        const [cx, cy] = [x0 + (corner % 2) * sz, y0 + (corner > 1 ? sz : 0)]
        out += `<rect x="${r1(x0)}" y="${r1(y0)}" width="${r1(sz + 0.5)}" height="${r1(sz + 0.5)}" fill="${c.col(c.rng() < 0.5 ? 0 : 1)}" fill-opacity=".25"/><path d="M${r1(cx)} ${r1(cy)}L${r1(cx + (corner % 2 ? -sz : sz))} ${r1(cy)}A${r1(sz)} ${r1(sz)} 0 0 ${corner === 1 || corner === 2 ? 0 : 1} ${r1(cx)} ${r1(cy + (corner > 1 ? -sz : sz))}Z" fill="${c.col(c.rng())}"/>`
      }
    return out
  },
  'checker-fade': (c) => {
    const n = c.s.complexity * 2 + 4
    const sz = c.w / n
    let out = ''
    for (let y = 0; y * sz < c.h; y++)
      for (let x = 0; x < n; x++)
        if ((x + y) % 2 === 0) {
          const t = x / n
          const k = sz * (1 - t * 0.85)
          out += `<rect x="${r1(x * sz + (sz - k) / 2)}" y="${r1(y * sz + (sz - k) / 2)}" width="${r1(k)}" height="${r1(k)}" fill="${c.col((y * sz) / c.h)}"/>`
        }
    return out
  },
  ribbons: (c) =>
    Array.from({ length: c.s.layers + 2 }, (_, i) => {
      const k = c.s.complexity
      const pts: P[] = Array.from({ length: k + 1 }, (_, j) => [(c.w * j) / k, c.h * (0.2 + c.rng() * 0.6)])
      return `<path d="${smooth(pts, false)}" fill="none" stroke="${c.col(i / (c.s.layers + 1))}" stroke-width="${r1(c.h * 0.04 + c.s.amplitude / 3)}" stroke-linecap="round" opacity=".85"/>`
    }).join(''),
  'corner-circles': (c) => {
    const m = Math.max(c.w, c.h)
    const L = c.s.layers
    return [[0, 0], [c.w, c.h]].map(([x, y], k) =>
      Array.from({ length: L }, (_, i) =>
        `<circle cx="${x}" cy="${y}" r="${r1(m * (0.55 - (0.5 * i) / L))}" fill="${c.col(k ? i / L : 1 - i / L)}"/>`).join('')
    ).join('')
  }
}

const EDGE_KINDS = new Set<SvgBgKind>(['layered-waves', 'layered-peaks', 'layered-steps', 'dunes', 'mountains', 'isometric-hills', 'gradient-waves', 'cloudscape', 'skyline'])

export function sanitizeSvgBg(s: SvgBgState): SvgBgState {
  const d = DEFAULT_SVG_BG
  return {
    kind: SVG_BG_KINDS.some((k) => k.value === s.kind) ? s.kind : d.kind,
    bg: safeHex(s.bg, d.bg),
    c1: safeHex(s.c1, d.c1),
    c2: safeHex(s.c2, d.c2),
    width: Math.round(clamp(s.width, 200, 2400)),
    height: Math.round(clamp(s.height, 200, 2400)),
    layers: Math.round(clamp(s.layers, 1, 10)),
    complexity: Math.round(clamp(s.complexity, 2, 16)),
    amplitude: clamp(s.amplitude, 0, 200),
    position: SVG_BG_POSITIONS.some((p) => p.value === s.position) ? s.position : d.position,
    blur: clamp(s.blur, 0, 200),
    seed: Math.round(clamp(s.seed, 0, 0xfffffff))
  }
}

export function svgBgSvg(raw: SvgBgState): string {
  const s = sanitizeSvgBg(raw)
  const [w, h] = [s.width, s.height]
  const ctx: Ctx = { rng: makeRng(s.seed), w, h, s, col: (t) => mix(s.c1, s.c2, t) }
  let body = SCENES[s.kind](ctx)
  if (EDGE_KINDS.has(s.kind) && s.position !== 'bottom') {
    const tf = { top: `rotate(180 ${w / 2} ${h / 2})`, left: `translate(${w} 0) rotate(90) scale(${h / w} ${w / h})`, right: `translate(0 ${h}) rotate(-90) scale(${h / w} ${w / h})` }[s.position]
    body = `<g transform="${tf}">${body}</g>`
  }
  const defs = s.kind === 'blurry-gradient' ? `<defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${r1(s.blur)}"/></filter></defs>` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">${defs}<rect width="${w}" height="${h}" fill="${s.bg}"/>${body}</svg>`
}

/** Minimal data-URI encoding: escapes only what CSS url() and SVG need. */
export const svgDataUri = (svg: string) =>
  `url("data:image/svg+xml,${svg.replace(/"/g, "'").replace(/[%#<>{}]/g, (c) => encodeURIComponent(c))}")`

export function svgBgCss(s: SvgBgState): string {
  return `.svg-bg {
  aspect-ratio: ${sanitizeSvgBg(s).width} / ${sanitizeSvgBg(s).height};
  background-color: ${safeHex(s.bg, DEFAULT_SVG_BG.bg)};
  background-image: ${svgDataUri(svgBgSvg(s))};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}`
}

export const svgBgHtml = () => `<div class="svg-bg"></div>`

export const svgBgVars = (s: SvgBgState): Record<string, string> => ({
  '--svg-bg-bg': s.bg,
  '--svg-bg-c1': s.c1,
  '--svg-bg-c2': s.c2
})

const hslHex = (h: number, sat: number, l: number) => {
  const a = (sat / 100) * Math.min(l / 100, 1 - l / 100)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    return Math.round(255 * (l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

export function randomizeSvgBg(s: SvgBgState, rng: Rng): SvgBgState {
  const hue = rng.int(0, 359)
  const dark = rng.chance(0.6)
  return {
    ...s,
    kind: rng.pick(SVG_BG_KINDS.map((k) => k.value)),
    bg: hslHex(hue, rng.int(15, 40), dark ? 8 : 95),
    c1: hslHex((hue + rng.int(20, 60)) % 360, rng.int(60, 90), dark ? 70 : 55),
    c2: hslHex((hue + rng.int(120, 220)) % 360, rng.int(55, 85), dark ? 45 : 35),
    layers: rng.int(3, 7),
    complexity: rng.int(3, 10),
    amplitude: rng.int(15, 70),
    position: rng.chance(0.7) ? 'bottom' : rng.pick(SVG_BG_POSITIONS.map((p) => p.value)),
    blur: rng.int(50, 120),
    seed: rng.int(1, 0xffffff)
  }
}

const p = (name: string, tags: string[], o: Partial<SvgBgState>) => ({ name, tags, state: { ...DEFAULT_SVG_BG, ...o } })

export const PRESETS_SVG_BG: { name: string; tags: string[]; state: SvgBgState }[] = [
  p('Petal Waves', ['brand', 'waves'], {}),
  p('Ocean Stack', ['waves', 'cool'], { kind: 'stacked-waves', bg: '#020617', c1: '#38bdf8', c2: '#1e3a8a', layers: 6, seed: 42 }),
  p('Alpine Peaks', ['peaks'], { kind: 'layered-peaks', bg: '#0f172a', c1: '#e2e8f0', c2: '#334155', amplitude: 60, seed: 7 }),
  p('Terraces', ['steps'], { kind: 'layered-steps', bg: '#fff7ed', c1: '#fdba74', c2: '#9a3412', complexity: 8, seed: 21 }),
  p('Lava Lamp', ['blob'], { kind: 'blob-scene', bg: '#1c0a14', c1: '#fb7185', c2: '#f59e0b', layers: 6, seed: 99 }),
  p('Corner Goo', ['blob'], { kind: 'blob-corners', bg: '#faf5ff', c1: '#c084fc', c2: '#6d28d9', layers: 4, seed: 12 }),
  p('Nebula Core', ['blob'], { kind: 'layered-blobs', bg: '#0b0618', c1: '#f0abfc', c2: '#312e81', layers: 6, seed: 5 }),
  p('Halo Ring', ['ring'], { kind: 'blob-ring', bg: '#0a0a0a', c1: '#f472b6', c2: '#22d3ee', layers: 5, seed: 31 }),
  p('Soft Mesh', ['gradient'], { kind: 'blurry-gradient', bg: '#fdf2f8', c1: '#f9a8d4', c2: '#818cf8', layers: 4, blur: 100, seed: 8 }),
  p('Night Glow', ['gradient'], { kind: 'spot-gradient', bg: '#09090b', c1: '#ec4899', c2: '#0ea5e9', layers: 4, seed: 64 }),
  p('Crystal', ['poly'], { kind: 'low-poly', bg: '#0f172a', c1: '#a5f3fc', c2: '#4c1d95', complexity: 7, seed: 3 }),
  p('Confetti Dots', ['scatter'], { kind: 'circle-scatter', bg: '#fffbeb', c1: '#f43f5e', c2: '#0ea5e9', complexity: 10, amplitude: 24, seed: 17 }),
  p('Ripple Rise', ['rings'], { kind: 'wave-rings', bg: '#042f2e', c1: '#042f2e', c2: '#5eead4', layers: 6, seed: 11 }),
  p('Glyph Field', ['scatter'], { kind: 'symbol-scatter', bg: '#18181b', c1: '#fde047', c2: '#f472b6', complexity: 9, amplitude: 30, seed: 23 }),
  p('Pixel Fade', ['pixel'], { kind: 'pixel-grid', bg: '#020617', c1: '#22d3ee', c2: '#a855f7', complexity: 5, seed: 13 }),
  p('Fizz', ['bubbles'], { kind: 'bubbles', bg: '#082f49', c1: '#bae6fd', c2: '#0284c7', complexity: 10, seed: 29 }),
  p('Equalizer', ['audio'], { kind: 'sound-bars', bg: '#0c0a09', c1: '#f97316', c2: '#db2777', complexity: 6, amplitude: 70, seed: 4 }),
  p('Topo Map', ['lines'], { kind: 'contours', bg: '#1a2e05', c1: '#bef264', c2: '#365314', layers: 5, seed: 77 }),
  p('Rising Sun', ['retro'], { kind: 'sunburst', bg: '#7c2d12', c1: '#fde68a', c2: '#ea580c', complexity: 8, seed: 1 }),
  p('Sahara', ['dunes'], { kind: 'dunes', bg: '#fef3c7', c1: '#fcd34d', c2: '#92400e', layers: 5, amplitude: 50, seed: 45 }),
  p('Dusk Range', ['landscape'], { kind: 'mountains', bg: '#1e1b4b', c1: '#fda4af', c2: '#4c1d95', layers: 4, complexity: 5, amplitude: 40, seed: 9 }),
  p('Silk Flow', ['lines'], { kind: 'flow-lines', bg: '#0a0a0a', c1: '#f9a8d4', c2: '#60a5fa', layers: 4, complexity: 6, amplitude: 30, seed: 2 }),
  p('Candy Stripes', ['stripes'], { kind: 'layered-stripes', bg: '#fdf2f8', c1: '#fbcfe8', c2: '#be185d', layers: 5, amplitude: 20, seed: 6 }),
  p('Iso Valley', ['hills'], { kind: 'isometric-hills', bg: '#ecfdf5', c1: '#6ee7b7', c2: '#064e3b', layers: 5, complexity: 6, amplitude: 50, seed: 15 }),
  p('Left Tide', ['waves'], { kind: 'layered-waves', bg: '#0f0a1a', c1: '#a78bfa', c2: '#ec4899', position: 'left', layers: 4, seed: 88 }),
  p('Sunset Gradient', ['waves', 'gradient'], { kind: 'gradient-waves', bg: '#1e1b4b', c1: '#fb923c', c2: '#db2777', layers: 4, seed: 19 }),
  p('Jaws', ['peaks'], { kind: 'stacked-peaks', bg: '#0c0a09', c1: '#fafaf9', c2: '#57534e', layers: 6, amplitude: 50, seed: 27 }),
  p('Syrup', ['drip'], { kind: 'liquid-drip', bg: '#fff7ed', c1: '#f472b6', c2: '#831843', layers: 3, amplitude: 50, complexity: 9, seed: 14 }),
  p('Comic Dots', ['halftone'], { kind: 'halftone', bg: '#fef9c3', c1: '#ef4444', c2: '#7c3aed', complexity: 6, seed: 1 }),
  p('Vortex Box', ['geometric'], { kind: 'concentric-squares', bg: '#0f172a', c1: '#0f172a', c2: '#38bdf8', layers: 8, amplitude: 60, seed: 32 }),
  p('Warp Speed', ['rays'], { kind: 'radial-rays', bg: '#030712', c1: '#f0abfc', c2: '#22d3ee', complexity: 8, seed: 50 }),
  p('Deep Space', ['night'], { kind: 'starfield', bg: '#05030f', c1: '#c7d2fe', c2: '#f9a8d4', complexity: 10, seed: 71 }),
  p('Northern Lights', ['aurora'], { kind: 'aurora', bg: '#020617', c1: '#34d399', c2: '#a855f7', layers: 4, complexity: 5, amplitude: 40, blur: 60, seed: 36 }),
  p('Cloud Nine', ['sky'], { kind: 'cloudscape', bg: '#bae6fd', c1: '#ffffff', c2: '#93c5fd', layers: 4, complexity: 5, amplitude: 30, seed: 41 }),
  p('Metropolis', ['city'], { kind: 'skyline', bg: '#1e1b4b', c1: '#4c1d95', c2: '#0f0a1a', layers: 4, complexity: 7, amplitude: 50, seed: 58 }),
  p('Honeycomb', ['hex'], { kind: 'hex-grid', bg: '#1c1917', c1: '#fde047', c2: '#ea580c', complexity: 6, seed: 60 }),
  p('Prism', ['mosaic'], { kind: 'triangle-mosaic', bg: '#0f172a', c1: '#f472b6', c2: '#2dd4bf', complexity: 7, seed: 66 }),
  p('Hypnotic', ['spiral'], { kind: 'spiral', bg: '#18181b', c1: '#f9a8d4', c2: '#818cf8', layers: 3, complexity: 8, amplitude: 30, seed: 3 }),
  p('Atom', ['space'], { kind: 'orbits', bg: '#0a0a0a', c1: '#facc15', c2: '#f472b6', layers: 5, amplitude: 40, seed: 81 }),
  p('Film Grain', ['noise', 'gradient'], { kind: 'grain-gradient', bg: '#000000', c1: '#f9a8d4', c2: '#6366f1', complexity: 6, amplitude: 60, seed: 90 }),
  p('City Lights', ['blur'], { kind: 'bokeh', bg: '#0c0a1d', c1: '#fbbf24', c2: '#ec4899', complexity: 8, blur: 60, seed: 93 }),
  p('Bauhaus', ['geometric'], { kind: 'bauhaus-arcs', bg: '#f5f5f4', c1: '#dc2626', c2: '#1d4ed8', complexity: 5, seed: 47 }),
  p('Checker Melt', ['geometric'], { kind: 'checker-fade', bg: '#09090b', c1: '#f9a8d4', c2: '#a78bfa', complexity: 6, seed: 52 }),
  p('Silk Ribbons', ['lines'], { kind: 'ribbons', bg: '#fdf2f8', c1: '#f472b6', c2: '#8b5cf6', layers: 4, complexity: 5, amplitude: 30, seed: 74 }),
  p('Eclipse', ['circles'], { kind: 'corner-circles', bg: '#0f0a1a', c1: '#fda4af', c2: '#4c1d95', layers: 5, seed: 10 })
]
