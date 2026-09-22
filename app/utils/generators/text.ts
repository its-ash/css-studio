export type TextEffectKind =
  | 'gradient' | 'neon' | 'glow' | 'outline' | '3d' | 'shadowed' | 'metallic' | 'glass' | 'animated'

export interface TextEffectState {
  kind: TextEffectKind
  text: string
  color: string
  color2: string
  size: number
  angle: number
  weight: number
}

export const TEXT_EFFECT_KINDS: { value: TextEffectKind; label: string }[] = [
  { value: 'gradient', label: 'Gradient' },
  { value: 'neon', label: 'Neon' },
  { value: 'glow', label: 'Glow' },
  { value: 'outline', label: 'Outline' },
  { value: '3d', label: '3D' },
  { value: 'shadowed', label: 'Shadow' },
  { value: 'metallic', label: 'Metallic' },
  { value: 'glass', label: 'Glass' },
  { value: 'animated', label: 'Animated Gradient' }
]

export const DEFAULT_TEXT_EFFECT: TextEffectState = {
  kind: 'gradient',
  text: 'Beautiful',
  color: '#10b981',
  color2: '#06b6d4',
  size: 64,
  angle: 90,
  weight: 700
}

export function textEffectStyle(s: TextEffectState): Record<string, string> {
  const c = s.color
  const c2 = s.color2
  switch (s.kind) {
    case 'gradient':
      return {
        'background-image': `linear-gradient(${s.angle}deg, ${c}, ${c2})`,
        '-webkit-background-clip': 'text',
        'background-clip': 'text',
        color: 'transparent',
        '-webkit-text-fill-color': 'transparent'
      }
    case 'neon':
      return {
        color: '#f8fafc',
        'text-shadow': `0 0 4px ${c}, 0 0 12px ${c}, 0 0 32px ${c}, 0 0 64px ${c}`
      }
    case 'glow':
      return { color: c, 'text-shadow': `0 0 24px ${c}` }
    case 'outline':
      return {
        color: 'transparent',
        '-webkit-text-stroke': `2px ${c}`,
        'text-stroke': `2px ${c}`
      }
    case '3d':
      return {
        color: c,
        'text-shadow': `1px 1px 0 ${c2}, 2px 2px 0 ${c2}, 3px 3px 0 ${c2}, 4px 4px 0 ${c2}, 5px 5px 0 ${c2}, 6px 6px 12px #00000055`
      }
    case 'shadowed':
      return { color: c, 'text-shadow': `4px 4px 0 ${c2}` }
    case 'metallic':
      return {
        'background-image': `linear-gradient(110deg, #d4d4d8 15%, #fafafa 32%, #a1a1aa 48%, #e4e4e7 60%, #d4d4d8 80%)`,
        '-webkit-background-clip': 'text',
        'background-clip': 'text',
        color: 'transparent',
        '-webkit-text-fill-color': 'transparent'
      }
    case 'glass':
      return {
        'background-image': `linear-gradient(135deg, #ffffff55 25%, #ffffff18 55%, #ffffff44 90%)`,
        '-webkit-background-clip': 'text',
        'background-clip': 'text',
        color: 'transparent',
        '-webkit-text-fill-color': 'transparent',
        'text-shadow': `0 1px 1px #00000033`
      }
    case 'animated':
      return {
        'background-image': `linear-gradient(90deg, ${c}, ${c2}, ${c})`,
        'background-size': '200% 100%',
        '-webkit-background-clip': 'text',
        'background-clip': 'text',
        color: 'transparent',
        '-webkit-text-fill-color': 'transparent',
        animation: 'text-gradient-pan 3s linear infinite'
      }
    default:
      return {}
  }
}

export const TEXT_EFFECT_KEYFRAMES = `@keyframes text-gradient-pan {
  to { background-position: 200% 0; }
}`

export function textEffectCss(s: TextEffectState): string {
  const st = textEffectStyle(s)
  const lines = [`.text-effect {`, `  font-size: ${s.size}px;`, `  font-weight: ${s.weight};`]
  for (const [k, v] of Object.entries(st)) lines.push(`  ${k}: ${v};`)
  lines.push(`}`)
  if (s.kind === 'animated') lines.push(`\n${TEXT_EFFECT_KEYFRAMES}`)
  return lines.join('\n')
}

export function textEffectVars(s: TextEffectState): Record<string, string> {
  return {
    '--text-color': s.color,
    '--text-color-2': s.color2,
    '--text-size': `${s.size}px`
  }
}

export function textEffectHtml(s: TextEffectState): string {
  return `<h1 class="text-effect">${s.text}</h1>`
}

export function randomizeTextEffect(s: TextEffectState, rng: import('../rng').Rng): TextEffectState {
  const hue = Math.floor(rng.range(0, 360))
  return {
    ...s,
    kind: rng.pick(TEXT_EFFECT_KINDS.map((k) => k.value)),
    color: `hsl(${hue} 80% 55%)`,
    color2: `hsl(${(hue + Math.round(rng.range(40, 160))) % 360} 80% 55%)`,
    angle: Math.round(rng.range(0, 360))
  }
}

