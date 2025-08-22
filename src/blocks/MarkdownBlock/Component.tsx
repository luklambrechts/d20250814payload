import React from 'react'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/utilities/ui'

type MarkdownBlockProps = {
  md: string
  className?: string
}

export const MarkdownBlock: React.FC<MarkdownBlockProps> = ({ md, className }) => {
  return (
    <div className={cn('markdown-content prose dark:prose-invert max-w-none', className)}>
      <ReactMarkdown>{md}</ReactMarkdown>
    </div>
  )
}
