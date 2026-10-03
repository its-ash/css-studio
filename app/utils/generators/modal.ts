import { hslToHex, mixHex, readableInk } from '../colors'
import { photoAlt, photoUrl } from '../demo'

export type ModalKind =
  | 'confirm'
  | 'typeConfirm'
  | 'form'
  | 'signin'
  | 'success'
  | 'promo'
  | 'onboarding'
  | 'upgrade'
  | 'feedback'
  | 'timeout'
  | 'command'
  | 'lightbox'
  | 'share'
  | 'filters'
  | 'cookie'
export type ModalPlacement = 'center' | 'top' | 'bottom' | 'right'
export type ModalSkin = 'solid' | 'elevated' | 'minimal' | 'glass' | 'glow' | 'gradient' | 'outline' | 'brutal'
export type ModalIconStyle = 'soft' | 'ring' | 'solid'
export type ModalFooter = 'inline' | 'bar'

export interface ModalState {
  kind: ModalKind
  placement: ModalPlacement
  skin: ModalSkin
  accent: string
  bg: string
  textColor: string
  overlayColor: string
  overlayOpacity: number
  blur: boolean
  radius: number
  width: number
  duration: number
  scaleFrom: number
  showClose: boolean
  showIcon: boolean
  iconStyle: ModalIconStyle
  footer: ModalFooter
}

export const MODAL_KINDS: { value: ModalKind; label: string; placement: ModalPlacement }[] = [
  { value: 'confirm', label: 'Confirm (destructive)', placement: 'center' },
  { value: 'typeConfirm', label: 'Type to confirm', placement: 'center' },
  { value: 'form', label: 'Form (invite)', placement: 'center' },
  { value: 'signin', label: 'Sign in', placement: 'center' },
  { value: 'success', label: 'Success', placement: 'center' },
  { value: 'promo', label: 'Announcement with image', placement: 'center' },
  { value: 'onboarding', label: 'Onboarding step', placement: 'center' },
  { value: 'upgrade', label: 'Upgrade / pricing', placement: 'center' },
  { value: 'feedback', label: 'Feedback rating', placement: 'center' },
  { value: 'timeout', label: 'Session timeout', placement: 'center' },
  { value: 'command', label: 'Command palette', placement: 'top' },
  { value: 'lightbox', label: 'Image lightbox', placement: 'center' },
  { value: 'share', label: 'Share sheet', placement: 'bottom' },
  { value: 'filters', label: 'Filters drawer', placement: 'right' },
  { value: 'cookie', label: 'Cookie consent', placement: 'bottom' }
]

export const MODAL_PLACEMENTS: { value: ModalPlacement; label: string }[] = [
  { value: 'center', label: 'Centered dialog' },
  { value: 'top', label: 'Top (palette)' },
  { value: 'bottom', label: 'Bottom sheet' },
  { value: 'right', label: 'Side drawer' }
]

export const MODAL_SKINS: { value: ModalSkin; label: string }[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'elevated', label: 'Elevated' },
  { value: 'minimal', label: 'Minimal hairline' },
  { value: 'glass', label: 'Glass' },
  { value: 'glow', label: 'Accent glow' },
  { value: 'gradient', label: 'Gradient border' },
  { value: 'outline', label: 'Outline' },
  { value: 'brutal', label: 'Neo-brutal' }
]

export const MODAL_ICON_STYLES: { value: ModalIconStyle; label: string }[] = [
  { value: 'ring', label: 'Soft ring' },
  { value: 'soft', label: 'Tinted' },
  { value: 'solid', label: 'Solid' }
]

export const MODAL_FOOTERS: { value: ModalFooter; label: string }[] = [
  { value: 'inline', label: 'Inline buttons' },
  { value: 'bar', label: 'Footer bar' }
]

export const DEFAULT_MODAL: ModalState = {
  kind: 'confirm',
  placement: 'center',
  skin: 'solid',
  accent: '#f43f5e',
  bg: '#18181b',
  textColor: '#fafafa',
  overlayColor: '#09090b',
  overlayOpacity: 65,
  blur: true,
  radius: 16,
  width: 420,
  duration: 240,
  scaleFrom: 96,
  showClose: true,
  showIcon: true,
  iconStyle: 'ring',
  footer: 'inline'
}

const HEX = /^#[0-9a-f]{6}$/i
const pick = <T extends string>(v: unknown, list: { value: T }[], fb: T): T => (list.some((o) => o.value === v) ? (v as T) : fb)

/** Maps the old card/sheet/dialog skins and rgba overlay string onto the new model. */
export function normalizeModal(raw: ModalState): ModalState {
  const s: ModalState = { ...DEFAULT_MODAL, ...raw }
  const legacySkin = raw.skin as string
  if (legacySkin === 'sheet') s.placement = 'bottom'
  s.kind = pick(s.kind, MODAL_KINDS, 'confirm')
  s.placement = pick(s.placement, MODAL_PLACEMENTS, 'center')
  s.skin = pick(legacySkin === 'dialog' ? 'outline' : s.skin, MODAL_SKINS, 'solid')
  s.iconStyle = pick(s.iconStyle, MODAL_ICON_STYLES, 'ring')
  s.footer = pick(s.footer, MODAL_FOOTERS, 'inline')
  if (!HEX.test(s.overlayColor)) s.overlayColor = '#09090b'
  if (!HEX.test(s.bg)) s.bg = DEFAULT_MODAL.bg
  if (!HEX.test(s.textColor)) s.textColor = readableInk(s.bg)
  if (!HEX.test(s.accent)) s.accent = DEFAULT_MODAL.accent
  return s
}

