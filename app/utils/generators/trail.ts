import { hslToHex, mixHex, readableInk } from '../colors'

export type TrailMode = 'trail' | 'progress'
export type CursorTrailKind = 'sparkle' | 'dot-fade' | 'ring-burst' | 'comet' | 'star' | 'confetti' | 'bubble' | 'ink' | 'follower'
export type ScrollProgressKind = 'top-bar' | 'glow-bar' | 'bottom-bar' | 'segments' | 'side-rail' | 'circle' | 'side-dot'

export interface TrailState {
  mode: TrailMode
  trailKind: CursorTrailKind
  progressKind: ScrollProgressKind
  accent: string
  accent2: string
  size: number
  fadeMs: number
  trailCount: number
  spacing: number
  blend: boolean
  barHeight: number
  dotSize: number
  segments: number
  showPercent: boolean
  stage: string
}

export const TRAIL_MODES: { value: TrailMode; label: string }[] = [
  { value: 'trail', label: 'Cursor trail' },
  { value: 'progress', label: 'Scroll progress' }
]

export const TRAIL_KINDS: { value: CursorTrailKind; label: string }[] = [
  { value: 'sparkle', label: 'Sparkle glow' },
  { value: 'dot-fade', label: 'Dot fade' },
  { value: 'ring-burst', label: 'Ring ripple' },
  { value: 'comet', label: 'Comet streak' },
  { value: 'star', label: 'Twinkle stars' },
  { value: 'confetti', label: 'Confetti' },
  { value: 'bubble', label: 'Rising bubbles' },
  { value: 'ink', label: 'Ink blot' },
  { value: 'follower', label: 'Smooth follower' }
]

export const PROGRESS_KINDS: { value: ScrollProgressKind; label: string }[] = [
  { value: 'top-bar', label: 'Top bar' },
  { value: 'glow-bar', label: 'Gradient glow bar' },
  { value: 'bottom-bar', label: 'Bottom bar' },
  { value: 'segments', label: 'Chapter segments' },
  { value: 'side-rail', label: 'Side rail' },
  { value: 'circle', label: 'Corner ring' },
  { value: 'side-dot', label: 'Side pie dot' }
]

export const DEFAULT_TRAIL: TrailState = {
  mode: 'trail',
  trailKind: 'sparkle',
  progressKind: 'top-bar',
  accent: '#10b981',
  accent2: '#22d3ee',
  size: 8,
  fadeMs: 700,
  trailCount: 24,
  spacing: 10,
  blend: false,
  barHeight: 4,
  dotSize: 12,
  segments: 5,
  showPercent: true,
  stage: '#0c0c0e'
}

const pick = <T extends string>(v: unknown, list: { value: T }[], fb: T): T => (list.some((o) => o.value === v) ? (v as T) : fb)

/** Old presets carried both a trail and a progress kind; keep the trail unless only progress made sense. */
export function normalizeTrail(raw: TrailState): TrailState {
  const s: TrailState = { ...DEFAULT_TRAIL, ...raw }
  s.mode = pick(s.mode, TRAIL_MODES, 'trail')
  s.trailKind = pick(s.trailKind, TRAIL_KINDS, 'sparkle')
  s.progressKind = pick(s.progressKind, PROGRESS_KINDS, 'top-bar')
  s.trailCount = Math.min(80, Math.max(4, Math.round(s.trailCount)))
  s.segments = Math.min(12, Math.max(2, Math.round(s.segments)))
  return s
}

const CONFETTI = (s: TrailState) => [s.accent, s.accent2, '#f59e0b', '#f43f5e', '#a78bfa']

/* ---------------------------------------------------------------- cursor trail */

