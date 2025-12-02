/**
 * Extract frame from video at specified time and return as image data URL
 * @param videoUrl - URL of the video
 * @param timeInSeconds - Time in seconds to extract frame (default: middle of video)
 * @param quality - Image quality 0-1 (default: 0.8)
 * @param format - Image format (default: 'image/jpeg')
 * @returns Promise<string> - Data URL of the extracted frame
 */
export const extractVideoFrame = async (
  videoUrl: string,
  timeInSeconds?: number,
  quality: number = 0.8,
  format: 'image/jpeg' | 'image/png' = 'image/jpeg'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Canvas context not available'))
      return
    }

    // Handle CORS for cross-origin videos
    video.crossOrigin = 'anonymous'
    video.muted = true // Prevent audio issues

    // Set up video element
    video.onloadedmetadata = () => {
      // Set canvas size to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Calculate time to extract frame
      const extractTime = timeInSeconds ?? video.duration / 2

      // Seek to specified time
      video.currentTime = Math.min(extractTime, video.duration - 0.1)
    }

    // Extract frame when video seeks to specified time
    video.onseeked = () => {
      try {
        // Draw video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        // Convert canvas to data URL
        const frameDataUrl = canvas.toDataURL(format, quality)
        
        // Clean up
        video.remove()
        
        resolve(frameDataUrl)
      } catch (error) {
        video.remove()
        reject(new Error(`Failed to extract frame: ${error}`))
      }
    }

    // Handle errors
    video.onerror = () => {
      video.remove()
      reject(new Error('Failed to load video'))
    }

    video.onabort = () => {
      video.remove()
      reject(new Error('Video loading aborted'))
    }

    // Start loading video
    video.src = videoUrl
  })
}

/**
 * Extract multiple frames from video at different times
 * @param videoUrl - URL of the video
 * @param times - Array of times in seconds to extract frames
 * @param quality - Image quality 0-1 (default: 0.8)
 * @returns Promise<string[]> - Array of data URLs
 */
export const extractMultipleFrames = async (
  videoUrl: string,
  times: number[],
  quality: number = 0.8
): Promise<string[]> => {
  const frames: string[] = []
  
  for (const time of times) {
    try {
      const frame = await extractVideoFrame(videoUrl, time, quality)
      frames.push(frame)
    } catch (error) {
      console.warn(`Failed to extract frame at ${time}s:`, error)
      frames.push('') // Add empty string for failed extractions
    }
  }
  
  return frames
}

/**
 * Extract frame and return as Blob for upload/storage
 * @param videoUrl - URL of the video
 * @param timeInSeconds - Time in seconds to extract frame
 * @param quality - Image quality 0-1 (default: 0.8)
 * @returns Promise<Blob> - Image blob
 */
export const extractVideoFrameAsBlob = async (
  videoUrl: string,
  timeInSeconds?: number,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Canvas context not available'))
      return
    }

    video.crossOrigin = 'anonymous'
    video.muted = true

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const extractTime = timeInSeconds ?? video.duration / 2
      video.currentTime = Math.min(extractTime, video.duration - 0.1)
    }

    video.onseeked = () => {
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        canvas.toBlob((blob) => {
          video.remove()
          
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Failed to create blob'))
          }
        }, 'image/jpeg', quality)
      } catch (error) {
        video.remove()
        reject(new Error(`Failed to extract frame: ${error}`))
      }
    }

    video.onerror = () => {
      video.remove()
      reject(new Error('Failed to load video'))
    }

    video.src = videoUrl
  })
}

/**
 * Extract video thumbnail with custom dimensions
 * @param videoUrl - URL of the video
 * @param width - Desired width of thumbnail
 * @param height - Desired height of thumbnail
 * @param timeInSeconds - Time in seconds to extract frame
 * @returns Promise<string> - Data URL of resized thumbnail
 */
export const extractVideoThumbnail = async (
  videoUrl: string,
  width: number,
  height: number,
  timeInSeconds?: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Canvas context not available'))
      return
    }

    video.crossOrigin = 'anonymous'
    video.muted = true

    // Set desired canvas size
    canvas.width = width
    canvas.height = height

    video.onloadedmetadata = () => {
      const extractTime = timeInSeconds ?? video.duration / 2
      video.currentTime = Math.min(extractTime, video.duration - 0.1)
    }

    video.onseeked = () => {
      try {
        // Calculate aspect ratio and positioning for proper scaling
        const videoAspect = video.videoWidth / video.videoHeight
        const canvasAspect = width / height

        let drawWidth = width
        let drawHeight = height
        let offsetX = 0
        let offsetY = 0

        if (videoAspect > canvasAspect) {
          // Video is wider - fit height and center horizontally
          drawWidth = height * videoAspect
          offsetX = (width - drawWidth) / 2
        } else {
          // Video is taller - fit width and center vertically
          drawHeight = width / videoAspect
          offsetY = (height - drawHeight) / 2
        }

        // Fill background with black
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, width, height)

        // Draw video frame with proper scaling
        ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight)
        
        const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.8)
        video.remove()
        
        resolve(thumbnailDataUrl)
      } catch (error) {
        video.remove()
        reject(new Error(`Failed to extract thumbnail: ${error}`))
      }
    }

    video.onerror = () => {
      video.remove()
      reject(new Error('Failed to load video'))
    }

    video.src = videoUrl
  })
}

/**
 * Get video metadata (duration, dimensions)
 * @param videoUrl - URL of the video
 * @returns Promise<VideoMetadata>
 */
export interface VideoMetadata {
  duration: number
  width: number
  height: number
  aspectRatio: number
}

export const getVideoMetadata = async (videoUrl: string): Promise<VideoMetadata> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.crossOrigin = 'anonymous'
    video.muted = true

    video.onloadedmetadata = () => {
      const metadata: VideoMetadata = {
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        aspectRatio: video.videoWidth / video.videoHeight,
      }
      
      video.remove()
      resolve(metadata)
    }

    video.onerror = () => {
      video.remove()
      reject(new Error('Failed to load video metadata'))
    }

    video.src = videoUrl
  })
}