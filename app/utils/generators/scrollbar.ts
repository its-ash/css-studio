export interface ScrollbarState {
  width: number
  trackColor: string
  thumbColor: string
  thumbHoverColor: string
  radius: number
  rounded: boolean
  useFirefox: boolean
}

export const DEFAULT_SCROLLBAR: ScrollbarState = {
  width: 10,
  trackColor: '#18181b',
  thumbColor: '#3f3f46',
  thumbHoverColor: '#52525b',
  radius: 999,
  rounded: true,
  useFirefox: true
}

export function scrollbarCss(s: ScrollbarState): string {
  const radius = s.rounded ? `${s.radius}px` : '0px'
  const lines = [
    `.scroll-area::-webkit-scrollbar {`,
    `  width: ${s.width}px;`,
    `  height: ${s.width}px;`,
    `}`,
    ``,
    `.scroll-area::-webkit-scrollbar-track {`,
    `  background: ${s.trackColor};`,
    `  border-radius: ${radius};`,
    `}`,
    ``,
    `.scroll-area::-webkit-scrollbar-thumb {`,
    `  background: ${s.thumbColor};`,
    `  border-radius: ${radius};`,
    `}`,
    ``,
    `.scroll-area::-webkit-scrollbar-thumb:hover {`,
    `  background: ${s.thumbHoverColor};`,
    `}`
  ]
  if (s.useFirefox) {
    lines.push(``, `.scroll-area {`, `  scrollbar-width: thin;`, `  scrollbar-color: ${s.thumbColor} ${s.trackColor};`, `}`)
  }
  return lines.join('\n')
}

export function scrollbarHtml(): string {
  return `<div class="scroll-area">\n  <!-- scrollable content -->\n</div>`
}

export function scrollbarVars(s: ScrollbarState): Record<string, string> {
  return {
    '--scrollbar-width': `${s.width}px`,
    '--scrollbar-track': s.trackColor,
    '--scrollbar-thumb': s.thumbColor,
    '--scrollbar-thumb-hover': s.thumbHoverColor
  }
}

export function randomizeScrollbar(s: ScrollbarState, rng: import('../rng').Rng): ScrollbarState {
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    width: Math.round(rng.range(6, 16)),
    trackColor: `hsl(${h} 15% 12%)`,
    thumbColor: `hsl(${h} 30% 35%)`,
    thumbHoverColor: `hsl(${h} 40% 45%)`,
    rounded: rng.chance(0.7)
  }
}

export const PRESETS_SCROLLBAR: { name: string; tags: string[]; state: ScrollbarState }[] = [
  { name: 'Zinc Thin', tags: ['dark', 'minimal'], state: { ...DEFAULT_SCROLLBAR } },
  { name: 'Emerald Accent', tags: ['brand'], state: { ...DEFAULT_SCROLLBAR, thumbColor: '#10b981', thumbHoverColor: '#34d399', trackColor: '#0a0a0b' } },
  { name: 'Square Edge', tags: ['mono'], state: { ...DEFAULT_SCROLLBAR, rounded: false, width: 12, thumbColor: '#52525b', trackColor: '#18181b' } },
  { name: 'Wide Light', tags: ['light'], state: { ...DEFAULT_SCROLLBAR, width: 14, trackColor: '#f4f4f5', thumbColor: '#d4d4d8', thumbHoverColor: '#a1a1aa' } },
  { name: 'Hairline', tags: ['minimal'], state: { ...DEFAULT_SCROLLBAR, width: 5, thumbColor: '#3f3f46', trackColor: 'transparent' } },
  { name: 'Ocean', tags: ['cool'], state: { ...DEFAULT_SCROLLBAR, thumbColor: '#0ea5e9', thumbHoverColor: '#38bdf8', trackColor: '#0c1a24' } },
  { name: 'Violet Glow', tags: ['brand', 'playful'], state: { ...DEFAULT_SCROLLBAR, thumbColor: '#8b5cf6', thumbHoverColor: '#a78bfa', trackColor: '#150f24' } },
  { name: 'Invisible Track', tags: ['minimal', 'dark'], state: { ...DEFAULT_SCROLLBAR, trackColor: 'transparent', thumbColor: '#3f3f4680', width: 8 } }
]
