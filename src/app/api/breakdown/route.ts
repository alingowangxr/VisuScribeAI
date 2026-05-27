import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { z } from 'zod'

// Define the schema for the image plan based on our types
const ImagePlanSchema = z.object({
  cover: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    metaphor: z.string().min(1),
    elements: z.string().min(1),
    character_action: z.string().min(1),
    speech_bubble: z.string().min(1),
    bottomSentence: z.string().min(1),
    style_id: z.string().min(1),
  }),
  bodies: z.array(
    z.object({
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
  ),
})

export async function POST(req: Request) {
  try {
    const { article, style_id, count } = await req.json()

    if (!article || article.trim().length < 5) {
      return new Response('Article content too short', { status: 400 })
    }

    const systemPrompt = `你是一位專業的文章拆解與視覺化規劃專家。你的任務是將用戶提供的文章內容拆解為一套精美且風格統一的視覺資產方案。

## 執行規範：
1. **核心原則**：將文章內容轉化為視覺隱喻與結構化圖解。避免直接重複文字，而是尋找其背後的視覺對應物。
2. **數量規劃**：規劃 1 張封面圖（21:9）與 ${count || '3 到 6'} 張正文圖（16:9）。
3. **風格對齊**：style_id 預設使用 "${style_id || 'handdrawn_knowledge_card'}"。如果用戶未指定特定風格，請根據內容主題自動匹配最合適的 style_id。

## 封面圖規劃規則 (21:9)：
- **主題**：文章的主標題，需具備視覺衝擊力。
- **副標題**：補充說明文章核心價值。
- **核心隱喻**：文章主旨的具象化表達（例如：知識庫像花園、目標像燈塔）。
- **畫面元素**：具體的物件描述（例如：書本、放大鏡、嫩芽）。
- **小人動作**：極簡抽象小人的行為。
- **小人氣泡**：一句畫龍點睛的短語。
- **底部判斷句**：一句總結全文的輕量結論。

## 正文配圖規劃規則 (16:9)：
- **結構選擇**：
  - 閉環機制圖：系統循環、持續迭代。
  - 橫向流程圖：步驟、生產流程。
  - 分類樹圖：層級、組成結構。
  - 左右對比圖：舊方法 vs 新方法、誤區 vs 正解。
  - 結構類比圖：腳手架、工廠、管道等隱喻。
  - 風險路徑圖：陷阱、失敗原因。
  - 光譜選擇圖：程度變化（低到高、簡單到複雜）。
  - 隨附場景圖：真實使用場景描述。
- **核心模塊**：2-5 個關鍵詞標籤。
- **必要註釋**：2-5 個短句標註，不要大段正文。

## 風格匹配參考 (優先級)：
- 知識圖解、流程、對比：handdrawn_knowledge_card
- 文化、歷史、人文：oriental_editorial_illustration
- 學習方法、步驟教程：study_note_card
- 層級模型、能力進階：pastel_learning_pyramid
- 情緒療癒、心靈成長：minimal_healing_metaphor_comic
- 設計、趨勢、未來感：glassmorphism_gradient_blob

請輸出繁體中文的結構化 JSON 數據。`

    const result = await streamObject({
      model: openai('gpt-4o'),
      schema: ImagePlanSchema,
      prompt: `請拆解以下文章內容：\n\n${article}`,
      system: systemPrompt,
    })

    return result.toTextStreamResponse()
  } catch (error: any) {
    console.error('Breakdown API Error:', error)
    return new Response(error.message || 'Internal Server Error', { status: 500 })
  }
}
