let toastId = 0

export interface Toast {
  id: number
  message: string
  tone: 'success' | 'error' | 'info'
}

const toasts = ref<Toast[]>([])
const timeouts = new Map<number, ReturnType<typeof setTimeout>>()

export function pushToast(message: string, tone: Toast['tone'] = 'success') {
  if (!import.meta.client) return
  toastId += 1
  const id = toastId
  toasts.value.push({ id, message, tone })
  const t = setTimeout(() => dismiss(id), 2200)
  timeouts.set(id, t)
}

export function dismiss(id: number) {
  toasts.value = toasts.value.filter((t) => t.id !== id)
  const t = timeouts.get(id)
  if (t) {
    clearTimeout(t)
    timeouts.delete(id)
  }
}

export function useToasts() {
  return { toasts, dismiss, pushToast }
}