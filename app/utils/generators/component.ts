export type ComponentKind = 'button' | 'card' | 'input' | 'badge' | 'navbar' | 'hero' | 'checkbox' | 'switch' | 'tooltip' | 'alert'

export interface ComponentState {
  kind: ComponentKind
  bg: string
  textColor: string
  borderRadius: number
  padding: number
  borderWidth: number
  borderColor: string
  shadowX: number
  shadowY: number
  shadowBlur: number
  shadowColor: string
  fontSize: number
  fontWeight: number
  gradientFrom: string
  gradientTo: string
  gradientAngle: number
  useGradient: boolean
  glowColor: string
  glowBlur: number
  useGlow: boolean
  useGlass: boolean
  glassBlur: number
}

export const COMPONENT_KINDS: { value: ComponentKind; label: string }[] = [
  { value: 'button', label: 'Button' },
  { value: 'card', label: 'Card' },
  { value: 'input', label: 'Input' },
  { value: 'badge', label: 'Badge' },
  { value: 'navbar', label: 'Navbar' },
  { value: 'hero', label: 'Hero Section' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'switch', label: 'Switch' },
  { value: 'tooltip', label: 'Tooltip' },
  { value: 'alert', label: 'Alert' }
]

export const DEFAULT_COMPONENT: ComponentState = {
  kind: 'button',
  bg: '#10b981',
  textColor: '#ffffff',
  borderRadius: 12,
  padding: 16,
  borderWidth: 0,
  borderColor: '#10b981',
  shadowX: 0,
  shadowY: 8,
  shadowBlur: 24,
  shadowColor: '#10b98144',
  fontSize: 15,
  fontWeight: 600,
  gradientFrom: '#10b981',
  gradientTo: '#06b6d4',
  gradientAngle: 135,
  useGradient: true,
  glowColor: '#34d399',
  glowBlur: 20,
  useGlow: false,
  useGlass: false,
  glassBlur: 16
}

export function componentCss(s: ComponentState): string {
  const bg = s.useGradient
    ? `linear-gradient(${s.gradientAngle}deg, ${s.gradientFrom}, ${s.gradientTo})`
    : s.bg
  const shadow = s.useGlow
    ? `0 0 ${s.glowBlur}px ${s.glowColor}, ${s.shadowX}px ${s.shadowY}px ${s.shadowBlur}px ${s.shadowColor}`
    : `${s.shadowX}px ${s.shadowY}px ${s.shadowBlur}px ${s.shadowColor}`
  const lines = [
    `.component-demo {`,
    `  background: ${bg};`,
    `  color: ${s.textColor};`,
    `  border-radius: ${s.borderRadius}px;`,
    `  padding: ${s.padding}px ${s.padding * 1.5}px;`,
    `  font-size: ${s.fontSize}px;`,
    `  font-weight: ${s.fontWeight};`,
    `  box-shadow: ${shadow};`
  ]
  if (s.kind === 'card' && s.useGlass) {
    lines.push(`  backdrop-filter: blur(${s.glassBlur}px) saturate(160%);`, `  -webkit-backdrop-filter: blur(${s.glassBlur}px) saturate(160%);`)
  }
  if (s.borderWidth > 0) lines.push(`  border: ${s.borderWidth}px solid ${s.borderColor};`)
  lines.push(`}`)

  if (s.kind === 'checkbox') {
    return `.component-demo {
  appearance: none;
  width: ${Math.round(s.padding * 1.4)}px;
  height: ${Math.round(s.padding * 1.4)}px;
  border-radius: ${Math.min(s.borderRadius, 8)}px;
  border: ${Math.max(s.borderWidth, 2)}px solid ${s.borderColor};
  background: ${s.bg};
  display: inline-grid;
  place-content: center;
  cursor: pointer;
}

.component-demo::before {
  content: '';
  width: 60%;
  height: 60%;
  transform: scale(0);
  transition: transform 0.15s ease-in-out;
  box-shadow: inset 1em 1em ${s.textColor};
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

.component-demo:checked {
  background: ${bg};
  border-color: transparent;
}

.component-demo:checked::before {
  transform: scale(1);
}`
  }

  if (s.kind === 'switch') {
    const trackH = Math.round(s.padding * 1.6)
    const trackW = trackH * 2
    const knob = trackH - 6
    return `.component-demo {
  position: relative;
  width: ${trackW}px;
  height: ${trackH}px;
  border-radius: 999px;
  background: ${s.borderColor};
  cursor: pointer;
  transition: background 0.2s ease;
}

.component-demo::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: ${knob}px;
  height: ${knob}px;
  border-radius: 50%;
  background: #fff;
  box-shadow: ${s.shadowX}px ${s.shadowY}px ${s.shadowBlur}px ${s.shadowColor};
  transition: transform 0.2s ease;
}

.component-demo[aria-checked="true"] {
  background: ${bg};
}

.component-demo[aria-checked="true"]::after {
  transform: translateX(${trackW - trackH}px);
}`
  }

  if (s.kind === 'tooltip') {
    return `.component-demo {
  position: relative;
  display: inline-block;
}

.component-demo .tooltip-bubble {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: ${s.bg};
  color: ${s.textColor};
  padding: ${Math.round(s.padding * 0.5)}px ${Math.round(s.padding * 0.8)}px;
  border-radius: ${Math.min(s.borderRadius, 10)}px;
  font-size: ${Math.min(s.fontSize, 13)}px;
  font-weight: ${s.fontWeight};
  white-space: nowrap;
  box-shadow: ${s.shadowX}px ${s.shadowY}px ${s.shadowBlur}px ${s.shadowColor};
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.component-demo .tooltip-bubble::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: ${s.bg};
}

.component-demo:hover .tooltip-bubble {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}`
  }

  if (s.kind === 'alert') {
    return `.component-demo {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: ${s.bg};
  color: ${s.textColor};
  border-radius: ${s.borderRadius}px;
  border-left: 4px solid ${s.borderColor};
  padding: ${s.padding}px;
  font-size: ${s.fontSize}px;
  box-shadow: ${s.shadowX}px ${s.shadowY}px ${s.shadowBlur}px ${s.shadowColor};
}

.component-demo .alert-title {
  font-weight: ${s.fontWeight};
}`
  }

  return lines.join('\n')
}

