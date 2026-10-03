import { contrastRatio, hslToHex } from '../colors'

export type ChatSkin = 'bubble' | 'soft' | 'outline' | 'glass' | 'gradient' | 'flat' | 'brutal' | 'minimal' | 'thread'
export type ChatTail = 'none' | 'curve' | 'triangle'
export type ChatTyping = 'off' | 'bounce' | 'fade' | 'grow'

export interface ChatState {
  skin: ChatSkin
  tail: ChatTail
  typing: ChatTyping
  grouped: boolean
  avatars: boolean
  names: boolean
  timestamps: boolean
  receipts: boolean
  entrance: boolean
  sentBg: string
  sentText: string
  receivedBg: string
  receivedText: string
  accent: string
  surface: string
  radius: number
  maxWidth: number
  fontSize: number
  padding: number
}

export const CHAT_SKINS: { value: ChatSkin; label: string }[] = [
  { value: 'bubble', label: 'Bubble' },
  { value: 'soft', label: 'Soft tint' },
  { value: 'outline', label: 'Outline' },
  { value: 'glass', label: 'Glass' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'flat', label: 'Flat' },
  { value: 'brutal', label: 'Neo-brutal' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'thread', label: 'Thread (Slack-style)' }
]

export const CHAT_TAILS: { value: ChatTail; label: string }[] = [
  { value: 'curve', label: 'Curved' },
  { value: 'triangle', label: 'Triangle' },
  { value: 'none', label: 'None' }
]

export const CHAT_TYPING: { value: ChatTyping; label: string }[] = [
  { value: 'bounce', label: 'Bounce' },
  { value: 'fade', label: 'Fade' },
  { value: 'grow', label: 'Grow' },
  { value: 'off', label: 'Off' }
]

/** Skins whose shape cannot carry a seamless tail (borders, shadows or no bubble at all). */
const TAILLESS: ReadonlySet<ChatSkin> = new Set(['outline', 'brutal', 'minimal', 'thread', 'soft'])

export const DEFAULT_CHAT: ChatState = {
  skin: 'bubble',
  tail: 'curve',
  typing: 'bounce',
  grouped: true,
  avatars: true,
  names: true,
  timestamps: true,
  receipts: true,
  entrance: false,
  sentBg: '#10b981',
  sentText: '#022c22',
  receivedBg: '#27272a',
  receivedText: '#fafafa',
  accent: '#0ea5e9',
  surface: '#09090b',
  radius: 18,
  maxWidth: 320,
  fontSize: 15,
  padding: 10
}

const HEX = /^#[0-9a-f]{6}$/i

/** Picks a readable ink for chrome (names, timestamps, outline text) drawn directly on the surface. */
function inkOn(surface: string): string {
  if (!HEX.test(surface)) return '#fafafa'
  return contrastRatio('#fafafa', surface) >= contrastRatio('#18181b', surface) ? '#fafafa' : '#18181b'
}

/** Accepts states persisted by the previous generator version (boolean tail/typingDots, removed skins). */
export function normalizeChat(raw: ChatState): ChatState {
  const { typingDots, ...s } = raw as ChatState & { typingDots?: boolean }
  const legacy = s.tail as ChatTail | boolean
  const tail = legacy === true ? 'curve' : legacy === false ? 'none' : legacy
  return {
    ...DEFAULT_CHAT,
    ...s,
    skin: CHAT_SKINS.some((k) => k.value === s.skin) ? s.skin : 'bubble',
    tail: CHAT_TAILS.some((k) => k.value === tail) ? tail : 'curve',
    typing: CHAT_TYPING.some((k) => k.value === s.typing) ? s.typing : typingDots === false ? 'off' : 'bounce'
  }
}

interface Msg {
  dir: 'in' | 'out'
  name: string
  initials: string
  lines: string[]
  time: string
}

