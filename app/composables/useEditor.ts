import { encodeState, decodeState } from '~/utils/encode'
import { makeRng, randomSeed } from '~/utils/rng'

export interface EditorActions<T> {
  randomize(s: T): T
  reset(): void
}

export interface EditorOptions<T> {
  id: string
  defaultState: T
  randomize: (s: T, rng: ReturnType<typeof makeRng>) => T
  serialize?: (s: T) => unknown
  deserialize?: (raw: unknown) => T
  debounceMs?: number
  urlDebounceMs?: number
}

const LS_PREFIX = 'css-studio:state:'

export function useEditor<T extends object>(opts: EditorOptions<T>) {
  const route = useRoute()
  const router = useRouter()

  const key = `${LS_PREFIX}${opts.id}`
  const rngSeed = ref<number>(randomSeed())
  const state = ref<T>(loadState()) as Ref<T>
  const history = ref<string[]>([])
  const historyIndex = ref(-1)

  function withDefaults(partial: Record<string, unknown>): T {
    return { ...opts.defaultState, ...partial } as T
  }

  function loadState(): T {
    const fromUrl = route.query.state as string | undefined
    if (fromUrl) {
      const decoded = decodeState<Record<string, unknown>>(fromUrl)
      if (decoded) return opts.deserialize ? opts.deserialize(withDefaults(decoded) as unknown as Record<string, unknown>) : withDefaults(decoded)
    }
    if (import.meta.client) {
      const raw = localStorage.getItem(key)
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as Record<string, unknown>
          return opts.deserialize ? opts.deserialize(withDefaults(parsed) as unknown as Record<string, unknown>) : withDefaults(parsed)
        } catch {
          /* corrupted state falls back to defaults */
        }
      }
    }
    return opts.defaultState
  }

  // Seed history with initial snapshot
  history.value = [JSON.stringify(opts.serialize ? opts.serialize(state.value) : state.value)]
  historyIndex.value = 0

  let urlTimer: ReturnType<typeof setTimeout> | null = null
  let urlGeneration = 0

  /** Live-sync state into the ?state= URL param (debounced, no history spam) so the URL is always shareable. */
  function syncUrl() {
    if (!import.meta.client) return
    if (urlTimer) clearTimeout(urlTimer)
    const gen = ++urlGeneration
    urlTimer = setTimeout(() => {
      if (gen !== urlGeneration) return
      const payload = opts.serialize ? opts.serialize(state.value) : state.value
      const code = encodeState(payload)
      const url = `${route.path}?state=${code}`
      window.history.replaceState(window.history.state, '', url)
    }, opts.urlDebounceMs ?? 350)
  }

  // Fires only on user mutations, never on setup, so URL-loaded state isn't rewritten until tweaked.
  if (import.meta.client) {
    watch(state, syncUrl, { deep: true })
  }

  let saveTimer: ReturnType<typeof setTimeout> | null = null
  watch(
    state,
    () => {
      if (!import.meta.client) return
      if (saveTimer) clearTimeout(saveTimer)
      saveTimer = setTimeout(() => {
        const payload = opts.serialize ? opts.serialize(state.value) : state.value
        try {
          localStorage.setItem(key, JSON.stringify(payload))
        } catch {
          /* storage full or unavailable */
        }
      }, opts.debounceMs ?? 400)
    },
    { deep: true }
  )

  function commit() {
    const snap = JSON.stringify(opts.serialize ? opts.serialize(state.value) : state.value)
    if (history.value[historyIndex.value] === snap) return
    history.value = history.value.slice(0, historyIndex.value + 1)
    history.value.push(snap)
    if (history.value.length > 100) history.value.shift()
    historyIndex.value = history.value.length - 1
  }

  /** Call after a discrete user action (randomize, preset apply) to create an undo point. */
  function pushHistory() {
    commit()
  }

  function undo() {
    if (historyIndex.value <= 0) return
    historyIndex.value -= 1
    restore()
  }

  function redo() {
    if (historyIndex.value >= history.value.length - 1) return
    historyIndex.value += 1
    restore()
  }

  function restore() {
    const raw = history.value[historyIndex.value]
    if (!raw) return
    const parsed = JSON.parse(raw) as Record<string, unknown>
    state.value = opts.deserialize ? opts.deserialize(parsed) : (parsed as T)
  }

  const canUndo = computed(() => historyIndex.value > 0)
  const canRedo = computed(() => historyIndex.value < history.value.length - 1)

  function randomize() {
    rngSeed.value = randomSeed()
    const rng = makeRng(rngSeed.value)
    state.value = opts.randomize(state.value, rng)
    commit()
  }

  function reset() {
    rngSeed.value = randomSeed()
    state.value = opts.defaultState
    commit()
  }

  function shareUrl(): string {
    const payload = opts.serialize ? opts.serialize(state.value) : state.value
    const code = encodeState(payload)
    return `${window.location.origin}${route.path}?state=${code}`
  }

  const shareUrlRef = computed(() => {
    if (!import.meta.client) return ''
    return shareUrl()
  })

  async function copyShareUrl(): Promise<boolean> {
    const url = shareUrl()
    try {
      await navigator.clipboard.writeText(url)
      return true
    } catch {
      return false
    }
  }

  function applyState(raw: unknown) {
    const next = opts.deserialize ? opts.deserialize(raw) : (raw as T)
    if (next) {
      state.value = next
      commit()
    }
  }

  return { state, randomize, reset, undo, redo, canUndo, canRedo, shareUrl, shareUrlRef, copyShareUrl, applyState, pushHistory, rngSeed }
}