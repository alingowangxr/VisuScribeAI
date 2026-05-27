import { useState } from 'react'
import { BodySpec, CoverSpec, ImagePlan } from '@/lib/types'

export function useBreakdown() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const breakdown = async (
    article: string,
    styleId: string,
    count: number
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

      // Vercel AI SDK streamObject returns a stream of JSON patches or full objects
      // For simplicity in the first pass, we'll collect the full result
      // But we can implement partial updates if needed using server actions
      // or manual stream parsing.

      // Let's use a simpler way for now: collect the stream as text and parse as JSON
      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      let result = ''
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        result += decoder.decode(value, { stream: true })
        // If we want real-time UI updates, we'd parse partial JSON here
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
