export interface TypeStep {
  name: string
  ratio: number
}

export interface TypeScaleState {
  minViewport: number
  maxViewport: number
  minBase: number
  maxBase: number
  minRatio: number
  maxRatio: number
  steps: TypeStep[]
}

export const DEFAULT_STEPS: TypeStep[] = [
  { name: '--text-xs', ratio: -2 },
  { name: '--text-sm', ratio: -1 },
  { name: '--text-base', ratio: 0 },
  { name: '--text-lg', ratio: 1 },
  { name: '--text-xl', ratio: 2 },
  { name: '--text-2xl', ratio: 3 },
  { name: '--text-3xl', ratio: 4 },
  { name: '--text-4xl', ratio: 5 }
]

export const DEFAULT_TYPESCALE: TypeScaleState = {
  minViewport: 375,
  maxViewport: 1440,
  minBase: 16,
  maxBase: 18,
  minRatio: 1.2,
  maxRatio: 1.25,
  steps: DEFAULT_STEPS
}

/** clamp(minRem, slope*vw + intercept, maxRem) for a given step ratio. */
function clampFor(s: TypeScaleState, ratio: number): { min: number; max: number; clamp: string } {
  const minPx = s.minBase * Math.pow(s.minRatio, ratio)
  const maxPx = s.maxBase * Math.pow(s.maxRatio, ratio)
  const minRem = minPx / 16
  const maxRem = maxPx / 16
  const slope = (maxRem - minRem) / ((s.maxViewport - s.minViewport) / 16)
  const intersection = minRem - slope * (s.minViewport / 16)
  const slopeVw = `${(slope * 100).toFixed(4)}vw`
  const clamp = `clamp(${minRem.toFixed(3)}rem, ${intersection.toFixed(3)}rem + ${slopeVw}, ${maxRem.toFixed(3)}rem)`
  return { min: minRem, max: maxRem, clamp }
}

export function typeScaleCss(s: TypeScaleState): string {
  const lines = [`:root {`]
  for (const step of s.steps) {
    const { clamp } = clampFor(s, step.ratio)
    lines.push(`  ${step.name}: ${clamp};`)
  }
  lines.push(`}`)
  return lines.join('\n')
}

export function typeScaleHtml(s: TypeScaleState): string {
  return s.steps
    .map((step) => `<p style="font-size: var(${step.name})">${step.name.replace('--text-', '').toUpperCase()} — The quick brown fox</p>`)
    .join('\n')
}

export function typeScaleVars(s: TypeScaleState): Record<string, string> {
  const v: Record<string, string> = {}
  for (const step of s.steps) v[step.name] = clampFor(s, step.ratio).clamp
  return v
}

export function typeScalePreviewSizes(s: TypeScaleState): { name: string; label: string; clamp: string; minPx: number; maxPx: number }[] {
  return s.steps.map((step) => {
    const { min, max, clamp } = clampFor(s, step.ratio)
    return { name: step.name, label: step.name.replace('--text-', '').toUpperCase(), clamp, minPx: Math.round(min * 16), maxPx: Math.round(max * 16) }
  })
}

export function randomizeTypeScale(s: TypeScaleState, rng: import('../rng').Rng): TypeScaleState {
  return {
    ...s,
    minBase: Math.round(rng.range(14, 18)),
    maxBase: Math.round(rng.range(16, 20)),
    minRatio: Number(rng.range(1.125, 1.25).toFixed(3)),
    maxRatio: Number(rng.range(1.2, 1.414).toFixed(3))
  }
}

export const PRESETS_TYPESCALE: { name: string; tags: string[]; state: TypeScaleState }[] = [
  { name: 'Minor Third', tags: ['balanced'], state: { ...DEFAULT_TYPESCALE, minRatio: 1.2, maxRatio: 1.25 } },
  { name: 'Major Third', tags: ['editorial'], state: { ...DEFAULT_TYPESCALE, minRatio: 1.25, maxRatio: 1.333 } },
  { name: 'Perfect Fourth', tags: ['bold'], state: { ...DEFAULT_TYPESCALE, minRatio: 1.333, maxRatio: 1.414 } },
  { name: 'Golden Ratio', tags: ['dramatic'], state: { ...DEFAULT_TYPESCALE, minRatio: 1.5, maxRatio: 1.618 } },
  { name: 'Compact UI', tags: ['app', 'dense'], state: { ...DEFAULT_TYPESCALE, minBase: 14, maxBase: 15, minRatio: 1.125, maxRatio: 1.2 } },
  { name: 'Marketing Hero', tags: ['landing'], state: { ...DEFAULT_TYPESCALE, minBase: 17, maxBase: 20, minRatio: 1.25, maxRatio: 1.4 } }
]
