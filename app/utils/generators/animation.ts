export type AnimationKind =
  | 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce' | 'pulse' | 'shake' | 'floating' | 'blur' | 'glow' | 'gradient-pan' | 'blob-morph'

export interface AnimationState {
  kind: AnimationKind
  duration: number
  delay: number
  easing: string
  iteration: number | 'infinite'
  direction: 'normal' | 'alternate' | 'reverse' | 'alternate-reverse'
  fillMode: 'none' | 'forwards' | 'backwards' | 'both'
  distance: number
}

export const ANIMATION_KINDS: { value: AnimationKind; label: string }[] = [
  { value: 'fade', label: 'Fade' },
  { value: 'slide', label: 'Slide' },
  { value: 'scale', label: 'Scale' },
  { value: 'rotate', label: 'Rotate' },
  { value: 'bounce', label: 'Bounce' },
  { value: 'pulse', label: 'Pulse' },
  { value: 'shake', label: 'Shake' },
  { value: 'floating', label: 'Floating' },
  { value: 'blur', label: 'Blur' },
  { value: 'glow', label: 'Glow' },
  { value: 'gradient-pan', label: 'Gradient Pan' },
  { value: 'blob-morph', label: 'Blob Morph' }
]

export const EASINGS = [
  { value: 'ease', label: 'ease' },
  { value: 'ease-out', label: 'ease-out' },
  { value: 'ease-in-out', label: 'ease-in-out' },
  { value: 'linear', label: 'linear' },
  { value: 'cubic-bezier(0.23, 1, 0.32, 1)', label: 'smooth out' },
  { value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', label: 'back out' },
  { value: 'cubic-bezier(0.77, 0, 0.175, 1)', label: 'strong in-out' }
]

export const DEFAULT_ANIMATION: AnimationState = {
  kind: 'fade',
  duration: 1,
  delay: 0,
  easing: 'ease-out',
  iteration: 'infinite',
  direction: 'normal',
  fillMode: 'none',
  distance: 40
}

export function keyframesFor(kind: AnimationKind, distance: number): string {
  const d = distance
  switch (kind) {
    case 'fade':
      return `@keyframes fade {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}`
    case 'slide':
      return `@keyframes slide {\n  from { transform: translateY(${d}px); }\n  to { transform: translateY(0); }\n}`
    case 'scale':
      return `@keyframes scale {\n  from { transform: scale(0.85); opacity: 0; }\n  to { transform: scale(1); opacity: 1; }\n}`
    case 'rotate':
      return `@keyframes rotate {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}`
    case 'bounce':
      return `@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  30% { transform: translateY(-${d}px); }\n  50% { transform: translateY(0); }\n  70% { transform: translateY(-${d / 2}px); }\n}`
    case 'pulse':
      return `@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.08); }\n}`
    case 'shake':
      return `@keyframes shake {\n  0%, 100% { transform: translateX(0); }\n  20% { transform: translateX(-${d / 3}px); }\n  40% { transform: translateX(${d / 3}px); }\n  60% { transform: translateX(-${d / 5}px); }\n  80% { transform: translateX(${d / 5}px); }\n}`
    case 'floating':
      return `@keyframes floating {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-${d / 2}px); }\n}`
    case 'blur':
      return `@keyframes blur {\n  0%, 100% { filter: blur(0); }\n  50% { filter: blur(${Math.max(1, d / 5)}px); }\n}`
    case 'glow':
      return `@keyframes glow {\n  0%, 100% { box-shadow: 0 0 8px #34d39944; }\n  50% { box-shadow: 0 0 ${d}px #34d399aa; }\n}`
    case 'gradient-pan':
      return `@keyframes gradient-pan {\n  0% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}`
    case 'blob-morph':
      return `@keyframes blob-morph {\n  0%, 100% { border-radius: 42% 58% 62% 38% / 55% 42% 58% 45%; }\n  50% { border-radius: 58% 42% 38% 62% / 45% 58% 42% 55%; }\n}`
  }
}

export function animationName(kind: AnimationKind): string {
  return kind
}

export function animationShorthand(s: AnimationState): string {
  const it = s.iteration === 'infinite' ? 'infinite' : String(s.iteration)
  return `${animationName(s.kind)} ${s.duration}s ${s.easing} ${s.delay}s ${it} ${s.direction} ${s.fillMode}`
}

export function animationCss(s: AnimationState): string {
  return `${keyframesFor(s.kind, s.distance)}\n\n.animated {\n  animation: ${animationShorthand(s)};\n}`
}

export function animationPreviewStyle(s: AnimationState): Record<string, string> {
  return { animation: animationShorthand(s) }
}

export function animationVars(s: AnimationState): Record<string, string> {
  return {
    '--anim-duration': `${s.duration}s`,
    '--anim-delay': `${s.delay}s`,
    '--anim-easing': s.easing,
    '--anim-iteration': s.iteration === 'infinite' ? 'infinite' : String(s.iteration)
  }
}

export function animationHtml(): string {
  return `<div class="animated">Content</div>`
}

export function randomizeAnimation(s: AnimationState, rng: import('../rng').Rng): AnimationState {
  return {
    ...s,
    kind: rng.pick(ANIMATION_KINDS.map((k) => k.value)),
    duration: Math.round(rng.range(0.5, 3) * 10) / 10,
    easing: rng.pick(EASINGS).value,
    direction: rng.pick(['normal', 'alternate', 'reverse', 'alternate-reverse'] as const),
    distance: Math.round(rng.range(10, 60))
  }
}

export const PRESETS_ANIMATION: { name: string; tags: string[]; state: AnimationState }[] = [
  { name: 'Fade In', tags: ['entrance'], state: { ...DEFAULT_ANIMATION, kind: 'fade', duration: 0.6, iteration: 1, fillMode: 'forwards' } },
  { name: 'Gentle Float', tags: ['ambient'], state: { ...DEFAULT_ANIMATION, kind: 'floating', duration: 3, distance: 24 } },
  { name: 'Heartbeat', tags: ['attention'], state: { ...DEFAULT_ANIMATION, kind: 'pulse', duration: 1.2, distance: 12 } },
  { name: 'Wobble In', tags: ['entrance'], state: { ...DEFAULT_ANIMATION, kind: 'shake', duration: 0.8, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iteration: 1, fillMode: 'forwards' } },
  { name: 'Blob Breathe', tags: ['ambient'], state: { ...DEFAULT_ANIMATION, kind: 'blob-morph', duration: 8, easing: 'ease-in-out', direction: 'alternate' } },
  { name: 'Slow Fade', tags: ['entrance'], state: { ...DEFAULT_ANIMATION, kind: 'fade', duration: 1.2, easing: 'ease-out', iteration: 1, fillMode: 'forwards' } },
  { name: 'Spin Slow', tags: ['ambient'], state: { ...DEFAULT_ANIMATION, kind: 'rotate', duration: 6, easing: 'linear' } },
  { name: 'Bounce In', tags: ['entrance'], state: { ...DEFAULT_ANIMATION, kind: 'bounce', duration: 0.9, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iteration: 1, fillMode: 'forwards' } },
  { name: 'Pulse Glow', tags: ['attention'], state: { ...DEFAULT_ANIMATION, kind: 'glow', duration: 1.6, distance: 32, direction: 'alternate' } },
  { name: 'Slide Up', tags: ['entrance'], state: { ...DEFAULT_ANIMATION, kind: 'slide', duration: 0.5, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', iteration: 1, fillMode: 'both' } },
  { name: 'Blur Focus', tags: ['ambient'], state: { ...DEFAULT_ANIMATION, kind: 'blur', duration: 2, distance: 30, direction: 'alternate', easing: 'ease-in-out' } },
  { name: 'Gradient Shine', tags: ['ambient'], state: { ...DEFAULT_ANIMATION, kind: 'gradient-pan', duration: 4, easing: 'linear' } },
  { name: 'Subtle Drift', tags: ['ambient'], state: { ...DEFAULT_ANIMATION, kind: 'floating', duration: 4.5, easing: 'ease-in-out', distance: 14, direction: 'alternate' } },
  { name: 'Fade Scale', tags: ['entrance'], state: { ...DEFAULT_ANIMATION, kind: 'scale', duration: 0.7, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', iteration: 1, fillMode: 'both' } },
  { name: 'Wobble Alert', tags: ['attention'], state: { ...DEFAULT_ANIMATION, kind: 'shake', duration: 0.6, easing: 'ease-in-out', distance: 24 } },
  { name: 'Fast Pulse', tags: ['attention'], state: { ...DEFAULT_ANIMATION, kind: 'pulse', duration: 0.8, easing: 'ease-in-out', direction: 'alternate' } },
  { name: 'Gentle Bounce', tags: ['ambient'], state: { ...DEFAULT_ANIMATION, kind: 'bounce', duration: 2.2, easing: 'ease-in-out', distance: 28 } },
  { name: 'Soft Blur In', tags: ['entrance'], state: { ...DEFAULT_ANIMATION, kind: 'blur', duration: 1, easing: 'ease-out', iteration: 1, fillMode: 'forwards', distance: 20 } },
  { name: 'Blob Wobble', tags: ['ambient'], state: { ...DEFAULT_ANIMATION, kind: 'blob-morph', duration: 5, easing: 'ease-in-out', direction: 'alternate' } },
  { name: 'Tornado Spin', tags: ['wow', 'ambient'], state: { ...DEFAULT_ANIMATION, kind: 'rotate', duration: 1.5, easing: 'linear', direction: 'normal' } },
  { name: 'Earthquake', tags: ['wow', 'attention'], state: { ...DEFAULT_ANIMATION, kind: 'shake', duration: 0.4, easing: 'ease-in-out', distance: 50 } },
  { name: 'Hyper Bounce', tags: ['wow', 'entrance'], state: { ...DEFAULT_ANIMATION, kind: 'bounce', duration: 0.6, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', distance: 80, iteration: 1, fillMode: 'forwards' } },
  { name: 'Strobe Pulse', tags: ['wow', 'attention'], state: { ...DEFAULT_ANIMATION, kind: 'pulse', duration: 0.3, easing: 'ease-in-out', direction: 'alternate', distance: 30 } },
  { name: 'Cinematic Slide', tags: ['wow', 'entrance'], state: { ...DEFAULT_ANIMATION, kind: 'slide', duration: 1.2, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', distance: 80, iteration: 1, fillMode: 'both' } },
  { name: 'Deep Blur Reveal', tags: ['wow', 'entrance'], state: { ...DEFAULT_ANIMATION, kind: 'blur', duration: 1.8, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', distance: 60, iteration: 1, fillMode: 'forwards' } },
  { name: 'Neon Flicker', tags: ['wow', 'attention'], state: { ...DEFAULT_ANIMATION, kind: 'glow', duration: 0.15, easing: 'ease-in-out', direction: 'alternate', distance: 40 } }
]