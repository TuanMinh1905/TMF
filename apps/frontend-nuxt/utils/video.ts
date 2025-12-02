export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// export const formatDate = (dateString: string): string => {
//   const date = new Date(dateString)
//   return date.toLocaleDateString('vi-VN')
// }

export const getVideoSrc = (video: { url?: string; src?: string } | null): string => {
  return video?.url || video?.src || ''
}