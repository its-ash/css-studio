import { readableInk } from '../colors'

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
  /** Leading icon shown inside the field, or 'none'. */
  icon: string
  /** Error (invalid) styling driven by :user-invalid. */
  error: boolean
  /** Animated underline sweeps in under the field on focus. */
  underlineSweep: boolean
}

export const INPUT_SKINS: { value: InputSkin; label: string }[] = [
  { value: 'outline', label: 'Outline' },
  { value: 'underline', label: 'Underline' },
  { value: 'floating', label: 'Floating Label' },
  { value: 'glow', label: 'Glow Focus' },
  { value: 'filled', label: 'Filled' }
]

export const INPUT_ICONS = ['none', 'mail', 'search', 'user', 'lock'] as const
export type InputIcon = (typeof INPUT_ICONS)[number]

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
  placeholder: 'you@example.com',
  icon: 'none',
  error: false,
  underlineSweep: true
}

export function inputCss(s: InputState): string {
  const hasIcon = s.icon !== 'none'
  const padX = 12
  const padY = 10
  const iconPad = 34
  const iconLeft = padX - 2

  const shell = `.input-field {
  width: ${s.width}px;
  font-size: ${s.fontSize}px;
  color: ${s.textColor};
  background: ${s.skin === 'filled' ? s.borderColor : s.bg};
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    color 180ms ease;`

  const errorRules = s.error
    ? `
.input-field:user-invalid,
.input-field:not(:placeholder-shown):invalid {
  border-color: #f43f5e;
}
.input-field:user-invalid::placeholder,
.input-field:not(:placeholder-shown):invalid::placeholder {
  color: #fb7185;
}
.input-field:user-invalid:focus,
.input-field:not(:placeholder-shown):invalid:focus {
  box-shadow: 0 0 0 3px #f43f5e33;
}
.input-field:user-invalid:not(:focus),
.input-field:not(:placeholder-shown):invalid:not(:focus) {
  animation: input-shake 300ms ease;
}
.input-error {
  display: none;
  margin-top: 5px;
  font-size: ${Math.max(11, s.fontSize - 3)}px;
  color: #fb7185;
}
.input-hint {
  margin-top: 5px;
  font-size: ${Math.max(11, s.fontSize - 3)}px;
  color: ${s.borderColor};
}
.input-wrap.invalid .input-error,
.input-wrap.invalid .input-hint {
  display: block;
}
@keyframes input-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-2px); }
}
@media (prefers-reduced-motion: reduce) {
  .input-field:user-invalid:not(:focus),
  .input-field:not(:placeholder-shown):invalid:not(:focus) {
    animation: none;
  }
}`
    : ''

  switch (s.skin) {
    case 'outline':
      return `${shell}
  padding: ${padY}px ${padX}px;
  border: 1px solid ${s.borderColor};
  border-radius: ${s.radius}px;${hasIcon ? `\n  padding-left: ${iconPad}px;` : ''}
}
.input-field::placeholder {
  color: ${s.borderColor};
  transition: color 180ms ease;
}
.input-field:focus::placeholder {
  color: ${s.accent}99;
}
.input-field:focus {
  outline: none;
  border-color: ${s.accent};
  box-shadow: 0 0 0 3px ${s.accent}33;
}
.input-field:hover:not(:focus) {
  border-color: ${s.borderColor};
  filter: brightness(1.15);
}${hasIcon ? `\n${iconLayer(s, iconLeft)}` : ''}${errorRules}`
    case 'underline':
      return `${shell}
  padding: ${padY}px 2px;
  border: none;
  border-bottom: 2px solid ${s.borderColor};
  border-radius: 0;${hasIcon ? `\n  padding-left: ${iconPad - 2}px;` : ''}
}
.input-field::placeholder {
  color: ${s.borderColor};
  transition: color 180ms ease;
}
.input-field:focus::placeholder {
  color: ${s.accent}99;
}
.input-field:focus {
  outline: none;
  border-bottom-color: ${s.accent};
  box-shadow: 0 1px 0 0 ${s.accent};
}
.input-field:hover:not(:focus) {
  border-color: ${s.borderColor};
  filter: brightness(1.15);
}
${
  s.underlineSweep
    ? `.input-wrap {
  position: relative;
  width: ${s.width}px;
}
.input-wrap::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: ${s.accent};
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.input-field:focus ~ .input-sweep,
.input-wrap:focus-within::after {
  transform: scaleX(1);
}`
    : ''
}${hasIcon ? `\n${iconLayer(s, iconLeft)}` : ''}${errorRules}`
    case 'floating':
      return `${shell}
  padding: 22px ${padX}px 8px;
  border: 1px solid ${s.borderColor};
  border-radius: ${s.radius}px;${hasIcon ? `\n  padding-left: ${iconPad}px;` : ''}
}
.input-field::placeholder {
  color: ${s.borderColor};
  transition: color 180ms ease;
}
.input-field:focus::placeholder {
  color: ${s.accent}99;
}
.input-field:focus {
  outline: none;
  border-color: ${s.accent};
}
.input-field:hover:not(:focus) {
  border-color: ${s.borderColor};
  filter: brightness(1.15);
}

.input-wrap {
  position: relative;
  width: ${s.width}px;
}

.input-label {
  position: absolute;
  left: ${hasIcon ? iconPad : padX}px;
  top: 15px;
  font-size: ${s.fontSize}px;
  color: ${s.borderColor};
  pointer-events: none;
  transition: all 160ms ease;
}
${hasIcon ? '\n' + iconLayer(s, iconLeft) + '\n' : ''}
.input-field:focus ~ .input-label,
.input-field:not(:placeholder-shown) ~ .input-label {
  top: 6px;
  font-size: ${Math.max(10, s.fontSize - 4)}px;
  color: ${s.accent};
}${errorRules}`
    case 'glow':
      return `${shell}
  padding: ${padY}px ${padX}px;
  border: 1px solid ${s.borderColor};
  border-radius: ${s.radius}px;${hasIcon ? `\n  padding-left: ${iconPad}px;` : ''}
}
.input-field::placeholder {
  color: ${s.borderColor};
  transition: color 180ms ease;
}
.input-field:focus::placeholder {
  color: ${s.accent}99;
}
.input-field:focus {
  outline: none;
  border-color: ${s.accent};
  box-shadow: 0 0 0 3px ${s.accent}33, 0 0 18px ${s.accent}44;
  caret-color: ${s.accent};
}
.input-field:hover:not(:focus) {
  border-color: ${s.borderColor};
  filter: brightness(1.15);
}${hasIcon ? `\n${iconLayer(s, iconLeft)}` : ''}${errorRules}`
    case 'filled':
      return `${shell}
  padding: ${padY}px ${padX}px;
  border: none;
  border-radius: ${s.radius}px;
  outline: none;${hasIcon ? `\n  padding-left: ${iconPad}px;` : ''}
}
.input-field::placeholder {
  color: ${s.textColor};
  opacity: 0.45;
}
.input-field:focus::placeholder {
  color: ${s.accent}99;
}
.input-field:focus {
  outline: none;
  box-shadow: inset 0 0 0 2px ${s.accent};
}

.input-field:hover:not(:focus) {
  background: ${s.borderColor}cc;
  filter: none;
}${hasIcon ? `\n${iconLayer(s, iconLeft)}` : ''}${errorRules}`
  }
}

