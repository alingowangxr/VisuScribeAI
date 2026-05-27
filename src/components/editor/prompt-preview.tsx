'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Check, Eye, EyeOff } from 'lucide-react'
import { renderCover, renderBody } from '@/lib/renderer'
import { BodySpec, CoverSpec } from '@/lib/types'

interface PromptPreviewProps {
  type: 'cover' | 'body'
  spec: CoverSpec | BodySpec
}

export function PromptPreview({ type, spec }: PromptPreviewProps) {
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(false)

  const prompt = type === 'cover' 
    ? renderCover(spec as CoverSpec)
    : renderBody(spec as BodySpec)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="bg-muted/50 border-dashed">
      <CardHeader className="py-2 px-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center">
          Prompt Preview
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
          <div className="bg-background border rounded p-3 text-[11px] leading-relaxed font-mono whitespace-pre-wrap max-h-[300px] overflow-y-auto">
            {prompt}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
