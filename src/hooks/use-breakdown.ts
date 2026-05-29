import { useState } from 'react'
import { BodySpec, CoverSpec, ImagePlan } from '@/lib/types'

function tryParsePartialJson(text: string): any {
  if (!text.trim()) return null
  
  try {
    return JSON.parse(text)
  } catch {}
  
  let repaired = text.trim()
  const stack: ('}' | ']')[] = []
  let inString = false
  let escaped = false
  
  for (let i = 0; i < repaired.length; i++) {
    const char = repaired[i]
    if (escaped) {
      escaped = false
      continue
    }
    if (char === '\\') {
      escaped = true
      continue
    }
    if (char === '"') {
      inString = !inString
      continue
    }
    if (inString) continue
    
    if (char === '{') {
      stack.push('}')
    } else if (char === '[') {
      stack.push(']')
    } else if (char === '}') {
      if (stack[stack.length - 1] === '}') {
        stack.pop()
      }
    } else if (char === ']') {
      if (stack[stack.length - 1] === ']') {
        stack.pop()
      }
    }
  }
  
  if (inString) {
    repaired += '"'
  }
  
  for (let i = stack.length - 1; i >= 0; i--) {
    repaired += stack[i]
  }
  
  try {
    return JSON.parse(repaired)
  } catch {
    return null
  }
}

export function useBreakdown() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const breakdown = async (
    article: string,
    styleId: string,
    count: number,
    onProgress?: (plan: ImagePlan) => void
  ): Promise<ImagePlan | null> => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/breakdown', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article, style_id: styleId, count }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Failed to breakdown article')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      let result = ''
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        result += decoder.decode(value, { stream: true })
        
        if (onProgress) {
          const partial = tryParsePartialJson(result)
          if (partial && (partial.cover || (partial.bodies && partial.bodies.length > 0))) {
            onProgress(partial as ImagePlan)
          }
        }
      }

      return JSON.parse(result) as ImagePlan
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      return null
    } finally {
      setLoading(false)
    }
  }

  const regenerateImage = async (
    article: string,
    type: 'cover' | 'body',
    currentSpec: CoverSpec | BodySpec,
    styleId: string
  ): Promise<CoverSpec | BodySpec | null> => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/regenerate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article,
          type,
          current_spec: currentSpec,
          style_id: styleId,
        }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Failed to regenerate image')
      }

      const data = await response.json()
      return data
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { breakdown, regenerateImage, loading, error }
}