export function componentPreviewStyle(s: ComponentState): Record<string, string> {
  const st: Record<string, string> = {
    background: s.useGradient
      ? `linear-gradient(${s.gradientAngle}deg, ${s.gradientFrom}, ${s.gradientTo})`
      : s.bg,
    color: s.textColor,
    'border-radius': `${s.borderRadius}px`,
    padding: `${s.padding}px ${s.padding * 1.5}px`,
    'font-size': `${s.fontSize}px`,
    'font-weight': String(s.fontWeight),
    'box-shadow': s.useGlow
      ? `0 0 ${s.glowBlur}px ${s.glowColor}, ${s.shadowX}px ${s.shadowY}px ${s.shadowBlur}px ${s.shadowColor}`
      : `${s.shadowX}px ${s.shadowY}px ${s.shadowBlur}px ${s.shadowColor}`
  }
  if (s.kind === 'card' && s.useGlass) {
    st['backdrop-filter'] = `blur(${s.glassBlur}px) saturate(160%)`
    st['-webkit-backdrop-filter'] = `blur(${s.glassBlur}px) saturate(160%)`
  }
  if (s.borderWidth > 0) st['border'] = `${s.borderWidth}px solid ${s.borderColor}`
  return st
}

export function componentVars(s: ComponentState): Record<string, string> {
  return {
    '--comp-bg': s.bg,
    '--comp-text': s.textColor,
    '--comp-radius': `${s.borderRadius}px`,
    '--comp-padding': `${s.padding}px`
  }
}

export function componentHtml(s: ComponentState): string {
  switch (s.kind) {
    case 'button': return `<button class="component-demo">Click Me</button>`
    case 'card': return `<div class="component-demo">\n  <h3>Card Title</h3>\n  <p>Card content goes here.</p>\n</div>`
    case 'input': return `<input class="component-demo" placeholder="Type here..." />`
    case 'badge': return `<span class="component-demo">New</span>`
    case 'navbar': return `<nav class="component-demo">Home  About  Contact</nav>`
    case 'hero': return `<section class="component-demo">\n  <h1>Hero Title</h1>\n  <p>Subtitle text</p>\n</section>`
    case 'checkbox': return `<input type="checkbox" class="component-demo" checked />`
    case 'switch': return `<button type="button" role="switch" aria-checked="true" class="component-demo"></button>`
    case 'tooltip': return `<span class="component-demo">\n  Hover me\n  <span class="tooltip-bubble">Tooltip text</span>\n</span>`
    case 'alert': return `<div class="component-demo">\n  <div>\n    <div class="alert-title">Heads up</div>\n    <div>Something needs your attention.</div>\n  </div>\n</div>`
  }
}

