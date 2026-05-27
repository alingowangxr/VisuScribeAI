'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { BODY_STRUCTURES } from '@/lib/styles'
import { BodyStructure } from '@/lib/types'
import { cn } from '@/lib/utils'

interface StructureSelectorProps {
  selected: BodyStructure
  onSelect: (structure: BodyStructure) => void
}

export function StructureSelector({ selected, onSelect }: StructureSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
        結構選擇
      </Label>
      <div className="grid grid-cols-4 gap-2">
        {BODY_STRUCTURES.map((s) => (
          <button
            key={s}
            className={cn(
              'text-[10px] py-1 px-2 border rounded transition-all',
              selected === s
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background hover:bg-muted border-border'
            )}
            onClick={() => onSelect(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
