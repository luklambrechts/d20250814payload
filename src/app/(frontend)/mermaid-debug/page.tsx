import React from 'react'
import { MermaidDiagram } from '@/components/MermaidDiagram'

export default function MermaidDebugPage() {
  const testChart = `classDiagram
    class Animal {
        +String name
        +move()
    }
    class Dog {
        +bark()
    }
    class Bird {
        +fly()
    }
    Animal <|-- Dog
    Animal <|-- Bird`

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Mermaid Debug Page</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Direct Mermaid Component Test</h2>
        <MermaidDiagram chart={testChart} className="border border-gray-300 p-4" />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Raw Mermaid Code</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{testChart}</code>
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Markdown Block Test</h2>
        <div className="border border-gray-300 p-4">
          <div className="markdown-content">
            <pre className="language-mermaid">
              <code>{testChart}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
