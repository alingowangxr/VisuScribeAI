import { useState } from 'react'

function convertBase64ToBlobUrl(dataUrl: string): string {
  if (!dataUrl.startsWith('data:')) return dataUrl

  try {
    const arr = dataUrl.split(',')
    const mimeMatch = arr[0].match(/:(.*?);/)
    const mime = mimeMatch ? mimeMatch[1] : 'image/png'
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    const blob = new Blob([u8arr], { type: mime })
    return URL.createObjectURL(blob)
  } catch (e) {
    console.error('Failed to convert base64 image to object URL', e)
    return dataUrl
  }
}

export function useGenerate() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generate = async (
    prompt: string,
    aspectRatio: '21:9' | '16:9',
    provider: string = 'gpt-image-2'
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
      if (data.url) {
        return convertBase64ToBlobUrl(data.url)
      }
      return null
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { generate, loading, error }
}
