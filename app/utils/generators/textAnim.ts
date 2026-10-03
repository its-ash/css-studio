export type TextAnimKind = 'typewriter' | 'wave' | 'glitch' | 'blur-in' | 'stagger-rise' | 'blink-caret'

export interface TextAnimState {
  kind: TextAnimKind
  text: string
  color: string
  fontSize: number
  fontWeight: number
  duration: number
  /** for typewriter/stagger: number of characters/letters */
  chars: number
  glitchColor1: string
  glitchColor2: string
}

export const TEXT_ANIM_KINDS: { value: TextAnimKind; label: string }[] = [
  { value: 'typewriter', label: 'Typewriter' },
  { value: 'wave', label: 'Wave' },
  { value: 'glitch', label: 'Glitch' },
  { value: 'blur-in', label: 'Blur In' },
  { value: 'stagger-rise', label: 'Stagger Rise' },
  { value: 'blink-caret', label: 'Blink Caret' }
]

export const DEFAULT_TEXT_ANIM: TextAnimState = {
  kind: 'typewriter',
  text: 'CSS Studio',
  color: '#fafafa',
  fontSize: 42,
  fontWeight: 700,
  duration: 2400,
  chars: 10,
  glitchColor1: '#22d3ee',
  glitchColor2: '#f43f5e'
}

export function textAnimCss(s: TextAnimState): string {
  switch (s.kind) {
    case 'typewriter':
      return `.type-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid ${s.color};
  font-size: ${s.fontSize}px;
  font-weight: ${s.fontWeight};
  color: ${s.color};
  width: 0;
  animation: typing ${s.duration}ms steps(${Math.max(1, s.chars)}) forwards, caret 700ms step-end infinite;
}

@keyframes typing {
  to {
    width: 100%;
  }
}

@keyframes caret {
  50% {
    border-color: transparent;
  }
}`
    case 'wave':
      return `.wave-text {
  display: inline-flex;
  font-size: ${s.fontSize}px;
  font-weight: ${s.fontWeight};
  color: ${s.color};
}

.wave-text span {
  display: inline-block;
  animation: wave-bounce ${s.duration}ms ease-in-out infinite;
  animation-delay: calc(var(--i) * ${(s.duration / 10).toFixed(0)}ms);
}

@keyframes wave-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-${Math.max(6, Math.round(s.fontSize / 5))}px);
  }
}`
    case 'glitch':
      return `.glitch-text {
  position: relative;
  font-size: ${s.fontSize}px;
  font-weight: ${s.fontWeight};
  color: ${s.color};
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.glitch-text::before {
  color: ${s.glitchColor1};
  animation: glitch-a ${s.duration}ms steps(2) infinite;
}

.glitch-text::after {
  color: ${s.glitchColor2};
  animation: glitch-b ${s.duration}ms steps(2) infinite reverse;
}

@keyframes glitch-a {
  0%, 86%, 100% {
    transform: translate(0);
    opacity: 0;
  }
  88% {
    transform: translate(-3px, -2px);
    opacity: 1;
  }
  94% {
    transform: translate(2px, 1px);
    opacity: 1;
  }
}

@keyframes glitch-b {
  0%, 84%, 100% {
    transform: translate(0);
    opacity: 0;
  }
  90% {
    transform: translate(3px, 2px);
    opacity: 1;
  }
  96% {
    transform: translate(-2px, -1px);
    opacity: 1;
  }
}`
    case 'blur-in':
      return `.blur-text {
  font-size: ${s.fontSize}px;
  font-weight: ${s.fontWeight};
  color: ${s.color};
  animation: blur-in ${s.duration}ms ease-out both;
}

@keyframes blur-in {
  from {
    opacity: 0;
    filter: blur(14px);
    letter-spacing: 0.3em;
  }
  to {
    opacity: 1;
    filter: blur(0);
    letter-spacing: normal;
  }
}`
    case 'stagger-rise':
      return `.rise-text {
  display: inline-flex;
  overflow: hidden;
  font-size: ${s.fontSize}px;
  font-weight: ${s.fontWeight};
  color: ${s.color};
}

.rise-text span {
  display: inline-block;
  transform: translateY(110%);
  animation: rise-up ${s.duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: calc(var(--i) * ${(s.duration / 12).toFixed(0)}ms);
}

@keyframes rise-up {
  to {
    transform: translateY(0);
  }
}`
    case 'blink-caret':
      return `.blink-text {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${s.fontSize}px;
  font-weight: ${s.fontWeight};
  color: ${s.color};
}

.blink-text::after {
  content: '';
  width: ${Math.max(2, Math.round(s.fontSize / 14))}px;
  height: 1em;
  background: ${s.color};
  animation: blink ${Math.round(s.duration / 6)}ms step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}`
  }
}