const a = (hex: string, alpha: number) => `color-mix(in srgb, ${hex} ${Math.round(alpha * 100)}%, transparent)`

function skinCss(s: ModalState): string {
  const ink = s.textColor
  switch (s.skin) {
    case 'elevated':
      return `  background: ${s.bg};
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.08), 0 8px 24px rgb(0 0 0 / 0.18), 0 32px 80px rgb(0 0 0 / 0.28);`
    case 'glass':
      return `  background: ${a(s.bg, 0.72)};
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  backdrop-filter: blur(20px) saturate(160%);
  box-shadow: inset 0 0 0 1px ${a('#ffffff', 0.14)}, 0 30px 80px rgb(0 0 0 / 0.35);`
    case 'minimal':
      return `  background: ${s.bg};
  box-shadow: inset 0 0 0 1px ${a(ink, 0.14)}, 0 12px 32px rgb(0 0 0 / 0.12);`
    case 'glow':
      return `  background: radial-gradient(120% 70% at 50% 0%, ${a(s.accent, 0.22)}, transparent 60%), ${s.bg};
  box-shadow: inset 0 0 0 1px ${a(s.accent, 0.3)}, 0 30px 90px ${a(s.accent, 0.22)};`
    case 'gradient':
      return `  border: 1.5px solid transparent;
  background:
    linear-gradient(${s.bg}, ${s.bg}) padding-box,
    linear-gradient(135deg, ${s.accent}, ${a(s.accent, 0.1)} 45%, ${mixHex(s.accent, ink, 0.45)}) border-box;
  box-shadow: 0 28px 72px rgb(0 0 0 / 0.35);`
    case 'outline':
      return `  background: ${s.bg};
  box-shadow: inset 0 0 0 1.5px ${a(s.accent, 0.55)}, 0 24px 64px rgb(0 0 0 / 0.3);`
    case 'brutal':
      return `  background: ${s.bg};
  box-shadow: inset 0 0 0 2px ${ink}, 6px 6px 0 ${ink};`
    default:
      return `  background: ${s.bg};
  box-shadow: inset 0 0 0 1px ${a(ink, 0.1)}, 0 24px 64px rgb(0 0 0 / 0.45);`
  }
}

/** Geometry + enter/exit transform per placement; exits mirror entrances. */
function placementCss(s: ModalState, r: number) {
  const from = (s.scaleFrom / 100).toFixed(2)
  switch (s.placement) {
    case 'bottom':
      return {
        box: `  inset: auto 0 0;
  width: 100%;
  max-width: ${Math.max(s.width, 480)}px;
  margin: 0 auto;
  border-radius: ${r}px ${r}px 0 0;
  padding-bottom: max(1.5rem, env(safe-area-inset-bottom));`,
        hidden: 'translate: 0 100%;',
        scrim: 'align-items: end; justify-items: center; padding: 1.5rem 1.5rem 0;'
      }
    case 'top':
      return {
        box: `  inset: 12vh 0 auto;
  width: min(${s.width}px, calc(100% - 2rem));
  max-height: 70vh;
  margin: 0 auto;
  border-radius: ${r}px;`,
        hidden: `opacity: 0;\n    scale: ${from};\n    translate: 0 -12px;`,
        scrim: 'align-items: start; justify-items: center; padding: 3rem 1.5rem 1.5rem;'
      }
    case 'right':
      return {
        box: `  inset: 0 0 0 auto;
  width: min(${Math.min(s.width, 400)}px, 100%);
  height: 100dvh;
  max-height: 100dvh;
  margin: 0;
  border-radius: ${r}px 0 0 ${r}px;
  display: flex;
  flex-direction: column;`,
        hidden: 'translate: 100% 0;',
        scrim: 'align-items: stretch; justify-items: end; padding: 0;'
      }
    default:
      return {
        box: `  width: min(${s.width}px, calc(100% - 2rem));
  margin: auto;
  border-radius: ${r}px;`,
        hidden: `opacity: 0;\n    scale: ${from};\n    translate: 0 8px;`,
        scrim: 'place-items: center; padding: 1.5rem;'
      }
  }
}

