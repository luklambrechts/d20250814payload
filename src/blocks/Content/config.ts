import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  AlignFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UploadFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          UploadFeature({
            collections: {
              media: {
                fields: [
                  {
                    name: 'alt',
                    type: 'text',
                    label: 'Alt Text',
                    required: true,
                  },
                ],
              },
            },
          }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          AlignFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
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
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
