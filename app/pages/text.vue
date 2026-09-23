<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import { DEFAULT_TEXT_EFFECT, TEXT_EFFECT_KINDS, PRESETS_TEXT_EFFECT, textEffectCss, textEffectStyle, textEffectVars, randomizeTextEffect } from '~/utils/generators/text'
import type { TextEffectState } from '~/utils/generators/text'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<TextEffectState>({
    id: 'text',
    defaultState: JSON.parse(JSON.stringify(DEFAULT_TEXT_EFFECT)) as TextEffectState,
    randomize: randomizeTextEffect
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => { })
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => textEffectCss(state.value))
const vars = computed(() => textEffectVars(state.value))
const style = computed(() => textEffectStyle(state.value))

function applyPreset(i: number) {
    state.value = JSON.parse(JSON.stringify(PRESETS_TEXT_EFFECT[i]!.state)) as TextEffectState
    pushHistory()
}

const html = computed(() => `<h1 class="text-effect">${state.value.text}</h1>`)

useSeoMeta({
  title: 'Text Effects - CSS Studio',
  description: 'Gradient, neon, 3D, metallic and glass text styles in pure CSS.',
  ogTitle: 'Text Effects - CSS Studio',
  ogDescription: 'Gradient, neon, 3D, metallic and glass text styles in pure CSS.',
  ogUrl: 'https://css-studio.itsash.in/text',
  twitterTitle: 'Text Effects - CSS Studio',
  twitterDescription: 'Gradient, neon, 3D, metallic and glass text styles in pure CSS.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/text' }] })
</script>

<template>
    <EditorPageShell title="Text Effects" description="Gradient, neon, 3D, metallic and glass text styles in pure CSS."
        :css="css" :html="html" :vars="vars" @randomize="randomize" @reset="reset" @undo="undo" @redo="redo">
        <template #preview>
            <PreviewCanvas title="Text effect preview" filename="css-studio-text">
                <template #presets>
                    <PreviewPresets :presets="PRESETS_TEXT_EFFECT" @apply="applyPreset" />
                </template>
                <div class="flex h-full w-full max-w-3xl items-center justify-center overflow-hidden">
                    <span class="overflow-hidden text-ellipsis whitespace-nowrap font-bold"
                        :style="{ fontSize: `${state.size}px`, fontWeight: state.weight, ...style }"
                        aria-label="Text effect preview">
                        {{ state.text }}
                    </span>
                </div>
            </PreviewCanvas>
        </template>

        <template #controls>
            <ControlGroup label="Effect" icon="ph-text-aa">
                <SelectControl v-model="state.kind" label="Kind" :options="TEXT_EFFECT_KINDS" />
                <TextControl v-model="state.text" label="Text" placeholder="Your text" />
                <SliderControl v-model="state.size" label="Font size" :min="24" :max="160" suffix="px" />
                <SliderControl v-model="state.angle" label="Gradient angle" :min="0" :max="360" suffix="°" />
                <SliderControl v-model="state.weight" label="Font weight" :min="300" :max="900" :step="100" />
                <ColorControl :model-value="state.color" label="Color 1"
                    @update:model-value="(v) => (state.color = v)" />
                <ColorControl :model-value="state.color2" label="Color 2"
                    @update:model-value="(v) => (state.color2 = v)" />
            </ControlGroup>
        </template>

        <template #code>
            <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-text" />
        </template>
    </EditorPageShell>
</template>