export function modalCss(raw: ModalState): string {
  const s = normalizeModal(raw)
  const r = s.skin === 'brutal' ? Math.min(s.radius, 8) : s.radius
  const ink = s.textColor
  const muted = mixHex(ink, s.bg, 0.35)
  const line = a(ink, 0.12)
  const onAccent = readableInk(s.accent, '#111113', '#ffffff')
  const pl = placementCss(s, r)
  const D = s.duration
  const btnR = Math.min(r, 10)
  const brutal = s.skin === 'brutal'

  return `/* Opens with <button popovertarget="…"> — no JavaScript. Esc and outside click close it. */
.modal {
  position: fixed;
  ${pl.box.trim()}
  box-sizing: border-box;
  padding: 1.5rem;
  border: 0;
  color: ${ink};
  font: 400 15px/1.5 system-ui, -apple-system, 'Segoe UI', sans-serif;
  overflow: auto;
${skinCss(s)}
  transition:
    opacity ${D}ms ease-out,
    scale ${D}ms cubic-bezier(0.22, 1, 0.36, 1),
    translate ${D}ms cubic-bezier(0.22, 1, 0.36, 1),
    overlay ${D}ms allow-discrete,
    display ${D}ms allow-discrete;
}

.modal:not(:popover-open) {
  ${pl.hidden}
}

@starting-style {
  .modal:popover-open {
    ${pl.hidden}
  }
}

.modal::backdrop {
  background: ${a(s.overlayColor, s.overlayOpacity / 100)};${s.blur ? '\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);' : ''}
  opacity: 0;
  transition: opacity ${D}ms ease-out, overlay ${D}ms allow-discrete, display ${D}ms allow-discrete;
}

.modal:popover-open::backdrop {
  opacity: 1;
}

@starting-style {
  .modal:popover-open::backdrop {
    opacity: 0;
  }
}

.modal-head {
  display: flex;
  gap: 0.875rem;
  align-items: flex-start;
  padding-right: ${s.showClose ? '2rem' : '0'};
}

.modal-icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${brutal ? '6px' : '50%'};
  background: ${s.iconStyle === 'solid' ? s.accent : a(s.accent, 0.15)};
  color: ${s.iconStyle === 'solid' ? onAccent : s.accent};${s.iconStyle === 'ring' ? `\n  box-shadow: 0 0 0 6px ${a(s.accent, 0.08)};\n  margin: 6px 4px 0 6px;` : ''}
  font-weight: 700;
  font-size: 1.1rem;
}

.modal-check {
  position: relative;
}

.modal-check::after {
  content: '';
  width: 0.55rem;
  height: 1rem;
  margin-top: -0.2rem;
  border: solid currentColor;
  border-width: 0 2.5px 2.5px 0;
  rotate: 45deg;
}

.modal-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 650;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.modal-desc {
  margin: 0.375rem 0 0;
  font-size: 0.9rem;
  color: ${muted};
}

.modal-eyebrow {
  margin: 0 0 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${s.accent};
}

.modal-body {
  display: grid;
  gap: 1rem;
  margin-top: 1.25rem;
}

.modal-media {
  display: block;
  width: calc(100% + 3rem);
  max-width: none;
  height: auto;
  aspect-ratio: 2 / 1;
  margin: -1.5rem -1.5rem 1.25rem;
  object-fit: cover;
  border-radius: ${r}px ${r}px 0 0;
}

.modal-field {
  display: grid;
  gap: 0.375rem;
}

.modal-field label,
.modal-group legend {
  font-size: 0.8rem;
  font-weight: 600;
}

.modal-input {
  height: 2.5rem;
  padding: 0 0.75rem;
  border: 1px solid ${a(ink, 0.18)};
  border-radius: ${btnR}px;
  background: ${a(ink, 0.04)};
  color: inherit;
  font: inherit;
}

.modal-input:focus {
  outline: 2px solid ${s.accent};
  outline-offset: 1px;
}

.modal-help {
  font-size: 0.8rem;
  color: ${muted};
}

.modal-row {
  display: flex;
  gap: 0.5rem;
}

.modal-row .modal-input {
  flex: 1;
  min-width: 0;
}

.modal-price {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.modal-price span {
  font-size: 0.9rem;
  font-weight: 500;
  color: ${muted};
}

.modal-list {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;
}

.modal-list li {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.modal-list li::before {
  content: '';
  flex: none;
  width: 0.35rem;
  height: 0.65rem;
  margin: 0 0.3rem 0.15rem;
  border: solid ${s.accent};
  border-width: 0 2px 2px 0;
  rotate: 45deg;
}

.modal-group {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  border: 0;
}

.modal-option {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  font-size: 0.9rem;
}

.modal-option input {
  width: 1rem;
  height: 1rem;
  accent-color: ${s.accent};
}

.modal-grabber {
  width: 2.5rem;
  height: 0.3rem;
  margin: -0.5rem auto 1rem;
  border-radius: 999px;
  background: ${a(ink, 0.2)};
}

.modal-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.625rem;
  margin-top: 1.5rem;${s.placement === 'right' ? '\n  margin-top: auto;\n  padding-top: 1.5rem;\n  border-top: 1px solid ' + line + ';' : ''}
}

.modal-actions.bar {
  margin: 1.5rem -1.5rem -1.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${line};
  background: ${a(ink, 0.035)};
}

.modal-actions.stacked {
  flex-direction: column-reverse;
}

.modal-actions.stacked .modal-btn {
  width: 100%;
}

.modal-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: 0 1rem;
  border: 1px solid ${a(ink, 0.18)};
  border-radius: ${btnR}px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 150ms ease-out, scale 120ms ease-out;${brutal ? `\n  box-shadow: 3px 3px 0 ${ink};\n  border: 2px solid ${ink};` : ''}
}

.modal-btn:active {
  scale: 0.97;
}

.modal-btn:focus-visible {
  outline: 2px solid ${s.accent};
  outline-offset: 2px;
}

.modal-btn.primary {
  border-color: ${brutal ? ink : s.accent};
  background: ${s.accent};
  color: ${onAccent};
}

@media (hover: hover) and (pointer: fine) {
  .modal-btn:hover {
    background: ${a(ink, 0.08)};
  }

  .modal-btn.primary:hover {
    background: ${mixHex(s.accent, onAccent === '#ffffff' ? '#000000' : '#ffffff', 0.12)};
  }
}

.modal-kbd {
  display: inline-flex;
  align-items: center;
  min-width: 1.5rem;
  height: 1.375rem;
  padding: 0 0.4rem;
  border-radius: 5px;
  box-shadow: inset 0 0 0 1px ${a(ink, 0.16)}, 0 1px 0 ${a(ink, 0.16)};
  color: ${muted};
  font: 500 0.7rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
}

.modal--command {
  padding: 0.5rem;
}

.modal-search {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 0.5rem 0.75rem 0.75rem;
  border-bottom: 1px solid ${line};
}

.modal-search-input {
  flex: 1;
  min-width: 0;
  height: 2.25rem;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  font-size: 1.05rem;
  outline: none;
}

.modal-results {
  display: grid;
  gap: 2px;
  margin: 0;
  padding: 0.5rem 0 0.25rem;
  list-style: none;
}

.modal-results-label {
  padding: 0.5rem 0.75rem 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${muted};
}

.modal-results [role='option'] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 0.75rem;
  border-radius: ${Math.max(6, btnR - 2)}px;
  font-size: 0.9rem;
  cursor: pointer;
}

.modal-results [aria-selected='true'] {
  background: ${a(s.accent, 0.14)};
  color: ${ink};
  box-shadow: inset 2px 0 0 ${s.accent};
}

@media (hover: hover) and (pointer: fine) {
  .modal-results [role='option']:hover {
    background: ${a(ink, 0.06)};
  }
}

.modal-steps {
  display: flex;
  gap: 0.375rem;
  margin-bottom: 0.875rem;
}

.modal-steps span {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 999px;
  background: ${a(ink, 0.2)};
}

.modal-steps .is-done {
  background: ${a(s.accent, 0.55)};
}

.modal-steps .is-current {
  width: 1.25rem;
  background: ${s.accent};
}

.modal-label-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.modal-link {
  color: ${s.accent};
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
}

.modal-link:hover {
  text-decoration: underline;
}

.modal-divider {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  color: ${muted};
  font-size: 0.75rem;
}

.modal-divider::before,
.modal-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: ${line};
}

.modal-scale {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  border: 0;
}

.modal-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.modal-scale label {
  position: relative;
}

.modal-scale input {
  position: absolute;
  opacity: 0;
  inset: 0;
  cursor: pointer;
}

.modal-scale span {
  display: grid;
  place-items: center;
  height: 2.75rem;
  border-radius: ${btnR}px;
  box-shadow: inset 0 0 0 1px ${a(ink, 0.16)};
  font-weight: 600;
  transition: background-color 150ms ease-out, color 150ms ease-out;
}

.modal-scale input:checked + span {
  background: ${s.accent};
  color: ${onAccent};
  box-shadow: none;
}

.modal-scale input:focus-visible + span {
  outline: 2px solid ${s.accent};
  outline-offset: 2px;
}

.modal-scale-ends {
  display: flex;
  justify-content: space-between;
  margin-top: -0.5rem;
  font-size: 0.75rem;
  color: ${muted};
}

.modal-textarea {
  min-height: 5rem;
  padding: 0.6rem 0.75rem;
  resize: vertical;
}

.modal--lightbox {
  padding: 0.75rem;
}

.modal-figure {
  display: grid;
  gap: 0.75rem;
  margin: 0;
}

.modal-figure img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: ${Math.max(0, r - 8)}px;
}

.modal-figure figcaption {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 0.25rem 0.25rem;
  font-size: 0.85rem;
}

.modal-figure figcaption span {
  color: ${muted};
  font-variant-numeric: tabular-nums;
}

.modal--lightbox .modal-close {
  top: 1.5rem;
  right: 1.5rem;
}

.modal-countdown {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.modal-meter {
  height: 0.375rem;
  overflow: hidden;
  border-radius: 999px;
  background: ${a(ink, 0.12)};
}

.modal-meter span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: ${s.accent};
  transform-origin: 0 50%;
  animation: modal-countdown 120s linear forwards;
}

@keyframes modal-countdown {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}

/* Destructive button stays disabled until the exact name is typed: pattern + :has(), no JS. */
.modal:has(.modal-confirm:invalid) .modal-btn.primary {
  opacity: 0.45;
  pointer-events: none;
}

.modal-code {
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  background: ${a(ink, 0.08)};
  font: 600 0.85em ui-monospace, SFMono-Regular, Menlo, monospace;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: 50%;
  background: ${a(s.bg, 0.85)};
  box-shadow: inset 0 0 0 1px ${a(ink, 0.1)};
  color: ${muted};
  cursor: pointer;
  z-index: 1;
}

.modal-close::before,
.modal-close::after {
  content: '';
  grid-area: 1 / 1;
  width: 0.85rem;
  height: 1.5px;
  border-radius: 1px;
  background: currentColor;
  rotate: 45deg;
}

.modal-close::after {
  rotate: -45deg;
}

.modal-close:hover {
  color: ${ink};
}

.modal-close:focus-visible {
  outline: 2px solid ${s.accent};
}

@media (prefers-reduced-motion: reduce) {
  .modal,
  .modal::backdrop {
    transition-duration: 150ms;
  }

  .modal:not(:popover-open),
  .modal:popover-open {
    scale: none;
    translate: none;
  }

  .modal-meter span {
    animation: none;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .modal {
    background: ${s.bg};
    backdrop-filter: none;
  }
}`
}

