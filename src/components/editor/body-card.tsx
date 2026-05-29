'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BodySpec, BodyStructure } from '@/lib/types'
import { FieldEditor } from './field-editor'
import { StructureSelector } from './structure-selector'
import { AspectRatioBox } from '../aspect-ratio-box'
import { Button } from '@/components/ui/button'
import {
  Trash2,
  MoveUp,
  MoveDown,
  Sparkles,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react'
import { M04PullQuote, M08TallLedger, M11MarginaliaEssay, M12SectionDivider, M15BeforeAfter } from '../guizang/editorial-layouts'
import { S09KpiTower, S10HBarChart, S11StackedLedger } from '../guizang/swiss-layouts'

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
  isRegenerating = false,
  onGenerateImage,
  isGeneratingImage = false,
}: BodyCardProps) {
  const updateField = <K extends keyof BodySpec>(field: K, value: BodySpec[K]) => {
    onChange({ ...spec, [field]: value })
  }
  const isGuizang = spec.style_id.startsWith('gz_')
  const isSwiss = spec.style_id.includes('_swiss_')

  // Intelligent Layout Dispatcher
  const renderGzPreview = () => {
    const struct = spec.structure
    
    if (isSwiss) {
      if (spec.modules.length > 0) {
        if (struct.includes('塔') || struct.includes('KPI')) return <S09KpiTower spec={spec} />
        if (struct.includes('圖') || struct.includes('表') || struct.includes('排行')) return <S10HBarChart spec={spec} />
        return <S11StackedLedger spec={spec} />
      }
      return <M04PullQuote spec={spec} />
    } else {
      if (struct.includes('過渡') || struct.includes('章節')) return <M12SectionDivider spec={spec} />
      
      const hasModules = spec.modules.length > 0
      const hasDetailedNotes = spec.notes.some(n => n.length > 10)
      
      if (hasModules) {
        if (struct.includes('對比') || struct.includes('前後')) return <M15BeforeAfter spec={spec} />
        if (hasDetailedNotes || struct.includes('流程')) return <M08TallLedger spec={spec} />
        return <M11MarginaliaEssay spec={spec} />
      }
      return <M04PullQuote spec={spec} />
    }
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
            {isGuizang ? '3:4' : '16:9'}
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
                生成背景素材
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
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onMoveUp}
            >
              <MoveUp className="h-3 w-3" />
            </Button>
          )}
          {onMoveDown && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onMoveDown}
            >
              <MoveDown className="h-3 w-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-destructive"
            onClick={onDelete}
          >
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
              onSelect={(s: BodyStructure) => updateField('structure', s)}
            />
            <FieldEditor
              label="核心模塊 (Modules)"
              value={spec.modules.join('、')}
              onChange={(v) =>
                updateField('modules', v.split(/[、,，]/).filter(Boolean))
              }
              placeholder="例如：收集、整理、應用 (用、分隔)"
            />
            <FieldEditor
              label="必要註釋 (Notes)"
              value={spec.notes.join('、')}
              onChange={(v) =>
                updateField('notes', v.split(/[、,，]/).filter(Boolean))
              }
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
                {isGuizang ? '佈局預覽' : spec.generatedUrl ? '生成結果' : '結構示意 (16:9)'}
              </div>
              <AspectRatioBox
                ratio={isGuizang ? "3:4" : "16:9"}
                className="bg-muted rounded border flex flex-col overflow-hidden items-center justify-center"
              >
                {isGuizang ? (
                  <div className="w-full h-full scale-[0.6] origin-top transform-gpu">
                    {renderGzPreview()}
                  </div>
                ) : spec.generatedUrl ? (
                  <Image
                    src={spec.generatedUrl}
                    alt="Generated body"
                    fill
                    unoptimized
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
