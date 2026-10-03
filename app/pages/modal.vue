<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_MODAL,
  PRESETS_MODAL,
  MODAL_KINDS,
  MODAL_ICON_STYLES,
  MODAL_FOOTERS,
  MODAL_PLACEMENTS,
  MODAL_SKINS,
  modalCss,
  modalHtml,
  modalPreviewCss,
  modalPreviewHtml,
  modalVars,
  normalizeModal,
  randomizeModal
} from '~/utils/generators/modal'
import type { ModalKind, ModalState } from '~/utils/generators/modal'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<ModalState>({
  id: 'modal',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_MODAL)) as ModalState,
  randomize: randomizeModal,
  deserialize: (raw) => normalizeModal(raw as unknown as ModalState)
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => modalCss(state.value))
const html = computed(() => modalHtml(state.value))
const vars = computed(() => modalVars(state.value))
const previewHtml = computed(() => modalPreviewHtml(state.value))
const demoStyle = computed(() => `<style>${modalPreviewCss(state.value)}</style>`)

/** Picking a content type also moves it to the placement it is designed for. */
function setKind(k: ModalKind) {
  const def = MODAL_KINDS.find((m) => m.value === k)
  state.value = { ...state.value, kind: k, placement: def?.placement ?? state.value.placement }
}

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_MODAL[i]!.state)) as ModalState
  pushHistory()
}

const replayKey = ref(0)

const variants = computed(() => PRESETS_MODAL.map((p) => ({ name: p.name, css: modalPreviewCss(p.state), html: modalPreviewHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Modal & Dialog"
    description="Fifteen dialog types, from confirms and sign-in to command palettes and drawers, on the native popover API."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" title="Modal preview" filename="css-studio-modal" @apply-variant="applyPreset">
        <template #presets>
          <PreviewPresets :presets="PRESETS_MODAL" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div :key="`${replayKey}-${state.kind}-${state.placement}`" class="h-full w-full" v-html="previewHtml"></div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Content" icon="ph-browser">
        <SelectControl :model-value="state.kind" label="Dialog type" :options="MODAL_KINDS" @update:model-value="(v) => setKind(v as ModalKind)" />
        <SelectControl v-model="state.placement" label="Placement" :options="MODAL_PLACEMENTS" />
        <ToggleControl v-model="state.showIcon" label="Icon" />
        <SelectControl v-if="state.showIcon" v-model="state.iconStyle" label="Icon style" :options="MODAL_ICON_STYLES" />
        <SelectControl v-model="state.footer" label="Actions" :options="MODAL_FOOTERS" />
        <ToggleControl v-model="state.showClose" label="Close button" />
      </ControlGroup>

      <ControlGroup label="Style" icon="ph-square-half">
        <SelectControl v-model="state.skin" label="Skin" :options="MODAL_SKINS" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="32" suffix="px" />
        <SliderControl v-model="state.width" label="Max width" :min="300" :max="720" :step="10" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Backdrop & motion" icon="ph-sparkle">
        <ColorControl :model-value="state.overlayColor" label="Backdrop color" @update:model-value="(v) => (state.overlayColor = v)" />
        <SliderControl v-model="state.overlayOpacity" label="Backdrop opacity" :min="0" :max="95" suffix="%" />
        <ToggleControl v-model="state.blur" label="Blur page behind" />
        <SliderControl v-model="state.duration" label="Duration" :min="120" :max="500" :step="10" suffix="ms" />
        <SliderControl v-if="state.placement === 'center'" v-model="state.scaleFrom" label="Start scale" :min="85" :max="100" suffix="%" />
        <button
          type="button"
          class="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-line text-xs font-medium text-muted transition-colors duration-150 hover:border-accent/60 hover:text-fg active:scale-[0.98]"
          @click="replayKey++"
        >
          <Icon name="ph-arrow-clockwise" :size="13" /> Replay entrance
        </button>
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Accent" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.bg" label="Surface" @update:model-value="(v) => (state.bg = v)" />
        <ColorControl :model-value="state.textColor" label="Text" @update:model-value="(v) => (state.textColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-modal" />
    </template>
  </EditorPageShell>
</template>