const ID = 'modal-demo'
const hide = `popovertarget="${ID}" popovertargetaction="hide"`

function content(s: ModalState): string {
  const close = s.showClose ? `\n  <button class="modal-close" type="button" ${hide} aria-label="Close"></button>` : ''
  const icon = (glyph: string, extra = '') => (s.showIcon ? `\n    <span class="modal-icon${extra}" aria-hidden="true">${glyph}</span>` : '')
  const head = (title: string, desc: string, ic = '') => `
  <div class="modal-head">${ic}
    <div>
      <h2 class="modal-title" id="${ID}-title">${title}</h2>
      <p class="modal-desc">${desc}</p>
    </div>
  </div>`
  const bar = s.footer === 'bar' && s.placement !== 'right' ? ' bar' : ''
  const actions = (secondary: string, primary: string, cls = '') => `
  <div class="modal-actions${cls}${cls ? '' : bar}">${secondary ? `\n    <button class="modal-btn" type="button" ${hide}>${secondary}</button>` : ''}
    <button class="modal-btn primary" type="button" ${hide}>${primary}</button>
  </div>`

  switch (s.kind) {
    case 'form':
      return `${close}${head('Invite to Northwind', 'Teammates get edit access to every board in this workspace.', icon('+'))}
  <div class="modal-body">
    <div class="modal-field">
      <label for="${ID}-email">Email address</label>
      <input class="modal-input" id="${ID}-email" type="email" placeholder="name@company.com" autocomplete="email" />
      <span class="modal-help">They'll get an email with a link to join.</span>
    </div>
  </div>${actions('Cancel', 'Send invite')}`
    case 'success':
      return `${close}${head('Payment received', 'Receipt #4821 for $49.00 was sent to ana@studio.dev.', icon('', ' modal-check'))}${actions('', 'Done')}`
    case 'promo':
      return `${close}
  <img class="modal-media" src="${photoUrl('city', 840, 420)}" alt="${photoAlt('city')}" width="840" height="420" />
  <p class="modal-eyebrow">New in 4.2</p>
  <h2 class="modal-title" id="${ID}-title">Shared workspaces</h2>
  <p class="modal-desc">Invite clients into a read-only space with its own comments and file history.</p>${actions('Maybe later', 'Try it')}`
    case 'upgrade':
      return `${close}${head('Upgrade to Pro', 'Everything in Starter, plus room for a growing team.')}
  <div class="modal-body">
    <p class="modal-price">$12 <span>per seat / month</span></p>
    <ul class="modal-list">
      <li>Unlimited projects and boards</li>
      <li>Version history for 1 year</li>
      <li>SSO and audit log</li>
    </ul>
  </div>${actions('Not now', 'Upgrade', ' stacked')}`
    case 'share':
      return `
  <div class="modal-grabber" aria-hidden="true"></div>${close}${head('Share "Q3 roadmap.pdf"', 'Anyone with the link can view. Only editors can download.')}
  <div class="modal-body">
    <div class="modal-field">
      <label for="${ID}-link">Link</label>
      <div class="modal-row">
        <input class="modal-input" id="${ID}-link" type="text" value="northwind.app/s/q3-roadmap" readonly />
        <button class="modal-btn primary" type="button">Copy</button>
      </div>
    </div>
  </div>`
    case 'filters':
      return `${close}${head('Filters', '3 of 128 pull requests match.')}
  <div class="modal-body">
    <fieldset class="modal-group">
      <legend>Status</legend>
      <label class="modal-option"><input type="checkbox" checked /> Open</label>
      <label class="modal-option"><input type="checkbox" checked /> In review</label>
      <label class="modal-option"><input type="checkbox" /> Merged</label>
    </fieldset>
    <fieldset class="modal-group">
      <legend>Author</legend>
      <label class="modal-option"><input type="radio" name="${ID}-author" checked /> Anyone</label>
      <label class="modal-option"><input type="radio" name="${ID}-author" /> Only me</label>
    </fieldset>
  </div>${actions('Reset', 'Show 3 results')}`
    case 'typeConfirm':
      return `${close}${head('Delete repository?', 'This permanently deletes northwind/dashboard, including 1,284 commits, issues and pull requests.', icon('!'))}
  <div class="modal-body">
    <div class="modal-field">
      <label for="${ID}-confirm">Type <span class="modal-code">northwind/dashboard</span> to confirm</label>
      <input class="modal-input modal-confirm" id="${ID}-confirm" type="text" pattern="northwind/dashboard" required autocomplete="off" spellcheck="false" />
      <span class="modal-help">The delete button unlocks when the name matches.</span>
    </div>
  </div>${actions('Cancel', 'Delete repository')}`
    case 'signin':
      return `${close}${head('Sign in to Northwind', 'Use the email you signed up with.')}
  <div class="modal-body">
    <div class="modal-field">
      <label for="${ID}-email">Work email</label>
      <input class="modal-input" id="${ID}-email" type="email" placeholder="name@company.com" autocomplete="email" />
    </div>
    <div class="modal-field">
      <div class="modal-label-row">
        <label for="${ID}-password">Password</label>
        <a class="modal-link" href="#">Forgot password?</a>
      </div>
      <input class="modal-input" id="${ID}-password" type="password" autocomplete="current-password" />
    </div>
  </div>
  <div class="modal-actions stacked">
    <button class="modal-btn" type="button">Continue with Google</button>
    <span class="modal-divider">or</span>
    <button class="modal-btn primary" type="button">Sign in</button>
  </div>`
    case 'onboarding':
      return `${close}
  <img class="modal-media" src="${photoUrl('fjord', 840, 420)}" alt="${photoAlt('fjord')}" width="840" height="420" />
  <div class="modal-steps" role="img" aria-label="Step 2 of 4"><span class="is-done"></span><span class="is-current"></span><span></span><span></span></div>
  <h2 class="modal-title" id="${ID}-title">Connect your calendar</h2>
  <p class="modal-desc">We block focus time around your meetings so deep work does not get booked over. Disconnect any time.</p>${actions('Back', 'Continue')}`
    case 'feedback':
      return `${close}${head('How likely are you to recommend Northwind?', 'Takes ten seconds. It shapes what we build next.')}
  <div class="modal-body">
    <fieldset class="modal-scale">
      <legend class="modal-sr">Rating from 1 to 5</legend>
${[1, 2, 3, 4, 5].map((n) => `      <label><input type="radio" name="${ID}-score" value="${n}"${n === 4 ? ' checked' : ''} /><span>${n}</span></label>`).join('\n')}
    </fieldset>
    <div class="modal-scale-ends"><span>Not likely</span><span>Very likely</span></div>
    <div class="modal-field">
      <label for="${ID}-note">What could be better? <span class="modal-help">(optional)</span></label>
      <textarea class="modal-input modal-textarea" id="${ID}-note" rows="3"></textarea>
    </div>
  </div>${actions('Skip', 'Send feedback')}`
    case 'timeout':
      return `${close}${head('Your session is about to expire', 'For your security you will be signed out after 2 minutes without activity.', icon('!'))}
  <div class="modal-body">
    <p class="modal-countdown" role="timer" aria-live="off">1:59</p>
    <div class="modal-meter" aria-hidden="true"><span></span></div>
  </div>${actions('Sign out', 'Stay signed in')}`
    case 'command':
      return `
  <div class="modal-search">
    <input class="modal-search-input" type="search" placeholder="Search or jump to..." aria-label="Search commands" />
    <kbd class="modal-kbd">Esc</kbd>
  </div>
  <ul class="modal-results" role="listbox" aria-label="Suggestions">
    <li class="modal-results-label" role="presentation">Recent</li>
    <li role="option" aria-selected="true"><span>Northwind Dashboard</span><kbd class="modal-kbd">Enter</kbd></li>
    <li role="option" aria-selected="false"><span>Q3 roadmap.pdf</span></li>
    <li class="modal-results-label" role="presentation">Actions</li>
    <li role="option" aria-selected="false"><span>Create board</span><kbd class="modal-kbd">Ctrl N</kbd></li>
    <li role="option" aria-selected="false"><span>Invite teammate</span><kbd class="modal-kbd">Ctrl I</kbd></li>
  </ul>`
    case 'lightbox':
      return `${close}
  <figure class="modal-figure">
    <img src="${photoUrl('fjord', 1200, 800)}" alt="${photoAlt('fjord')}" width="1200" height="800" />
    <figcaption><strong id="${ID}-title">Preikestolen, Norway</strong><span>3 of 12</span></figcaption>
  </figure>`
    case 'cookie':
      return `${head('Cookies on this site', 'We use cookies to keep you signed in and to count visits. You can change this any time in Settings.')}${actions('Reject all', 'Accept all')}`
    default:
      return `${close}${head('Delete project?', 'Northwind Dashboard and its 214 files will be removed for everyone. This cannot be undone.', icon('!'))}${actions('Cancel', 'Delete project')}`
  }
}

