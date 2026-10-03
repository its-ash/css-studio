<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_LINK,
  PRESETS_LINK,
  LINK_KINDS,
  linkCss,
  linkHtml,
  linkVars,
  randomizeLink
} from '~/utils/generators/link'
import type { LinkState } from '~/utils/generators/link'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<LinkState>({
  id: 'link',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_LINK)) as LinkState,
  randomize: randomizeLink
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => linkCss(state.value))
const html = computed(() => linkHtml())
const vars = computed(() => linkVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_LINK[i]!.state)) as LinkState
  pushHistory()
}


const variants = computed(() => PRESETS_LINK.map((p) => ({ name: p.name, css: linkCss(p.state), html: linkHtml() })))
</script>

<template>
  <EditorPageShell
    title="Link Underlines"
    description="10 animated underline styles for links and inline text."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Link preview" filename="css-studio-link">
        <template #presets>
          <PreviewPresets :presets="PRESETS_LINK" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
          <p class="max-w-xs text-center text-[11px] text-muted">Hover the link to preview the underline animation.</p>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Underline" icon="ph-link">
        <SelectControl v-model="state.kind" label="Style" :options="LINK_KINDS" />
        <SliderControl v-model="state.thickness" label="Thickness" :min="1" :max="6" suffix="px" />
        <SliderControl v-model="state.offset" label="Offset" :min="0" :max="10" suffix="px" />
        <SliderControl v-model="state.duration" label="Duration" :min="100" :max="600" :step="10" suffix="ms" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Underline" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.textColor" label="Text" @update:model-value="(v) => (state.textColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-link" />
    </template>
  </EditorPageShell>
</template>