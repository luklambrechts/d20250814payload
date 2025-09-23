import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

// Helper function to extract YouTube video ID from URL
const extractYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false, // Make optional to prevent validation errors
    },
    {
      name: 'mediaType',
      type: 'select',
      defaultValue: 'upload',
      options: [
        {
          label: 'File Upload',
          value: 'upload',
        },
        {
          label: 'YouTube Video',
          value: 'youtube',
        },
      ],
      required: true,
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube URL',
      admin: {
        condition: (_, { mediaType }) => mediaType === 'youtube',
        description: 'Enter a YouTube video URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)',
      },
      validate: (
        value: string | string[] | null | undefined,
        { siblingData }: { siblingData?: { mediaType?: string } },
      ) => {
        if (siblingData?.mediaType === 'youtube') {
          if (!value || (Array.isArray(value) && value.length === 0))
            return 'YouTube URL is required when media type is YouTube'
          const stringValue = Array.isArray(value) ? value[0] : value
          if (!stringValue) return 'YouTube URL is required when media type is YouTube'
          const youtubeRegex =
            /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[\w-]+/
          if (!youtubeRegex.test(stringValue)) {
            return 'Please enter a valid YouTube URL'
          }
        }
        return true
      },
    },
    {
      name: 'youtubeId',
      type: 'text',
      admin: {
        condition: (_, { mediaType }) => mediaType === 'youtube',
        readOnly: true,
        description: 'Auto-extracted YouTube video ID',
      },
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    // Add file type restrictions
    mimeTypes: ['image/*', 'video/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
  // Make upload optional for YouTube videos
  admin: {
    useAsTitle: 'alt',
  },
  hooks: {
    beforeChange: [
      ({ data, req: _req }) => {
        // Auto-extract YouTube ID when YouTube URL is provided
        if (data?.mediaType === 'youtube' && data?.youtubeUrl) {
          const videoId = extractYouTubeId(data.youtubeUrl)
          if (videoId) {
            data.youtubeId = videoId
            // For YouTube videos, we don't need a file upload
            // Set a dummy filename to satisfy the upload requirement
            if (!data.filename) {
              data.filename = `youtube-${videoId}.mp4`
            }
          }
        }
        return data
      },
    ],
    beforeValidate: [
      ({ data, req: _req }) => {
        // Auto-generate alt text if missing for uploaded files
        if (data?.mediaType === 'upload' && !data?.alt && data?.filename) {
          data.alt = data.filename.replace(/\.[^/.]+$/, '') // Use filename without extension as alt text
        }

        // For YouTube videos, ensure URL is provided
        if (data?.mediaType === 'youtube' && !data?.youtubeUrl) {
          throw new Error('YouTube URL is required for YouTube media type')
        }

        return data
      },
    ],
  },
}