const CONVO: (Msg | 'day')[] = [
  'day',
  { dir: 'in', name: 'Maya Chen', initials: 'MC', lines: ['Pushed the new onboarding flow to staging.', 'Can you check the empty state on the projects page?'], time: '09:41' },
  { dir: 'out', name: 'You', initials: 'YO', lines: ['On it. The illustration feels heavy on mobile.', 'Trying a smaller version now.'], time: '09:42' },
  { dir: 'in', name: 'Maya Chen', initials: 'MC', lines: ['Good call. Ship it if the contrast passes.'], time: '09:44' },
  { dir: 'out', name: 'You', initials: 'YO', lines: ['Passes AA. Merging.'], time: '09:45' }
]

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function skinCss(s: ChatState): string {
  const skins: Record<ChatSkin, string> = {
    bubble: '',
    soft: `.chat-group .chat-msg {
  color: inherit;
}

.in .chat-msg {
  background: color-mix(in srgb, var(--chat-in-bg) 70%, transparent);
}

.out .chat-msg {
  background: color-mix(in srgb, var(--chat-out-bg) 22%, transparent);
}`,
    outline: `.chat-group .chat-msg {
  color: inherit;
}

.in .chat-msg {
  background: transparent;
  box-shadow: inset 0 0 0 1.5px var(--chat-in-bg);
}

.out .chat-msg {
  background: transparent;
  box-shadow: inset 0 0 0 1.5px var(--chat-out-bg);
}`,
    glass: `.chat {
  background:
    radial-gradient(60% 50% at 85% 20%, color-mix(in srgb, var(--chat-out-bg) 55%, transparent), transparent 70%),
    radial-gradient(55% 45% at 10% 90%, color-mix(in srgb, var(--chat-accent) 50%, transparent), transparent 70%),
    var(--chat-surface);
}

.chat-msg {
  -webkit-backdrop-filter: blur(14px) saturate(150%);
  backdrop-filter: blur(14px) saturate(150%);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.14);
}

.in .chat-msg {
  background: color-mix(in srgb, var(--chat-in-bg) 50%, transparent);
}

.out .chat-msg {
  background: color-mix(in srgb, var(--chat-out-bg) 62%, transparent);
}

@media (prefers-reduced-transparency: reduce) {
  .in .chat-msg { background: var(--chat-in-bg); }
  .out .chat-msg { background: var(--chat-out-bg); }
  .chat-msg { backdrop-filter: none; }
}`,
    gradient: `.out .chat-msg {
  background: linear-gradient(135deg, var(--chat-out-bg), var(--chat-accent));
}

.chat .out .chat-msg::after {
  background: var(--chat-accent);
}`,
    flat: '',
    brutal: `.chat-msg {
  box-shadow: inset 0 0 0 2px var(--chat-ink), 3px 3px 0 var(--chat-ink);
  font-weight: 500;
}

.chat-avatar {
  box-shadow: inset 0 0 0 2px var(--chat-ink);
}`,
    minimal: `.chat-group .chat-msg {
  background: none !important;
  color: inherit;
  border-radius: 0 !important;
  padding-block: 2px;
}

.in .chat-msg {
  padding-inline: 12px 0;
  box-shadow: inset 2px 0 0 var(--chat-in-bg);
}

.out .chat-msg {
  padding-inline: 0 12px;
  text-align: right;
  box-shadow: inset -2px 0 0 var(--chat-out-bg);
}`,
    thread: `.chat-group,
.chat-group.out {
  flex-direction: row;
  align-items: flex-start;
}

.chat-stack,
.out .chat-stack {
  align-items: flex-start;
  max-width: none;
}

.chat-group .chat-msg {
  background: none !important;
  color: inherit;
  padding: 0;
  border-radius: 0 !important;
}

.chat-name {
  margin: 0;
  opacity: 1;
}

.out .chat-avatar {
  background: var(--chat-out-bg);
  color: var(--chat-out-fg);
}

.chat-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.chat-head .chat-meta {
  margin: 0;
}`
  }
  return skins[s.skin]
}

function tailCss(s: ChatState): string {
  if (s.tail === 'none' || TAILLESS.has(s.skin)) return ''
  const last = s.grouped ? ':last-of-type' : ''
  const curve = s.tail === 'curve'
  const shape = (side: 'in' | 'out') =>
    curve
      ? `-webkit-mask: radial-gradient(circle at ${side === 'out' ? '100% 0' : '0 0'}, #0000 11.5px, #000 12px);
  mask: radial-gradient(circle at ${side === 'out' ? '100% 0' : '0 0'}, #0000 11.5px, #000 12px);`
      : `clip-path: polygon(${side === 'out' ? '0 0, 0 100%, 100% 100%' : '100% 0, 100% 100%, 0 100%'});`
  return `.chat-msg${last}::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 12px;
  height: 12px;
  background: inherit;
}

.in .chat-msg${last} {
  border-bottom-left-radius: 0;
}

.in .chat-msg${last}::after {
  left: -12px;
  ${shape('in')}
}

.out .chat-msg${last} {
  border-bottom-right-radius: 0;
}

.out .chat-msg${last}::after {
  right: -12px;
  ${shape('out')}
}`
}

