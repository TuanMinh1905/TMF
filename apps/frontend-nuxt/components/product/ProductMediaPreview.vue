<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <div
      class="relative flex h-[90%] w-[95%] max-w-5xl overflow-hidden rounded-lg bg-white shadow-lg"
    >
      <!-- Left: Main media -->
      <div class="relative flex flex-[2] items-center justify-center rounded-l-lg bg-white">
        <template v-if="currentMedia.type === 'video'">
          <video
            :src="currentMedia.src"
            autoplay
            controls
            class="max-h-full max-w-full object-contain"
          />
        </template>
        <template v-else>
          <img :src="currentMedia.src" alt="media" class="max-h-full max-w-full object-contain" />
        </template>

        <!-- Prev Button -->
        <button
          class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/70"
          @click="prevMedia"
        >
          ‹
        </button>
        <!-- Next Button -->
        <button
          class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/70"
          @click="nextMedia"
        >
          ›
        </button>
      </div>

      <!-- Right: Info + Thumbnails -->
      <div class="flex flex-[1.2] flex-col rounded-r-lg border-l border-gray-200 bg-white">
        <!-- Close button -->
        <button
          class="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow hover:bg-gray-200"
          @click="close"
        >
          ✕
        </button>

        <!-- Product title (ngay dưới nút close, không bị đè nữa) -->
        <div class="px-3 pb-2 pt-14 text-sm font-semibold text-gray-800">
          {{ props.product.name }}
        </div>

        <!-- Thumbnails: grid 3 cột -->
        <!-- grid-cols-3 giúp ép item về thành 3 cột và có w = 110, aspect-square -->
        <div class="grid grid-cols-3 gap-2 overflow-y-auto p-3">
          <div
            v-for="(media, index) in mediaList"
            :key="index"
            class="group relative aspect-square cursor-pointer overflow-hidden rounded border-2 transition"
            :class="
              index === currentIndex
                ? 'border-yellow-400'
                : 'border-transparent hover:border-yellow-400'
            "
            @click="setCurrent(index)"
          >
            <template v-if="media.type === 'video'">
              <video :src="media.src" class="h-full w-full object-cover" muted />
              <span
                class="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] text-white"
              >
                0:45
              </span>
            </template>
            <template v-else>
              <img :src="media.src" class="h-full w-full object-cover" />
            </template>
          </div>
        </div>
      </div>

      <!-- Close button -->
      <button
        class="absolute right-3 top-3 rounded-full bg-white p-2 shadow hover:bg-gray-200"
        @click="close"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const currentIndex = ref(0)
const mediaList = computed(() => {
  const media = []

  // Add video first if exists
  if (props.product.video) {
    media.push({
      type: 'video',
      src: props.product.video,
    })
  }

  // Add images
  if (Array.isArray(props.product.images)) {
    props.product.images.forEach((src) => {
      media.push({
        type: 'image',
        src,
      })
    })
  } else if (props.product.images) {
    // nếu chỉ là 1 ảnh string
    media.push({
      type: 'image',
      src: props.product.images,
    })
  }

  return media
})

const currentMedia = computed(() => mediaList.value[currentIndex.value])

const setCurrent = (index) => {
  currentIndex.value = index
  currentMedia.value = mediaList[index]
}

const prevMedia = () => {
  currentIndex.value = (currentIndex.value - 1 + mediaList.value.length) % mediaList.value.length
}
const nextMedia = () => {
  currentIndex.value = (currentIndex.value + 1) % mediaList.value.length
}
const close = () => emit('close')
</script>