const labelAttr = (s: ModalState) => (s.kind === 'command' ? 'aria-label="Command palette"' : `aria-labelledby="${ID}-title"`)

const TRIGGER: Record<ModalKind, string> = {
  confirm: 'Delete project',
  typeConfirm: 'Delete repository',
  signin: 'Sign in',
  onboarding: 'Start setup',
  feedback: 'Give feedback',
  timeout: 'Preview timeout',
  command: 'Search',
  lightbox: 'View photo',
  form: 'Invite people',
  success: 'Pay $49',
  promo: "See what's new",
  upgrade: 'Upgrade plan',
  share: 'Share',
  filters: 'Filters',
  cookie: 'Cookie settings'
}

export function modalHtml(raw: ModalState): string {
  const s = normalizeModal(raw)
  return `<button class="modal-btn primary" type="button" popovertarget="${ID}">${TRIGGER[s.kind]}</button>

<div class="modal modal--${s.kind}" id="${ID}" popover role="dialog" ${labelAttr(s)}>${content(s)}
</div>`
}

/**
 * Preview-only markup: the dialog rendered open inside a scrim that imitates ::backdrop,
 * so the gallery and canvas can show it without opening a real top-layer popover.
 */
export function modalPreviewHtml(raw: ModalState): string {
  const s = normalizeModal(raw)
  return `<div class="modal-scrim">
  <div class="modal modal--${s.kind} modal-static" role="dialog" ${labelAttr(s)}>${content(s)}
  </div>
</div>`
}

