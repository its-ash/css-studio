export type BorderStyle = 'solid' | 'dashed' | 'dotted' | 'double'
export type BorderEffect = 'none' | 'gradient' | 'animated' | 'glow'

export interface BorderState {
  width: number
  style: BorderStyle
  color: string
  effect: BorderEffect
  gradientFrom: string
  gradientTo: string
  gradientAngle: number
  glowColor: string
  glowBlur: number
  radius: number
  radiusTL: number
  radiusTR: number
  radiusBR: number
  radiusBL: number
  individualCorners: boolean
  animate: boolean
  surface: string
  widthT: number
  widthR: number
  widthB: number
  widthL: number
  perSide: boolean
}

export const DEFAULT_BORDER: BorderState = {
  width: 2,
  style: 'solid',
  color: '#10b981',
  effect: 'none',
  gradientFrom: '#10b981',
  gradientTo: '#06b6d4',
  gradientAngle: 90,
  glowColor: '#34d399',
  glowBlur: 16,
  radius: 12,
  radiusTL: 12,
  radiusTR: 12,
  radiusBR: 12,
  radiusBL: 12,
  individualCorners: false,
  animate: false,
  surface: '#0f172a',
  widthT: 2,
  widthR: 2,
  widthB: 2,
  widthL: 2,
  perSide: false
}

export function borderRadius(s: BorderState): string {
  if (s.individualCorners) {
    return `${s.radiusTL}px ${s.radiusTR}px ${s.radiusBR}px ${s.radiusBL}px`
  }
  return `${s.radius}px`
}

export function borderWidth(s: BorderState): string {
  if (s.perSide) {
    return `${s.widthT}px ${s.widthR}px ${s.widthB}px ${s.widthL}px`
  }
  return `${s.width}px`
}

export function borderCss(s: BorderState): string {
  const lines = [`.border-demo {`, `  background: ${s.surface};`, `  border-radius: ${borderRadius(s)};`]

  if (s.effect === 'gradient' || s.effect === 'animated') {
    lines.push(
      `  border: ${s.width}px solid transparent;`,
      `  background-image: linear-gradient(${s.surface}, ${s.surface}), linear-gradient(${s.gradientAngle}deg, ${s.gradientFrom}, ${s.gradientTo});`,
      `  background-origin: border-box;`,
      `  background-clip: padding-box, border-box;`
    )
    if (s.effect === 'animated') {
      lines.push(`  background-size: 300% 300%;`)
    }
  } else if (s.effect === 'glow') {
    lines.push(
      `  border: ${borderWidth(s)} ${s.style} ${s.color};`,
      `  box-shadow: 0 0 ${s.glowBlur}px ${s.glowColor}, inset 0 0 ${Math.max(4, s.glowBlur / 2)}px ${s.glowColor};`
    )
  } else {
    lines.push(`  border: ${borderWidth(s)} ${s.style} ${s.color};`)
  }

  if (s.effect === 'animated') {
    lines.push(`  animation: border-rotate 3s linear infinite;`)
  }

  lines.push(`}`)
  if (s.effect === 'animated') {
    lines.push(``, `@keyframes border-rotate {`, `  0% { background-position: 0% 50%; }`, `  100% { background-position: 300% 50%; }`, `}`)
  }
  return lines.join('\n')
}

export function borderPreviewStyle(s: BorderState): Record<string, string> {
  const st: Record<string, string> = {
    background: s.surface,
    'border-radius': borderRadius(s)
  }

  if (s.effect === 'gradient' || s.effect === 'animated') {
    st['border'] = `${s.width}px solid transparent`
    st['background-image'] = `linear-gradient(${s.surface}, ${s.surface}), linear-gradient(${s.gradientAngle}deg, ${s.gradientFrom}, ${s.gradientTo})`
    st['background-origin'] = 'border-box'
    st['background-clip'] = 'padding-box, border-box'
    if (s.effect === 'animated') {
      st['background-size'] = '300% 300%'
      st['animation'] = 'border-rotate 3s linear infinite'
    }
  } else if (s.effect === 'glow') {
    st['border'] = `${borderWidth(s)} ${s.style} ${s.color}`
    st['box-shadow'] = `0 0 ${s.glowBlur}px ${s.glowColor}, inset 0 0 ${Math.max(4, s.glowBlur / 2)}px ${s.glowColor}`
  } else {
    st['border'] = `${borderWidth(s)} ${s.style} ${s.color}`
  }

  return st
}

export function borderKeyframesHtml(s: BorderState): string {
  if (s.effect !== 'animated') return ''
  return `<style>@keyframes border-rotate { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }</style>`
}

export function borderVars(s: BorderState): Record<string, string> {
  return {
    '--border-width': `${s.width}px`,
    '--border-color': s.color,
    '--border-radius': borderRadius(s)
  }
}

export function borderHtml(): string {
  return `<div class="border-demo"></div>`
}

export function randomizeBorder(s: BorderState, rng: import('../rng').Rng): BorderState {
  const h = Math.floor(rng.range(0, 360))
  const effects = ['none', 'gradient', 'animated', 'glow'] as const
  return {
    ...s,
    color: `hsl(${h} 80% 55%)`,
    gradientFrom: `hsl(${h} 90% 55%)`,
    gradientTo: `hsl(${(h + 120) % 360} 90% 55%)`,
    glowColor: `hsl(${h} 90% 55%)`,
    effect: rng.pick(effects),
    radius: Math.round(rng.range(0, 32)),
    width: Math.round(rng.range(1, 6))
  }
}

