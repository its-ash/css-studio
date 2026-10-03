<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_CHAT,
  PRESETS_CHAT,
  CHAT_SKINS,
  CHAT_TAILS,
  CHAT_TYPING,
  chatCss,
  chatHtml,
  chatVars,
  randomizeChat
} from '~/utils/generators/chat'
import type { ChatState } from '~/utils/generators/chat'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<ChatState>({
  id: 'chat',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_CHAT)) as ChatState,
  randomize: randomizeChat
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => chatCss(state.value))
const html = computed(() => chatHtml(state.value))
const vars = computed(() => chatVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)
const tailDisabled = computed(() => ['outline', 'brutal', 'minimal', 'thread', 'soft'].includes(state.value.skin))
const isThread = computed(() => state.value.skin === 'thread')

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_CHAT[i]!.state)) as ChatState
  pushHistory()
}


const variants = computed(() => PRESETS_CHAT.map((p) => ({ name: p.name, css: chatCss(p.state), html: chatHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Chat Bubbles"
    description="Nine chat skins with tails, grouping, avatars, receipts and typing indicators."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Chat preview" filename="css-studio-chat">
        <template #presets>
          <PreviewPresets :presets="PRESETS_CHAT" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div :key="state.entrance ? JSON.stringify(state) : 'static'" class="flex h-full w-full max-w-2xl items-center justify-center p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="w-full" v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Style" icon="ph-chats">
        <SelectControl v-model="state.skin" label="Skin" :options="CHAT_SKINS" />
        <SelectControl
          v-model="state.tail"
          :label="tailDisabled ? 'Tail (not used by this skin)' : 'Tail'"
          :options="CHAT_TAILS"
        />
        <SelectControl v-model="state.typing" label="Typing indicator" :options="CHAT_TYPING" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="28" suffix="px" />
        <SliderControl v-model="state.padding" label="Padding" :min="4" :max="18" suffix="px" />
        <SliderControl v-model="state.fontSize" label="Font size" :min="12" :max="20" suffix="px" />
        <SliderControl v-model="state.maxWidth" label="Bubble max width" :min="200" :max="480" :step="10" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Layout" icon="ph-list">
        <ToggleControl v-model="state.grouped" label="Group consecutive messages" />
        <ToggleControl v-model="state.avatars" label="Avatars" :hint="isThread ? 'Always on for Thread' : undefined" />
        <ToggleControl v-model="state.names" label="Sender names" :hint="isThread ? 'Always on for Thread' : undefined" />
        <ToggleControl v-model="state.timestamps" label="Timestamps" />
        <ToggleControl v-model="state.receipts" label="Read receipts" />
        <ToggleControl v-model="state.entrance" label="Entrance animation" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.sentBg" label="Sent bg" @update:model-value="(v) => (state.sentBg = v)" />
        <ColorControl :model-value="state.sentText" label="Sent text" @update:model-value="(v) => (state.sentText = v)" />
        <ColorControl :model-value="state.receivedBg" label="Received bg" @update:model-value="(v) => (state.receivedBg = v)" />
        <ColorControl :model-value="state.receivedText" label="Received text" @update:model-value="(v) => (state.receivedText = v)" />
        <ColorControl :model-value="state.accent" label="Accent (gradient / glass)" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.surface" label="Chat surface" @update:model-value="(v) => (state.surface = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-chat" />
    </template>
  </EditorPageShell>
</template>