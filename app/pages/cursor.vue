<script setup lang="ts">
import { pushToast } from '~/composables/useToast'
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_CURSOR,
  PRESETS_CURSOR,
  CURSOR_KINDS,
  cursorCss,
  cursorHtml,
  cursorVars,
  randomizeCursor
} from '~/utils/generators/cursor'
import type { CursorState } from '~/utils/generators/cursor'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<CursorState>({
  id: 'cursor',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_CURSOR)) as CursorState,
  randomize: randomizeCursor
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => cursorCss(state.value))
const html = computed(() => cursorHtml())
const vars = computed(() => cursorVars(state.value))

const fallbackKinds = computed(() => CURSOR_KINDS.filter((k) => k.value !== 'image'))

const MAX_IMAGE_BYTES = 512 * 1024

function onImagePick(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    pushToast('Pick an image file', 'error')
    return
  }
  if (file.size > MAX_IMAGE_BYTES) {
    pushToast('Image too large (max 512KB) — cursors must stay small', 'error')
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    state.value.imageData = reader.result as string
    pushHistory()
  }
  reader.onerror = () => pushToast('Could not read image', 'error')
  reader.readAsDataURL(file)
}

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_CURSOR[i]!.state)) as CursorState
  pushHistory()
}

useSeoMeta({
  title: 'Cursor & Selection - CSS Studio',
  description: 'Custom cursor and ::selection color playground.',
  ogTitle: 'Cursor & Selection - CSS Studio',
  ogDescription: 'Custom cursor and ::selection color playground.',
  ogUrl: 'https://css-studio.itsash.in/cursor',
  twitterTitle: 'Cursor & Selection - CSS Studio',
  twitterDescription: 'Custom cursor and ::selection color playground.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/cursor' }] })
</script>

<template>
  <EditorPageShell
    title="Cursor & Selection Generator"
    description="Custom cursor and ::selection color playground."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Cursor preview" filename="css-studio-cursor">
        <template #presets>
          <PreviewPresets :presets="PRESETS_CURSOR" @apply="applyPreset" />
        </template>
        <component :is="'style'">{{ css }}</component>
        <div class="flex h-[420px] w-full max-w-2xl items-center justify-center p-10">
          <p class="cursor-demo max-w-md select-text text-center text-lg leading-relaxed text-fg" aria-label="Cursor and selection preview">
            Hover this box to see the cursor, and select this text to see the highlight color.
          </p>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Cursor" icon="ph-cursor">
        <SelectControl v-model="state.kind" label="Cursor type" :options="CURSOR_KINDS" />

        <template v-if="state.kind === 'image'">
          <label class="flex flex-col gap-1.5">
            <span class="text-xs font-medium text-fg">Cursor image</span>
            <div class="flex items-center gap-3">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-line bg-bg bg-size-[16px_16px] bg-center bg-no-repeat"
                :style="{ backgroundImage: state.imageData ? `url(${state.imageData})` : undefined }"
              />
              <label
                class="inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-colors duration-150 hover:border-line-strong hover:bg-line/20"
              >
                <Icon name="ph-upload-simple" :size="14" class="text-accent" />
                Upload image
                <input type="file" accept="image/*" class="sr-only" @change="onImagePick" />
              </label>
            </div>
            <span class="text-[11px] text-muted">Stored as base64 (data URL) inline in the CSS — max 512KB, ideally 32×32px.</span>
          </label>

          <SliderControl v-model="state.imageHotspotX" label="Hotspot X" :min="0" :max="64" suffix="px" />
          <SliderControl v-model="state.imageHotspotY" label="Hotspot Y" :min="0" :max="64" suffix="px" />
          <SelectControl v-model="state.imageFallback" label="Fallback cursor" :options="fallbackKinds" />
        </template>
      </ControlGroup>

      <ControlGroup label="Selection" icon="ph-text-aa">
        <ToggleControl v-model="state.useCustomSelection" label="Custom selection color" />
        <template v-if="state.useCustomSelection">
          <ColorControl :model-value="state.selectionBg" label="Selection background" @update:model-value="(v) => (state.selectionBg = v)" />
          <ColorControl :model-value="state.selectionColor" label="Selection text color" @update:model-value="(v) => (state.selectionColor = v)" />
        </template>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-cursor" />
    </template>
  </EditorPageShell>
</template>
