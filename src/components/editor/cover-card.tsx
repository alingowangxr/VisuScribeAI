'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { CoverSpec } from '@/lib/types'
import { FieldEditor } from './field-editor'
import { AspectRatioBox } from '../aspect-ratio-box'
import { Button } from '@/components/ui/button'
import { Sparkles, Loader2, Image as ImageIcon } from 'lucide-react'
import { M01Cover } from '../guizang/editorial-layouts'
import { S01AccentCover } from '../guizang/swiss-layouts'

interface CoverCardProps {
  spec: CoverSpec
  onChange: (spec: CoverSpec) => void
  onRegenerate?: () => void
  isRegenerating?: boolean
  onGenerateImage?: () => void
  isGeneratingImage?: boolean
}

export function CoverCard({
  spec,
  onChange,
  onRegenerate,
  isRegenerating,
  onGenerateImage,
  isGeneratingImage,
}: CoverCardProps) {
  const updateField = (field: keyof CoverSpec, value: string) => {
    onChange({ ...spec, [field]: value })
  }

  const isGuizang = spec.style_id.startsWith('gz_')
  const isSwiss = spec.style_id.includes('_swiss_')

  return (
    <Card className="border-l-4 border-l-primary relative">
      {(isRegenerating || isGeneratingImage) && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-lg">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <CardHeader className="py-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-bold flex items-center">
          <span>圖 1｜封面圖</span>
          <span className="ml-2 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded">
            {isGuizang ? '3:4' : '21:9'}
          </span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          {onGenerateImage && (
            <Button
              variant="default"
              size="sm"
              className="h-7 text-[10px] font-bold"
              onClick={onGenerateImage}
              disabled={isGeneratingImage || isRegenerating}
            >
              <ImageIcon className="mr-1 h-3 w-3" />
              生成真實圖片
            </Button>
          )}
          {onRegenerate && (
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-[10px] font-bold"
              onClick={onRegenerate}
              disabled={isRegenerating || isGeneratingImage}
            >
              <Sparkles className="mr-1 h-3 w-3" />
              AI 重新規劃
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <FieldEditor
              label="主題 (Title)"
              value={spec.title}
              onChange={(v) => updateField('title', v)}
              placeholder="例如：個人知識庫真正的用法"
            />
            <FieldEditor
              label="副標題 (Subtitle)"
              value={spec.subtitle}
              onChange={(v) => updateField('subtitle', v)}
              placeholder="例如：從收藏到產出的跨越"
            />
            <FieldEditor
              label="核心隱喻 (Metaphor)"
              value={spec.metaphor}
              onChange={(v) => updateField('metaphor', v)}
              placeholder="例如：知識庫像一個花園"
            />
            <FieldEditor
              label="畫面元素 (Elements)"
              value={spec.elements}
              onChange={(v) => updateField('elements', v)}
              placeholder="例如：書、花、筆記紙、齒輪"
              isTextArea
            />
          </div>
          <div className="space-y-3">
            <FieldEditor
              label="小人動作 (Character Action)"
              value={spec.character_action}
              onChange={(v) => updateField('character_action', v)}
              placeholder="例如：站在花園裡修剪枝條"
            />
            <FieldEditor
              label="小人氣泡 (Speech Bubble)"
              value={spec.speech_bubble}
              onChange={(v) => updateField('speech_bubble', v)}
              placeholder="例如：慢慢生長"
            />
            <FieldEditor
              label="底部判斷句 (Bottom Sentence)"
              value={spec.bottomSentence}
              onChange={(v) => updateField('bottomSentence', v)}
              placeholder="例如：知識庫不是庫存，而是流動的能量。"
              isTextArea
            />

            <div className="mt-4">
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1 block">
                {isGuizang ? '排版預覽' : spec.generatedUrl ? '生成結果' : '構圖示意 (21:9)'}
              </Label>
              <AspectRatioBox
                ratio={isGuizang ? "3:4" : "21:9"}
                className="bg-muted rounded border flex items-center justify-center overflow-hidden"
              >
                {isGuizang ? (
                  <div className="w-full h-full scale-[0.6] origin-top transform-gpu">
                    {isSwiss ? (
                      <S01AccentCover spec={spec} />
                    ) : (
                      <M01Cover spec={spec} />
                    )}
                  </div>
                ) : spec.generatedUrl ? (
                  <Image
                    src={spec.generatedUrl}
                    alt="Generated cover"
                    fill
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex p-4 bg-muted/50">
                    <div className="w-[45%] border-r border-dashed flex flex-col justify-center pr-2">
                      <div className="h-4 w-3/4 bg-primary/20 mb-2 rounded" />
                      <div className="h-2 w-1/2 bg-muted-foreground/20 rounded" />
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-1/2 h-1/2 rounded-full border border-dashed border-primary/40 flex items-center justify-center text-[10px] text-muted-foreground">
                        隱喻圖
                      </div>
                    </div>
                  </div>
                )}
              </AspectRatioBox>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
