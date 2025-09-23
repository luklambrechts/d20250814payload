import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
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
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false, // Make optional to prevent validation errors
      validate: (value, options) => {
        // Allow null/undefined values
        if (!value) return true

        // If value exists, check if it's a valid relationship
        if (typeof value === 'string' || (typeof value === 'object' && value.id)) {
          return true
        }

        // If it's an invalid relationship, allow it but log a warning
        console.warn('Invalid media relationship detected:', value)
        return true
      },
    },
  ],
}
