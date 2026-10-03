export type KbdSkin = 'raised' | 'flat' | 'outline' | 'dark'

export interface KbdState {
  skin: KbdSkin
  accent: string
  bg: string
  textColor: string
  fontSize: number
  radius: number
  depth: number
  chips: string[]
}

export const KBD_SKINS: { value: KbdSkin; label: string }[] = [
  { value: 'raised', label: 'Raised Key' },
  { value: 'flat', label: 'Flat' },
  { value: 'outline', label: 'Outline' },
  { value: 'dark', label: 'Dark Key' }
]

export const DEFAULT_KBD: KbdState = {
  skin: 'raised',
  accent: '#10b981',
  bg: '#27272a',
  textColor: '#fafafa',
  fontSize: 13,
  radius: 6,
  depth: 3,
  chips: ['⌘', 'K']
}

export function kbdCss(s: KbdState): string {
  const skins: Record<KbdSkin, string> = {
    raised: `.kbd {
  border: 1px solid ${s.textColor}22;
  border-bottom-width: ${s.depth + 1}px;
  background: ${s.bg};
}`,
    flat: `.kbd {
  border: none;
  background: ${s.accent}1f;
  color: ${s.accent};
}`,
    outline: `.kbd {
  border: 1.5px solid ${s.textColor}44;
  background: transparent;
}`,
    dark: `.kbd {
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom-width: ${s.depth + 1}px;
  background: linear-gradient(180deg, #3f3f46, #27272a);
}`
  }
  return `${skins[s.skin]}

.kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  padding: 3px 7px;
  border-radius: ${s.radius}px;
  color: ${s.skin === 'flat' ? s.accent : s.textColor};
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: ${s.fontSize}px;
  font-weight: 600;
  line-height: 1.2;
}

.kbd-row {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.kbd-plus {
  color: ${s.textColor}55;
  font-size: ${s.fontSize - 1}px;
}

.code-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 8px;
  border-radius: ${s.radius}px;
  background: ${s.accent}14;
  border: 1px solid ${s.accent}33;
  color: ${s.accent};
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: ${s.fontSize}px;
}`
}

export function kbdHtml(s: KbdState): string {
  const chips = s.chips.map((c) => `<span class="kbd">${c}</span>`).join('<span class="kbd-plus">+</span>')
  return `<div class="kbd-row">
  ${chips}
  <span class="code-chip">.hover-demo:hover</span>
</div>`
}

export function kbdVars(s: KbdState): Record<string, string> {
  return { '--kbd-accent': s.accent, '--kbd-bg': s.bg, '--kbd-fg': s.textColor }
}

export function randomizeKbd(s: KbdState, rng: import('../rng').Rng): KbdState {
  const skins = KBD_SKINS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    skin: rng.pick(skins),
    accent: `hsl(${h} 78% 52%)`,
    bg: `hsl(${h} 10% 14%)`,
    radius: rng.pick([0, 4, 6, 8]),
    depth: rng.pick([2, 3, 4]),
    fontSize: Math.round(rng.range(11, 15))
  }
}

export const PRESETS_KBD: { name: string; tags: string[]; state: KbdState }[] = [
  { name: 'Raised Keys', tags: ['classic'], state: { ...DEFAULT_KBD } },
  { name: 'Dark Keycap', tags: ['dark'], state: { ...DEFAULT_KBD, skin: 'dark' } },
  { name: 'Flat Accent', tags: ['flat', 'brand'], state: { ...DEFAULT_KBD, skin: 'flat', chips: ['⌘', 'K'] } },
  { name: 'Outline Hint', tags: ['minimal'], state: { ...DEFAULT_KBD, skin: 'outline', textColor: '#a1a1aa' } },
  { name: 'Sharp Keys', tags: ['mono'], state: { ...DEFAULT_KBD, radius: 0, depth: 4 } },
  { name: 'Emerald Chip', tags: ['brand'], state: { ...DEFAULT_KBD, accent: '#10b981', chips: ['Ctrl', 'S'] } },
  { name: 'Light Keys', tags: ['light'], state: { ...DEFAULT_KBD, bg: '#f4f4f5', textColor: '#18181b' } },
  { name: 'Violet Flat', tags: ['brand'], state: { ...DEFAULT_KBD, skin: 'flat', accent: '#8b5cf6', fontSize: 12 } }
]