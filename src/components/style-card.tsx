'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { STYLE_IMAGES, STYLE_NAMES } from '@/lib/styles'
import { cn } from '@/lib/utils'

interface StyleCardProps {
  id: string
  selected?: boolean
  onClick?: () => void
}

export function StyleCard({ id, selected, onClick }: StyleCardProps) {
  const name = STYLE_NAMES[id] || id
  const image = STYLE_IMAGES[id]
  const previewUrl = image ? `/assets/examples/${image}` : null
  const isLayout = id.startsWith('gz_')

  return (
    <Tooltip>
      <TooltipTrigger render={<div />}>
        <Card
          className={cn(
            'overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 group',
            selected ? 'ring-2 ring-primary' : 'ring-1 ring-border',
            isLayout && selected && 'ring-blue-500'
          )}
          onClick={onClick}
        >
          <CardContent className="p-0 relative">
            {isLayout && (
              <div className="absolute top-1 right-1 z-10 bg-blue-600 text-white text-[8px] font-black px-1 rounded shadow-sm py-0.5 leading-none">
                LAYOUT
              </div>
            )}
            <div className="aspect-[16/10] bg-muted flex items-center justify-center overflow-hidden relative">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center p-4">
                  <div className="text-[10px] text-muted-foreground font-bold opacity-30 text-center uppercase tracking-tighter">
                    {name}
                  </div>
                </div>
              )}
            </div>
            <div className="p-2 bg-background border-t">
              <p className="text-[11px] font-bold truncate leading-tight">
                {name}
              </p>
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{name}</p>
      </TooltipContent>
    </Tooltip>
  )
}