export function modalPreviewCss(raw: ModalState): string {
  const s = normalizeModal(raw)
  return `${modalCss(s)}

.modal-scrim {
  position: relative;
  display: grid;
  ${placementCss(s, s.radius).scrim}
  width: 100%;
  height: 100%;
  min-height: 26rem;
  overflow: hidden;
  isolation: isolate;
  background: url('${photoUrl('valley', 1200, 800)}') center / cover;
}

.modal-scrim::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: ${a(s.overlayColor, s.overlayOpacity / 100)};${s.blur ? '\n  backdrop-filter: blur(6px);' : ''}
}

.modal.modal-static {
  position: relative;
  inset: auto;
  margin: ${s.placement === 'center' ? 'auto' : '0'};
  ${s.placement === 'right' ? 'height: 100%; max-height: none;' : ''}
  max-height: 100%;
  opacity: 1;
  scale: none;
  translate: none;
  animation: modal-preview-in ${s.duration}ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes modal-preview-in {
  from { ${placementCss(s, s.radius).hidden.replace(/\n\s*/g, ' ')} }
}`
}

export function modalVars(raw: ModalState): Record<string, string> {
  const s = normalizeModal(raw)
  return { '--modal-accent': s.accent, '--modal-bg': s.bg, '--modal-radius': `${s.radius}px`, '--modal-duration': `${s.duration}ms` }
}

