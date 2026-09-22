export interface GlassState {
  bg: string
  bgOpacity: number
  blur: number
  saturate: number
  brightness: number
  radius: number
  borderOpacity: number
  shadow: string
  innerGlow: boolean
  width: number
  height: number
}

export const DEFAULT_GLASS: GlassState = {
  bg: '#ffffff',
  bgOpacity: 12,
  blur: 16,
  saturate: 160,
  brightness: 105,
  radius: 20,
  borderOpacity: 35,
  shadow: '0 8px 32px #00000040',
  innerGlow: true,
  width: 320,
  height: 220
}

export function glassCss(s: GlassState): string {
  const lines = [
    `.glass {`,
    `  background: ${s.bg}${Math.round((s.bgOpacity / 100) * 255).toString(16).padStart(2, '0')};`,
    `  -webkit-backdrop-filter: blur(${s.blur}px) saturate(${s.saturate}%) brightness(${s.brightness}%);`,
    `  backdrop-filter: blur(${s.blur}px) saturate(${s.saturate}%) brightness(${s.brightness}%);`,
    `  border-radius: ${s.radius}px;`,
    `  border: 1px solid ${s.bg}${Math.round((s.borderOpacity / 100) * 255).toString(16).padStart(2, '0')};`,
    `  box-shadow: ${s.shadow};`
  ]
  if (s.innerGlow) {
    lines.push(`  box-shadow: ${s.shadow}, inset 0 1px 0 #ffffff2e;`)
  }
  lines.push(`}`)
  return lines.join('\n')
}

export function glassPreviewStyle(s: GlassState): Record<string, string> {
  const st: Record<string, string> = {
    background: `${s.bg}${Math.round((s.bgOpacity / 100) * 255).toString(16).padStart(2, '0')}`,
    '-webkit-backdrop-filter': `blur(${s.blur}px) saturate(${s.saturate}%) brightness(${s.brightness}%)`,
    'backdrop-filter': `blur(${s.blur}px) saturate(${s.saturate}%) brightness(${s.brightness}%)`,
    'border-radius': `${s.radius}px`,
    border: `1px solid ${s.bg}${Math.round((s.borderOpacity / 100) * 255).toString(16).padStart(2, '0')}`,
    width: `${s.width}px`,
    height: `${s.height}px`
  }
  st['box-shadow'] = s.innerGlow ? `${s.shadow}, inset 0 1px 0 #ffffff2e` : s.shadow
  return st
}

export function glassVars(s: GlassState): Record<string, string> {
  return {
    '--glass-bg': `${s.bg}${Math.round((s.bgOpacity / 100) * 255).toString(16).padStart(2, '0')}`,
    '--glass-blur': `${s.blur}px`,
    '--glass-radius': `${s.radius}px`
  }
}

export function glassHtml(): string {
  return `<div class="glass">Glassmorphism</div>`
}

export function randomizeGlass(s: GlassState, rng: import('../rng').Rng): GlassState {
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    bg: '#ffffff',
    bgOpacity: Math.round(rng.range(8, 22)),
    blur: Math.round(rng.range(8, 28)),
    saturate: Math.round(rng.range(120, 200)),
    radius: Math.round(rng.range(8, 28))
  }
}

