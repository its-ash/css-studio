export type TerminalSkin = 'mac' | 'flat' | 'glass'

export interface TerminalState {
  skin: TerminalSkin
  bg: string
  titleBar: string
  title: string
  textColor: string
  promptColor: string
  commandColor: string
  outputColor: string
  fontSize: number
  radius: number
  showGrid: boolean
}

export const TERMINAL_SKINS: { value: TerminalSkin; label: string }[] = [
  { value: 'mac', label: 'macOS' },
  { value: 'flat', label: 'Flat' },
  { value: 'glass', label: 'Glass' }
]

export const DEFAULT_TERMINAL: TerminalState = {
  skin: 'mac',
  bg: '#0d1117',
  titleBar: '#161b22',
  title: 'zsh — css-studio',
  textColor: '#e6edf3',
  promptColor: '#10b981',
  commandColor: '#fafafa',
  outputColor: '#8b949e',
  fontSize: 13,
  radius: 12,
  showGrid: true
}

const COMMAND = 'npx hyperframes render promo'
const OUTPUT = '✓ Composition validated\n✓ Rendering 624 frames @ 30fps\n✓ Output: promo.mp4 (12.8s)'

export function terminalCss(s: TerminalState): string {
  const skins: Record<TerminalSkin, string> = {
    mac: `.terminal {
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
}`,
    flat: `.terminal {
  border: 1px solid rgba(255, 255, 255, 0.06);
}`,
    glass: `.terminal {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04) !important;
  backdrop-filter: blur(12px);
}`
  }
  const grid = s.showGrid
    ? `.terminal-body {
  background-image: linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 24px 24px;
}`
    : ''
  return `${skins[s.skin]}

.terminal {
  width: 480px;
  border-radius: ${s.radius}px;
  overflow: hidden;
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  background: ${s.bg};
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: ${s.titleBar};
}

.terminal-dots {
  display: flex;
  gap: 7px;
}

.terminal-dots span {
  width: 12px;
  height: 12px;
  border-radius: 999px;
}

.terminal-dots span:nth-child(1) {
  background: #ff5f57;
}

.terminal-dots span:nth-child(2) {
  background: #febc2e;
}

.terminal-dots span:nth-child(3) {
  background: #28c840;
}

.terminal-title {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: ${s.outputColor};
  margin-right: 52px;
}

.terminal-body {
  padding: 16px;
  font-size: ${s.fontSize}px;
  line-height: 1.7;
  color: ${s.textColor};
  min-height: 160px;
}

${grid}

.terminal-prompt {
  color: ${s.promptColor};
}

.terminal-command {
  color: ${s.commandColor};
}

.terminal-output {
  color: ${s.outputColor};
  white-space: pre-line;
}

.terminal-cursor {
  display: inline-block;
  width: 8px;
  height: 1.1em;
  background: ${s.promptColor};
  vertical-align: text-bottom;
  animation: term-blink 1s step-end infinite;
}

@keyframes term-blink {
  50% {
    opacity: 0;
  }
}`
}

export function terminalHtml(s: TerminalState): string {
  return `<div class="terminal">
  <div class="terminal-bar">
    <div class="terminal-dots"><span></span><span></span><span></span></div>
    <span class="terminal-title">${s.title}</span>
  </div>
  <div class="terminal-body">
    <div><span class="terminal-prompt">➜</span> <span class="terminal-command">${COMMAND}</span></div>
    <div class="terminal-output">${OUTPUT}</div>
    <div><span class="terminal-prompt">➜</span> <span class="terminal-cursor"></span></div>
  </div>
</div>`
}

export function terminalVars(s: TerminalState): Record<string, string> {
  return { '--term-bg': s.bg, '--term-prompt': s.promptColor, '--term-radius': `${s.radius}px` }
}

export function randomizeTerminal(s: TerminalState, rng: import('../rng').Rng): TerminalState {
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    skin: rng.pick(TERMINAL_SKINS.map((k) => k.value)),
    bg: `hsl(${h} 30% 6%)`,
    titleBar: `hsl(${h} 25% 12%)`,
    promptColor: `hsl(${h} 80% 55%)`,
    commandColor: `hsl(${h} 15% 96%)`,
    outputColor: `hsl(${h} 10% 60%)`,
    radius: rng.pick([0, 8, 12, 16]),
    showGrid: rng.chance(0.5)
  }
}

export const PRESETS_TERMINAL: { name: string; tags: string[]; state: TerminalState }[] = [
  { name: 'GitHub Dark', tags: ['dark'], state: { ...DEFAULT_TERMINAL } },
  { name: 'Emerald Prompt', tags: ['brand'], state: { ...DEFAULT_TERMINAL, promptColor: '#10b981', bg: '#09090b', titleBar: '#18181b' } },
  { name: 'Neon Grid', tags: ['neon', 'grid'], state: { ...DEFAULT_TERMINAL, promptColor: '#22d3ee', bg: '#020617', titleBar: '#0f172a', showGrid: true } },
  { name: 'Flat Minimal', tags: ['minimal'], state: { ...DEFAULT_TERMINAL, skin: 'flat', radius: 0, showGrid: false } },
  { name: 'Glass Panel', tags: ['glass'], state: { ...DEFAULT_TERMINAL, skin: 'glass', radius: 16, showGrid: false } },
  { name: 'Solarized', tags: ['retro'], state: { ...DEFAULT_TERMINAL, bg: '#002b36', titleBar: '#073642', promptColor: '#b58900', outputColor: '#93a1a1' } },
  { name: 'Amber CRT', tags: ['retro', 'crt'], state: { ...DEFAULT_TERMINAL, bg: '#1a0f00', titleBar: '#2b1a00', promptColor: '#fbbf24', commandColor: '#fde68a', showGrid: true } },
  { name: 'Violet Zsh', tags: ['brand'], state: { ...DEFAULT_TERMINAL, promptColor: '#8b5cf6', bg: '#0f0a1e', titleBar: '#181028' } },
  { name: 'Light Term', tags: ['light'], state: { ...DEFAULT_TERMINAL, bg: '#fafafa', titleBar: '#e4e4e7', textColor: '#18181b', commandColor: '#09090b', outputColor: '#71717a', promptColor: '#10b981' } },
  { name: 'Compact', tags: ['small'], state: { ...DEFAULT_TERMINAL, fontSize: 11, radius: 8, width: 420 } as TerminalState }
]