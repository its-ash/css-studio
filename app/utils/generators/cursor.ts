export type CursorKind =
  | 'default' | 'pointer' | 'grab' | 'grabbing' | 'text' | 'crosshair'
  | 'move' | 'not-allowed' | 'zoom-in' | 'help' | 'wait' | 'none'

export interface CursorState {
  kind: CursorKind
  selectionBg: string
  selectionColor: string
  useCustomSelection: boolean
}

export const CURSOR_KINDS: { value: CursorKind; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'pointer', label: 'Pointer' },
  { value: 'grab', label: 'Grab' },
  { value: 'grabbing', label: 'Grabbing' },
  { value: 'text', label: 'Text' },
  { value: 'crosshair', label: 'Crosshair' },
  { value: 'move', label: 'Move' },
  { value: 'not-allowed', label: 'Not Allowed' },
  { value: 'zoom-in', label: 'Zoom In' },
  { value: 'help', label: 'Help' },
  { value: 'wait', label: 'Wait' },
  { value: 'none', label: 'None (hidden)' }
]

export const DEFAULT_CURSOR: CursorState = {
  kind: 'pointer',
  selectionBg: '#10b981',
  selectionColor: '#052e1a',
  useCustomSelection: true
}

export function cursorCss(s: CursorState): string {
  const lines = [`.cursor-demo {`, `  cursor: ${s.kind};`, `}`]
  if (s.useCustomSelection) {
    lines.push(
      ``,
      `.cursor-demo::selection {`,
      `  background: ${s.selectionBg};`,
      `  color: ${s.selectionColor};`,
      `}`
    )
  }
  return lines.join('\n')
}

export function cursorHtml(): string {
  return `<div class="cursor-demo">Hover and select this text</div>`
}

export function cursorVars(s: CursorState): Record<string, string> {
  return { '--cursor-kind': s.kind, '--selection-bg': s.selectionBg, '--selection-color': s.selectionColor }
}

export function randomizeCursor(s: CursorState, rng: import('../rng').Rng): CursorState {
  const kinds = CURSOR_KINDS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    kind: rng.pick(kinds),
    selectionBg: `hsl(${h} 80% 50%)`,
    selectionColor: `hsl(${h} 80% 10%)`,
    useCustomSelection: rng.chance(0.8)
  }
}

export const PRESETS_CURSOR: { name: string; tags: string[]; state: CursorState }[] = [
  { name: 'Emerald Select', tags: ['brand'], state: { ...DEFAULT_CURSOR } },
  { name: 'Pointer Rose', tags: ['warm'], state: { ...DEFAULT_CURSOR, kind: 'pointer', selectionBg: '#f43f5e', selectionColor: '#4c0519' } },
  { name: 'Grab Hand', tags: ['drag'], state: { ...DEFAULT_CURSOR, kind: 'grab', selectionBg: '#8b5cf6', selectionColor: '#2e1065' } },
  { name: 'Crosshair Precision', tags: ['tool'], state: { ...DEFAULT_CURSOR, kind: 'crosshair', selectionBg: '#38bdf8', selectionColor: '#082f49' } },
  { name: 'Text Caret', tags: ['text'], state: { ...DEFAULT_CURSOR, kind: 'text', selectionBg: '#f59e0b', selectionColor: '#451a03' } },
  { name: 'Disabled State', tags: ['state'], state: { ...DEFAULT_CURSOR, kind: 'not-allowed', selectionBg: '#71717a', selectionColor: '#18181b' } },
  { name: 'Zoom Explorer', tags: ['tool'], state: { ...DEFAULT_CURSOR, kind: 'zoom-in', selectionBg: '#06b6d4', selectionColor: '#083344' } },
  { name: 'No Selection', tags: ['minimal'], state: { ...DEFAULT_CURSOR, useCustomSelection: false } }
]
