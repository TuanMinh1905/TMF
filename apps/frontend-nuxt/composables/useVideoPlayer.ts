export const useVideoPlayer = () => {
  const videoPlayer = ref<HTMLVideoElement | null>(null)
  const isLoading = ref(false)
  const hasError = ref(false)

  const onVideoLoaded = () => {
    isLoading.value = false
    hasError.value = false
  }

  const onVideoError = () => {
    isLoading.value = false
    hasError.value = true
  }

  const retryVideo = () => {
    if (videoPlayer.value) {
      hasError.value = false
      isLoading.value = true
      videoPlayer.value.load()
    }
  }

  const resetVideo = () => {
    if (videoPlayer.value) {
      videoPlayer.value.pause()
      videoPlayer.value.currentTime = 0
    }
  }

  const controls = {
    pause: () => videoPlayer.value?.pause(),
    play: () => videoPlayer.value?.play(),
    reset: resetVideo,
  }

  return {
    videoPlayer,
    isLoading,
    hasError,
    onVideoLoaded,
    onVideoError,
    retryVideo,
    controls,
  }
}