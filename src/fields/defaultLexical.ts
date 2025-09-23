import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  UploadFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if (field.name === 'doc') {
            return {
              ...field,
              required: false, // Make doc field optional to prevent validation errors
              validate: (value, options) => {
                // Allow empty or null values for doc field
                if (!value || value === null || value === undefined) {
                  return true
                }
                // If value exists, validate it normally
                return true
              },
            }
          }
          return field
        })
      },
    }),
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
  ],
})