export function randomizeModal(s: ModalState, rng: import('../rng').Rng): ModalState {
  const h = Math.floor(rng.range(0, 360))
  const light = rng.chance(0.35)
  const kind = rng.pick(MODAL_KINDS)
  const bg = light ? '#ffffff' : hslToHex({ h, s: 10, l: 10 })
  return {
    ...normalizeModal(s),
    kind: kind.value,
    placement: kind.placement,
    skin: rng.pick(MODAL_SKINS.map((k) => k.value)),
    accent: hslToHex({ h, s: 75, l: 52 }),
    bg,
    textColor: readableInk(bg),
    overlayColor: light ? '#0f172a' : '#000000',
    overlayOpacity: Math.round(rng.range(40, 70)),
    radius: rng.pick([8, 12, 16, 20, 24]),
    duration: Math.round(rng.range(180, 320)),
    scaleFrom: rng.pick([92, 95, 96, 98]),
    blur: rng.chance(0.6)
  }
}

const p = (o: Partial<ModalState>): ModalState => ({ ...DEFAULT_MODAL, ...o })
const LIGHT = { bg: '#ffffff', textColor: '#18181b', overlayColor: '#0f172a', overlayOpacity: 45 }

export const PRESETS_MODAL: { name: string; tags: string[]; state: ModalState }[] = [
  { name: 'Delete Confirm', tags: ['confirm'], state: p({}) },
  { name: 'Delete (Light)', tags: ['confirm', 'light'], state: p({ ...LIGHT, accent: '#dc2626', skin: 'elevated' }) },
  { name: 'Invite Form', tags: ['form'], state: p({ kind: 'form', accent: '#10b981' }) },
  { name: 'Invite (Light)', tags: ['form', 'light'], state: p({ ...LIGHT, kind: 'form', accent: '#4f46e5', skin: 'elevated', radius: 20 }) },
  { name: 'Payment Success', tags: ['success'], state: p({ kind: 'success', accent: '#10b981', width: 380 }) },
  { name: 'Success Glass', tags: ['success', 'glass'], state: p({ kind: 'success', skin: 'glass', accent: '#34d399', overlayOpacity: 30, width: 380, radius: 24 }) },
  { name: "What's New", tags: ['promo'], state: p({ kind: 'promo', accent: '#8b5cf6', showIcon: false, radius: 20 }) },
  { name: "What's New (Light)", tags: ['promo', 'light'], state: p({ ...LIGHT, kind: 'promo', accent: '#0ea5e9', skin: 'elevated', radius: 20 }) },
  { name: 'Upgrade Plan', tags: ['pricing'], state: p({ kind: 'upgrade', accent: '#f59e0b', width: 380 }) },
  { name: 'Upgrade Outline', tags: ['pricing'], state: p({ kind: 'upgrade', skin: 'outline', accent: '#a78bfa', width: 380 }) },
  { name: 'Share Sheet', tags: ['sheet', 'mobile'], state: p({ kind: 'share', placement: 'bottom', accent: '#0a84ff', radius: 22 }) },
  { name: 'Share Sheet (Light)', tags: ['sheet', 'light'], state: p({ ...LIGHT, kind: 'share', placement: 'bottom', accent: '#0a84ff', skin: 'elevated', radius: 22 }) },
  { name: 'Filters Drawer', tags: ['drawer'], state: p({ kind: 'filters', placement: 'right', accent: '#10b981', radius: 0, duration: 300 }) },
  { name: 'Drawer Glass', tags: ['drawer', 'glass'], state: p({ kind: 'filters', placement: 'right', skin: 'glass', accent: '#38bdf8', radius: 20, overlayOpacity: 25 }) },
  { name: 'Cookie Banner', tags: ['consent'], state: p({ kind: 'cookie', placement: 'bottom', accent: '#fafafa', overlayOpacity: 15, blur: false, radius: 16, width: 640 }) },
  { name: 'Neo-brutal Confirm', tags: ['bold', 'light'], state: p({ kind: 'confirm', skin: 'brutal', bg: '#fffbeb', textColor: '#111111', accent: '#ef4444', overlayColor: '#111111', overlayOpacity: 35, blur: false }) },
  { name: 'Neo-brutal Upgrade', tags: ['bold', 'light'], state: p({ kind: 'upgrade', skin: 'brutal', bg: '#ecfccb', textColor: '#111111', accent: '#7c3aed', overlayColor: '#111111', overlayOpacity: 35, blur: false, width: 380 }) },
  { name: 'Glass Invite', tags: ['glass'], state: p({ kind: 'form', skin: 'glass', accent: '#f472b6', overlayOpacity: 25, radius: 24 }) },
  { name: 'Type to Delete', tags: ['confirm', 'danger'], state: p({ kind: 'typeConfirm', accent: '#ef4444', width: 460, footer: 'bar' }) },
  { name: 'Type to Delete (Light)', tags: ['confirm', 'light'], state: p({ ...LIGHT, kind: 'typeConfirm', accent: '#dc2626', skin: 'minimal', width: 460, footer: 'bar', iconStyle: 'solid' }) },
  { name: 'Sign In', tags: ['auth', 'light'], state: p({ ...LIGHT, kind: 'signin', accent: '#18181b', skin: 'elevated', width: 400, radius: 20 }) },
  { name: 'Sign In Glass', tags: ['auth', 'glass'], state: p({ kind: 'signin', skin: 'glass', accent: '#a78bfa', width: 400, radius: 24, overlayOpacity: 30 }) },
  { name: 'Onboarding Step', tags: ['onboarding'], state: p({ kind: 'onboarding', accent: '#10b981', radius: 20, width: 440 }) },
  { name: 'Onboarding (Light)', tags: ['onboarding', 'light'], state: p({ ...LIGHT, kind: 'onboarding', accent: '#2563eb', skin: 'elevated', radius: 24, width: 440 }) },
  { name: 'NPS Feedback', tags: ['feedback'], state: p({ kind: 'feedback', accent: '#6366f1', width: 460, footer: 'bar' }) },
  { name: 'Feedback (Light)', tags: ['feedback', 'light'], state: p({ ...LIGHT, kind: 'feedback', accent: '#0d9488', skin: 'minimal', width: 460 }) },
  { name: 'Session Timeout', tags: ['warning'], state: p({ kind: 'timeout', accent: '#f59e0b', width: 420, iconStyle: 'soft' }) },
  { name: 'Command Palette', tags: ['palette'], state: p({ kind: 'command', placement: 'top', skin: 'minimal', accent: '#10b981', width: 560, radius: 14, overlayOpacity: 50, scaleFrom: 98, duration: 160 }) },
  { name: 'Command (Light)', tags: ['palette', 'light'], state: p({ ...LIGHT, kind: 'command', placement: 'top', skin: 'elevated', accent: '#6366f1', width: 560, radius: 14, scaleFrom: 98, duration: 160 }) },
  { name: 'Photo Lightbox', tags: ['media'], state: p({ kind: 'lightbox', bg: '#0a0a0a', accent: '#fafafa', overlayColor: '#000000', overlayOpacity: 85, width: 720, radius: 18, skin: 'minimal' }) },
  { name: 'Gradient Upgrade', tags: ['pricing', 'gradient'], state: p({ kind: 'upgrade', skin: 'gradient', accent: '#ec4899', width: 380, radius: 20 }) },
  { name: 'Glow Success', tags: ['success', 'glow'], state: p({ kind: 'success', skin: 'glow', accent: '#22d3ee', width: 380, radius: 22, iconStyle: 'solid' }) },
  { name: 'Footer Bar Invite', tags: ['form', 'light'], state: p({ ...LIGHT, kind: 'form', skin: 'minimal', accent: '#0f766e', footer: 'bar', radius: 14 }) }
]
