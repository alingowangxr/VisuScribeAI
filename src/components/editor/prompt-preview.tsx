'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Check, Eye, EyeOff, Layout, Sparkles } from 'lucide-react'
import { renderCover, renderBody } from '@/lib/renderer'
import { BodySpec, CoverSpec } from '@/lib/types'
import { cn } from '@/lib/utils'

interface PromptPreviewProps {
  type: 'cover' | 'body'
  spec: CoverSpec | BodySpec
}

export function PromptPreview({ type, spec }: PromptPreviewProps) {
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(false)

  const isGuizang = spec.style_id.startsWith('gz_')
  const prompt = type === 'cover' 
    ? renderCover(spec as CoverSpec)
    : renderBody(spec as BodySpec)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className={cn(
      "bg-muted/50 border-dashed",
      isGuizang && "border-blue-200 bg-blue-50/30"
    )}>
      <CardHeader className="py-2 px-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center">
          {isGuizang ? (
            <span className="flex items-center text-blue-600">
              <Layout className="mr-1.5 h-3 w-3" />
              Guizang Hybrid Mode
            </span>
          ) : (
            <span className="flex items-center">
              <Sparkles className="mr-1.5 h-3 w-3" />
              AI Generation Prompt
            </span>
          )}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setVisible(!visible)}
          >
            {visible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
          </Button>
        </div>
      </CardHeader>
      {visible && (
        <CardContent className="px-4 pb-4">
          {isGuizang && (
            <div className="mb-3 p-2 bg-blue-100/50 border border-blue-200 rounded text-[10px] text-blue-700 leading-snug">
              <strong>混合渲染模式：</strong>AI 提示詞已優化為僅生成「背景素材」。
              文字與專業佈局將在生成後由 HTML 引擎精確疊加，確保排版與字體質感。
            </div>
          )}
          <div className="bg-background border rounded p-3 text-[11px] leading-relaxed font-mono whitespace-pre-wrap max-h-[300px] overflow-y-auto">
            {prompt}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
