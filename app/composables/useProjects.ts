export interface StoredProject {
  id: string
  name: string
  createdAt: number
  updatedAt: number
  states: Record<string, unknown>
}

const PROJECTS_KEY = 'css-studio:projects'
const CURRENT_KEY = 'css-studio:current-project'

function readAll(): StoredProject[] {
  if (!import.meta.client) return []
  try {
    return JSON.parse(localStorage.getItem(PROJECTS_KEY) ?? '[]') as StoredProject[]
  } catch {
    return []
  }
}

function writeAll(list: StoredProject[]) {
  if (!import.meta.client) return
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(list))
  } catch {
    /* storage unavailable */
  }
}

function genId(): string {
  return `p-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`
}

export function useProjects() {
  const projects = ref<StoredProject[]>(readAll())
  const currentId = ref<string>(localStorage.getItem(CURRENT_KEY) ?? '')

  function persist() {
    writeAll(projects.value)
  }

  function create(name: string): StoredProject {
    const p: StoredProject = { id: genId(), name, createdAt: Date.now(), updatedAt: Date.now(), states: {} }
    projects.value.unshift(p)
    persist()
    setCurrent(p.id)
    return p
  }

  function setCurrent(id: string) {
    currentId.value = id
    if (import.meta.client) localStorage.setItem(CURRENT_KEY, id)
  }

  const current = computed(() => projects.value.find((p) => p.id === currentId.value))

  function rename(id: string, name: string) {
    const p = projects.value.find((x) => x.id === id)
    if (!p) return
    p.name = name
    p.updatedAt = Date.now()
    persist()
  }

  function duplicate(id: string): StoredProject | undefined {
    const src = projects.value.find((x) => x.id === id)
    if (!src) return undefined
    const copy: StoredProject = { ...JSON.parse(JSON.stringify(src)), id: genId(), name: `${src.name} copy`, createdAt: Date.now(), updatedAt: Date.now() }
    projects.value.unshift(copy)
    persist()
    return copy
  }

  function remove(id: string) {
    projects.value = projects.value.filter((p) => p.id !== id)
    if (currentId.value === id) {
      currentId.value = projects.value[0]?.id ?? ''
      if (import.meta.client) localStorage.setItem(CURRENT_KEY, currentId.value)
    }
    persist()
  }

  function saveGeneratorState(genId: string, state: unknown) {
    const p = current.value
    if (!p) return
    p.states[genId] = state
    p.updatedAt = Date.now()
    persist()
  }

  function exportJson(id: string): string {
    const p = projects.value.find((x) => x.id === id)
    return p ? JSON.stringify(p, null, 2) : ''
  }

  function importJson(json: string): boolean {
    try {
      const p = JSON.parse(json) as StoredProject
      if (typeof p?.name !== 'string' || typeof p?.states !== 'object') return false
      p.id = genId()
      p.createdAt = Date.now()
      p.updatedAt = Date.now()
      projects.value.unshift(p)
      persist()
      return true
    } catch {
      return false
    }
  }

  if (!projects.value.length && import.meta.client) {
    create('Untitled Project')
  }

  return { projects, current, currentId, create, rename, duplicate, remove, saveGeneratorState, exportJson, importJson, setCurrent }
}