function trailParticleCss(s: TrailState): string {
  const sz = s.size
  const base = `.trail-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: ${sz}px;
  height: ${sz}px;
  margin: ${-sz / 2}px 0 0 ${-sz / 2}px;
  pointer-events: none;
  z-index: 50;
  transform: translate(var(--x), var(--y));
  will-change: transform, opacity;`
  const k = s.trailKind
  const kinds: Record<Exclude<CursorTrailKind, 'follower'>, string> = {
    sparkle: `${base}
  border-radius: 50%;
  background: ${s.accent};
  box-shadow: 0 0 ${sz * 1.5}px ${s.accent}, 0 0 ${sz * 3}px ${s.accent}66;
  animation: trail-sparkle ${s.fadeMs}ms ease-out forwards;
}

@keyframes trail-sparkle {
  to { opacity: 0; transform: translate(var(--x), var(--y)) translateY(10px) scale(0.2); }
}`,
    'dot-fade': `${base}
  border-radius: 50%;
  background: ${s.accent};
  animation: trail-fade ${s.fadeMs}ms linear forwards;
}

@keyframes trail-fade {
  from { opacity: 0.85; transform: translate(var(--x), var(--y)); }
  to { opacity: 0; transform: translate(var(--x), var(--y)) scale(0.3); }
}`,
    'ring-burst': `${base}
  border: 2px solid ${s.accent};
  border-radius: 50%;
  animation: trail-ring ${s.fadeMs}ms ease-out forwards;
}

@keyframes trail-ring {
  from { opacity: 0.9; transform: translate(var(--x), var(--y)) scale(0.4); }
  to { opacity: 0; transform: translate(var(--x), var(--y)) scale(2.2); }
}`,
    comet: `${base}
  width: ${sz * 3}px;
  margin-left: ${(-sz * 3) / 2}px;
  height: ${Math.max(2, sz / 2)}px;
  margin-top: ${-Math.max(2, sz / 2) / 2}px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, ${s.accent} 60%, ${s.accent2});
  animation: trail-comet ${s.fadeMs}ms ease-out forwards;
}

@keyframes trail-comet {
  from { opacity: 1; transform: translate(var(--x), var(--y)) rotate(var(--a)); }
  to { opacity: 0; transform: translate(var(--x), var(--y)) rotate(var(--a)) scaleX(0.2); }
}`,
    star: `${base}
  width: ${sz * 1.8}px;
  height: ${sz * 1.8}px;
  margin: ${-sz * 0.9}px 0 0 ${-sz * 0.9}px;
  background: ${s.accent};
  clip-path: polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%);
  filter: drop-shadow(0 0 4px ${s.accent2});
  animation: trail-star ${s.fadeMs}ms ease-out forwards;
}

@keyframes trail-star {
  from { opacity: 1; transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(1); }
  to { opacity: 0; transform: translate(var(--x), var(--y)) translate(var(--dx), var(--dy)) rotate(calc(var(--r) + 90deg)) scale(0.2); }
}`,
    confetti: `${base}
  width: ${sz}px;
  height: ${sz * 0.45}px;
  border-radius: 1px;
  background: var(--c, ${s.accent});
  animation: trail-confetti ${s.fadeMs}ms cubic-bezier(0.3, 0.6, 0.6, 1) forwards;
}

@keyframes trail-confetti {
  from { opacity: 1; transform: translate(var(--x), var(--y)) rotate(var(--r)); }
  to { opacity: 0; transform: translate(var(--x), var(--y)) translate(var(--dx), 60px) rotate(calc(var(--r) + 540deg)); }
}`,
    bubble: `${base}
  border: 1.5px solid ${s.accent};
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, ${s.accent}55, transparent 60%);
  animation: trail-bubble ${s.fadeMs}ms ease-out forwards;
}

@keyframes trail-bubble {
  from { opacity: 0.9; transform: translate(var(--x), var(--y)) scale(0.6); }
  to { opacity: 0; transform: translate(var(--x), var(--y)) translate(var(--dx), -48px) scale(1.4); }
}`,
    ink: `${base}
  width: ${sz * 2.5}px;
  height: ${sz * 2.5}px;
  margin: ${-sz * 1.25}px 0 0 ${-sz * 1.25}px;
  border-radius: 50%;
  background: radial-gradient(circle, ${s.accent} 0 35%, ${s.accent}00 70%);
  animation: trail-ink ${s.fadeMs}ms ease-out forwards;
}

@keyframes trail-ink {
  from { opacity: 0.9; transform: translate(var(--x), var(--y)) scale(0.5); }
  to { opacity: 0; transform: translate(var(--x), var(--y)) scale(1.6); }
}`
  }
  return k === 'follower' ? '' : kinds[k]
}