function typingCss(s: ChatState): string {
  if (s.typing === 'off') return ''
  const frames: Record<Exclude<ChatTyping, 'off'>, string> = {
    bounce: `0%, 60%, 100% { transform: translateY(0); opacity: 0.45; }
  30% { transform: translateY(-4px); opacity: 1; }`,
    fade: `0%, 100% { opacity: 0.25; }
  40% { opacity: 1; }`,
    grow: `0%, 60%, 100% { transform: scale(0.6); opacity: 0.45; }
  30% { transform: scale(1); opacity: 1; }`
  }
  return `.chat-typing {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 1.45em;
}

.chat-typing span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  animation: chat-typing 1.2s ease-in-out infinite;
}

.chat-typing span:nth-child(2) { animation-delay: 160ms; }
.chat-typing span:nth-child(3) { animation-delay: 320ms; }

@keyframes chat-typing {
  ${frames[s.typing]}
}

@keyframes chat-typing-calm {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.9; }
}

@media (prefers-reduced-motion: reduce) {
  .chat-typing span { animation: chat-typing-calm 2s ease-in-out infinite; }
}`
}

export function chatCss(raw: ChatState): string {
  const s = normalizeChat(raw)
  const ink = inkOn(s.surface)
  const radius = s.skin === 'flat' ? Math.min(s.radius, 4) : s.skin === 'brutal' ? Math.min(s.radius, 10) : s.radius
  const tight = s.skin === 'flat' ? radius : Math.max(4, Math.round(radius / 3.5))
  const grouping = s.grouped
    ? `.in .chat-msg:not(:last-of-type) { border-bottom-left-radius: ${tight}px; }
.in .chat-msg:not(:first-of-type) { border-top-left-radius: ${tight}px; }
.out .chat-msg:not(:last-of-type) { border-bottom-right-radius: ${tight}px; }
.out .chat-msg:not(:first-of-type) { border-top-right-radius: ${tight}px; }`
    : `.chat-stack {
  gap: 8px;
}`
  const entrance = s.entrance
    ? `
.chat-group,
.chat-day {
  animation: chat-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i, 0) * 110ms);
}

@keyframes chat-in {
  from { opacity: 0; transform: translateY(8px) scale(0.97); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .chat-group,
  .chat-day { animation-name: chat-in-calm; animation-duration: 200ms; }
  @keyframes chat-in-calm { from { opacity: 0; } to { opacity: 1; } }
}
`
    : ''

  return `.chat {
  --chat-out-bg: ${s.sentBg};
  --chat-out-fg: ${s.sentText};
  --chat-in-bg: ${s.receivedBg};
  --chat-in-fg: ${s.receivedText};
  --chat-accent: ${s.accent};
  --chat-surface: ${s.surface};
  --chat-ink: ${ink};
  --chat-radius: ${radius}px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-width: ${s.maxWidth + 160}px;
  padding: 20px 22px;
  border-radius: 20px;
  background: var(--chat-surface);
  color: var(--chat-ink);
  font: 400 ${s.fontSize}px/1.45 system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.chat-day {
  align-self: center;
  font-size: 0.72em;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.55;
}

.chat-group {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.chat-group.out {
  flex-direction: row-reverse;
}

.chat-avatar {
  flex: none;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--chat-in-bg);
  color: var(--chat-in-fg);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.chat-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  min-width: 0;
  max-width: min(${s.maxWidth}px, 82%);
}

.out .chat-stack {
  align-items: flex-end;
}

.chat-name {
  margin: 0 ${s.padding + 2}px 2px;
  font-size: 0.75em;
  font-weight: 600;
  opacity: 0.7;
}

.chat-msg {
  position: relative;
  margin: 0;
  padding: ${s.padding}px ${Math.round(s.padding * 1.45)}px;
  border-radius: var(--chat-radius);
  overflow-wrap: anywhere;
}

.in .chat-msg {
  background: var(--chat-in-bg);
  color: var(--chat-in-fg);
}

.out .chat-msg {
  background: var(--chat-out-bg);
  color: var(--chat-out-fg);
}

${grouping}

.chat-meta {
  margin: 2px ${s.padding + 2}px 0;
  font-size: 0.7em;
  font-variant-numeric: tabular-nums;
  opacity: 0.55;
}

${skinCss(s)}

${tailCss(s)}
${entrance}
${typingCss(s)}`.replace(/\n{3,}/g, '\n\n').trim()
}

