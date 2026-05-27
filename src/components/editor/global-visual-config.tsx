'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface GlobalVisualConfigProps {
  value: string
  onChange: (value: string) => void
}

export function GlobalVisualConfig({ value, onChange }: GlobalVisualConfigProps) {
  return (
    <div className="space-y-2">
      <Label className="text-lg font-bold">全局視覺定位</Label>
      <Textarea
        placeholder="自定義全局風格錨點..."
        className="min-h-[100px] text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
