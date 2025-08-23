'use client'

import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { cn } from '@/utilities/ui'

interface MermaidDiagramProps {
  chart: string
  className?: string
  theme?: 'default' | 'forest' | 'dark' | 'neutral'
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  chart,
  className,
  theme = 'default',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRendered, setIsRendered] = useState(false)

  console.log('MermaidDiagram: Component rendered with chart:', chart)
  console.log('MermaidDiagram: mermaid import check:', typeof mermaid)
  console.log('MermaidDiagram: Component state - isRendered:', isRendered, 'error:', error)

  useEffect(() => {
    console.log('MermaidDiagram: useEffect triggered with chart:', chart)
    console.log('MermaidDiagram: Component mounted, starting initialization...')

    const initializeMermaid = async () => {
      try {
        console.log('MermaidDiagram: Initializing with chart:', chart)
        console.log('MermaidDiagram: mermaid library available:', typeof mermaid)

        // Initialize mermaid with theme
        mermaid.initialize({
          startOnLoad: false,
          theme: theme,
          securityLevel: 'loose',
        })

        if (containerRef.current && chart) {
          console.log('MermaidDiagram: Container and chart found, rendering...')
          console.log('MermaidDiagram: Chart content:', chart)

          // Clear previous content
          containerRef.current.innerHTML = ''

          // Generate unique ID for this diagram
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
          containerRef.current.id = id

          // Render the diagram
          const { svg } = await mermaid.render(id, chart)
          containerRef.current.innerHTML = svg
          setIsRendered(true)
          setError(null)
          console.log('MermaidDiagram: Successfully rendered')
        } else {
          console.log('MermaidDiagram: Missing container or chart', {
            hasContainer: !!containerRef.current,
            hasChart: !!chart,
          })
        }
      } catch (err) {
        console.error('Mermaid rendering error:', err)
        setError(err instanceof Error ? err.message : 'Failed to render diagram')
        setIsRendered(false)
      }
    }

    initializeMermaid()
  }, [chart, theme])

  if (error) {
    return (
      <div className={cn('p-4 border border-red-200 bg-red-50 rounded-lg', className)}>
        <div className="text-red-800 font-medium mb-2">Diagram Error</div>
        <div className="text-red-600 text-sm">{error}</div>
        <details className="mt-2">
          <summary className="text-red-600 text-sm cursor-pointer">Show Mermaid Code</summary>
          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">{chart}</pre>
        </details>
      </div>
    )
  }

  return (
    <div className={cn('mermaid-diagram', className)}>
      <div
        ref={containerRef}
        className={cn(
          'flex justify-center',
          !isRendered && 'animate-pulse bg-gray-100 rounded-lg p-8',
        )}
      />
      {!isRendered && !error && (
        <div className="mt-2 text-sm text-gray-500">
          <p>Rendering diagram... (Debug: useEffect should have run)</p>
          <details className="mt-2">
            <summary className="cursor-pointer">Show raw chart</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">{chart}</pre>
          </details>
        </div>
      )}
      {error && (
        <div className="mt-2 text-sm text-red-500">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  )
}
