<template>
  <div>
    <!-- main image -->
    <video
      v-if="isVideo"
      class="flexRow-center aspect-square h-fit w-[450px] overflow-hidden bg-white"
      controls
      loop
      autoplay
      :src="product.video"
      @click="openPreview(product.video, 'video')"
    >
      Your browser does not support the video tag
    </video>
    <button
      v-else
      class="flexRow-center relative aspect-square h-fit w-[450px] overflow-hidden bg-white"
      @click="openPreview(mainImage || extractedVideoFrame || product.main_image, 'image')"
    >
      <!-- Show extracted video frame as main image if no specific image selected -->
      <img
        v-if="!mainImage && extractedVideoFrame"
        :src="extractedVideoFrame"
        :alt="product.title"
        class="max-h-[80%] max-w-[80%] object-cover lg:max-h-[100%] lg:max-w-[100%]"
      />
      <!-- Show regular image -->
      <img
        v-else
        :src="mainImage || product.main_image"
        :alt="product.title"
        class="max-h-[80%] max-w-[80%] object-cover lg:max-h-[100%] lg:max-w-[100%]"
      />
    </button>
    <!-- Video and images -->
    <div class="flex h-fit w-[450px] items-center gap-[6px] bg-white py-[12px]">
      <button
        v-if="images.length > VISIBLE"
        class="rounded-full bg-white p-2 shadow"
        :disabled="!canPrev"
        @click="prev"
      >
        ‹
      </button>

      <div
        v-if="hasVideo"
        class="relative flex h-[54px] w-[54px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[6.38px] bg-primary lg:h-[68px] lg:w-[70px]"
        @mouseenter="changeVideo()"
        @click="changeVideo()"
      >
        <!-- Show extracted frame instead of video -->
        <img
          v-if="extractedVideoFrame"
          :src="extractedVideoFrame"
          alt="Video thumbnail"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <!-- Fallback to video if no frame extracted yet -->
        <video v-else controls :src="product.video" class="h-full w-full object-cover">
          Your browser does not support the video tag
        </video>

        <!-- Play icon overlay -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="rounded-full bg-black/50 p-1">
            <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <button
        v-for="(image, index) in windowImages"
        :key="index"
        class="aspect-square h-[54px] w-[54px] overflow-hidden rounded-[6.38px] lg:h-[68px] lg:w-[70px]"
        @mouseenter="changeImage(image)"
        @click="(changeImage(image), openPreview(image, isVideo ? 'video' : 'image'))"
      >
        <img
          :src="image"
          :alt="product?.name"
          class="h-[54px] w-[54px] object-cover lg:h-[68px] lg:w-[70px]"
        />
      </button>

      <button
        v-if="images.length > VISIBLE"
        class="rounded-full bg-white p-2 shadow"
        :disabled="!canNext"
        @click="next"
      >
        ›
      </button>
    </div>

    <ProductMediaPreview
      v-if="showPreview"
      :product="product"
      :is-open="showPreview"
      @close="handleClosePreview"
    />
  </div>
</template>

<script setup lang="ts">
import { useVideoFrameExtractor } from '~/composables/useVideoFrameExtractor'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const mainImage = ref()
const extractedVideoFrame = ref<string | null>(null)
const { extractFrame } = useVideoFrameExtractor()

// Extract video frame for thumbnail
const extractVideoThumbnail = async () => {
  if (props.product?.video && !extractedVideoFrame.value) {
    try {
      const frame = await extractFrame(props.product.video, 2) // Extract at 2 seconds
      if (frame) {
        extractedVideoFrame.value = frame
      }
    } catch (error) {
      console.warn('Failed to extract video frame:', error)
    }
  }
}

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct?.main_image) {
      mainImage.value = newProduct.main_image
    }
    // Extract video frame when product changes
    if (newProduct?.video) {
      extractVideoThumbnail()
    }
  },
  { immediate: true },
)

onMounted(() => {
  // Extract video frame on mount if video exists
  if (props.product?.video) {
    extractVideoThumbnail()
  }
})

const isVideo = ref(false)
function changeImage(newImage: string) {
  isVideo.value = false
  mainImage.value = newImage
}
function changeVideo() {
  isVideo.value = true
}

const start = ref(0) // vị trí đầu của 5 items
const images = computed(() => props.product?.images ?? [])
const video = computed(() => props.product?.video)
const hasVideo = computed(() => !!video.value?.trim?.())
const VISIBLE = computed(() => (hasVideo.value ? 5 : 6))
const maxStart = computed(() => Math.max(0, images.value.length - VISIBLE.value))
const canPrev = computed(() => start.value > 0) // boolean
const canNext = computed(() => start.value + VISIBLE.value < images.value.length) // boolean
function prev() {
  if (canPrev.value) start.value--
}
function next() {
  if (canNext.value) start.value++
}
const windowImages = computed(() => images.value.slice(start.value, start.value + VISIBLE.value))
watch(
  () => images.value.length,
  () => {
    if (start.value > maxStart.value) start.value = maxStart.value
  },
)

function openPreview(media: string, type: 'image' | 'video') {
  selectedMedia.value = media
  selectedType.value = type
  showPreview.value = true
}
const showPreview = ref(false)
const selectedMedia = ref<string | null>(null)
const selectedType = ref<'image' | 'video'>('image')
function handleClosePreview() {
  showPreview.value = false
  selectedMedia.value = null
  selectedType.value = 'image'
}
</script>
