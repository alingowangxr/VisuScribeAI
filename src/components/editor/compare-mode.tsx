'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { STYLE_NAMES, STYLE_IMAGES } from '@/lib/styles'
import { X, ArrowRightLeft } from 'lucide-react'
import { CoverSpec, BodySpec } from '@/lib/types'
import { renderCover, renderBody } from '@/lib/renderer'

interface CompareModeProps {
  plan: { cover: CoverSpec; bodies: BodySpec[] }
  onClose: () => void
}

export function CompareMode({ plan, onClose }: CompareModeProps) {
  const [styleA, setStyleA] = React.useState(plan.cover.style_id)
  const [styleB, setStyleB] = React.useState('oriental_editorial_illustration')

  const renderA = (spec: CoverSpec | BodySpec, type: 'cover' | 'body') => {
    return type === 'cover'
      ? renderCover({ ...(spec as CoverSpec), style_id: styleA })
      : renderBody({ ...(spec as BodySpec), style_id: styleA })
  }

  const renderB = (spec: CoverSpec | BodySpec, type: 'cover' | 'body') => {
    return type === 'cover'
      ? renderCover({ ...(spec as CoverSpec), style_id: styleB })
      : renderBody({ ...(spec as BodySpec), style_id: styleB })
  }

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col">
      <header className="border-b h-14 flex items-center justify-between px-6 bg-muted/20">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-primary" />
          <h2 className="font-bold">風格 A/B 對比模式</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-1 overflow-hidden flex">
        {/* Style A */}
        <div className="flex-1 border-r flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-muted/10 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Style A
            </span>
            <select
              value={styleA}
              onChange={(e) => setStyleA(e.target.value)}
              className="text-xs bg-transparent border rounded px-2 py-1"
            >
              {Object.keys(STYLE_NAMES).map((id) => (
                <option key={id} value={id}>
                  {STYLE_NAMES[id]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <CompareCard
              title="封面 Prompt"
              content={renderA(plan.cover, 'cover')}
              imageId={styleA}
            />
            {(plan.bodies || []).map((body, i) => (
              <CompareCard
                key={i}
                title={`正文 ${i + 1} Prompt`}
                content={renderA(body, 'body')}
                imageId={styleA}
              />
            ))}
          </div>
        </div>

        {/* Style B */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-muted/10 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500">
              Style B
            </span>
            <select
              value={styleB}
              onChange={(e) => setStyleB(e.target.value)}
              className="text-xs bg-transparent border rounded px-2 py-1"
            >
              {Object.keys(STYLE_NAMES).map((id) => (
                <option key={id} value={id}>
                  {STYLE_NAMES[id]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <CompareCard
              title="封面 Prompt"
              content={renderB(plan.cover, 'cover')}
              imageId={styleB}
            />
            {(plan.bodies || []).map((body, i) => (
              <CompareCard
                key={i}
                title={`正文 ${i + 1} Prompt`}
                content={renderB(body, 'body')}
                imageId={styleB}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function CompareCard({
  title,
  content,
  imageId,
}: {
  title: string
  content: string
  imageId: string
}) {
  const image = STYLE_IMAGES[imageId]
  return (
    <Card className="overflow-hidden">
      <CardHeader className="py-2 px-4 bg-muted/30">
        <CardTitle className="text-[10px] uppercase font-bold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="aspect-video bg-muted rounded overflow-hidden relative">
          {image ? (
            <Image
              src={`/assets/examples/${image}`}
              alt="preview"
              fill
              unoptimized
              className="w-full h-full object-cover opacity-50 grayscale"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground italic">
              No Preview
            </div>
          )}
        </div>
        <pre className="text-[10px] font-mono leading-relaxed bg-muted/50 p-2 rounded whitespace-pre-wrap max-h-40 overflow-y-auto">
          {content}
        </pre>
      </CardContent>
    </Card>
  )
}
