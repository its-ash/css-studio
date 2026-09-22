import { gradientCss, DEFAULT_GRADIENT, randomizeGradient } from './gradient'
import { DEFAULT_BLOB } from './blob'
import { patternCss, DEFAULT_PATTERN } from './pattern'
import { makeRng } from '../rng'
import type { GradientState } from './gradient'
import type { BlobState } from './blob'
import type { PatternState } from './pattern'

export type LayerKind = 'color' | 'gradient' | 'pattern' | 'blob' | 'glow' | 'blur'

export interface Layer {
  id: string
  name: string
  kind: LayerKind
  visible: boolean
  opacity: number
  blend: string
  color: string
  gradient: GradientState
  blob: BlobState
  pattern: PatternState
  x: number
  y: number
  scale: number
  blur: number
}

export const BLEND_MODES = [
  'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge',
  'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'luminosity'
]

let uid = 0
export function makeLayer(kind: LayerKind, name: string): Layer {
  uid += 1
  return {
    id: `layer-${Date.now().toString(36)}-${uid}`,
    name,
    kind,
    visible: true,
    opacity: 100,
    blend: 'normal',
    color: '#34d39966',
    gradient: JSON.parse(JSON.stringify(DEFAULT_GRADIENT)) as GradientState,
    blob: JSON.parse(JSON.stringify(DEFAULT_BLOB)) as BlobState,
    pattern: JSON.parse(JSON.stringify(DEFAULT_PATTERN)) as PatternState,
    x: 50,
    y: 50,
    scale: 100,
    blur: 0
  }
}

/** Build the consolidated CSS background for all visible layers, first layer on top. */
export function layersBackground(layers: Layer[]): { css: string; style: Record<string, string> } {
  const visible = layers.filter((l) => l.visible)
  const images: string[] = []
  const sizes: string[] = []
  const positions: string[] = []

  for (const l of visible) {
    switch (l.kind) {
      case 'gradient':
        images.push(gradientCss(l.gradient))
        break
      case 'pattern': {
        const p = patternCss(l.pattern)
        images.push(p.image)
        break
      }
      case 'glow':
        images.push(`radial-gradient(circle at ${Math.round(l.x)}% ${Math.round(l.y)}%, ${l.color} 0%, transparent 70%)`)
        break
      case 'blur':
        images.push(`radial-gradient(circle at ${Math.round(l.x)}% ${Math.round(l.y)}%, ${l.color} 0%, transparent 60%)`)
        break
      case 'color':
      case 'blob':
      default:
        break
    }
  }

  const style: Record<string, string> = {}
  const colorLayer = visible.find((l) => l.kind === 'color')
  style['background-color'] = colorLayer ? colorLayer.color : '#09090b'
  if (images.length) style['background-image'] = images.join(', ')
  return { css: consolidatedCss(visible, images), style }
}

function consolidatedCss(layers: Layer[], images: string[]): string {
  const lines = [`.layer-stack {`]
  const colorLayer = layers.find((l) => l.kind === 'color' && l.visible)
  if (colorLayer) lines.push(`  background-color: ${colorLayer.color};`)
  if (images.length) lines.push(`  background-image: ${images.join(',\n    ')};`)
  lines.push(`}`)
  return lines.join('\n')
}

export function layersCss(layers: Layer[]): string {
  return layersBackground(layers).css
}

export function randomizeLayers(layers: Layer[], rng: import('../rng').Rng): Layer[] {
  const hue = Math.floor(rng.range(0, 360))
  return layers.map((l) => ({
    ...l,
    color: `hsl(${(hue + Math.floor(rng.range(0, 60))) % 360} 70% ${Math.floor(rng.range(30, 70))}% / 0.5)`,
    opacity: Math.round(rng.range(40, 100)),
    blend: rng.pick(BLEND_MODES),
    x: Math.round(rng.range(10, 90)),
    y: Math.round(rng.range(10, 90))
  }))
}

export function makeLayerRng(seed: number) {
  return makeRng(seed)
}

export interface BackgroundPreset {
  name: string
  tags: string[]
  build: () => Layer[]
}

