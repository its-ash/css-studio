export interface GradientTextState {
  text: string
  from: string
  to: string
  angle: number
  fontSize: number
  fontWeight: number
  animate: boolean
  outline: boolean
}

export const DEFAULT_GRADIENT_TEXT: GradientTextState = {
  text: 'Gradient Text',
  from: '#10b981',
  to: '#22d3ee',
  angle: 90,
  fontSize: 44,
  fontWeight: 800,
  animate: false,
  outline: false
}

export function gradientTextCss(s: GradientTextState): string {
  const base = `.gradient-text {
  font-size: ${s.fontSize}px;
  font-weight: ${s.fontWeight};
  background: linear-gradient(${s.angle}deg, ${s.from}, ${s.to});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}`
  const outline = s.outline
    ? `

.gradient-outline {
  font-size: ${s.fontSize}px;
  font-weight: ${s.fontWeight};
  color: transparent;
  -webkit-text-stroke: 2px ${s.from};
}`
    : ''
  const animate = s.animate
    ? `

.gradient-text {
  background-size: 300% 100%;
  animation: gradient-flow ${Math.max(3, Math.round(s.fontSize / 8))}s linear infinite;
}

@keyframes gradient-flow {
  to {
    background-position: 300% 0;
  }
}`
    : ''
  return base + outline + animate
}

export function gradientTextHtml(s: GradientTextState): string {
  return s.outline
    ? `<span class="gradient-text">${s.text}</span>\n<span class="gradient-outline">Outline</span>`
    : `<span class="gradient-text">${s.text}</span>`
}

export function gradientTextVars(s: GradientTextState): Record<string, string> {
  return { '--gt-from': s.from, '--gt-to': s.to, '--gt-angle': `${s.angle}deg` }
}

export function randomizeGradientText(s: GradientTextState, rng: import('../rng').Rng): GradientTextState {
  const words = ['Gradient Text', 'Ship It', 'CSS Studio', 'Wow', 'Hello World']
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    text: rng.pick(words),
    from: `hsl(${h} 85% 55%)`,
    to: `hsl(${(h + 120) % 360} 85% 60%)`,
    angle: Math.round(rng.range(0, 360)),
    fontSize: Math.round(rng.range(30, 60)),
    animate: rng.chance(0.4),
    outline: rng.chance(0.2)
  }
}

export const PRESETS_GRADIENT_TEXT: { name: string; tags: string[]; state: GradientTextState }[] = [
  { name: 'Emerald Flow', tags: ['brand'], state: { ...DEFAULT_GRADIENT_TEXT } },
  { name: 'Sunset Fade', tags: ['warm'], state: { ...DEFAULT_GRADIENT_TEXT, from: '#f59e0b', to: '#f43f5e', angle: 120 } },
  { name: 'Violet Pulse', tags: ['brand', 'animated'], state: { ...DEFAULT_GRADIENT_TEXT, from: '#8b5cf6', to: '#ec4899', animate: true } },
  { name: 'Ocean Sweep', tags: ['cool', 'animated'], state: { ...DEFAULT_GRADIENT_TEXT, from: '#0ea5e9', to: '#22d3ee', angle: 45, animate: true } },
  { name: 'Outline Only', tags: ['minimal'], state: { ...DEFAULT_GRADIENT_TEXT, outline: true, from: '#fafafa', fontSize: 38 } },
  { name: 'Gold Standard', tags: ['premium'], state: { ...DEFAULT_GRADIENT_TEXT, from: '#fbbf24', to: '#92400e', angle: 160, fontWeight: 900 } },
  { name: 'Neon Rush', tags: ['neon', 'animated'], state: { ...DEFAULT_GRADIENT_TEXT, from: '#22d3ee', to: '#a3e635', animate: true, angle: 270 } },
  { name: 'Candy Pop', tags: ['playful'], state: { ...DEFAULT_GRADIENT_TEXT, from: '#f472b6', to: '#818cf8', angle: 60, fontSize: 52 } },
  { name: 'Deep Space', tags: ['dark'], state: { ...DEFAULT_GRADIENT_TEXT, from: '#e0e7ff', to: '#6366f1', angle: 30 } },
  { name: 'Forest Walk', tags: ['nature'], state: { ...DEFAULT_GRADIENT_TEXT, from: '#34d399', to: '#84cc16', angle: 200, fontWeight: 700 } }
]