import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'showEmailField',
      type: 'checkbox',
      label: 'Show Email Input Field',
      defaultValue: false,
    },
    {
      name: 'emailField',
      type: 'group',
      admin: {
        condition: (data) => data.showEmailField,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Email Field Label',
          defaultValue: 'Email Address',
        },
        {
          name: 'placeholder',
          type: 'text',
          label: 'Email Field Placeholder',
          defaultValue: 'Enter your email address',
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Send Button Text',
          defaultValue: 'Send',
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Required Field',
          defaultValue: true,
        },
      ],
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
