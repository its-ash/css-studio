<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_TOAST,
  PRESETS_TOAST,
  TOAST_SKINS,
  TOAST_VARIANTS,
  toastCss,
  toastHtml,
  toastVars,
  randomizeToast
} from '~/utils/generators/toast'
import type { ToastState } from '~/utils/generators/toast'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<ToastState>({
  id: 'toast',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_TOAST)) as ToastState,
  randomize: randomizeToast
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => toastCss(state.value))
const html = computed(() => toastHtml(state.value))
const vars = computed(() => toastVars(state.value))
const demoStyle = computed(() => `<style>.preview-toast { display: grid; place-items: center; height: 100%; } .toast-stack { position: static !important; } ${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_TOAST[i]!.state)) as ToastState
  pushHistory()
}

const toastKey = ref(0)
function replay() {
  toastKey.value++
}


const variants = computed(() => PRESETS_TOAST.map((p) => ({ name: p.name, css: toastCss(p.state), html: toastHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Toast Notifications"
    description="Variants, skins, timers and entrance animation."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Toast preview" filename="css-studio-toast">
        <template #presets>
          <PreviewPresets :presets="PRESETS_TOAST" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="preview-toast h-full w-full">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div :key="toastKey" v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Toast" icon="ph-bell">
        <SelectControl v-model="state.skin" label="Skin" :options="TOAST_SKINS" />
        <SelectControl v-model="state.variant" label="Variant" :options="TOAST_VARIANTS" />
        <SelectControl
          v-model="state.position"
          label="Position"
          :options="[
            { value: 'top-right', label: 'Top Right' },
            { value: 'top-center', label: 'Top Center' },
            { value: 'bottom-right', label: 'Bottom Right' },
            { value: 'bottom-center', label: 'Bottom Center' }
          ]"
        />
        <SliderControl v-model="state.duration" label="Timer" :min="1500" :max="8000" :step="250" suffix="ms" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="24" suffix="px" />
        <ToggleControl v-model="state.showIcon" label="Show icon" />
        <ToggleControl v-model="state.showProgress" label="Progress timer" />
        <button type="button" class="h-9 rounded-lg border border-line bg-bg text-xs font-medium text-fg transition-colors duration-150 hover:bg-line/20" @click="replay">↻ Replay animation</button>
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Accent" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
        <ColorControl :model-value="state.textColor" label="Text" @update:model-value="(v) => (state.textColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-toast" />
    </template>
  </EditorPageShell>
</template>