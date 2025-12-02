<template>
  <div
    class="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-300 to-yellow-400"
    @mouseenter="pause"
    @mouseleave="play"
  >
    <!-- Track -->
    <div
      class="flex h-[380px] select-none md:h-[460px]"
      :style="trackStyle"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @pointerleave="onPointerUp"
    >
      <!-- Slide -->
      <component
        :is="name"
        v-for="(name) in slides"
        :key="name"
      />
    </div>

    <!-- Prev / Next -->
    <button
      class="flexRow-center absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-white/90 shadow hover:bg-white focus:outline-none"
      aria-label="Previous slide"
      @click="prev"
    >
      <span class="mb-[3px] block text-xl leading-none">‹</span>
    </button>
    <button
      class="flexRow-center absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-white/90 shadow hover:bg-white focus:outline-none"
      aria-label="Next slide"
      @click="next"
    >
      <span class="mb-[3px] block text-xl leading-none">›</span>
    </button>

    <!-- Dots -->
    <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
      <button
        v-for="(s, i) in slides"
        :key="'dot-' + i"
        class="h-2 rounded-full bg-slate-900/30 transition-all hover:bg-slate-900/60"
        :class="i === index ? 'w-8 bg-slate-900/90' : 'w-2'"
        :aria-label="`Go to slide ${i + 1}`"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

/** Demo data (code cứng). Bạn thay content/ảnh theo ý muốn */
const slides = ['BannerItemSliderDesktop1', 'BannerItemSliderDesktop2', 'BannerItemSliderDesktop3', 'BannerItemSliderDesktop4']

const index = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const currentX = ref(0)
const slideCount = slides.length

const dragDelta = computed(() => (isDragging.value ? currentX.value - startX.value : 0))

const trackStyle = computed(() => {
  const base = -index.value * 100
  // dùng calc để cộng thêm pixel kéo
  return {
    transform: `translateX(calc(${base}% + ${dragDelta.value}px))`,
    transition: isDragging.value ? 'none' : 'transform 400ms ease',
  }
})

function next() {
  index.value = (index.value + 1) % slideCount
}
function prev() {
  index.value = (index.value - 1 + slideCount) % slideCount
}
function goTo(i: number) {
  index.value = i
  restart()
}

/** Drag/Swipe (pointer events: hỗ trợ cả chuột & cảm ứng) */
function onPointerDown(e: PointerEvent) {
  isDragging.value = true
  startX.value = e.clientX
  currentX.value = e.clientX
  ; (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId)
  pause()
}
function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  currentX.value = e.clientX
}
function onPointerUp() {
  if (!isDragging.value) return
  const delta = currentX.value - startX.value
  const threshold = 60 // kéo quá 60px thì đổi slide
  if (Math.abs(delta) > threshold) {
    delta < 0 ? next() : prev()
  }
  isDragging.value = false
  startX.value = 0
  currentX.value = 0
  play()
}

/** Autoplay */
let timer: ReturnType<typeof setInterval> | null = null
const intervalMs = 3000

function play() {
  if (timer) return
  timer = setInterval(next, intervalMs)
}
function pause() {
  if (!timer) return
  clearInterval(timer)
  timer = null
}
function restart() {
  pause()
  play()
}

function handleVisibility() {
  document.hidden ? pause() : play()
}

onMounted(() => {
  play()
  document.addEventListener('visibilitychange', handleVisibility)
})
onUnmounted(() => {
  pause()
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>
