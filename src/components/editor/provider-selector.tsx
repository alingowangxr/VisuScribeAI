'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Monitor, Zap } from 'lucide-react'

interface ProviderSelectorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function ProviderSelector({
  value,
  onChange,
  className,
}: ProviderSelectorProps) {
  return (
    <div className={className}>
      <Select
        value={value}
        onValueChange={(nextValue) => {
          if (nextValue) onChange(nextValue)
        }}
      >
        <SelectTrigger className="h-8 w-[140px] text-[10px] font-bold">
          <SelectValue placeholder="引擎" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dalle">
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-yellow-500" />
              <span>DALL-E 3</span>
            </div>
          </SelectItem>
          <SelectItem value="mock">
            <div className="flex items-center gap-2">
              <Monitor className="h-3 w-3 text-muted-foreground" />
              <span>Mock Mode</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