/** Preset background layer stacks. Each returns a fresh set of layers. */
export const PRESETS_BACKGROUND: BackgroundPreset[] = [
  {
    name: 'Aurora Night',
    tags: ['dark', 'glow'],
    build: () => [
      { ...makeLayer('color', 'Base'), color: '#0b1020' },
      { ...makeLayer('gradient', 'Aurora'), blend: 'screen', opacity: 80 },
      { ...makeLayer('glow', 'Teal'), color: '#2dd4bf44', x: 25, y: 20, blend: 'screen' },
      { ...makeLayer('glow', 'Violet'), color: '#8b5cf644', x: 75, y: 35, blend: 'screen' }
    ]
  },
  {
    name: 'Mesh Dawn',
    tags: ['mesh', 'warm'],
    build: () => [
      { ...makeLayer('color', 'Base'), color: '#1a0f1e' },
      { ...makeLayer('glow', 'Rose'), color: '#f43f5e55', x: 20, y: 80, blend: 'screen' },
      { ...makeLayer('glow', 'Amber'), color: '#f59e0b44', x: 80, y: 20, blend: 'screen' },
      { ...makeLayer('glow', 'Sky'), color: '#38bdf844', x: 50, y: 50, blend: 'screen' }
    ]
  },
  {
    name: 'Dot Matrix',
    tags: ['pattern', 'dark'],
    build: () => [
      { ...makeLayer('color', 'Base'), color: '#09090b' },
      { ...makeLayer('pattern', 'Dots'), pattern: { ...makeLayer('pattern', 'p').pattern, kind: 'dots', size: 22, thickness: 1, color: '#ffffff18' } }
    ]
  },
  {
    name: 'Spotlight Stage',
    tags: ['glow', 'dark'],
    build: () => [
      { ...makeLayer('color', 'Base'), color: '#08070d' },
      { ...makeLayer('glow', 'Spot'), color: '#34d39933', x: 50, y: 45, blend: 'screen', opacity: 90 },
      { ...makeLayer('blur', 'Vignette'), color: '#00000088', x: 50, y: 50, blend: 'multiply' }
    ]
  },
  {
    name: 'Blueprint',
    tags: ['grid', 'cool'],
    build: () => [
      { ...makeLayer('color', 'Base'), color: '#0f172a' },
      { ...makeLayer('pattern', 'Grid'), pattern: { ...makeLayer('pattern', 'p').pattern, kind: 'grid', size: 36, thickness: 1, color: '#38bdf822' } }
    ]
  },
  {
    name: 'Sunset Haze',
    tags: ['warm', 'gradient'],
    build: () => [
      { ...makeLayer('color', 'Base'), color: '#2a0a14' },
      { ...makeLayer('gradient', 'Sunset'), opacity: 70, blend: 'screen' },
      { ...makeLayer('glow', 'Ember'), color: '#fb923c33', x: 30, y: 70, blend: 'screen' }
    ]
  },
  {
    name: 'Carbon Grid',
    tags: ['dark', 'grid'],
    build: () => [
      { ...makeLayer('color', 'Base'), color: '#0c0c0e' },
      { ...makeLayer('pattern', 'Grid'), pattern: { ...makeLayer('pattern', 'p').pattern, kind: 'grid', size: 28, thickness: 1, color: '#3f3f4611' } },
      { ...makeLayer('glow', 'Accent'), color: '#10b98122', x: 60, y: 30, blend: 'screen' }
    ]
  },
  {
    name: 'Neon Pulse',
    tags: ['dark', 'glow', 'brand'],
    build: () => [
      { ...makeLayer('color', 'Base'), color: '#050a08' },
      { ...makeLayer('glow', 'Emerald'), color: '#10b98144', x: 35, y: 40, blend: 'screen' },
      { ...makeLayer('glow', 'Cyan'), color: '#06b6d444', x: 65, y: 55, blend: 'screen' },
      { ...makeLayer('pattern', 'Dots'), pattern: { ...makeLayer('pattern', 'p').pattern, kind: 'dots', size: 30, thickness: 1, color: '#ffffff10' } }
    ]
  },
  {
    name: 'Soft Light',
    tags: ['light', 'soft'],
    build: () => [
      { ...makeLayer('color', 'Base'), color: '#f8f6f0' },
      { ...makeLayer('glow', 'Warm'), color: '#fde68a33', x: 30, y: 25, blend: 'multiply' },
      { ...makeLayer('glow', 'Cool'), color: '#bae6fd33', x: 70, y: 75, blend: 'multiply' }
    ]
  },
  {
    name: 'Checker Void',
    tags: ['pattern', 'dark'],
    build: () => [
      { ...makeLayer('color', 'Base'), color: '#111113' },
      { ...makeLayer('pattern', 'Checker'), pattern: { ...makeLayer('pattern', 'p').pattern, kind: 'checkerboard', size: 30, thickness: 1, color: '#1e1e24' } }
    ]
  },
  {
    name: 'Gradient Wash',
    tags: ['gradient', 'cool'],
    build: () => [
      { ...makeLayer('color', 'Base'), color: '#0d1117' },
      { ...makeLayer('gradient', 'Ocean'), opacity: 85, blend: 'screen' }
    ]
  },
  {
    name: 'Vapor Grid',
    tags: ['pattern', 'playful'],
    build: () => [
      { ...makeLayer('color', 'Base'), color: '#1e1033' },
      { ...makeLayer('pattern', 'Grid'), pattern: { ...makeLayer('pattern', 'p').pattern, kind: 'grid', size: 32, thickness: 1, color: '#c084fc22' } },
      { ...makeLayer('glow', 'Pink'), color: '#ec489933', x: 50, y: 50, blend: 'screen' }
    ]
  }
]