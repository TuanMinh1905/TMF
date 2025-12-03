// components/locator/ListStore.vue
<template>
  <Wrap>
    <!-- 🟡 Tiêu đề giống StoreLocator -->
    <div class="mb-6">
      <h2 class="text-[20px] lg:text-[22px] font-extrabold font-monasans text-black mb-1">
        Hệ thống cửa hàng
      </h2>
      <h3 class="text-[14px] font-monasans text-gray-700">
        Mua sắm tại cửa hàng gần nhất nha!
      </h3>
    </div>

    <!-- 🖼️ Banner -->
    <div class="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-300 to-yellow-400"
      @mouseenter="pause" @mouseleave="play">
      <div class="flex h-[380px] select-none md:h-[460px]" :style="trackStyle" @pointerdown="onPointerDown"
        @pointermove="onPointerMove" @pointerup="onPointerUp" @pointercancel="onPointerUp" @pointerleave="onPointerUp">
        <div v-for="(img, i) in slides" :key="i" class="min-w-full flex-shrink-0">
          <img :src="img" alt="Store banner" class="h-full w-full object-cover" />
        </div>
      </div>

      <!-- Prev / Next -->
      <button
        class="flexRow-center absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-white/90 shadow hover:bg-white focus:outline-none"
        @click="prev" aria-label="Previous slide">
        <span class="block text-xl leading-none mb-[3px]">‹</span>
      </button>
      <button
        class="flexRow-center absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-white/90 shadow hover:bg-white focus:outline-none"
        @click="next" aria-label="Next slide">
        <span class="block text-xl leading-none mb-[3px]">›</span>
      </button>

      <!-- Dots -->
      <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        <button v-for="(s, i) in slides" :key="'dot-' + i" class="h-2 rounded-full transition-all" :class="[
          i === index ? 'w-8 bg-[#FED519]' : 'w-2 bg-white hover:bg-gray-200'
        ]" @click="goTo(i)" :aria-label="`Go to slide ${i + 1}`" />
      </div>
    </div>
  </Wrap>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Wrap from '~/components/base/Wrap.vue'

// 🖼️ 3 ảnh banner mới
const slides = [
  'https://paddy.vn/cdn/shop/files/Paddy_Tran_Nao_1170x.png?v=1725593952',
  'https://paddy.vn/cdn/shop/files/Untitled_design_03c05b50-a9c0-4861-8724-61460ba2a817_1170x.jpg?v=1743650833',
  'https://paddy.vn/cdn/shop/files/168_1170x.jpg?v=1678602865'
]

const index = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const currentX = ref(0)
const slideCount = slides.length

const dragDelta = computed(() => (isDragging.value ? currentX.value - startX.value : 0))

const trackStyle = computed(() => {
  const base = -index.value * 100
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

/** Drag/Swipe */
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
  const threshold = 60
  if (Math.abs(delta) > threshold) delta < 0 ? next() : prev()
  isDragging.value = false
  startX.value = 0
  currentX.value = 0
  play()
}

/** Autoplay */
let timer: ReturnType<typeof setInterval> | null = null
const intervalMs = 2500

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

<style scoped>
.flexRow-center {
  @apply flex items-center justify-center;
}
</style>