function followerCss(s: TrailState): string {
  const big = s.size * 4
  return `.cursor-follower {
  position: fixed;
  top: 0;
  left: 0;
  width: ${big}px;
  height: ${big}px;
  margin: ${-big / 2}px 0 0 ${-big / 2}px;
  border-radius: 50%;
  ${s.blend ? 'background: #ffffff;\n  mix-blend-mode: difference;' : `border: 1.5px solid ${s.accent};\n  background: ${s.accent}1a;`}
  pointer-events: none;
  z-index: 50;
  opacity: 0;
  transition: opacity 200ms ease-out, scale 200ms ease-out;
  will-change: transform;
}

.cursor-follower.is-visible {
  opacity: 1;
}

.cursor-follower.is-pressed {
  scale: 0.75;
}`
}

export function trailCss(raw: TrailState): string {
  const s = normalizeTrail(raw)
  if (s.mode === 'progress') return progressCss(s)
  const body = s.trailKind === 'follower' ? followerCss(s) : trailParticleCss(s)
  return `/* Only shown on devices with a precise pointer; skipped entirely for reduced motion (see script). */
${body}`
}

export function trailJs(raw: TrailState): string {
  const s = normalizeTrail(raw)
  if (s.trailKind === 'follower') {
    return `(() => {
  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const el = Object.assign(document.createElement('div'), { className: 'cursor-follower' });
  el.setAttribute('aria-hidden', 'true');
  document.body.append(el);
  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
  addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; el.classList.add('is-visible'); }, { passive: true });
  addEventListener('pointerdown', () => el.classList.add('is-pressed'));
  addEventListener('pointerup', () => el.classList.remove('is-pressed'));
  document.addEventListener('pointerleave', () => el.classList.remove('is-visible'));
  (function tick() {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    el.style.transform = \`translate(\${x}px, \${y}px)\`;
    requestAnimationFrame(tick);
  })();
})();`
  }
  const extras: Partial<Record<CursorTrailKind, string>> = {
    comet: "d.style.setProperty('--a', Math.atan2(e.clientY - ly, e.clientX - lx) + 'rad');",
    star: "d.style.setProperty('--r', rnd(0, 90) + 'deg'); d.style.setProperty('--dx', rnd(-16, 16) + 'px'); d.style.setProperty('--dy', rnd(-16, 16) + 'px');",
    confetti: `d.style.setProperty('--c', COLORS[Math.floor(Math.random() * COLORS.length)]); d.style.setProperty('--r', rnd(0, 360) + 'deg'); d.style.setProperty('--dx', rnd(-30, 30) + 'px');`,
    bubble: "d.style.setProperty('--dx', rnd(-12, 12) + 'px');"
  }
  const colors = s.trailKind === 'confetti' ? `\n  const COLORS = ${JSON.stringify(CONFETTI(s))};` : ''
  return `(() => {
  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const MAX = ${s.trailCount};   // particles alive at once
  const GAP = ${s.spacing};      // px the pointer must travel between particles${colors}
  const rnd = (a, b) => a + Math.random() * (b - a);
  let lx = 0, ly = 0, alive = 0;
  addEventListener('pointermove', (e) => {
    if (alive >= MAX || Math.hypot(e.clientX - lx, e.clientY - ly) < GAP) return;
    const d = document.createElement('div');
    d.className = 'trail-dot';
    d.setAttribute('aria-hidden', 'true');
    d.style.setProperty('--x', e.clientX + 'px');
    d.style.setProperty('--y', e.clientY + 'px');
    ${extras[s.trailKind] ?? ''}
    lx = e.clientX; ly = e.clientY;
    document.body.append(d);
    alive++;
    d.addEventListener('animationend', () => { d.remove(); alive--; }, { once: true });
  }, { passive: true });
})();`
}