export function randomizeComponent(s: ComponentState, rng: import('../rng').Rng): ComponentState {
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    bg: `hsl(${h} 80% 50%)`,
    gradientFrom: `hsl(${h} 90% 50%)`,
    gradientTo: `hsl(${(h + 80) % 360} 90% 55%)`,
    borderRadius: Math.round(rng.range(0, 24)),
    shadowX: 0,
    shadowY: Math.round(rng.range(4, 24)),
    shadowBlur: Math.round(rng.range(12, 48)),
    glowColor: `hsl(${h} 90% 55%)`,
    glowBlur: Math.round(rng.range(12, 32)),
    useGlow: rng.chance(0.3),
    useGradient: rng.chance(0.6)
  }
}

export const PRESETS_COMPONENT: { name: string; tags: string[]; state: ComponentState }[] = [
  {
    name: 'Emerald Button',
    tags: ['button', 'brand'],
    state: { ...DEFAULT_COMPONENT, kind: 'button' }
  },
  {
    name: 'Gradient Card',
    tags: ['card', 'gradient'],
    state: { ...DEFAULT_COMPONENT, kind: 'card', useGradient: true, gradientFrom: '#8b5cf6', gradientTo: '#ec4899', borderRadius: 20, padding: 24, textColor: '#ffffff', fontSize: 16 }
  },
  {
    name: 'Glass Input',
    tags: ['input', 'soft'],
    state: { ...DEFAULT_COMPONENT, kind: 'input', bg: '#ffffff20', textColor: '#f4f4f5', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#ffffff30', shadowBlur: 0, shadowY: 0, useGradient: false, fontSize: 14, fontWeight: 400 }
  },
  {
    name: 'Glow Badge',
    tags: ['badge', 'glow'],
    state: { ...DEFAULT_COMPONENT, kind: 'badge', bg: '#f59e0b', textColor: '#18181b', borderRadius: 999, padding: 6, fontSize: 12, fontWeight: 700, useGlow: true, glowColor: '#f59e0b', glowBlur: 16, useGradient: false }
  },
  {
    name: 'Dark Navbar',
    tags: ['navbar', 'dark'],
    state: { ...DEFAULT_COMPONENT, kind: 'navbar', bg: '#18181b', textColor: '#f4f4f5', borderRadius: 0, padding: 16, fontSize: 14, fontWeight: 500, useGradient: false, shadowY: 4, shadowBlur: 12, shadowColor: '#00000066' }
  },
  {
    name: 'Hero Gradient',
    tags: ['hero', 'gradient'],
    state: { ...DEFAULT_COMPONENT, kind: 'hero', useGradient: true, gradientFrom: '#0ea5e9', gradientTo: '#8b5cf6', borderRadius: 24, padding: 48, textColor: '#ffffff', fontSize: 28, fontWeight: 700 }
  },
  {
    name: 'Neon Button',
    tags: ['button', 'glow'],
    state: { ...DEFAULT_COMPONENT, kind: 'button', bg: '#09090b', textColor: '#34d399', borderRadius: 12, borderWidth: 2, borderColor: '#34d399', useGlow: true, glowColor: '#34d399', glowBlur: 24, useGradient: false }
  },
  {
    name: 'Soft Card',
    tags: ['card', 'soft'],
    state: { ...DEFAULT_COMPONENT, kind: 'card', bg: '#f8f6f0', textColor: '#18181b', borderRadius: 16, padding: 24, shadowY: 8, shadowBlur: 24, shadowColor: '#0000001a', useGradient: false, fontSize: 16 }
  },
  {
    name: 'Pill Button',
    tags: ['button'],
    state: { ...DEFAULT_COMPONENT, kind: 'button', bg: '#a78bfa', textColor: '#ffffff', borderRadius: 999, padding: 14, useGradient: false }
  },
  {
    name: 'Outlined Input',
    tags: ['input'],
    state: { ...DEFAULT_COMPONENT, kind: 'input', bg: 'transparent', textColor: '#18181b', borderRadius: 8, padding: 12, borderWidth: 2, borderColor: '#10b981', useGradient: false, shadowBlur: 0, shadowY: 0, fontSize: 14, fontWeight: 400 }
  },
  {
    name: 'Gradient Navbar',
    tags: ['navbar', 'gradient'],
    state: { ...DEFAULT_COMPONENT, kind: 'navbar', useGradient: true, gradientFrom: '#1e293b', gradientTo: '#0f172a', textColor: '#e2e8f0', borderRadius: 0, padding: 14, fontSize: 14, fontWeight: 500 }
  },
  {
    name: 'Warm Hero',
    tags: ['hero', 'warm'],
    state: { ...DEFAULT_COMPONENT, kind: 'hero', useGradient: true, gradientFrom: '#f97316', gradientTo: '#dc2626', borderRadius: 20, padding: 40, textColor: '#ffffff', fontSize: 26, fontWeight: 700 }
  },
  {
    name: 'Emerald Checkbox',
    tags: ['checkbox', 'brand'],
    state: { ...DEFAULT_COMPONENT, kind: 'checkbox', bg: '#10b981', borderColor: '#52525b', borderWidth: 2, borderRadius: 6, padding: 10, textColor: '#ffffff', useGradient: false }
  },
  {
    name: 'Dark Switch',
    tags: ['switch', 'dark'],
    state: { ...DEFAULT_COMPONENT, kind: 'switch', bg: '#10b981', borderColor: '#3f3f46', padding: 12, shadowY: 1, shadowBlur: 3, shadowColor: '#00000040', useGradient: false }
  },
  {
    name: 'Simple Tooltip',
    tags: ['tooltip'],
    state: { ...DEFAULT_COMPONENT, kind: 'tooltip', bg: '#18181b', textColor: '#f4f4f5', borderRadius: 6, padding: 8, fontSize: 12, fontWeight: 500, shadowY: 4, shadowBlur: 12, shadowColor: '#00000040', useGradient: false }
  },
  {
    name: 'Warning Alert',
    tags: ['alert', 'warm'],
    state: { ...DEFAULT_COMPONENT, kind: 'alert', bg: '#451a0333', textColor: '#fbbf24', borderColor: '#f59e0b', borderRadius: 10, padding: 14, fontSize: 14, fontWeight: 500, shadowBlur: 0, shadowY: 0, useGradient: false }
  },
  {
    name: 'Success Alert',
    tags: ['alert', 'brand'],
    state: { ...DEFAULT_COMPONENT, kind: 'alert', bg: '#052e1a33', textColor: '#34d399', borderColor: '#10b981', borderRadius: 10, padding: 14, fontSize: 14, fontWeight: 500, shadowBlur: 0, shadowY: 0, useGradient: false }
  },
  {
    name: 'Rose Switch',
    tags: ['switch', 'warm'],
    state: { ...DEFAULT_COMPONENT, kind: 'switch', bg: '#f43f5e', borderColor: '#3f3f46', padding: 12, shadowY: 1, shadowBlur: 3, shadowColor: '#00000040', useGradient: false }
  },
  {
    name: 'Outlined Checkbox',
    tags: ['checkbox'],
    state: { ...DEFAULT_COMPONENT, kind: 'checkbox', bg: 'transparent', borderColor: '#8b5cf6', borderWidth: 2, borderRadius: 4, padding: 10, textColor: '#8b5cf6', useGradient: false }
  },
  {
    name: 'Glass Card',
    tags: ['card', 'glass'],
    state: {
      ...DEFAULT_COMPONENT,
      kind: 'card',
      useGradient: false,
      bg: '#ffffff14',
      textColor: '#f4f4f5',
      borderRadius: 20,
      padding: 24,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#ffffff26',
      shadowX: 0,
      shadowY: 20,
      shadowBlur: 40,
      shadowColor: '#00000055',
      useGlass: true,
      glassBlur: 18
    }
  },
  {
    name: 'Frosted Dark Card',
    tags: ['card', 'glass', 'dark'],
    state: {
      ...DEFAULT_COMPONENT,
      kind: 'card',
      useGradient: false,
      bg: '#09090b40',
      textColor: '#e4e4e7',
      borderRadius: 16,
      padding: 20,
      fontSize: 15,
      borderWidth: 1,
      borderColor: '#ffffff1a',
      shadowX: 0,
      shadowY: 12,
      shadowBlur: 32,
      shadowColor: '#00000066',
      useGlass: true,
      glassBlur: 12
    }
  }
]