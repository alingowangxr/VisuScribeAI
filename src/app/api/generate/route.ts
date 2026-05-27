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
  } catch (error: any) {
    console.error('Generate API Error:', error)
    return new Response(error.message || 'Internal Server Error', { status: 500 })
  }
}
