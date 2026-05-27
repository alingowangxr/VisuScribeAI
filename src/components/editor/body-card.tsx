'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BodySpec } from '@/lib/types'
import { FieldEditor } from './field-editor'
import { StructureSelector } from './structure-selector'
import { AspectRatioBox } from '../aspect-ratio-box'
import { Button } from '@/components/ui/button'
import { Trash2, MoveUp, MoveDown, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react'

interface BodyCardProps {
  index: number
  spec: BodySpec
  onChange: (spec: BodySpec) => void
  onDelete: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  onRegenerate?: () => void
  isRegenerating?: boolean
  onGenerateImage?: () => void
  isGeneratingImage?: boolean
}

export function BodyCard({
  index,
  spec,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  onRegenerate,
  isRegenerating,
  onGenerateImage,
  isGeneratingImage,
}: BodyCardProps) {
  const updateField = (field: keyof BodySpec, value: any) => {
    onChange({ ...spec, [field]: value })
  }

  return (
    <Card className="border-l-4 border-l-blue-400 relative">
      {(isRegenerating || isGeneratingImage) && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-lg">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}
      <CardHeader className="py-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-sm font-bold">
            圖 {index + 2}｜正文配圖
          </CardTitle>
          <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
            16:9
          </span>
          <div className="flex items-center space-x-1 ml-4">
            {onGenerateImage && (
              <Button
                variant="outline"
                size="sm"
                className="h-6 px-2 text-[9px] font-bold bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                onClick={onGenerateImage}
                disabled={isGeneratingImage || isRegenerating}
              >
                <ImageIcon className="mr-1 h-2.5 w-2.5" />
                生成真實圖片
              </Button>
            )}
            {onRegenerate && (
              <Button
                variant="outline"
                size="sm"
                className="h-6 px-2 text-[9px] font-bold"
                onClick={onRegenerate}
                disabled={isRegenerating || isGeneratingImage}
              >
                <Sparkles className="mr-1 h-2.5 w-2.5" />
                AI 重新規劃
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {onMoveUp && (
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onMoveUp}>
              <MoveUp className="h-3 w-3" />
            </Button>
          )}
          {onMoveDown && (
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onMoveDown}>
              <MoveDown className="h-3 w-3" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={onDelete}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <FieldEditor
              label="題圖 (Title)"
              value={spec.title}
              onChange={(v) => updateField('title', v)}
              placeholder="例如：知識庫的三個層次"
            />
            <StructureSelector
              selected={spec.structure}
              onSelect={(s) => updateField('structure', s)}
            />
            <FieldEditor
              label="核心模塊 (Modules)"
              value={spec.modules.join('、')}
              onChange={(v) => updateField('modules', v.split(/[、,，]/).filter(Boolean))}
              placeholder="例如：收集、整理、應用 (用、分隔)"
            />
            <FieldEditor
              label="必要註釋 (Notes)"
              value={spec.notes.join('、')}
              onChange={(v) => updateField('notes', v.split(/[、,，]/).filter(Boolean))}
              placeholder="例如：標籤系統、雙向連結 (用、分隔)"
              isTextArea
            />
          </div>
          <div className="space-y-3">
            <FieldEditor
              label="小人動作 (Character Action)"
              value={spec.character_action}
              onChange={(v) => updateField('character_action', v)}
              placeholder="例如：正在電腦前拖動卡片"
            />
            <FieldEditor
              label="小人氣泡 (Speech Bubble)"
              value={spec.speech_bubble}
              onChange={(v) => updateField('speech_bubble', v)}
              placeholder="例如：原來如此"
            />
            <FieldEditor
              label="底部判斷句 (Bottom Sentence)"
              value={spec.bottomSentence}
              onChange={(v) => updateField('bottomSentence', v)}
              placeholder="例如：連接比儲存更重要。"
              isTextArea
            />

            <div className="mt-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">
                {spec.generatedUrl ? '生成結果' : '結構示意 (16:9)'}
              </div>
              <AspectRatioBox
                ratio="16:9"
                className="bg-muted rounded border flex flex-col overflow-hidden"
              >
                {spec.generatedUrl ? (
                  <img
                    src={spec.generatedUrl}
                    alt="Generated body"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col p-2 bg-muted/50">
                    <div className="h-2 w-1/3 bg-primary/20 mb-2 rounded self-center" />
                    <div className="flex-1 flex items-center justify-center border border-dashed border-primary/20 rounded">
                      <span className="text-[10px] text-muted-foreground">
                        {spec.structure}
                      </span>
                    </div>
                    <div className="h-2 w-2/3 bg-muted-foreground/10 mt-2 rounded self-center" />
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
