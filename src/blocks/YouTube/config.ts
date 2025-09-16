import type { Block } from 'payload'

export const YouTube: Block = {
  slug: 'youtube',
  interfaceName: 'YouTubeBlock',
  fields: [
    {
      name: 'customClassName',
      type: 'text',
      label: 'Custom CSS Classes',
      admin: {
        description: 'Add custom CSS classes to this block (e.g., "my-custom-class bg-blue-100")',
      },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube URL',
      required: true,
      admin: {
        description: 'Enter a YouTube video URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)',
      },
      validate: (value: string | string[] | null | undefined) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return 'YouTube URL is required'
        const stringValue = Array.isArray(value) ? value[0] : value
        if (!stringValue) return 'YouTube URL is required'
        const youtubeRegex =
          /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[\w-]+/
        if (!youtubeRegex.test(stringValue)) {
          return 'Please enter a valid YouTube URL'
        }
        return true
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Video Title',
      admin: {
        description: 'Optional title for the video (used for accessibility)',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
      admin: {
        description: 'Optional caption for the video',
      },
    },
  ],
  labels: {
    plural: 'YouTube Videos',
    singular: 'YouTube Video',
  },
}