export const PRESETS_TEXT_EFFECT: { name: string; tags: string[]; state: TextEffectState }[] = [
  { name: 'Emerald Fade', tags: ['gradient'], state: { ...DEFAULT_TEXT_EFFECT } },
  { name: 'Neon Sign', tags: ['neon'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'neon', color: '#34d399', text: 'NEON' } },
  { name: 'Chrome', tags: ['metallic'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'metallic', text: 'Chrome' } },
  { name: 'Retro 3D', tags: ['3d'], state: { ...DEFAULT_TEXT_EFFECT, kind: '3d', color: '#f43f5e', color2: '#7c2d12', text: 'RETRO' } },
  { name: 'Outline Ghost', tags: ['outline'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'outline', text: 'GHOST' } },
  { name: 'Liquid Pan', tags: ['animated'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'animated', text: 'Animated' } },
  { name: 'Fire Text', tags: ['gradient', 'warm'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'gradient', color: '#f97316', color2: '#dc2626', angle: 15, text: 'FIRE' } },
  { name: 'Ice Chill', tags: ['gradient', 'cool'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'gradient', color: '#7dd3fc', color2: '#0284c7', angle: 170, text: 'ICE' } },
  { name: 'Purple Haze', tags: ['glow'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'glow', color: '#a78bfa', text: 'HAZE' } },
  { name: 'Sticker Pop', tags: ['shadow', 'playful'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'shadowed', color: '#fde047', color2: '#1e1b4b', text: 'SALE' } },
  { name: 'Deep Stack', tags: ['3d'], state: { ...DEFAULT_TEXT_EFFECT, kind: '3d', color: '#10b981', color2: '#065f46', text: '3D' } },
  { name: 'Outline Thin', tags: ['outline'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'outline', weight: 400, text: 'GHOST' } },
  { name: 'Blue Neon', tags: ['neon'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'neon', color: '#38bdf8', text: 'NEON' } },
  { name: 'Gold Leaf', tags: ['metallic', 'luxury'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'gradient', color: '#f5d68a', color2: '#b8860b', angle: 100, text: 'GOLD' } },
  { name: 'Emerald Haze', tags: ['glow', 'brand'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'glow', color: '#34d399', text: 'GLOW' } },
  { name: 'Purple 3D', tags: ['3d'], state: { ...DEFAULT_TEXT_EFFECT, kind: '3d', color: '#a78bfa', color2: '#4c1d95', text: 'DEPTH' } },
  { name: 'Frosted Glass', tags: ['glass'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'glass', text: 'FROST' } },
  { name: 'Hard Shadow', tags: ['shadow', 'retro'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'shadowed', color: '#e4e4e7', color2: '#18181b', text: 'RETRO' } },
  { name: 'Neon Pink', tags: ['neon'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'neon', color: '#ec4899', text: 'PINK' } },
  { name: 'Aqua Pan', tags: ['animated', 'cool'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'animated', color: '#06b6d4', color2: '#34d399', text: 'FLOW' } },
  { name: 'Ink Outline', tags: ['outline'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'outline', color: '#18181b', text: 'INK' } },
  { name: 'Holographic', tags: ['wow', 'gradient'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'gradient', color: '#00ffff', color2: '#ff00ff', angle: 45, text: 'HOLO', size: 80 } },
  { name: 'Lava Text', tags: ['wow', 'gradient', 'warm'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'gradient', color: '#f97316', color2: '#dc2626', angle: 15, text: 'LAVA', size: 72 } },
  { name: 'Toxic Glow', tags: ['wow', 'glow'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'glow', color: '#a3e635', text: 'TOXIC', size: 72 } },
  { name: 'Deep 3D Stack', tags: ['wow', '3d'], state: { ...DEFAULT_TEXT_EFFECT, kind: '3d', color: '#a855f7', color2: '#3b0764', text: 'DEEP', size: 72 } },
  { name: 'Plasma Neon', tags: ['wow', 'neon'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'neon', color: '#ec4899', text: 'PLASMA', size: 72 } },
  { name: 'Liquid Gold', tags: ['wow', 'gradient', 'luxury'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'gradient', color: '#fde68a', color2: '#b45309', angle: 100, text: 'GOLD', size: 80 } },
  { name: 'Cosmic Shift', tags: ['wow', 'animated'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'animated', color: '#8b5cf6', color2: '#06b6d4', text: 'COSMIC', size: 72 } },
  { name: 'Ice Crystal', tags: ['wow', 'outline'], state: { ...DEFAULT_TEXT_EFFECT, kind: 'outline', color: '#7dd3fc', text: 'ICE', size: 80, weight: 800 } }
]