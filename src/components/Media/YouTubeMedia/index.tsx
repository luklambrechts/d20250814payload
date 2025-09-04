'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

import type { Props as MediaProps } from '../types'

export const YouTubeMedia: React.FC<MediaProps> = (props) => {
  const { className, resource } = props

  if (resource && typeof resource === 'object' && resource?.youtubeId) {
    const { youtubeId, alt } = resource

    return (
      <div className={cn('relative w-full', className)}>
        <div className="relative w-full h-0 pb-[56.25%]">
          {' '}
          {/* 16:9 aspect ratio */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={alt || 'YouTube video'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    )
  }

  return null
}
