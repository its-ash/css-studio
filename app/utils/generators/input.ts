export type InputSkin = 'outline' | 'underline' | 'floating' | 'glow' | 'filled'

export interface InputState {
  skin: InputSkin
  accent: string
  bg: string
  textColor: string
  borderColor: string
  radius: number
  width: number
  fontSize: number
  label: string
  placeholder: string
}

export const INPUT_SKINS: { value: InputSkin; label: string }[] = [
  { value: 'outline', label: 'Outline' },
  { value: 'underline', label: 'Underline' },
  { value: 'floating', label: 'Floating Label' },
  { value: 'glow', label: 'Glow Focus' },
  { value: 'filled', label: 'Filled' }
]

export const DEFAULT_INPUT: InputState = {
  skin: 'outline',
  accent: '#10b981',
  bg: '#09090b',
  textColor: '#fafafa',
  borderColor: '#3f3f46',
  radius: 10,
  width: 260,
  fontSize: 14,
  label: 'Email',
  placeholder: 'you@example.com'
}

export function inputCss(s: InputState): string {
  const shared = `.input-field {
  width: ${s.width}px;
  font-size: ${s.fontSize}px;
  color: ${s.textColor};
  background: ${s.skin === 'filled' ? s.borderColor : s.bg};
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    outline 180ms ease;
}`

  switch (s.skin) {
    case 'outline':
      return `${shared}
  padding: 10px 14px;
  border: 1px solid ${s.borderColor};
  border-radius: ${s.radius}px;
  outline: none;
}

.input-field::placeholder {
  color: ${s.borderColor};
}

.input-field:focus {
  border-color: ${s.accent};
  box-shadow: 0 0 0 3px ${s.accent}33;
}`
    case 'underline':
      return `${shared}
  padding: 10px 2px;
  border: none;
  border-bottom: 2px solid ${s.borderColor};
  border-radius: 0;
  outline: none;
}

.input-field::placeholder {
  color: ${s.borderColor};
}

.input-field:focus {
  border-bottom-color: ${s.accent};
  box-shadow: 0 1px 0 0 ${s.accent};
}`
    case 'floating':
      return `${shared}
  padding: 22px 14px 8px;
  border: 1px solid ${s.borderColor};
  border-radius: ${s.radius}px;
  outline: none;
}

.input-wrap {
  position: relative;
  width: ${s.width}px;
}

.input-label {
  position: absolute;
  left: 14px;
  top: 15px;
  font-size: ${s.fontSize}px;
  color: ${s.borderColor};
  pointer-events: none;
  transition: all 160ms ease;
}

.input-field:focus {
  border-color: ${s.accent};
}

.input-field:focus ~ .input-label,
.input-field:not(:placeholder-shown) ~ .input-label {
  top: 6px;
  font-size: ${Math.max(10, s.fontSize - 4)}px;
  color: ${s.accent};
}`
    case 'glow':
      return `${shared}
  padding: 10px 14px;
  border: 1px solid ${s.borderColor};
  border-radius: ${s.radius}px;
  outline: none;
}

.input-field::placeholder {
  color: ${s.borderColor};
}

.input-field:focus {
  border-color: ${s.accent};
  box-shadow: 0 0 0 3px ${s.accent}33, 0 0 18px ${s.accent}44;
  caret-color: ${s.accent};
}`
    case 'filled':
      return `${shared}
  padding: 10px 14px;
  border: none;
  border-radius: ${s.radius}px;
  outline: none;
}

.input-field::placeholder {
  color: ${s.textColor};
  opacity: 0.45;
}

.input-field:focus {
  box-shadow: inset 0 0 0 2px ${s.accent};
}`
  }
}

export function inputHtml(s: InputState): string {
  if (s.skin === 'floating') {
    return `<div class="input-wrap">
  <input class="input-field" type="text" placeholder=" " />
  <span class="input-label">${s.label}</span>
</div>`
  }
  return `<input class="input-field" type="text" placeholder="${s.placeholder}" />`
}

export function inputVars(s: InputState): Record<string, string> {
  return { '--input-accent': s.accent, '--input-border': s.borderColor, '--input-bg': s.bg }
}

export function randomizeInput(s: InputState, rng: import('../rng').Rng): InputState {
  const skins = INPUT_SKINS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    skin: rng.pick(skins),
    accent: `hsl(${h} 80% 55%)`,
    borderColor: `hsl(${h} 8% 32%)`,
    radius: rng.pick([0, 8, 10, 16, 999]),
    width: Math.round(rng.range(200, 320)),
    fontSize: Math.round(rng.range(13, 17))
  }
}

export const PRESETS_INPUT: { name: string; tags: string[]; state: InputState }[] = [
  { name: 'Emerald Outline', tags: ['brand'], state: { ...DEFAULT_INPUT } },
  { name: 'Underline Ink', tags: ['minimal', 'editorial'], state: { ...DEFAULT_INPUT, skin: 'underline', radius: 0, borderColor: '#52525b' } },
  { name: 'Floating Email', tags: ['form', 'floating'], state: { ...DEFAULT_INPUT, skin: 'floating', label: 'Email address' } },
  { name: 'Neon Glow', tags: ['glow', 'neon'], state: { ...DEFAULT_INPUT, skin: 'glow', accent: '#22d3ee', borderColor: '#164e63' } },
  { name: 'Filled Soft', tags: ['filled', 'soft'], state: { ...DEFAULT_INPUT, skin: 'filled', bg: '#27272a', borderColor: '#3f3f46', radius: 12 } },
  { name: 'Pill Search', tags: ['search'], state: { ...DEFAULT_INPUT, placeholder: 'Search…', radius: 999, width: 300 } },
  { name: 'Light Outline', tags: ['light'], state: { ...DEFAULT_INPUT, bg: '#fafafa', textColor: '#18181b', borderColor: '#d4d4d8' } },
  { name: 'Rose Focus', tags: ['warm'], state: { ...DEFAULT_INPUT, accent: '#f43f5e', borderColor: '#52525b' } },
  { name: 'Square Sharp', tags: ['mono'], state: { ...DEFAULT_INPUT, radius: 0, borderColor: '#71717a' } },
  { name: 'Violet Floating', tags: ['floating', 'brand'], state: { ...DEFAULT_INPUT, skin: 'floating', accent: '#8b5cf6', label: 'Username', placeholder: ' ' } }
]