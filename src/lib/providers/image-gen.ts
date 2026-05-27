export interface ImageGenOptions {
  prompt: string
  aspectRatio: '21:9' | '16:9'
}

export interface ImageGenProvider {
  generate: (options: ImageGenOptions) => Promise<string>
}

type OpenAIImageResponse = {
  data?: Array<{
    b64_json?: string
    url?: string
  }>
  error?: {
    message?: string
  }
}

type GeminiImageResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        inlineData?: {
          data?: string
          mimeType?: string
        }
        text?: string
      }>
    }
  }>
  error?: {
    message?: string
  }
}

export class GptImageProvider implements ImageGenProvider {
  async generate({ prompt, aspectRatio }: ImageGenOptions): Promise<string> {
    const size =
      aspectRatio === '21:9' || aspectRatio === '16:9'
        ? '1536x1024'
        : '1024x1024'

    const response = await fetch(
      'https://api.openai.com/v1/images/generations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-image-2',
          prompt,
          n: 1,
          size,
          quality: 'high',
          output_format: 'png',
        }),
      }
    )

    const data = (await response.json()) as OpenAIImageResponse

    if (!response.ok) {
      throw new Error(
        data.error?.message || 'Failed to generate image with GPT Image 2'
      )
    }

    const image = data.data?.[0]
    if (image?.b64_json) {
      return `data:image/png;base64,${image.b64_json}`
    }
    if (image?.url) {
      return image.url
    }

    throw new Error('GPT Image 2 did not return an image')
  }
}

export class NanoBananaProProvider implements ImageGenProvider {
  async generate({ prompt, aspectRatio }: ImageGenOptions): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
    if (!apiKey) {
      throw new Error('Missing GEMINI_API_KEY for Nano Banana Pro')
    }

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseModalities: ['Image'],
            responseFormat: {
              image: {
                aspectRatio,
                imageSize: '1K',
              },
            },
          },
        }),
      }
    )

    const data = (await response.json()) as GeminiImageResponse

    if (!response.ok) {
      throw new Error(
        data.error?.message || 'Failed to generate image with Nano Banana Pro'
      )
    }

    const imagePart = data.candidates?.[0]?.content?.parts?.find(
      (part) => part.inlineData?.data
    )
    const imageData = imagePart?.inlineData?.data
    if (imageData) {
      const mimeType = imagePart.inlineData?.mimeType || 'image/png'
      return `data:${mimeType};base64,${imageData}`
    }

    const text = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join(' ')
    throw new Error(text || 'Nano Banana Pro did not return an image')
  }
}

export class MockProvider implements ImageGenProvider {
  async generate({ aspectRatio }: ImageGenOptions): Promise<string> {
    const width = aspectRatio === '21:9' ? 1200 : 1024
    const height = aspectRatio === '21:9' ? 514 : 576
    return `https://placehold.co/${width}x${height}/f1f5f9/64748b?text=Generated+Image+(${aspectRatio})`
  }
}

export function getProvider(name: string = 'gpt-image-2'): ImageGenProvider {
  if (name === 'mock') {
    return new MockProvider()
  }
  if (name === 'nano-banana-pro') {
    return new NanoBananaProProvider()
  }
  if (!process.env.OPENAI_API_KEY) {
    return new MockProvider()
  }
  return new GptImageProvider()
}
