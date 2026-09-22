/** Global hotkeys + Cmd/Ctrl+K command palette state. */

export interface Command {
  id: string
  label: string
  hint?: string
  icon?: string
  run(): void
}

const paletteOpen = ref(false)

export function useCommandPalette() {
  function open() {
    paletteOpen.value = true
  }
  function close() {
    paletteOpen.value = false
  }
  function toggle() {
    paletteOpen.value = !paletteOpen.value
  }
  return { paletteOpen, open, close, toggle }
}

export interface HotkeyBinding {
  key: string
  meta?: boolean
  handler: (e: KeyboardEvent) => void
}

export function useHotkeys(bindings: () => HotkeyBinding[]) {
  const onKey = (e: KeyboardEvent) => {
    for (const b of bindings()) {
      const metaMatch = b.meta ? e.metaKey || e.ctrlKey : !e.metaKey && !e.ctrlKey
      if (e.key.toLowerCase() === b.key.toLowerCase() && metaMatch) {
        const target = e.target as HTMLElement | null
        if (!b.meta && target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) continue
        e.preventDefault()
        b.handler(e)
        return
      }
    }
  }

  onMounted(() => window.addEventListener('keydown', onKey))
  onUnmounted(() => window.removeEventListener('keydown', onKey))
}