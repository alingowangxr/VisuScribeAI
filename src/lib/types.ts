export type BodyStructure =
  | '閉環機制圖'
  | '橫向流程圖'
  | '分類樹圖'
  | '左右對比圖'
  | '結構類比圖'
  | '風險路徑圖'
  | '光譜選擇圖'
  | '隨附場景圖'
  | '學習筆記卡片'
  | '分層金字塔'
  | '兒童文化科普圖'

export interface CoverSpec {
  title: string
  subtitle: string
  metaphor: string
  elements: string
  character_action: string
  speech_bubble: string
  bottomSentence: string
  style_id: string
  generatedUrl?: string
}

export interface BodySpec {
  title: string
  structure: BodyStructure
  modules: string[]
  notes: string[]
  character_action: string
  speech_bubble: string
  bottomSentence: string
  style_id: string
  generatedUrl?: string
}

export interface ImagePlan {
  cover: CoverSpec
  bodies: BodySpec[]
}

export interface Project {
  id: string
  article: string
  plan: ImagePlan
  createdAt: number
  updatedAt: number
}

export type ExportFormat = 'markdown' | 'json' | 'both'

export interface StyleInfo {
  style_id: string
  style_name: string
  best_for: string[]
}
