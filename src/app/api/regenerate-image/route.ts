import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'

const CoverSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  metaphor: z.string().min(1),
  elements: z.string().min(1),
  character_action: z.string().min(1),
  speech_bubble: z.string().min(1),
  bottomSentence: z.string().min(1),
  style_id: z.string().min(1),
})

const BodySchema = z.object({
  title: z.string().min(1),
  structure: z.enum([
    '閉環機制圖',
    '橫向流程圖',
    '分類樹圖',
    '左右對比圖',
    '結構類比圖',
    '風險路徑圖',
    '光譜選擇圖',
    '隨附場景圖',
    '學習筆記卡片',
    '分層金字塔',
    '兒童文化科普圖',
  ]),
  modules: z.array(z.string().min(1)).min(1),
  notes: z.array(z.string().min(1)).min(1),
  character_action: z.string().min(1),
  speech_bubble: z.string().min(1),
  bottomSentence: z.string().min(1),
  style_id: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const { article, type, current_spec, style_id } = await req.json()

    if (!article) {
      return new Response('Missing article content', { status: 400 })
    }

    const isCover = type === 'cover'
    const schema = isCover ? CoverSchema : BodySchema

    const systemPrompt = `你是一位專業的文章視覺化專家。用戶想要重新生成一張${isCover ? '封面' : '正文'}圖的規劃。
請根據文章內容，並參考當前的規劃（如果有的話），提供一個全新的、更有創意的視覺方案。

## 執行規範：
1. 確保隱喻新穎且易於理解。
2. 所有欄位使用繁體中文。
3. style_id 預設使用 "${style_id || 'handdrawn_knowledge_card'}"。
${isCover ? '4. 封面圖需具備衝擊力且點明文章主旨。' : '4. 正文圖需針對特定觀點提供結構化的圖解。'}`

    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: schema,
      prompt: `文章內容：\n${article}\n\n當前規劃（供參考）：\n${JSON.stringify(current_spec)}`,
      system: systemPrompt,
    })

    return Response.json(object)
  } catch (error: any) {
    console.error('Regenerate API Error:', error)
    return new Response(error.message || 'Internal Server Error', { status: 500 })
  }
}
