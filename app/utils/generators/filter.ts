export interface FilterState {
  blur: number
  brightness: number
  contrast: number
  saturate: number
  grayscale: number
  sepia: number
  hueRotate: number
  invert: number
  opacity: number
  useDuotone: boolean
  duotoneShadow: string
  duotoneHighlight: string
}

export const DEFAULT_FILTER: FilterState = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  saturate: 100,
  grayscale: 0,
  sepia: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 100,
  useDuotone: false,
  duotoneShadow: '#0f172a',
  duotoneHighlight: '#34d399'
}

function filterFunctions(s: FilterState): string[] {
  const fns: string[] = []
  if (s.blur > 0) fns.push(`blur(${s.blur}px)`)
  if (s.brightness !== 100) fns.push(`brightness(${s.brightness}%)`)
  if (s.contrast !== 100) fns.push(`contrast(${s.contrast}%)`)
  if (s.saturate !== 100) fns.push(`saturate(${s.saturate}%)`)
  if (s.grayscale > 0) fns.push(`grayscale(${s.grayscale}%)`)
  if (s.sepia > 0) fns.push(`sepia(${s.sepia}%)`)
  if (s.hueRotate > 0) fns.push(`hue-rotate(${s.hueRotate}deg)`)
  if (s.invert > 0) fns.push(`invert(${s.invert}%)`)
  if (s.opacity !== 100) fns.push(`opacity(${s.opacity}%)`)
  return fns
}

export function filterValue(s: FilterState): string {
  const fns = filterFunctions(s)
  return fns.length ? fns.join(' ') : 'none'
}

export function filterCss(s: FilterState): string {
  const lines = [`.filter-demo {`, `  filter: ${filterValue(s)};`, `}`]
  if (s.useDuotone) {
    lines.push(
      ``,
      `.filter-demo {`,
      `  filter: grayscale(100%) contrast(115%) ${filterValue({ ...s, useDuotone: false }).replace('none', '').trim()};`,
      `  position: relative;`,
      `}`,
      ``,
      `.filter-demo::after {`,
      `  content: '';`,
      `  position: absolute;`,
      `  inset: 0;`,
      `  background: linear-gradient(45deg, ${s.duotoneShadow}, ${s.duotoneHighlight});`,
      `  mix-blend-mode: color;`,
      `  pointer-events: none;`,
      `}`
    )
  }
  return lines.join('\n')
}

export function filterHtml(): string {
  return `<img class="filter-demo" src="photo.jpg" alt="" />`
}

export function filterPreviewStyle(s: FilterState): Record<string, string> {
  return { filter: filterValue(s) }
}

export function filterVars(s: FilterState): Record<string, string> {
  return { '--filter-stack': filterValue(s) }
}

export function randomizeFilter(s: FilterState, rng: import('../rng').Rng): FilterState {
  return {
    ...s,
    blur: rng.chance(0.3) ? Math.round(rng.range(0, 6)) : 0,
    brightness: Math.round(rng.range(80, 130)),
    contrast: Math.round(rng.range(80, 140)),
    saturate: Math.round(rng.range(60, 180)),
    grayscale: rng.chance(0.3) ? Math.round(rng.range(20, 100)) : 0,
    sepia: rng.chance(0.2) ? Math.round(rng.range(20, 80)) : 0,
    hueRotate: rng.chance(0.3) ? Math.round(rng.range(0, 360)) : 0,
    invert: rng.chance(0.1) ? Math.round(rng.range(50, 100)) : 0
  }
}

export const PRESETS_FILTER: { name: string; tags: string[]; state: FilterState }[] = [
  { name: 'Original', tags: ['none'], state: { ...DEFAULT_FILTER } },
  { name: 'Vintage', tags: ['warm', 'retro'], state: { ...DEFAULT_FILTER, sepia: 45, contrast: 105, brightness: 105, saturate: 85 } },
  { name: 'Cool Mono', tags: ['grayscale'], state: { ...DEFAULT_FILTER, grayscale: 100, contrast: 110 } },
  { name: 'High Contrast', tags: ['dramatic'], state: { ...DEFAULT_FILTER, contrast: 150, brightness: 95, saturate: 120 } },
  { name: 'Dreamy Soft', tags: ['soft'], state: { ...DEFAULT_FILTER, blur: 2, brightness: 110, saturate: 90 } },
  { name: 'Inverted', tags: ['dark', 'experimental'], state: { ...DEFAULT_FILTER, invert: 100, hueRotate: 180 } },
  { name: 'Emerald Duotone', tags: ['duotone', 'brand'], state: { ...DEFAULT_FILTER, useDuotone: true, duotoneShadow: '#052e1a', duotoneHighlight: '#34d399' } },
  { name: 'Sunset Duotone', tags: ['duotone', 'warm'], state: { ...DEFAULT_FILTER, useDuotone: true, duotoneShadow: '#450a0a', duotoneHighlight: '#fb923c' } },
  { name: 'Cyber Hue', tags: ['playful'], state: { ...DEFAULT_FILTER, hueRotate: 260, saturate: 160, contrast: 115 } },
  { name: 'Faded Film', tags: ['retro', 'soft'], state: { ...DEFAULT_FILTER, contrast: 85, brightness: 108, saturate: 70, sepia: 15 } }
]