export const PRESETS_BORDER: { name: string; tags: string[]; state: BorderState }[] = [
  {
    name: 'Emerald Solid',
    tags: ['solid', 'brand'],
    state: { ...DEFAULT_BORDER }
  },
  {
    name: 'Gradient Border',
    tags: ['gradient'],
    state: { ...DEFAULT_BORDER, effect: 'gradient', gradientFrom: '#10b981', gradientTo: '#06b6d4', width: 3, radius: 16 }
  },
  {
    name: 'Animated Border',
    tags: ['animated'],
    state: { ...DEFAULT_BORDER, effect: 'animated', gradientFrom: '#a78bfa', gradientTo: '#ec4899', width: 3, radius: 16 }
  },
  {
    name: 'Neon Glow',
    tags: ['glow', 'dark'],
    state: { ...DEFAULT_BORDER, effect: 'glow', color: '#34d399', glowColor: '#34d399', glowBlur: 24, width: 2, radius: 14, surface: '#09090b' }
  },
  {
    name: 'Dashed Pill',
    tags: ['dashed'],
    state: { ...DEFAULT_BORDER, style: 'dashed', width: 2, radius: 999 }
  },
  {
    name: 'Dotted Frame',
    tags: ['dotted'],
    state: { ...DEFAULT_BORDER, style: 'dotted', width: 3, radius: 8, color: '#f59e0b' }
  },
  {
    name: 'Double Line',
    tags: ['double'],
    state: { ...DEFAULT_BORDER, style: 'double', width: 6, radius: 4, color: '#8b5cf6' }
  },
  {
    name: 'Rose Glow',
    tags: ['glow', 'warm'],
    state: { ...DEFAULT_BORDER, effect: 'glow', color: '#f43f5e', glowColor: '#f43f5e', glowBlur: 20, width: 2, radius: 12, surface: '#1a0a0a' }
  },
  {
    name: 'Ocean Gradient',
    tags: ['gradient', 'cool'],
    state: { ...DEFAULT_BORDER, effect: 'gradient', gradientFrom: '#0ea5e9', gradientTo: '#8b5cf6', width: 4, radius: 20, surface: '#0c4a6e' }
  },
  {
    name: 'Animated Rainbow',
    tags: ['animated', 'playful'],
    state: { ...DEFAULT_BORDER, effect: 'animated', gradientFrom: '#ef4444', gradientTo: '#8b5cf6', width: 3, radius: 12, surface: '#18181b' }
  },
  {
    name: 'Sharp Corners',
    tags: ['solid'],
    state: { ...DEFAULT_BORDER, width: 4, radius: 0, color: '#e4e4e7', surface: '#27272a' }
  },
  {
    name: 'Asymmetric',
    tags: ['corners'],
    state: { ...DEFAULT_BORDER, individualCorners: true, radiusTL: 24, radiusTR: 0, radiusBR: 24, radiusBL: 0, width: 2, color: '#06b6d4' }
  },
  {
    name: 'Holographic',
    tags: ['wow', 'animated'],
    state: { ...DEFAULT_BORDER, effect: 'animated', gradientFrom: '#00ffff', gradientTo: '#ff00ff', width: 4, radius: 20, surface: '#0a0a0f' }
  },
  {
    name: 'Inferno Glow',
    tags: ['wow', 'glow'],
    state: { ...DEFAULT_BORDER, effect: 'glow', color: '#f97316', glowColor: '#f97316', glowBlur: 40, width: 3, radius: 16, surface: '#1a0a00' }
  },
  {
    name: 'Liquid Mercury',
    tags: ['wow', 'gradient'],
    state: { ...DEFAULT_BORDER, effect: 'gradient', gradientFrom: '#e5e7eb', gradientTo: '#9ca3af', width: 5, radius: 24, surface: '#1f2937' }
  },
  {
    name: 'Cyber Grid',
    tags: ['wow', 'glow', 'dark'],
    state: { ...DEFAULT_BORDER, effect: 'glow', color: '#22d3ee', glowColor: '#22d3ee', glowBlur: 32, width: 2, radius: 0, surface: '#020617' }
  },
  {
    name: 'Rainbow Flow',
    tags: ['wow', 'animated'],
    state: { ...DEFAULT_BORDER, effect: 'animated', gradientFrom: '#ef4444', gradientTo: '#8b5cf6', width: 3, radius: 16, surface: '#0c0c0c' }
  },
  {
    name: 'Toxic Edge',
    tags: ['wow', 'glow'],
    state: { ...DEFAULT_BORDER, effect: 'glow', color: '#a3e635', glowColor: '#a3e635', glowBlur: 28, width: 2, radius: 12, surface: '#0a0f00' }
  },
  {
    name: 'Royal Gold',
    tags: ['wow', 'gradient', 'luxury'],
    state: { ...DEFAULT_BORDER, effect: 'gradient', gradientFrom: '#fbbf24', gradientTo: '#92400e', width: 6, radius: 8, surface: '#1c1208' }
  }
]