export const PRESETS_GLASS: { name: string; tags: string[]; state: GlassState }[] = [
  { name: 'Frosted Panel', tags: ['panel'], state: { ...DEFAULT_GLASS } },
  { name: 'iOS Sheet', tags: ['mobile'], state: { ...DEFAULT_GLASS, blur: 24, bgOpacity: 18, radius: 24, shadow: '0 24px 48px #00000033' } },
  { name: 'Glass Card', tags: ['card'], state: { ...DEFAULT_GLASS, blur: 12, bgOpacity: 8, radius: 16 } },
  { name: 'Dark Glass', tags: ['dark'], state: { ...DEFAULT_GLASS, bg: '#09090b', bgOpacity: 45, borderOpacity: 18, shadow: '0 8px 32px #00000080' } },
  { name: 'Light Blur', tags: ['light'], state: { ...DEFAULT_GLASS, blur: 8, bgOpacity: 30, saturate: 180, radius: 12, shadow: '0 4px 16px #00000026' } },
  { name: 'Tinted Emerald', tags: ['brand'], state: { ...DEFAULT_GLASS, bg: '#34d399', bgOpacity: 14, borderOpacity: 40, blur: 20, radius: 24, shadow: '0 8px 32px #064e3b40' } },
  { name: 'Frosted Nav', tags: ['nav'], state: { ...DEFAULT_GLASS, blur: 18, bgOpacity: 10, borderOpacity: 30, radius: 0, width: 480, height: 64, shadow: '0 1px 0 #ffffff1a' } },
  { name: 'Modal Panel', tags: ['modal'], state: { ...DEFAULT_GLASS, blur: 28, bgOpacity: 16, borderOpacity: 28, radius: 20, width: 400, height: 280, shadow: '0 24px 64px #00000066' } },
  { name: 'Sapphire Tint', tags: ['cool'], state: { ...DEFAULT_GLASS, bg: '#38bdf8', bgOpacity: 12, borderOpacity: 35, blur: 22, radius: 16, shadow: '0 12px 40px #0759854d' } },
  { name: 'Amber Sheet', tags: ['warm'], state: { ...DEFAULT_GLASS, bg: '#f59e0b', bgOpacity: 15, borderOpacity: 40, blur: 16, radius: 18, shadow: '0 10px 36px #78350f40' } },
  { name: 'Card Float', tags: ['card'], state: { ...DEFAULT_GLASS, blur: 14, bgOpacity: 20, borderOpacity: 45, radius: 14, width: 300, height: 200, shadow: '0 18px 48px #0000004d' } },
  { name: 'Vibrancy Bar', tags: ['nav'], state: { ...DEFAULT_GLASS, blur: 24, bgOpacity: 14, borderOpacity: 25, radius: 0, width: 520, height: 56, shadow: '0 2px 12px #00000030' } },
  { name: 'Frost Badge', tags: ['badge'], state: { ...DEFAULT_GLASS, blur: 10, bgOpacity: 25, borderOpacity: 50, radius: 999, width: 140, height: 140, shadow: '0 6px 24px #00000038' } },
  { name: 'Crystal Ice', tags: ['wow', 'light'], state: { ...DEFAULT_GLASS, blur: 32, bgOpacity: 8, borderOpacity: 60, radius: 24, width: 360, height: 240, shadow: '0 16px 48px #ffffff20, inset 0 1px 0 #ffffff80', bg: '#ffffff' } },
  { name: 'Liquid Chrome', tags: ['wow', 'dark'], state: { ...DEFAULT_GLASS, blur: 24, bgOpacity: 20, borderOpacity: 40, radius: 20, width: 340, height: 220, shadow: '0 20px 60px #00000088', bg: '#a1a1aa' } },
  { name: 'Neon Glass', tags: ['wow', 'brand'], state: { ...DEFAULT_GLASS, blur: 20, bgOpacity: 10, borderOpacity: 70, radius: 16, width: 320, height: 200, shadow: '0 0 40px #34d39966, 0 8px 32px #00000044', bg: '#34d399' } },
  { name: 'Rose Crystal', tags: ['wow', 'warm'], state: { ...DEFAULT_GLASS, blur: 28, bgOpacity: 12, borderOpacity: 50, radius: 28, width: 360, height: 240, shadow: '0 16px 48px #f43f5e33', bg: '#f43f5e' } },
  { name: 'Aurora Sheet', tags: ['wow', 'cool'], state: { ...DEFAULT_GLASS, blur: 36, bgOpacity: 6, borderOpacity: 30, radius: 20, width: 400, height: 260, shadow: '0 12px 40px #0ea5e944', bg: '#0ea5e9' } }
]