export function inputHtml(s: InputState): string {
  const hasIcon = s.icon !== 'none'
  const iconTag = hasIcon ? `\n  ${INPUT_ICON_SVG[s.icon as Exclude<InputIcon, 'none'>]}` : ''

  if (s.skin === 'floating') {
    return `<div class="input-wrap">
  <input class="input-field" type="text" placeholder=" " />${iconTag}
  <span class="input-label">${s.label}</span>
</div>`
  }

  if (s.error) {
    const typeEmail = s.icon !== 'search' ? 'email' : 'text'
    const hintTag = s.icon === 'search' ? `\n  <p class="input-hint">Try a topic to explore.</p>` : `\n  <p class="input-error">Enter a valid email address.</p>`
    return `<div class="input-wrap invalid">
  <input class="input-field" type="${typeEmail}" placeholder="${s.placeholder}" required />${iconTag}${hintTag}
</div>`
  }

  if (s.underlineSweep && s.skin === 'underline') {
    return `<div class="input-wrap">
  <input class="input-field" type="${s.icon === 'search' ? 'search' : 'text'}" placeholder="${s.placeholder}" />${iconTag}
  <span class="input-sweep"></span>
</div>`
  }

  if (hasIcon) {
    return `<div class="input-wrap">
  <input class="input-field" type="${s.icon === 'search' ? 'search' : 'text'}" placeholder="${s.placeholder}" />${iconTag}
</div>`
  }

  return `<input class="input-field" type="text" placeholder="${s.placeholder}" />`
}

/** Absolute-positioned inline SVG for icon skins. */
function iconLayer(s: InputState, left: number): string {
  if (s.icon === 'none') return ''
  const needsWrap = s.skin !== 'floating' && !(s.skin === 'underline' && s.underlineSweep)
  return `${needsWrap ? `.input-wrap {
  position: relative;
  width: ${s.width}px;
}
` : ''}.input-icon {
  position: absolute;
  left: ${left}px;
  bottom: 11px;
  width: 14px;
  height: 14px;
  color: ${s.borderColor};
  pointer-events: none;
  transition: color 180ms ease;
}
.input-wrap:focus-within .input-icon {
  color: ${s.accent};
}`
}

