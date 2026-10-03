export type ToastSkin = 'card' | 'snackbar' | 'banner'

export type ToastVariant = 'success' | 'error' | 'info' | 'warning'

export interface ToastState {
  skin: ToastSkin
  variant: ToastVariant
  accent: string
  bg: string
  textColor: string
  radius: number
  duration: number
  showIcon: boolean
  showProgress: boolean
  position: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'
}

export const TOAST_SKINS: { value: ToastSkin; label: string }[] = [
  { value: 'card', label: 'Card' },
  { value: 'snackbar', label: 'Snackbar' },
  { value: 'banner', label: 'Banner' }
]

export const TOAST_VARIANTS: { value: ToastVariant; label: string; color: string; icon: string }[] = [
  { value: 'success', label: 'Success', color: '#10b981', icon: '✓' },
  { value: 'error', label: 'Error', color: '#f43f5e', icon: '✕' },
  { value: 'info', label: 'Info', color: '#0ea5e9', icon: 'ℹ' },
  { value: 'warning', label: 'Warning', color: '#f59e0b', icon: '⚠' }
]

export const DEFAULT_TOAST: ToastState = {
  skin: 'card',
  variant: 'success',
  accent: '#10b981',
  bg: '#18181b',
  textColor: '#fafafa',
  radius: 12,
  duration: 4000,
  showIcon: true,
  showProgress: true,
  position: 'top-right'
}

export function toastCss(s: ToastState): string {
  const v = TOAST_VARIANTS.find((x) => x.value === s.variant)!
  const positions: Record<ToastState['position'], string> = {
    'top-right': 'top: 16px; right: 16px;',
    'top-center': 'top: 16px; left: 50%; transform: translateX(-50%);',
    'bottom-right': 'bottom: 16px; right: 16px;',
    'bottom-center': 'bottom: 16px; left: 50%; transform: translateX(-50%);'
  }
  const skins: Record<ToastSkin, string> = {
    card: `.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: ${s.radius}px;
  border: 1px solid ${s.textColor}1a;
  background: ${s.bg};
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
}`,
    snackbar: `.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-radius: ${Math.min(s.radius, 6)}px;
  background: ${s.textColor};
  color: ${s.bg};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}`,
    banner: `.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 0;
  background: ${v.color}1a;
  border-left: 4px solid ${v.color};
  backdrop-filter: blur(8px);
}`
  }
  const icon = s.showIcon
    ? `.toast-icon {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: ${s.skin === 'snackbar' ? s.accent : `${v.color}22`};
  color: ${v.color};
  font-size: 12px;
  font-weight: 800;
  flex-shrink: 0;
}`
    : ''
  const progress = s.showProgress
    ? `.toast-progress {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  border-radius: 0 0 0 ${s.radius}px;
  background: ${v.color};
  animation: toast-timer ${s.duration}ms linear forwards;
}

@keyframes toast-timer {
  from { width: 100%; }
  to { width: 0%; }
}`
    : ''
  return `${skins[s.skin]}

.toast-stack {
  position: fixed;
  ${positions[s.position]}
  z-index: 9997;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toast {
  position: relative;
  ${s.skin === 'snackbar' ? `color: ${s.bg};` : `color: ${s.textColor};`}
  overflow: hidden;
  animation: toast-in ${Math.min(600, s.duration / 4)}ms cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-title {
  font-size: 14px;
  font-weight: 600;
}

.toast-desc {
  font-size: 12px;
  opacity: 0.7;
}

.toast-close {
  margin-left: auto;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 15px;
  opacity: 0.5;
  transition: opacity 150ms ease;
}

.toast-close:hover {
  opacity: 1;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

${icon}

${progress}`
}

export function toastHtml(s: ToastState): string {
  const v = TOAST_VARIANTS.find((x) => x.value === s.variant)!
  return `<div class="toast-stack">
  <div class="toast" role="status">
    ${s.showIcon ? `<span class="toast-icon">${v.icon}</span>` : ''}
    <div>
      <div class="toast-title">${v.label}</div>
      <div class="toast-desc">Your changes have been saved.</div>
    </div>
    <button class="toast-close" aria-label="Dismiss">✕</button>
    ${s.showProgress ? '<div class="toast-progress"></div>' : ''}
  </div>
</div>`
}

export function toastVars(s: ToastState): Record<string, string> {
  return { '--toast-accent': s.accent, '--toast-bg': s.bg, '--toast-duration': `${s.duration}ms` }
}

export function randomizeToast(s: ToastState, rng: import('../rng').Rng): ToastState {
  const skins = TOAST_SKINS.map((k) => k.value)
  const variants = TOAST_VARIANTS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    skin: rng.pick(skins),
    variant: rng.pick(variants),
    accent: `hsl(${h} 78% 52%)`,
    bg: `hsl(${h} 10% 11%)`,
    radius: rng.pick([0, 6, 12, 16]),
    duration: Math.round(rng.range(2500, 6000)),
    showIcon: rng.chance(0.8),
    showProgress: rng.chance(0.6)
  }
}

export const PRESETS_TOAST: { name: string; tags: string[]; state: ToastState }[] = [
  { name: 'Success Card', tags: ['success'], state: { ...DEFAULT_TOAST } },
  { name: 'Error Alert', tags: ['error'], state: { ...DEFAULT_TOAST, variant: 'error', position: 'top-center' } },
  { name: 'Info Banner', tags: ['banner'], state: { ...DEFAULT_TOAST, skin: 'banner', variant: 'info', radius: 0 } },
  { name: 'Dark Snackbar', tags: ['snackbar'], state: { ...DEFAULT_TOAST, skin: 'snackbar', position: 'bottom-left' as ToastState['position'] } },
  { name: 'Warning Card', tags: ['warning'], state: { ...DEFAULT_TOAST, variant: 'warning', accent: '#f59e0b' } },
  { name: 'Neon Success', tags: ['neon'], state: { ...DEFAULT_TOAST, accent: '#22d3ee', variant: 'success', showProgress: true } },
  { name: 'Minimal Toast', tags: ['minimal'], state: { ...DEFAULT_TOAST, showIcon: false, showProgress: false, radius: 6 } },
  { name: 'Bottom Center', tags: ['mobile'], state: { ...DEFAULT_TOAST, position: 'bottom-center', radius: 999 } }
]