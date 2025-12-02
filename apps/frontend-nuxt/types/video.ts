export interface VideoData {
  id: number
  name?: string
  title?: string
  description?: string
  badge?: string
  image?: string
  thumbnail?: string
  url?: string
  src?: string
  views?: number
  duration?: number
  publishedAt?: string
  [key: string]: unknown
}

export interface Comment {
  id: number
  user: {
    name: string
    avatar: string
    avatarColor: string
  }
  content: string
  timestamp: string
}

export interface VideoModalProps {
  isOpen: boolean
  currentVideo: VideoData | null
  videoList?: VideoData[]
  currentIndex?: number
}

export interface VideoModalEmits {
  close: []
  previous: []
  next: []
  commentSubmit: [comment: string]
}

export interface VideoPlayerControls {
  pause: () => void
  play: () => void
  reset: () => void
}