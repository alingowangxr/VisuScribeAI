'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { STYLE_GROUPS, STYLE_NAMES } from '@/lib/styles'
import { StyleCard } from '@/components/style-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface StyleSelectorProps {
  selectedId: string
  onSelect: (id: string) => void
}

export function StyleSelector({ selectedId, onSelect }: StyleSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-bold">風格選擇</Label>
        <span className="text-sm text-muted-foreground">
          當前：{STYLE_NAMES[selectedId] || selectedId}
        </span>
      </div>

      <Tabs defaultValue={STYLE_GROUPS[0].name} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 flex-wrap">
          {STYLE_GROUPS.map((group) => (
            <TabsTrigger key={group.name} value={group.name} className="px-3 py-1.5">
              {group.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {STYLE_GROUPS.map((group) => (
          <TabsContent key={group.name} value={group.name} className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {group.ids.map((id) => (
                <StyleCard
                  key={id}
                  id={id}
                  selected={selectedId === id}
                  onClick={() => onSelect(id)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
