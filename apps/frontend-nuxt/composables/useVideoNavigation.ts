import type { VideoData } from '~/types/video'

export const useVideoNavigation = (
  videoList: Ref<VideoData[]>,
  currentIndex: Ref<number>,
) => {
  const hasPrevious = computed(() => currentIndex.value > 0)
  
  const hasNext = computed(() => 
    currentIndex.value < videoList.value.length - 1,
  )

  const goToPrevious = () => {
    if (hasPrevious.value) {
      currentIndex.value -= 1
    }
  }

  const goToNext = () => {
    if (hasNext.value) {
      currentIndex.value += 1
    }
  }

  const getCurrentVideo = computed(() => 
    videoList.value[currentIndex.value] || null,
  )

  return {
    hasPrevious,
    hasNext,
    goToPrevious,
    goToNext,
    getCurrentVideo,
  }
}