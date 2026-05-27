'use client'

import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface ArticleEditorProps {
  value: string
  onChange: (value: string) => void
}

export function ArticleEditor({ value, onChange }: ArticleEditorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="article" className="text-lg font-bold">文章內容 / URL</Label>
      <Textarea
        id="article"
        placeholder="在此輸入文章內容或貼上 URL，點擊「開始拆解」由 AI 幫你規劃配圖..."
        className="min-h-[200px] resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
