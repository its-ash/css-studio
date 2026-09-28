export type FitKind = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export interface AspectFitState {
  /** aspect ratio as ratio pair */
  ratioW: number
  ratioH: number
  fit: FitKind
  imageWidth: number
  imageHeight: number
  radius: number
  accent: string
  bg: string
  panelW: number
  panelH: number
}

export const FIT_KINDS: { value: FitKind; label: string }[] = [
  { value: 'fill', label: 'Fill' },
  { value: 'contain', label: 'Contain' },
  { value: 'cover', label: 'Cover' },
  { value: 'none', label: 'None' },
  { value: 'scale-down', label: 'Scale Down' }
]

export const RATIO_PRESETS: { label: string; w: number; h: number }[] = [
  { label: '1:1', w: 1, h: 1 },
  { label: '4:3', w: 4, h: 3 },
  { label: '3:2', w: 3, h: 2 },
  { label: '16:9', w: 16, h: 9 },
  { label: '21:9', w: 21, h: 9 },
  { label: '3:4', w: 3, h: 4 },
  { label: '9:16', w: 9, h: 16 },
  { label: '2.39:1', w: 2.39, h: 1 }
]

export const DEFAULT_ASPECT_FIT: AspectFitState = {
  ratioW: 16,
  ratioH: 9,
  fit: 'cover',
  imageWidth: 300,
  imageHeight: 160,
  radius: 12,
  accent: '#10b981',
  bg: '#09090b',
  panelW: 480,
  panelH: 280
}

export function aspectRatioValue(s: AspectFitState): string {
  return `${Math.round(s.ratioW * 100) / 100} / ${Math.round(s.ratioH * 100) / 100}`
}

export function aspectFitCss(s: AspectFitState): string {
  return `.frame {
  aspect-ratio: ${aspectRatioValue(s)};
  width: min(${s.panelW}px, 100%);
  border-radius: ${s.radius}px;
  overflow: hidden;
  background: ${s.bg};
}
.frame img {
  width: 100%;
  height: 100%;
  object-fit: ${s.fit};
}`
}

export function aspectFitHtml(s: AspectFitState): string {
  return `<div class="frame">\n  <img src="demo.jpg" alt="Demo" />\n</div>`
}

export function aspectFitVars(s: AspectFitState): Record<string, string> {
  return {
    '--frame-ratio': aspectRatioValue(s),
    '--frame-radius': `${s.radius}px`
  }
}

export function randomizeAspectFit(s: AspectFitState, rng: import('../rng').Rng): AspectFitState {
  const preset = rng.pick(RATIO_PRESETS)
  return {
    ...s,
    ratioW: preset.w,
    ratioH: preset.h,
    fit: rng.pick(FIT_KINDS.map((f) => f.value) as FitKind[]),
    imageWidth: Math.round(rng.range(200, 500)),
    imageHeight: Math.round(rng.range(120, 300)),
    radius: rng.pick([0, 8, 12, 20]),
    accent: rng.pick(['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#f43f5e'])
  }
}

export const PRESETS_ASPECT_FIT: { name: string; tags: string[]; state: AspectFitState }[] = [
  { name: 'Cover 16:9', tags: ['hero'], state: { ...DEFAULT_ASPECT_FIT, ratioW: 16, ratioH: 9, fit: 'cover' } },
  { name: 'Contain Demo', tags: ['letterbox'], state: { ...DEFAULT_ASPECT_FIT, ratioW: 16, ratioH: 9, fit: 'contain', imageWidth: 260, imageHeight: 220 } },
  { name: 'Square Avatar', tags: ['1:1'], state: { ...DEFAULT_ASPECT_FIT, ratioW: 1, ratioH: 1, panelW: 240, panelH: 240, fit: 'cover', radius: 999, accent: '#0ea5e9' } },
  { name: 'Cinema 2.39', tags: ['widescreen'], state: { ...DEFAULT_ASPECT_FIT, ratioW: 2.39, ratioH: 1, panelW: 520, panelH: 240, fit: 'cover', radius: 0, accent: '#8b5cf6' } },
  { name: 'Vertical Story', tags: ['9:16'], state: { ...DEFAULT_ASPECT_FIT, ratioW: 9, ratioH: 16, panelW: 220, panelH: 380, fit: 'cover', accent: '#f43f5e' } },
  { name: 'Fill Stretch', tags: ['fill'], state: { ...DEFAULT_ASPECT_FIT, fit: 'fill', imageWidth: 220, imageHeight: 200, accent: '#f59e0b' } },
  { name: 'Scale Down', tags: ['shrink'], state: { ...DEFAULT_ASPECT_FIT, fit: 'scale-down', imageWidth: 240, imageHeight: 140, accent: '#22d3ee' } },
  { name: 'Portrait 3:4', tags: ['card'], state: { ...DEFAULT_ASPECT_FIT, ratioW: 3, ratioH: 4, panelW: 260, panelH: 340, fit: 'cover', radius: 16 } }
]