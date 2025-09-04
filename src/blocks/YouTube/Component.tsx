'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

import type { YouTubeBlock as YouTubeBlockType } from '@/payload-types'

type Props = YouTubeBlockType & {
  disableInnerContainer?: boolean
}

// Helper function to extract YouTube video ID from URL
const extractYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export const YouTubeBlock: React.FC<Props> = ({
  customClassName,
  youtubeUrl,
  title,
  caption,
  disableInnerContainer,
}) => {
  if (!youtubeUrl) return null

  const videoId = extractYouTubeId(youtubeUrl)
  if (!videoId) return null

  return (
    <div className={cn('my-16', customClassName)}>
      <div className={cn(!disableInnerContainer && 'container mx-auto px-4')}>
        <div className="relative w-full">
          <div className="relative w-full h-0 pb-[56.25%]">
            {' '}
            {/* 16:9 aspect ratio */}
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title || 'YouTube video'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {caption && <p className="mt-4 text-sm text-gray-600 text-center">{caption}</p>}
        </div>
      </div>
    </div>
  )
}