export function chatHtml(raw: ChatState): string {
  const s = normalizeChat(raw)
  const thread = s.skin === 'thread'
  const showAvatar = (dir: Msg['dir']) => thread || (s.avatars && dir === 'in')
  const showName = (dir: Msg['dir']) => thread || (s.names && dir === 'in')
  let i = 0
  const idx = () => (s.entrance ? ` style="--i: ${i++}"` : '')

  const meta = (m: Msg) => {
    const parts = [s.timestamps ? `<time>${m.time}</time>` : '', s.receipts && m.dir === 'out' && !thread ? 'Read' : ''].filter(Boolean)
    return parts.length ? `<span class="chat-meta">${parts.join(' · ')}</span>` : ''
  }

  const group = (m: Msg) => {
    const avatar = showAvatar(m.dir) ? `\n    <span class="chat-avatar" aria-hidden="true">${m.initials}</span>` : ''
    const head = thread
      ? `\n      <div class="chat-head"><span class="chat-name">${esc(m.name)}</span>${meta(m)}</div>`
      : showName(m.dir)
        ? `\n      <span class="chat-name">${esc(m.name)}</span>`
        : ''
    const lines = m.lines.map((l) => `\n      <p class="chat-msg">${esc(l)}</p>`).join('')
    const foot = thread ? '' : meta(m) ? `\n      ${meta(m)}` : ''
    return `  <div class="chat-group ${m.dir}"${idx()}>${avatar}
    <div class="chat-stack">${head}${lines}${foot}
    </div>
  </div>`
  }

  const body = CONVO.map((m) => (m === 'day' ? `  <div class="chat-day"${idx()}>Today</div>` : group(m))).join('\n')
  const typing =
    s.typing === 'off'
      ? ''
      : `\n  <div class="chat-group in"${idx()}>${showAvatar('in') ? '\n    <span class="chat-avatar" aria-hidden="true">MC</span>' : ''}
    <div class="chat-stack">
      <p class="chat-msg" role="status" aria-label="Maya is typing"><span class="chat-typing"><span></span><span></span><span></span></span></p>
    </div>
  </div>`
  return `<div class="chat" role="log" aria-label="Conversation">\n${body}${typing}\n</div>`
}

export function chatVars(raw: ChatState): Record<string, string> {
  const s = normalizeChat(raw)
  return {
    '--chat-out-bg': s.sentBg,
    '--chat-out-fg': s.sentText,
    '--chat-in-bg': s.receivedBg,
    '--chat-in-fg': s.receivedText,
    '--chat-accent': s.accent,
    '--chat-surface': s.surface,
    '--chat-radius': `${s.radius}px`
  }
}

export function randomizeChat(s: ChatState, rng: import('../rng').Rng): ChatState {
  const h = Math.floor(rng.range(0, 360))
  const h2 = (h + rng.pick([30, 60, 150, 200])) % 360
  const light = rng.chance(0.3)
  const sentL = rng.range(42, 58)
  return {
    ...normalizeChat(s),
    skin: rng.pick(CHAT_SKINS.map((k) => k.value)),
    tail: rng.pick(CHAT_TAILS.map((k) => k.value)),
    typing: rng.pick(CHAT_TYPING.map((k) => k.value)),
    grouped: rng.chance(0.8),
    avatars: rng.chance(0.7),
    entrance: rng.chance(0.3),
    sentBg: hslToHex({ h, s: rng.range(60, 85), l: sentL }),
    sentText: sentL > 50 ? hslToHex({ h, s: 80, l: 10 }) : '#ffffff',
    accent: hslToHex({ h: h2, s: 75, l: 55 }),
    receivedBg: light ? hslToHex({ h, s: 12, l: 92 }) : hslToHex({ h, s: 10, l: 17 }),
    receivedText: light ? hslToHex({ h, s: 20, l: 12 }) : hslToHex({ h, s: 15, l: 96 }),
    surface: light ? '#ffffff' : hslToHex({ h, s: 12, l: 5 }),
    radius: rng.pick([6, 12, 16, 18, 22]),
    padding: rng.pick([8, 10, 12])
  }
}

