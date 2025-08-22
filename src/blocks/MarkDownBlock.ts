// blocks/MarkdownBlock.ts
import type { Block } from 'payload'
export const MarkdownBlock: Block = {
  slug: 'Markdown',
  labels: { singular: 'Markdown', plural: 'Markdown' },
  fields: [
    {
      name: 'md',
      type: 'textarea',
      required: true,
      admin: { rows: 10, description: 'Raw Markdown (fenced allowed)' },
    },
  ],
  // Optional: MDX/MD converters so exports/imports work
  jsx: {
    // Lexical -> MDX/Markdown
    export: ({ fields }) => ({
      // As MDX component: <Markdown>...</Markdown>
      // children must be a string
      children: fields.md as string,
      // or, if you prefer pure Markdown with fences:
      // children: '```md\\n' + fields.md + '\\n```'
    }),
    // MDX/Markdown -> Lexical (when importing)
    import: ({ children }) => ({
      md: String(children ?? ''),
    }),
  },
}
