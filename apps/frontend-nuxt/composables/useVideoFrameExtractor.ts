import {
  extractMultipleFrames,
  extractVideoFrame,
  extractVideoFrameAsBlob,
  extractVideoThumbnail,
  getVideoMetadata,
  type VideoMetadata,
} from '~/utils/videoFrameExtractor'

export const useVideoFrameExtractor = () => {
  const isExtracting = ref(false)
  const extractionError = ref<string | null>(null)

  /**
   * Extract a single frame from video
   */
  const extractFrame = async (
    videoUrl: string,
    timeInSeconds?: number,
    quality = 0.8,
  ): Promise<string | null> => {
    if (isExtracting.value) return null

    isExtracting.value = true
    extractionError.value = null

    try {
      const frameDataUrl = await extractVideoFrame(videoUrl, timeInSeconds, quality)
      return frameDataUrl
    } catch (error) {
      extractionError.value = error instanceof Error ? error.message : 'Failed to extract frame'
      return null
    } finally {
      isExtracting.value = false
    }
  }

  /**
   * Extract thumbnail with custom size
   */
  const extractThumbnail = async (
    videoUrl: string,
    width: number,
    height: number,
    timeInSeconds?: number,
  ): Promise<string | null> => {
    if (isExtracting.value) return null

    isExtracting.value = true
    extractionError.value = null

    try {
      const thumbnailDataUrl = await extractVideoThumbnail(videoUrl, width, height, timeInSeconds)
      return thumbnailDataUrl
    } catch (error) {
      extractionError.value = error instanceof Error ? error.message : 'Failed to extract thumbnail'
      return null
    } finally {
      isExtracting.value = false
    }
  }

  /**
   * Extract frame as blob for upload
   */
  const extractFrameAsBlob = async (
    videoUrl: string,
    timeInSeconds?: number,
    quality = 0.8,
  ): Promise<Blob | null> => {
    if (isExtracting.value) return null

    isExtracting.value = true
    extractionError.value = null

    try {
      const blob = await extractVideoFrameAsBlob(videoUrl, timeInSeconds, quality)
      return blob
    } catch (error) {
      extractionError.value = error instanceof Error ? error.message : 'Failed to extract frame as blob'
      return null
    } finally {
      isExtracting.value = false
    }
  }

  /**
   * Extract multiple frames at different times
   */
  const extractMultiFrames = async (
    videoUrl: string,
    times: number[],
    quality = 0.8,
  ): Promise<string[]> => {
    if (isExtracting.value) return []

    isExtracting.value = true
    extractionError.value = null

    try {
      const frames = await extractMultipleFrames(videoUrl, times, quality)
      return frames
    } catch (error) {
      extractionError.value = error instanceof Error ? error.message : 'Failed to extract multiple frames'
      return []
    } finally {
      isExtracting.value = false
    }
  }

  /**
   * Get video metadata
   */
  const getMetadata = async (videoUrl: string): Promise<VideoMetadata | null> => {
    if (isExtracting.value) return null

    isExtracting.value = true
    extractionError.value = null

    try {
      const metadata = await getVideoMetadata(videoUrl)
      return metadata
    } catch (error) {
      extractionError.value = error instanceof Error ? error.message : 'Failed to get video metadata'
      return null
    } finally {
      isExtracting.value = false
    }
  }

  /**
   * Create video preview images (beginning, middle, end)
   */
  const createVideoPreview = async (
    videoUrl: string,
    thumbnailSize = { width: 150, height: 100 },
  ): Promise<{ start: string, middle: string, end: string } | null> => {
    const metadata = await getMetadata(videoUrl)
    if (!metadata) return null

    const times = [
      0.5, // Start (0.5s to avoid black frames)
      metadata.duration / 2, // Middle
      metadata.duration - 1, // End (1s before end)
    ]

    const frames = await extractMultiFrames(videoUrl, times)
    if (frames.length !== 3) return null

    return {
      start: frames[0],
      middle: frames[1],
      end: frames[2],
    }
  }

  return {
    // State
    isExtracting: readonly(isExtracting),
    extractionError: readonly(extractionError),
    // Methods
    extractFrame,
    extractThumbnail,
    extractFrameAsBlob,
    extractMultiFrames,
    getMetadata,
    createVideoPreview,
    // Utilities
    clearError: () => { extractionError.value = null },
  }
}
