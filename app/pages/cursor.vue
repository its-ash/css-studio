<script setup lang="ts">
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
