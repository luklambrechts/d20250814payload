import React from 'react'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/utilities/ui'
import { MermaidDiagram } from '@/components/MermaidDiagram'

type MarkdownBlockProps = {
  md: string
  className?: string
}

export const MarkdownBlock: React.FC<MarkdownBlockProps> = ({ md, className }) => {
  return (
    <div className={cn('markdown-content prose dark:prose-invert max-w-none', className)}>
      <ReactMarkdown
        components={{
          code: ({ children, className, ...props }) => {
            // Handle inline code (no className means inline)
            if (!className) {
              return (
                <code
                  className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm"
                  {...props}
                >
                  {children}
                </code>
              )
            }

            // Check if this is a mermaid code block
            if (className?.includes('language-mermaid')) {
              console.log('MarkdownBlock: Found mermaid code block:', String(children))
              return (
                <MermaidDiagram
                  key={`mermaid-${Date.now()}`}
                  chart={String(children)}
                  className="my-6"
                />
              )
            }

            // For other code blocks, let the pre component handle it
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          pre: ({ children, ...props }) => {
            // Check if children is a code element
            const child = React.Children.only(children) as React.ReactElement<{
              className?: string
              children?: React.ReactNode
            }>
            if (child?.type === 'code') {
              const codeClassName = child.props.className
              const codeContent = child.props.children

              // Check if this is a mermaid code block
              if (codeClassName?.includes('language-mermaid')) {
                console.log('MarkdownBlock: Found mermaid code block in pre:', String(codeContent))
                return (
                  <MermaidDiagram
                    key={`mermaid-${Date.now()}`}
                    chart={String(codeContent)}
                    className="my-6"
                  />
                )
              }

              // Regular code block
              return (
                <pre className={cn('bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto')}>
                  <code className={codeClassName} {...child.props}>
                    {codeContent}
                  </code>
                </pre>
              )
            }

            // Fallback for other pre elements
            return <pre {...props}>{children}</pre>
          },
        }}
      >
        {md}
      </ReactMarkdown>
    </div>
  )
}