/** Inline SVGs for INPUT_ICONS (stroke inherits currentColor). */
export const INPUT_ICON_SVG: Record<Exclude<InputIcon, 'none'>, string> = {
  search: '<svg class="input-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 4 4"/></svg>',
  mail: '<svg class="input-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3.5" width="12" height="9" rx="1.5"/><path d="m2.5 4.5 5.5 4 5.5-4"/></svg>',
  user: '<svg class="input-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="5" r="3"/><path d="M2 14c.8-3 3-4.5 6-4.5s5.2 1.5 6 4.5"/></svg>',
  lock: '<svg class="input-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="7" width="10" height="7" rx="1.5"/><path d="M5.5 7V5.5a2.5 2.5 0 0 1 5 0V7"/></svg>'
}

export function inputVars(s: InputState): Record<string, string> {
  return { '--input-accent': s.accent, '--input-border': s.borderColor, '--input-bg': s.bg }
}

export function randomizeInput(s: InputState, rng: import('../rng').Rng): InputState {
  const skins = INPUT_SKINS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  const accent = `hsl(${h} 80% 55%)`
  return {
    ...s,
    skin: rng.pick(skins),
    accent,
    textColor: readableInk(s.bg),
    borderColor: `hsl(${h} 8% 32%)`,
    radius: rng.pick([0, 8, 10, 16, 999]),
    width: Math.round(rng.range(220, 320)),
    fontSize: Math.round(rng.range(13, 17)),
    icon: rng.pick(INPUT_ICONS),
    error: rng.chance(0.25),
    underlineSweep: rng.chance(0.7)
  }
}

export const PRESETS_INPUT: { name: string; tags: string[]; state: InputState }[] = [
  { name: 'Emerald Outline', tags: ['brand'], state: { ...DEFAULT_INPUT } },
  { name: 'Underline Ink', tags: ['minimal', 'editorial'], state: { ...DEFAULT_INPUT, skin: 'underline', radius: 0, borderColor: '#52525b' } },
  { name: 'Floating Email', tags: ['form', 'floating'], state: { ...DEFAULT_INPUT, skin: 'floating', label: 'Email address' } },
  { name: 'Neon Glow', tags: ['glow', 'neon'], state: { ...DEFAULT_INPUT, skin: 'glow', accent: '#22d3ee', borderColor: '#164e63' } },
  { name: 'Filled Soft', tags: ['filled', 'soft'], state: { ...DEFAULT_INPUT, skin: 'filled', bg: '#27272a', borderColor: '#3f3f46', radius: 12 } },
  { name: 'Pill Search', tags: ['search'], state: { ...DEFAULT_INPUT, placeholder: 'Search…', radius: 999, width: 300, icon: 'search' } },
  { name: 'Light Outline', tags: ['light'], state: { ...DEFAULT_INPUT, bg: '#fafafa', textColor: '#18181b', borderColor: '#d4d4d8' } },
  { name: 'Rose Focus', tags: ['warm'], state: { ...DEFAULT_INPUT, accent: '#f43f5e', borderColor: '#52525b' } },
  { name: 'Square Sharp', tags: ['mono'], state: { ...DEFAULT_INPUT, radius: 0, width: 300, borderColor: '#71717a', skin: 'filled', bg: '#18181b', placeholder: 'v2.4.0' } },
  { name: 'Violet Floating', tags: ['floating', 'brand'], state: { ...DEFAULT_INPUT, skin: 'floating', accent: '#8b5cf6', label: 'Username', placeholder: ' ' } },
  { name: 'Mail Outline', tags: ['icon', 'email'], state: { ...DEFAULT_INPUT, icon: 'mail', radius: 12 } },
  { name: 'Search Underline', tags: ['icon', 'minimal'], state: { ...DEFAULT_INPUT, skin: 'underline', icon: 'search', width: 300, placeholder: 'Search docs…', borderColor: '#52525b' } },
  { name: 'User Field Error', tags: ['icon', 'error'], state: { ...DEFAULT_INPUT, icon: 'user', error: true, label: 'Email', placeholder: 'email@site.com' } },
  { name: 'Error No Mail', tags: ['error', 'form'], state: { ...DEFAULT_INPUT, error: true, borderColor: '#52525b' } },
  { name: 'Password Pill', tags: ['icon', 'lock'], state: { ...DEFAULT_INPUT, icon: 'lock', radius: 999, width: 280, borderColor: '#3f3f46', label: 'Password' } }
]