const p = (o: Partial<ChatState>): ChatState => ({ ...DEFAULT_CHAT, ...o })

export const PRESETS_CHAT: { name: string; tags: string[]; state: ChatState }[] = [
  { name: 'Emerald', tags: ['brand'], state: p({}) },
  { name: 'iMessage', tags: ['mobile', 'light'], state: p({ sentBg: '#0a84ff', sentText: '#ffffff', receivedBg: '#e9e9eb', receivedText: '#111111', surface: '#ffffff', radius: 20, avatars: false, names: false, timestamps: false }) },
  { name: 'iMessage Dark', tags: ['mobile'], state: p({ sentBg: '#0a84ff', sentText: '#ffffff', receivedBg: '#26252a', receivedText: '#ffffff', surface: '#000000', radius: 20, avatars: false, names: false }) },
  { name: 'WhatsApp', tags: ['mobile'], state: p({ sentBg: '#005c4b', sentText: '#e9edef', receivedBg: '#202c33', receivedText: '#e9edef', surface: '#0b141a', radius: 10, tail: 'triangle', avatars: false, names: false, padding: 8 }) },
  { name: 'Telegram', tags: ['mobile', 'light'], state: p({ sentBg: '#e3fee0', sentText: '#0f2a0c', receivedBg: '#ffffff', receivedText: '#111111', surface: '#c7d7b5', radius: 14, avatars: true, names: true }) },
  { name: 'Messenger Gradient', tags: ['gradient'], state: p({ skin: 'gradient', sentBg: '#a033ff', sentText: '#ffffff', accent: '#0099ff', receivedBg: '#303030', receivedText: '#e4e6eb', surface: '#18191a', radius: 20, tail: 'none' }) },
  { name: 'Frosted Glass', tags: ['glass'], state: p({ skin: 'glass', sentBg: '#8b5cf6', sentText: '#ffffff', receivedBg: '#3f3f46', receivedText: '#fafafa', accent: '#f43f5e', surface: '#0f0a1f', radius: 20 }) },
  { name: 'Soft Tint', tags: ['minimal'], state: p({ skin: 'soft', sentBg: '#10b981', receivedBg: '#27272a', surface: '#0c0c0e', radius: 16 }) },
  { name: 'Outline Mono', tags: ['outline'], state: p({ skin: 'outline', sentBg: '#fafafa', receivedBg: '#52525b', surface: '#09090b', radius: 14, avatars: false }) },
  { name: 'Neo-brutal', tags: ['bold', 'light'], state: p({ skin: 'brutal', sentBg: '#fde047', sentText: '#111111', receivedBg: '#ffffff', receivedText: '#111111', surface: '#f4f1ea', radius: 8 }) },
  { name: 'Slack Thread', tags: ['work'], state: p({ skin: 'thread', sentBg: '#1164a3', sentText: '#ffffff', receivedBg: '#e01e5a', receivedText: '#ffffff', surface: '#1a1d21', fontSize: 15, typing: 'fade' }) },
  { name: 'Discord', tags: ['work'], state: p({ skin: 'thread', sentBg: '#5865f2', sentText: '#ffffff', receivedBg: '#3ba55c', receivedText: '#ffffff', surface: '#313338', typing: 'bounce' }) },
  { name: 'Minimal Ink', tags: ['minimal', 'light'], state: p({ skin: 'minimal', sentBg: '#18181b', receivedBg: '#a1a1aa', surface: '#fafafa', avatars: false, typing: 'off' }) },
  { name: 'Flat Cards', tags: ['flat'], state: p({ skin: 'flat', sentBg: '#8b5cf6', sentText: '#ffffff', tail: 'none' }) },
  { name: 'Support Widget', tags: ['light'], state: p({ sentBg: '#4f46e5', sentText: '#ffffff', receivedBg: '#f1f5f9', receivedText: '#0f172a', surface: '#ffffff', radius: 16, tail: 'none', entrance: true, maxWidth: 260, fontSize: 14 }) },
  { name: 'Terminal Green', tags: ['retro'], state: p({ skin: 'outline', sentBg: '#22c55e', receivedBg: '#166534', surface: '#020a04', radius: 4, avatars: false, typing: 'fade' }) },
  { name: 'Animated Entrance', tags: ['motion'], state: p({ entrance: true, typing: 'grow', sentBg: '#f43f5e', sentText: '#ffffff', receivedBg: '#27272a' }) }
]
