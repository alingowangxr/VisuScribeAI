import { useState } from 'react'

export function useGenerate() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generate = async (
    prompt: string,
    aspectRatio: '21:9' | '16:9',
    provider: string = 'dalle'
  ): Promise<string | null> => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, aspectRatio, provider }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Failed to generate image')
      }

      const data = await response.json()
      return data.url
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { generate, loading, error }
}
