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
        {
          name: 'size',
          type: 'group',
          label: 'Field Size',
          fields: [
            {
              name: 'width',
              type: 'number',
              label: 'Visible Width (characters)',
              defaultValue: 40,
              min: 10,
              max: 100,
            },
            {
              name: 'maxLength',
              type: 'number',
              label: 'Maximum Length',
              defaultValue: 254,
              min: 50,
              max: 500,
            },
          ],
        },
      ],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'link',
          type: 'group',
          admin: {
            hideGutter: true,
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  type: 'radio',
                  admin: {
                    layout: 'horizontal',
                    width: '50%',
                  },
                  defaultValue: 'reference',
                  options: [
                    {
                      label: 'Internal link',
                      value: 'reference',
                    },
                    {
                      label: 'Custom URL',
                      value: 'custom',
                    },
                  ],
                },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  admin: {
                    style: {
                      alignSelf: 'flex-end',
                    },
                    width: '50%',
                  },
                  label: 'Open in new tab',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'reference',
                  type: 'relationship',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'reference',
                    width: '50%',
                  },
                  label: 'Document to link to',
                  relationTo: ['pages', 'posts'],
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'custom',
                    width: '50%',
                  },
                  label: 'Custom URL',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                  label: 'Label',
                  required: true,
                },
              ],
            },
            {
              name: 'appearance',
              type: 'select',
              admin: {
                description: 'Choose how the link should be rendered.',
              },
              defaultValue: 'default',
              options: [
                {
                  label: 'Default',
                  value: 'default',
                },
                {
                  label: 'Outline',
                  value: 'outline',
                },
              ],
            },
          ],
        },
      ],
      maxRows: 2,
      required: false,
      admin: {
        initCollapsed: true,
        description: 'Add links to display alongside the call to action. This field is optional.',
      },
    },
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
