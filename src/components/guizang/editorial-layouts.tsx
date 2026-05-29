'use client'

import React from 'react'
import { BaseLayout } from './base-layout'
import { Kicker, DisplayTitle, LeadText, IssueStrip, GzImage } from './shared'
import { CoverSpec, BodySpec } from '@/lib/types'

export function M01Cover({ spec }: { spec: CoverSpec }) {
  return (
    <BaseLayout styleId={spec.style_id} aspectRatio="3:4">
      <Kicker>Issue · {new Date().toLocaleDateString()}</Kicker>
      <DisplayTitle size="lg" className="mb-6">
        {spec.title}
      </DisplayTitle>
      <GzImage 
        src={spec.generatedUrl} 
        aspectRatio="3:2" 
        className="mb-6 flex-1"
      />
      <IssueStrip items={[spec.metaphor || 'Editorial', 'Cover Story', 'Page 01']} />
    </BaseLayout>
  )
}

export function M04PullQuote({ spec }: { spec: BodySpec | CoverSpec }) {
  const bottomSentence = spec.bottomSentence || ('subtitle' in spec ? spec.subtitle : '')
  
  return (
    <BaseLayout styleId={spec.style_id} aspectRatio="3:4" className="justify-center">
      <div className="flex-1 flex flex-col justify-center">
        <Kicker className="text-center">Takeaway</Kicker>
        <DisplayTitle size="lg" className="text-center italic px-4">
          「{spec.title}」
        </DisplayTitle>
        <div className="mt-8 mx-auto w-12 h-[1px] bg-gz-line" />
        <LeadText className="text-center mt-6 max-w-xs mx-auto px-4 opacity-80">
          {bottomSentence}
        </LeadText>
      </div>
      <IssueStrip items={['Closing Note', 'Thought', 'End']} />
    </BaseLayout>
  )
}

export function M08TallLedger({ spec }: { spec: BodySpec }) {
  return (
    <BaseLayout styleId={spec.style_id} aspectRatio="3:4">
      <Kicker>Checklist · {spec.structure}</Kicker>
      <DisplayTitle size="md" className="mb-8">{spec.title}</DisplayTitle>
      
      <div className="flex-1 flex flex-col gap-6">
        {spec.modules.map((module, i) => (
          <div key={i} className="flex gap-4 group">
            <div className="font-mono text-xs text-gz-muted/50 mt-1">0{i+1}</div>
            <div className="flex-1 pb-4 border-b border-gz-line/50">
              <h3 className="text-lg font-medium text-gz-ink mb-1 group-hover:text-gz-accent transition-colors">
                {module}
              </h3>
              {spec.notes[i] && (
                <p className="text-xs text-gz-muted leading-relaxed">
                  {spec.notes[i]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <IssueStrip items={[spec.bottomSentence || 'Insight', 'Detailed View']} />
    </BaseLayout>
  )
}

export function M11MarginaliaEssay({ spec }: { spec: BodySpec }) {
  return (
    <BaseLayout styleId={spec.style_id} aspectRatio="3:4">
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-[1fr_80px] gap-6 flex-1">
          <div className="flex flex-col">
            <Kicker>Essay · {spec.structure}</Kicker>
            <DisplayTitle size="md" className="mb-6">{spec.title}</DisplayTitle>
            <div className="space-y-4">
              {spec.modules.map((m, i) => (
                <p key={i} className="text-sm leading-relaxed text-gz-ink">
                  {m}
                </p>
              ))}
            </div>
            <LeadText className="mt-auto pt-6 italic border-t border-gz-line">
              {spec.bottomSentence}
            </LeadText>
          </div>
          
          <div className="border-l border-gz-line pl-4 flex flex-col gap-8">
            {spec.notes.map((n, i) => (
              <div key={i} className="font-mono text-[9px] uppercase tracking-wider text-gz-muted/60 leading-tight">
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>
      <IssueStrip items={['Marginalia', 'Analysis', 'Page 0x']} />
    </BaseLayout>
  )
}

export function M12SectionDivider({ spec }: { spec: BodySpec }) {
  return (
    <BaseLayout styleId={spec.style_id} aspectRatio="3:4" className="items-center justify-center text-center">
      <div className="flex-1 flex flex-col justify-center items-center">
        <Kicker className="mb-4">Part · {spec.structure.replace('圖', '')}</Kicker>
        <DisplayTitle size="hero" className="mb-4 tracking-tighter">
          {spec.title}
        </DisplayTitle>
        <p className="text-xl italic font-light opacity-60 max-w-xs">
          {spec.bottomSentence}
        </p>
      </div>
      <IssueStrip items={['Section', 'Divider', 'Breath']} />
    </BaseLayout>
  )
}

export function M15BeforeAfter({ spec }: { spec: BodySpec }) {
  const beforeItems = spec.modules.slice(0, Math.ceil(spec.modules.length / 2))
  const afterItems = spec.modules.slice(Math.ceil(spec.modules.length / 2))

  return (
    <BaseLayout styleId={spec.style_id} aspectRatio="3:4">
      <Kicker>Comparison · Evolution</Kicker>
      <DisplayTitle size="md" className="mb-10">{spec.title}</DisplayTitle>
      
      <div className="flex-1 flex flex-col gap-8">
        {/* Before Block */}
        <div className="opacity-60 grayscale-[0.5] border-l-2 border-gz-line pl-6">
          <Kicker className="text-[9px] mb-1 italic">Before · Legacy</Kicker>
          <h3 className="text-lg font-medium mb-3">傳統模式</h3>
          <ul className="space-y-2">
            {beforeItems.map((item, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <span className="opacity-40">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* After Block */}
        <div className="border-l-2 border-gz-accent pl-6 bg-gz-accent/5 py-4 pr-4">
          <Kicker className="text-[9px] mb-1 font-bold text-gz-accent">After · Optimized</Kicker>
          <h3 className="text-lg font-bold mb-3 text-gz-ink">新世代流程</h3>
          <ul className="space-y-2">
            {afterItems.map((item, i) => (
              <li key={i} className="text-sm flex items-start gap-2 font-medium">
                <span className="text-gz-accent">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <LeadText className="mt-8 border-t border-gz-line pt-4 text-center italic">
        {spec.bottomSentence}
      </LeadText>
    </BaseLayout>
  )
}