/** Splits text into per-letter spans with --i for staggered effects. */
export function textAnimHtml(s: TextAnimState): string {
  const needsLetters = s.kind === 'wave' || s.kind === 'stagger-rise'
  if (needsLetters) {
    const spans = [...s.text]
      .map((ch, i) => `  <span style="--i: ${i}">${ch === ' ' ? '&nbsp;' : ch}</span>`)
      .join('\n')
    return `<span class="${s.kind === 'wave' ? 'wave' : 'rise'}-text" aria-label="${s.text}">\n${spans}\n</span>`
  }
  if (s.kind === 'glitch') {
    return `<span class="glitch-text" data-text="${s.text}">${s.text}</span>`
  }
  return `<span class="${s.kind === 'typewriter' ? 'type' : 'blink'}-text">${s.text}</span>`
}

export function textAnimVars(s: TextAnimState): Record<string, string> {
  return { '--anim-color': s.color, '--anim-duration': `${s.duration}ms` }
}

export function randomizeTextAnim(s: TextAnimState, rng: import('../rng').Rng): TextAnimState {
  const kinds = TEXT_ANIM_KINDS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  const words = ['CSS Studio', 'Ship faster', 'Hello World', 'Design in code', 'Pure CSS']
  return {
    ...s,
    kind: rng.pick(kinds),
    text: rng.pick(words),
    color: `hsl(${h} 20% 96%)`,
    fontSize: Math.round(rng.range(28, 56)),
    fontWeight: rng.pick([400, 600, 700, 800]),
    duration: Math.round(rng.range(1200, 3200)),
    glitchColor1: `hsl(${h} 85% 60%)`,
    glitchColor2: `hsl(${(h + 180) % 360} 85% 60%)`
  }
}

export const PRESETS_TEXT_ANIM: { name: string; tags: string[]; state: TextAnimState }[] = [
  { name: 'Terminal Type', tags: ['mono', 'terminal'], state: { ...DEFAULT_TEXT_ANIM, kind: 'typewriter', text: 'npm install css-studio' } },
  { name: 'Hello Wave', tags: ['playful'], state: { ...DEFAULT_TEXT_ANIM, kind: 'wave', text: 'Hello!' } },
  { name: 'Neon Glitch', tags: ['glitch', 'neon'], state: { ...DEFAULT_TEXT_ANIM, kind: 'glitch', text: 'GLITCH', glitchColor1: '#22d3ee', glitchColor2: '#f43f5e' } },
  { name: 'Blur Reveal', tags: ['elegant'], state: { ...DEFAULT_TEXT_ANIM, kind: 'blur-in', text: 'Design in code', duration: 1800 } },
  { name: 'Letter Rise', tags: ['editorial'], state: { ...DEFAULT_TEXT_ANIM, kind: 'stagger-rise', text: 'Ship it', duration: 1600 } },
  { name: 'Prompt Caret', tags: ['terminal'], state: { ...DEFAULT_TEXT_ANIM, kind: 'blink-caret', text: '>_', fontSize: 36 } },
  { name: 'Cinematic', tags: ['film'], state: { ...DEFAULT_TEXT_ANIM, kind: 'blur-in', text: 'A story in CSS', duration: 2600, fontWeight: 400, fontSize: 36 } },
  { name: 'Bouncy Wave', tags: ['playful'], state: { ...DEFAULT_TEXT_ANIM, kind: 'wave', text: 'Bounce', color: '#f59e0b', fontSize: 48 } },
  { name: 'Rose Glitch', tags: ['glitch', 'warm'], state: { ...DEFAULT_TEXT_ANIM, kind: 'glitch', text: 'ERROR 404', glitchColor1: '#f43f5e', glitchColor2: '#fafafa' } },
  { name: 'Slow Type', tags: ['calm'], state: { ...DEFAULT_TEXT_ANIM, kind: 'typewriter', text: 'Loading…', duration: 3200 } }
]