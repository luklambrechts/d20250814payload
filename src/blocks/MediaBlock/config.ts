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
      required: true,
    },
  ],
}
