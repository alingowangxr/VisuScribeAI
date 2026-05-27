'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'

interface ImageCountConfigProps {
  count: number
  onChange: (count: number) => void
}

export function ImageCountConfig({ count, onChange }: ImageCountConfigProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-bold">配圖數量 (1 封面 + {count} 正文)</Label>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onChange(Math.max(0, count - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-bold">{count}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onChange(Math.min(10, count + 1))}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Slider
        value={[count]}
        min={0}
        max={10}
        step={1}
        onValueChange={(vals) => onChange(vals[0])}
      />
    </div>
  )
}