/* ------------------------------------------------------------- scroll progress */

function progressShape(s: TrailState): string {
  const ring = s.dotSize * 4
  switch (s.progressKind) {
    case 'glow-bar':
      return `.scroll-progress {
  position: fixed;
  inset: 0 0 auto;
  height: ${s.barHeight}px;
  background: linear-gradient(90deg, ${s.accent}, ${s.accent2});
  box-shadow: 0 0 12px ${s.accent2}aa;
  transform-origin: 0 50%;
  transform: scaleX(var(--progress));
  z-index: 60;
}`
    case 'bottom-bar':
      return `.scroll-progress {
  position: fixed;
  inset: auto 0 0;
  height: ${s.barHeight}px;
  background: ${s.accent};
  transform-origin: 0 50%;
  transform: scaleX(var(--progress));
  z-index: 60;
}`
    case 'segments': {
      const gap = 4
      return `.scroll-progress {
  position: fixed;
  inset: 0.5rem 0.75rem auto;
  height: ${s.barHeight}px;
  border-radius: 999px;
  background:
    linear-gradient(90deg, ${s.accent} calc(var(--progress) * 100%), ${s.accent}2e 0);
  -webkit-mask: repeating-linear-gradient(90deg, #000 0 calc((100% - ${gap * (s.segments - 1)}px) / ${s.segments}), transparent 0 calc((100% - ${gap * (s.segments - 1)}px) / ${s.segments} + ${gap}px));
  mask: repeating-linear-gradient(90deg, #000 0 calc((100% - ${gap * (s.segments - 1)}px) / ${s.segments}), transparent 0 calc((100% - ${gap * (s.segments - 1)}px) / ${s.segments} + ${gap}px));
  z-index: 60;
}`
    }
    case 'side-rail':
      return `.scroll-progress {
  position: fixed;
  inset: 0 auto 0 0;
  width: ${s.barHeight}px;
  background: ${s.accent};
  transform-origin: 50% 0;
  transform: scaleY(var(--progress));
  z-index: 60;
}`
    case 'circle':
      return `.scroll-progress {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  display: grid;
  place-items: center;
  width: ${ring}px;
  height: ${ring}px;
  border-radius: 50%;
  background:
    radial-gradient(closest-side, ${s.stage} calc(100% - ${Math.max(3, s.barHeight)}px), transparent calc(100% - ${Math.max(3, s.barHeight)}px + 1px)),
    conic-gradient(${s.accent} calc(var(--progress) * 360deg), ${s.accent}2e 0);
  color: ${readableInk(s.stage)};
  font: 600 ${Math.max(10, Math.round(ring / 4.2))}px/1 system-ui, sans-serif;
  font-variant-numeric: tabular-nums;
  z-index: 60;
}${
        s.showPercent
          ? `

/* An <integer>-typed property rounds the calc, which makes it usable as a counter: no extra script. */
@property --pct {
  syntax: '<integer>';
  inherits: false;
  initial-value: 0;
}

.scroll-progress::after {
  --pct: calc(var(--progress) * 100);
  counter-reset: pct var(--pct);
  content: counter(pct) '%';
}`
          : ''
      }`
    case 'side-dot':
      return `.scroll-progress {
  position: fixed;
  right: 1rem;
  top: 50%;
  width: ${s.dotSize * 1.6}px;
  height: ${s.dotSize * 1.6}px;
  margin-top: ${-s.dotSize * 0.8}px;
  border-radius: 50%;
  background: conic-gradient(${s.accent} calc(var(--progress) * 360deg), ${s.accent}2e 0);
  box-shadow: 0 0 0 3px ${s.stage}, 0 0 0 4px ${s.accent}44;
  z-index: 60;
}`
    default:
      return `.scroll-progress {
  position: fixed;
  inset: 0 0 auto;
  height: ${s.barHeight}px;
  background: ${s.accent};
  transform-origin: 0 50%;
  transform: scaleX(var(--progress));
  z-index: 60;
}`
  }
}

