<script setup lang="ts">
import {
  PhPaintBrush, PhDrop, PhScribble, PhImage, PhGridFour, PhSquareHalf,
  PhTriangle, PhDropHalf, PhCircleDashed, PhTextAa, PhSparkle, PhBookmark,
  PhPalette, PhHouse, PhMagnifyingGlass, PhCaretDown, PhArrowCounterClockwise,
  PhArrowClockwise, PhShuffle, PhShareNetwork, PhSun, PhMoon, PhCopy,
  PhDownloadSimple, PhEye, PhEyeSlash, PhArrowUp, PhArrowDown, PhTrash,
  PhLockSimple, PhX, PhPlus, PhArrowsLeftRight, PhCheckCircle, PhWarningCircle,
  PhInfo, PhPencilSimple, PhStack, PhPaintBucket, PhCode, PhCircleHalf,
  PhSquare, PhSquaresFour, PhArrowsOut, PhMonitor, PhDeviceTablet, PhDeviceMobileCamera,
  PhCube, PhLayout, PhSpinnerGap, PhCursor, PhFunnel, PhRuler, PhTag, PhTextT, PhFlashlight, PhDotsNine
} from '@phosphor-icons/vue'
import { computed, type Component } from 'vue'

type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    weight?: IconWeight
  }>(),
  { size: 18, weight: 'regular' }
)

interface Entry {
  c: Component
  w?: IconWeight
}

const registry: Record<string, Entry> = {
  'ph-paint-brush': { c: PhPaintBrush },
  'ph-drop': { c: PhDrop },
  'ph-scribble': { c: PhScribble },
  'ph-image': { c: PhImage },
  'ph-grid-four': { c: PhGridFour },
  'ph-square-half': { c: PhSquareHalf },
  'ph-triangle': { c: PhTriangle },
  'ph-drop-half': { c: PhDropHalf },
  'ph-circle-dashed': { c: PhCircleDashed },
  'ph-text-aa': { c: PhTextAa },
  'ph-sparkle': { c: PhSparkle },
  'ph-bookmark': { c: PhBookmark },
  'ph-palette': { c: PhPalette },
  'ph-house': { c: PhHouse },
  'ph-magnifying-glass': { c: PhMagnifyingGlass },
  'ph-caret-down': { c: PhCaretDown },
  'ph-arrow-counter-clockwise': { c: PhArrowCounterClockwise },
  'ph-arrow-clockwise': { c: PhArrowClockwise },
  'ph-shuffle': { c: PhShuffle },
  'ph-share-network': { c: PhShareNetwork },
  'ph-sun': { c: PhSun },
  'ph-moon': { c: PhMoon },
  'ph-copy': { c: PhCopy },
  'ph-download-simple': { c: PhDownloadSimple },
  'ph-eye': { c: PhEye },
  'ph-eye-slash': { c: PhEyeSlash },
  'ph-arrow-up': { c: PhArrowUp },
  'ph-arrow-down': { c: PhArrowDown },
  'ph-trash': { c: PhTrash },
  'ph-lock-simple': { c: PhLockSimple },
  'ph-lock-simple-fill': { c: PhLockSimple, w: 'fill' },
  'ph-x': { c: PhX },
  'ph-plus': { c: PhPlus },
  'ph-arrows-left-right': { c: PhArrowsLeftRight },
  'ph-check-circle': { c: PhCheckCircle },
  'ph-warning-circle': { c: PhWarningCircle },
  'ph-info': { c: PhInfo },
  'ph-pencil-simple': { c: PhPencilSimple },
  'ph-stack': { c: PhStack },
  'ph-paint-bucket': { c: PhPaintBucket },
  'ph-code': { c: PhCode },
  'ph-circle-half': { c: PhCircleHalf },
  'ph-square': { c: PhSquare },
  'ph-squares-four': { c: PhSquaresFour },
  'ph-expand': { c: PhArrowsOut },
  'ph-monitor': { c: PhMonitor },
  'ph-device-tablet': { c: PhDeviceTablet },
  'ph-device-mobile-camera': { c: PhDeviceMobileCamera },
  'ph-cube': { c: PhCube },
  'ph-layout': { c: PhLayout },
  'ph-spinner-gap': { c: PhSpinnerGap },
  'ph-cursor': { c: PhCursor },
  'ph-funnel': { c: PhFunnel },
  'ph-ruler': { c: PhRuler },
  'ph-tag': { c: PhTag },
  'ph-text-t': { c: PhTextT },
  'ph-flashlight': { c: PhFlashlight },
  'ph-dots-nine': { c: PhDotsNine }
}

const resolved = computed<Entry>(() => registry[props.name] ?? { c: PhCircleDashed })
const weight = computed<IconWeight>(() => resolved.value.w ?? props.weight)
</script>

<template>
  <component :is="resolved.c" :size="props.size" :weight="weight" aria-hidden="true" />
</template>