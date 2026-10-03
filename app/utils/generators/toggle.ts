export type ToggleKind = 'switch' | 'checkbox' | 'radio' | 'skeleton'

export interface ToggleState {
  kind: ToggleKind
  accent: string
  offTrack: string
  knob: string
  width: number
  height: number
  radius: number
  glow: boolean
}

export const TOGGLE_KINDS: { value: ToggleKind; label: string }[] = [
  { value: 'switch', label: 'Switch' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'radio', label: 'Radio' },
  { value: 'skeleton', label: 'Skeleton Loader' }
]

export const DEFAULT_TOGGLE: ToggleState = {
  kind: 'switch',
  accent: '#10b981',
  offTrack: '#3f3f46',
  knob: '#fafafa',
  width: 44,
  height: 24,
  radius: 999,
  glow: false
}

export function toggleCss(s: ToggleState): string {
  switch (s.kind) {
    case 'switch':
      return `.toggle-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.toggle-track {
  position: relative;
  display: inline-block;
  width: ${s.width}px;
  height: ${s.height}px;
  border-radius: ${s.radius}px;
  background: ${s.offTrack};
  cursor: pointer;
  transition: background-color 200ms ease;
}

.toggle-track::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: ${s.height - 6}px;
  height: ${s.height - 6}px;
  border-radius: ${s.radius}px;
  background: ${s.knob};
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle-input:checked + .toggle-track {
  background: ${s.accent};
${s.glow ? `  box-shadow: 0 0 12px ${s.accent}66;` : ''}
}

.toggle-input:checked + .toggle-track::after {
  transform: translateX(${s.width - s.height}px);
}

.toggle-input:focus-visible + .toggle-track {
  outline: 2px solid ${s.accent};
  outline-offset: 2px;
}`
    case 'checkbox':
      return `.toggle-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.toggle-box {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${s.width > 40 ? 22 : s.width}px;
  height: ${s.width > 40 ? 22 : s.width}px;
  border-radius: ${Math.min(s.radius, 8)}px;
  border: 2px solid ${s.offTrack};
  background: transparent;
  cursor: pointer;
  transition:
    background-color 180ms ease,
    border-color 180ms ease;
}

.toggle-box::after {
  content: '';
  width: 5px;
  height: 10px;
  border: solid ${s.knob};
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) scale(0);
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle-input:checked + .toggle-box {
  background: ${s.accent};
  border-color: ${s.accent};
${s.glow ? `  box-shadow: 0 0 10px ${s.accent}55;` : ''}
}

.toggle-input:checked + .toggle-box::after {
  transform: rotate(45deg) scale(1);
}

.toggle-input:focus-visible + .toggle-box {
  outline: 2px solid ${s.accent};
  outline-offset: 2px;
}`
    case 'radio':
      return `.toggle-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.toggle-radio {
  display: inline-block;
  width: ${s.width > 40 ? 20 : s.width}px;
  height: ${s.width > 40 ? 20 : s.width}px;
  border-radius: 999px;
  border: 2px solid ${s.offTrack};
  background: transparent;
  cursor: pointer;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.toggle-input:checked + .toggle-radio {
  border-color: ${s.accent};
  border-width: ${Math.max(5, Math.round((s.width > 40 ? 20 : s.width) / 4))}px;
  background: ${s.knob};
${s.glow ? `  box-shadow: 0 0 10px ${s.accent}55;` : ''}
}

.toggle-input:focus-visible + .toggle-radio {
  outline: 2px solid ${s.accent};
  outline-offset: 2px;
}`
    case 'skeleton':
      return `.skeleton {
  border-radius: ${s.radius}px;
  background:
    linear-gradient(90deg, ${s.offTrack} 25%, ${s.accent}22 50%, ${s.offTrack} 75%);
  background-size: 200% 100%;
  animation: skeleton-wave 1.4s ease-in-out infinite;
}

@keyframes skeleton-wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-text {
  height: ${s.height}px;
  margin-bottom: 8px;
}

.skeleton-text:last-child {
  width: 60%;
}`
  }
}

export function toggleHtml(s: ToggleState): string {
  switch (s.kind) {
    case 'switch':
      return `<label>
  <input class="toggle-input" type="checkbox" />
  <span class="toggle-track"></span>
</label>`
    case 'checkbox':
      return `<label>
  <input class="toggle-input" type="checkbox" />
  <span class="toggle-box"></span>
</label>`
    case 'radio':
      return `<label>
  <input class="toggle-input" type="radio" name="group" />
  <span class="toggle-radio"></span>
</label>`
    case 'skeleton':
      return `<div class="skeleton skeleton-text" style="width: 80%"></div>
<div class="skeleton skeleton-text" style="width: 100%"></div>
<div class="skeleton skeleton-text" style="width: 60%"></div>`
  }
}

export function toggleVars(s: ToggleState): Record<string, string> {
  return { '--toggle-accent': s.accent, '--toggle-off': s.offTrack, '--toggle-knob': s.knob }
}

export function randomizeToggle(s: ToggleState, rng: import('../rng').Rng): ToggleState {
  const kinds = TOGGLE_KINDS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    kind: rng.pick(kinds),
    accent: `hsl(${h} 80% 55%)`,
    offTrack: `hsl(${h} 10% 28%)`,
    knob: `hsl(${h} 20% 97%)`,
    width: Math.round(rng.range(36, 56)),
    height: Math.round(rng.range(20, 28)),
    glow: rng.chance(0.4)
  }
}

export const PRESETS_TOGGLE: { name: string; tags: string[]; state: ToggleState }[] = [
  { name: 'Emerald Switch', tags: ['brand'], state: { ...DEFAULT_TOGGLE } },
  { name: 'iOS Classic', tags: ['mobile'], state: { ...DEFAULT_TOGGLE, width: 51, height: 31, knob: '#ffffff', offTrack: '#d4d4d8' } },
  { name: 'Neon Switch', tags: ['glow', 'neon'], state: { ...DEFAULT_TOGGLE, accent: '#22d3ee', offTrack: '#164e63', glow: true, width: 50 } },
  { name: 'Violet Check', tags: ['checkbox', 'brand'], state: { ...DEFAULT_TOGGLE, kind: 'checkbox', accent: '#8b5cf6', offTrack: '#52525b', glow: true } },
  { name: 'Amber Radio', tags: ['radio', 'warm'], state: { ...DEFAULT_TOGGLE, kind: 'radio', accent: '#f59e0b', offTrack: '#78716c' } },
  { name: 'Square Minimal', tags: ['minimal'], state: { ...DEFAULT_TOGGLE, kind: 'checkbox', accent: '#fafafa', offTrack: '#52525b', knob: '#09090b', radius: 4 } },
  { name: 'Skeleton Wave', tags: ['loader', 'skeleton'], state: { ...DEFAULT_TOGGLE, kind: 'skeleton', accent: '#3f3f46', offTrack: '#27272a', radius: 8 } },
  { name: 'Rose Pill', tags: ['warm'], state: { ...DEFAULT_TOGGLE, accent: '#f43f5e', offTrack: '#500724', width: 48, glow: true } },
  { name: 'Light Track', tags: ['light'], state: { ...DEFAULT_TOGGLE, offTrack: '#e4e4e7', knob: '#fafafa', accent: '#10b981' } },
  { name: 'Compact Square', tags: ['minimal'], state: { ...DEFAULT_TOGGLE, width: 36, height: 20, radius: 6 } }
]