export function progressCss(raw: TrailState): string {
  const s = normalizeTrail(raw)
  return `/* Registered so the value can animate and drive transforms, gradients and the % counter. */
@property --progress {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}

${progressShape(s)}

/* Scroll-driven animation: no JavaScript in supporting browsers. */
@supports (animation-timeline: scroll()) {
  .scroll-progress {
    animation: scroll-progress linear both;
    animation-timeline: scroll(root block);
  }

  @keyframes scroll-progress {
    to { --progress: 1; }
  }
}`
}

export function progressJs(): string {
  return `// Fallback for browsers without scroll-driven animations.
if (!CSS.supports('animation-timeline: scroll()')) {
  const bar = document.querySelector('.scroll-progress');
  const update = () => {
    const h = document.documentElement;
    bar.style.setProperty('--progress', (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)).toFixed(4));
  };
  addEventListener('scroll', update, { passive: true });
  update();
}`
}

export function trailHtml(raw: TrailState): string {
  const s = normalizeTrail(raw)
  if (s.mode === 'progress') {
    return `<div class="scroll-progress" role="progressbar" aria-label="Reading progress" aria-valuemin="0" aria-valuemax="100"></div>

<!-- Add before </body> -->
<script>
${progressJs()}
</script>`
  }
  return `<!-- Add before </body> -->
<script>
${trailJs(s)}
</script>`
}

/* --------------------------------------------------------- variants-tab demos */

/** Points along an S-curve inside a 640x420 stage, head last. */
function pathPoints(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1)
    return { t, x: 90 + t * 430, y: 250 - Math.sin(t * Math.PI * 1.6) * 110 + t * 40 }
  })
}

/**
 * Frozen frame of the trail: particles placed along a cursor path with the
 * age-based opacity/scale they would have mid-animation, plus a pointer at the head.
 */
export function trailDemoHtml(raw: TrailState): string {
  const s = normalizeTrail(raw)
  if (s.mode === 'progress') return progressDemoHtml(s)
  const pts = pathPoints(s.trailKind === 'follower' ? 2 : 16)
  const head = pts[pts.length - 1]!
  const colors = CONFETTI(s)
  const particles =
    s.trailKind === 'follower'
      ? `<div class="cursor-follower is-visible" style="transform: translate(${head.x - 22}px, ${head.y - 14}px)"></div>`
      : pts
          .slice(0, -1)
          .map((p, i, arr) => {
            const next = arr[i + 1] ?? head
            const age = 1 - p.t
            const vars = [`--x:${p.x.toFixed(0)}px`, `--y:${p.y.toFixed(0)}px`]
            if (s.trailKind === 'comet') vars.push(`--a:${Math.atan2(next.y - p.y, next.x - p.x).toFixed(2)}rad`)
            if (s.trailKind === 'star' || s.trailKind === 'confetti') vars.push(`--r:${(i * 47) % 360}deg`)
            if (s.trailKind === 'confetti') vars.push(`--c:${colors[i % colors.length]}`)
            const drop = s.trailKind === 'confetti' ? age * 50 : s.trailKind === 'bubble' ? -age * 40 : 0
            const scale = (s.trailKind === 'ring-burst' || s.trailKind === 'ink' ? 0.5 + age * 1.4 : 1 - age * 0.6) * 1.5
            return `<div class="trail-dot" style="${vars.join(';')};opacity:${(1 - age * 0.72).toFixed(2)};transform:translate(var(--x),var(--y)) translateY(${drop.toFixed(0)}px) rotate(var(--a, var(--r, 0deg))) scale(${scale.toFixed(2)})"></div>`
          })
          .join('\n  ')
  return `<div class="trail-demo">
  ${particles}
  <span class="trail-demo-pointer" style="left:${head.x}px;top:${head.y}px"></span>
  <p class="trail-demo-hint">Move the pointer to draw</p>
</div>`
}

