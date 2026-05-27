import { getProvider } from '@/lib/providers/image-gen'

export async function POST(req: Request) {
  try {
    const { prompt, aspectRatio, provider } = await req.json()

    if (!prompt) {
      return new Response('Missing prompt', { status: 400 })
    }

    const imageProvider = getProvider(provider)
    const imageUrl = await imageProvider.generate({ prompt, aspectRatio })

    return Response.json({ url: imageUrl })
  } catch (error: unknown) {
    console.error('Generate API Error:', error)
    const message =
      error instanceof Error ? error.message : 'Internal Server Error'
    return new Response(message, { status: 500 })
  }
}
