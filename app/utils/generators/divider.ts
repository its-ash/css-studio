export type DividerKind = 'solid' | 'dashed' | 'dotted' | 'gradient-fade' | 'zigzag' | 'double' | 'gradient-glow'

export interface DividerState {
  kind: DividerKind
  color: string
  thickness: number
  width: number
  zigzagSize: number
}

export const DIVIDER_KINDS: { value: DividerKind; label: string }[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'gradient-fade', label: 'Gradient Fade' },
  { value: 'gradient-glow', label: 'Gradient Glow' },
  { value: 'double', label: 'Double Line' },
  { value: 'zigzag', label: 'Zigzag' }
]

export const DEFAULT_DIVIDER: DividerState = {
  kind: 'gradient-fade',
  color: '#10b981',
  thickness: 2,
  width: 320,
  zigzagSize: 12
}

export function dividerCss(s: DividerState): string {
  switch (s.kind) {
    case 'solid':
      return `.divider {
  width: ${s.width}px;
  height: ${s.thickness}px;
  background: ${s.color};
}`
    case 'dashed':
      return `.divider {
  width: ${s.width}px;
  border-top: ${s.thickness}px dashed ${s.color};
}`
    case 'dotted':
      return `.divider {
  width: ${s.width}px;
  border-top: ${s.thickness}px dotted ${s.color};
}`
    case 'gradient-fade':
      return `.divider {
  width: ${s.width}px;
  height: ${s.thickness}px;
  background: linear-gradient(90deg, transparent, ${s.color}, transparent);
}`
    case 'gradient-glow':
      return `.divider {
  width: ${s.width}px;
  height: ${s.thickness}px;
  background: linear-gradient(90deg, transparent, ${s.color}, transparent);
  box-shadow: 0 0 ${s.thickness * 4}px ${s.color};
}`
    case 'double':
      return `.divider {
  width: ${s.width}px;
  height: ${s.thickness * 3}px;
  border-top: ${s.thickness}px solid ${s.color};
  border-bottom: ${s.thickness}px solid ${s.color};
}`
    case 'zigzag':
      return `.divider {
  width: ${s.width}px;
  height: ${s.zigzagSize}px;
  background: linear-gradient(135deg, ${s.color} 25%, transparent 25%) 0 0,
    linear-gradient(225deg, ${s.color} 25%, transparent 25%) 0 0;
  background-size: ${s.zigzagSize}px ${s.zigzagSize}px;
  background-repeat: repeat-x;
}`
  }
}

export function dividerHtml(): string {
  return `<hr class="divider" />`
}

export function dividerVars(s: DividerState): Record<string, string> {
  return { '--divider-color': s.color, '--divider-thickness': `${s.thickness}px`, '--divider-width': `${s.width}px` }
}

export function dividerPreviewStyle(s: DividerState): Record<string, string> {
  switch (s.kind) {
    case 'solid':
      return { width: `${s.width}px`, height: `${s.thickness}px`, background: s.color }
    case 'dashed':
      return { width: `${s.width}px`, borderTop: `${s.thickness}px dashed ${s.color}` }
    case 'dotted':
      return { width: `${s.width}px`, borderTop: `${s.thickness}px dotted ${s.color}` }
    case 'gradient-fade':
      return { width: `${s.width}px`, height: `${s.thickness}px`, background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }
    case 'gradient-glow':
      return {
        width: `${s.width}px`,
        height: `${s.thickness}px`,
        background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
        boxShadow: `0 0 ${s.thickness * 4}px ${s.color}`
      }
    case 'double':
      return { width: `${s.width}px`, height: `${s.thickness * 3}px`, borderTop: `${s.thickness}px solid ${s.color}`, borderBottom: `${s.thickness}px solid ${s.color}` }
    case 'zigzag':
      return {
        width: `${s.width}px`,
        height: `${s.zigzagSize}px`,
        backgroundImage: `linear-gradient(135deg, ${s.color} 25%, transparent 25%), linear-gradient(225deg, ${s.color} 25%, transparent 25%)`,
        backgroundSize: `${s.zigzagSize}px ${s.zigzagSize}px`,
        backgroundRepeat: 'repeat-x'
      }
  }
}

export function randomizeDivider(s: DividerState, rng: import('../rng').Rng): DividerState {
  const kinds = DIVIDER_KINDS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    kind: rng.pick(kinds),
    color: `hsl(${h} 80% 55%)`,
    thickness: Math.round(rng.range(1, 4)),
    width: Math.round(rng.range(200, 400))
  }
}

export const PRESETS_DIVIDER: { name: string; tags: string[]; state: DividerState }[] = [
  { name: 'Emerald Fade', tags: ['brand'], state: { ...DEFAULT_DIVIDER } },
  { name: 'Glow Line', tags: ['glow'], state: { ...DEFAULT_DIVIDER, kind: 'gradient-glow', color: '#06b6d4' } },
  { name: 'Simple Dash', tags: ['minimal'], state: { ...DEFAULT_DIVIDER, kind: 'dashed', color: '#71717a' } },
  { name: 'Dotted Line', tags: ['minimal'], state: { ...DEFAULT_DIVIDER, kind: 'dotted', color: '#a1a1aa' } },
  { name: 'Rose Zigzag', tags: ['playful'], state: { ...DEFAULT_DIVIDER, kind: 'zigzag', color: '#f43f5e', zigzagSize: 14 } },
  { name: 'Classic Double', tags: ['formal'], state: { ...DEFAULT_DIVIDER, kind: 'double', color: '#18181b', thickness: 1 } },
  { name: 'Violet Glow', tags: ['glow', 'brand'], state: { ...DEFAULT_DIVIDER, kind: 'gradient-glow', color: '#8b5cf6', thickness: 3 } },
  { name: 'Amber Fade', tags: ['warm'], state: { ...DEFAULT_DIVIDER, kind: 'gradient-fade', color: '#f59e0b' } }
]