const ARTICLE = `<h3>How we cut build times in half</h3>
    <p>Our CI pipeline had grown to 41 minutes. Most of it was waiting: cold caches, serial test shards and a Docker layer that rebuilt on every commit.</p>
    <p>We started by measuring. A week of traces showed three steps accounted for 70 percent of the wall clock, and none of them were the tests themselves.</p>
    <p>Moving dependency installs into a cached base image saved nine minutes on its own.</p>`

function progressDemoHtml(s: TrailState): string {
  return `<div class="trail-demo progress-demo" style="--progress: 0.45">
  <div class="scroll-progress"></div>
  <article class="progress-demo-article">
    ${ARTICLE}
  </article>
</div>`
}

/** Demo-only CSS: pins fixed elements to the stage and freezes animations for the snapshot. */
export function trailDemoCss(raw: TrailState): string {
  const s = normalizeTrail(raw)
  const ink = readableInk(s.stage)
  return `${trailCss(s)}

.trail-demo {
  position: relative;
  width: 640px;
  height: 420px;
  overflow: hidden;
  border-radius: 16px;
  background: radial-gradient(80% 60% at 30% 20%, ${mixHex(s.stage, s.accent, 0.08)}, ${s.stage});
  color: ${ink};
  font-family: system-ui, -apple-system, sans-serif;
}

.trail-demo .trail-dot,
.trail-demo .cursor-follower,
.trail-demo .scroll-progress {
  position: absolute;
  animation: none !important;
}

.trail-demo-pointer {
  position: absolute;
  width: 18px;
  height: 26px;
  background: ${ink};
  clip-path: polygon(0 0, 0 76%, 22% 59%, 38% 98%, 53% 92%, 38% 55%, 70% 55%);
  filter: drop-shadow(0 2px 3px rgb(0 0 0 / 0.5));
  translate: -1px -1px;
}

.trail-demo-hint {
  position: absolute;
  left: 24px;
  bottom: 18px;
  margin: 0;
  font-size: 12px;
  opacity: 0.55;
}

.progress-demo-article {
  height: 100%;
  overflow: hidden;
  padding: 44px 56px 0 ${s.progressKind === 'side-rail' ? 64 : 56}px;
  font-size: 15px;
  line-height: 1.65;
}

.progress-demo-article h3 {
  margin: 0 0 12px;
  font-size: 24px;
  letter-spacing: -0.02em;
}

.progress-demo-article p {
  margin: 0 0 12px;
  opacity: 0.75;
}`
}

export function trailVars(raw: TrailState): Record<string, string> {
  const s = normalizeTrail(raw)
  return { '--trail-accent': s.accent, '--trail-accent-2': s.accent2, '--trail-fade': `${s.fadeMs}ms` }
}

export function randomizeTrail(s: TrailState, rng: import('../rng').Rng): TrailState {
  const h = Math.floor(rng.range(0, 360))
  const base = normalizeTrail(s)
  return {
    ...base,
    trailKind: rng.pick(TRAIL_KINDS.map((k) => k.value)),
    progressKind: rng.pick(PROGRESS_KINDS.map((k) => k.value)),
    accent: hslToHex({ h, s: 80, l: 58 }),
    accent2: hslToHex({ h: (h + rng.pick([40, 120, 180])) % 360, s: 85, l: 60 }),
    size: Math.round(rng.range(5, 12)),
    fadeMs: Math.round(rng.range(450, 1200) / 50) * 50,
    spacing: rng.pick([6, 10, 14, 18]),
    barHeight: rng.pick([2, 3, 4, 6]),
    segments: rng.int(3, 8)
  }
}

const p = (o: Partial<TrailState>): TrailState => ({ ...DEFAULT_TRAIL, ...o })
const P = (o: Partial<TrailState>) => p({ mode: 'progress', ...o })

