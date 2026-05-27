import { ImagePlan, CoverSpec, BodySpec } from './types'
import { renderCover, renderBody } from './renderer'

export function generateMarkdown(plan: ImagePlan, article: string): string {
  let md = `# VisuScribe AI 視覺化規劃方案\n\n`
  
  md += `## 文章摘要\n${article.substring(0, 200)}${article.length > 200 ? '...' : ''}\n\n`
  
  md += `--- \n\n`
  
  // Cover
  md += `### 圖 1｜封面圖\n`
  md += `- **主題**：${plan.cover.title}\n`
  md += `- **副標題**：${plan.cover.subtitle}\n`
  md += `- **核心隱喻**：${plan.cover.metaphor}\n`
  md += `- **畫面元素**：${plan.cover.elements}\n`
  md += `- **小人動作**：${plan.cover.character_action}\n`
  md += `- **小人氣泡**：${plan.cover.speech_bubble}\n`
  md += `- **底部判斷句**：${plan.cover.bottomSentence}\n`
  md += `\n**圖片提示詞**：\n\`\`\`\n${renderCover(plan.cover)}\n\`\`\`\n`
  if (plan.cover.generatedUrl) {
    md += `\n**已生成圖片**：[點擊查看](${plan.cover.generatedUrl})\n`
  }
  
  md += `\n---\n\n`
  
  // Bodies
  plan.bodies.forEach((body, i) => {
    md += `### 圖 ${i + 2}｜正文配圖\n`
    md += `- **題圖**：${body.title}\n`
    md += `- **結構**：${body.structure}\n`
    md += `- **核心模塊**：${body.modules.join('、')}\n`
    md += `- **必要註釋**：${body.notes.join('、')}\n`
    md += `- **小人動作**：${body.character_action}\n`
    md += `- **小人氣泡**：${body.speech_bubble}\n`
    md += `- **底部判斷句**：${body.bottomSentence}\n`
    md += `\n**圖片提示詞**：\n\`\`\`\n${renderBody(body)}\n\`\`\`\n`
    if (body.generatedUrl) {
      md += `\n**已生成圖片**：[點擊查看](${body.generatedUrl})\n`
    }
    md += `\n---\n\n`
  })

  return md
}

export function generateJson(plan: ImagePlan): string {
  const exportData = {
    series_title: plan.cover.title,
    visual_style: plan.cover.style_id,
    images: [
      {
        id: 'cover_01',
        type: 'cover',
        aspect_ratio: '21:9',
        ...plan.cover,
        prompt: renderCover(plan.cover)
      },
      ...plan.bodies.map((body, i) => ({
        id: `body_${(i + 1).toString().padStart(2, '0')}`,
        type: 'body',
        aspect_ratio: '16:9',
        ...body,
        prompt: renderBody(body)
      }))
    ]
  }
  
  return JSON.stringify(exportData, null, 2)
}
