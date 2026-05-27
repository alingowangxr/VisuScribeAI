import { openai } from '@ai-sdk/openai'
import { generateImage } from 'ai'

export interface ImageGenOptions {
  prompt: string
  aspectRatio: '21:9' | '16:9'
}

export interface ImageGenProvider {
  generate: (options: ImageGenOptions) => Promise<string>
}

export class DalleProvider implements ImageGenProvider {
  async generate({ prompt, aspectRatio }: ImageGenOptions): Promise<string> {
    // Note: Vercel AI SDK generateImage currently returns a URL or base64
    // DALL-E 3 supports '1024x1024' or '1792x1024' (wide) or '1024x1792' (tall)
    // We'll map our ratios to DALL-E 3 sizes
    const size = aspectRatio === '21:9' || aspectRatio === '16:9' ? '1792x1024' : '1024x1024'
    
    // Using native OpenAI fetch if generateImage is not yet fully available/stable in current SDK version for images
    // Or just use the experimental generateImage
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: size,
        quality: 'hd',
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'Failed to generate image with DALL-E')
    }

    const data = await response.json()
    return data.data[0].url
  }
}

export class MockProvider implements ImageGenProvider {
  async generate({ aspectRatio }: ImageGenOptions): Promise<string> {
    const width = aspectRatio === '21:9' ? 1200 : 1024
    const height = aspectRatio === '21:9' ? 514 : 576
    return `https://placehold.co/${width}x${height}/f1f5f9/64748b?text=Generated+Image+(${aspectRatio})`
  }
}

export function getProvider(name: string = 'dalle'): ImageGenProvider {
  if (name === 'mock' || !process.env.OPENAI_API_KEY) {
    return new MockProvider()
  }
  return new DalleProvider()
}