export const PRESETS_TRAIL: { name: string; tags: string[]; state: TrailState }[] = [
  { name: 'Emerald Sparkle', tags: ['trail'], state: p({}) },
  { name: 'Neon Comet', tags: ['trail', 'neon'], state: p({ trailKind: 'comet', accent: '#22d3ee', accent2: '#e0f2fe', size: 8, fadeMs: 600, spacing: 6 }) },
  { name: 'Soft Dots', tags: ['trail', 'minimal'], state: p({ trailKind: 'dot-fade', accent: '#a1a1aa', size: 6, fadeMs: 500 }) },
  { name: 'Ripple', tags: ['trail'], state: p({ trailKind: 'ring-burst', accent: '#8b5cf6', fadeMs: 700, spacing: 18 }) },
  { name: 'Twinkle Stars', tags: ['trail', 'playful'], state: p({ trailKind: 'star', accent: '#fde047', accent2: '#f59e0b', size: 9, fadeMs: 900, spacing: 14 }) },
  { name: 'Confetti', tags: ['trail', 'playful'], state: p({ trailKind: 'confetti', accent: '#10b981', accent2: '#38bdf8', size: 10, fadeMs: 1100, spacing: 8 }) },
  { name: 'Bubbles', tags: ['trail'], state: p({ trailKind: 'bubble', accent: '#7dd3fc', size: 12, fadeMs: 1200, spacing: 16 }) },
  { name: 'Ink Blot', tags: ['trail', 'soft'], state: p({ trailKind: 'ink', accent: '#f43f5e', size: 10, fadeMs: 900, spacing: 8 }) },
  { name: 'Smooth Follower', tags: ['trail', 'cursor'], state: p({ trailKind: 'follower', accent: '#10b981', size: 9 }) },
  { name: 'Blend Follower', tags: ['trail', 'cursor'], state: p({ trailKind: 'follower', blend: true, size: 10 }) },
  { name: 'Rose Sparkle', tags: ['trail', 'warm'], state: p({ accent: '#fb7185', size: 7, fadeMs: 800 }) },
  { name: 'Light Ripple', tags: ['trail', 'light'], state: p({ trailKind: 'ring-burst', accent: '#2563eb', stage: '#f8fafc', fadeMs: 650, spacing: 16 }) },
  { name: 'Top Progress', tags: ['progress'], state: P({}) },
  { name: 'Glow Bar', tags: ['progress', 'neon'], state: P({ progressKind: 'glow-bar', accent: '#a855f7', accent2: '#22d3ee', barHeight: 3 }) },
  { name: 'Thin Bar', tags: ['progress', 'minimal'], state: P({ barHeight: 2, accent: '#fafafa' }) },
  { name: 'Bottom Bar', tags: ['progress'], state: P({ progressKind: 'bottom-bar', accent: '#f59e0b', barHeight: 4 }) },
  { name: 'Chapters', tags: ['progress', 'story'], state: P({ progressKind: 'segments', accent: '#fafafa', segments: 5, barHeight: 3 }) },
  { name: 'Side Rail', tags: ['progress'], state: P({ progressKind: 'side-rail', accent: '#10b981', barHeight: 3 }) },
  { name: 'Corner Ring', tags: ['progress'], state: P({ progressKind: 'circle', accent: '#f59e0b', dotSize: 13, barHeight: 4 }) },
  { name: 'Side Pie', tags: ['progress', 'minimal'], state: P({ progressKind: 'side-dot', accent: '#0ea5e9', dotSize: 12 }) },
  { name: 'Light Ring', tags: ['progress', 'light'], state: P({ progressKind: 'circle', accent: '#4f46e5', stage: '#ffffff', dotSize: 13, barHeight: 3 }) },
  { name: 'Light Chapters', tags: ['progress', 'light'], state: P({ progressKind: 'segments', accent: '#18181b', stage: '#fafaf9', segments: 4, barHeight: 4 }) }
]
