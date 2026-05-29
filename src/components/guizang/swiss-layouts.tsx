'use client'

import React from 'react'
import { BaseLayout } from './base-layout'
import { Kicker, DisplayTitle, IssueStrip } from './shared'
import { CoverSpec, BodySpec } from '@/lib/types'
import { cn } from '@/lib/utils'

export function S01AccentCover({ spec }: { spec: CoverSpec }) {
  return (
    <BaseLayout 
      styleId={spec.style_id} 
      aspectRatio="3:4" 
      className="bg-gz-accent text-gz-accent-on"
    >
      <div className="flex-1 flex flex-col">
        <p className="font-mono text-[10px] uppercase tracking-widest opacity-80 mb-8">
          Swiss System · v1.0
        </p>
        <DisplayTitle size="hero" className="text-gz-accent-on break-words">
          {spec.title}
        </DisplayTitle>
        <div className="mt-auto">
          <div className="w-16 h-16 border-4 border-gz-accent-on mb-8" />
          <p className="text-xl opacity-90 max-w-xs font-light tracking-tight">
            {spec.subtitle}
          </p>
        </div>
      </div>
      <div className="mt-8 pt-4 border-t border-gz-accent-on/20 flex justify-between font-mono text-[9px] opacity-60">
        <span>{spec.style_id}</span>
        <span>2026</span>
      </div>
    </BaseLayout>
  )
}

export function S09KpiTower({ spec }: { spec: BodySpec }) {
  // Extract numbers from modules or notes for demonstration deterministically
  const stats = spec.modules.slice(0, 4).map((m, i) => {
    const hash = m.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + i
    const value = (hash % 80) + 15
    return {
      label: m,
      value,
    }
  })

  return (
    <BaseLayout styleId={spec.style_id} aspectRatio="3:4">
      <Kicker>Data · Analytics</Kicker>
      <DisplayTitle size="lg" className="mb-12">
        {spec.title}
      </DisplayTitle>
      
      <div className="flex-1 flex items-end justify-between gap-4 px-2">
        {stats.map((stat, i) => (
          <div key={i} className="flex-1 flex flex-col items-center group">
            <span className="text-2xl font-bold mb-1">{stat.value}%</span>
            <span className="text-[10px] text-gz-muted uppercase tracking-wider mb-4 text-center h-8 flex items-center">
              {stat.label}
            </span>
            <div 
              className={cn(
                "w-full transition-all duration-500",
                i === 0 ? "bg-gz-accent" : "bg-gz-line group-hover:bg-gz-muted"
              )}
              style={{ height: `${stat.value * 2}px`, minHeight: '4px' }}
            />
          </div>
        ))}
      </div>

      <IssueStrip items={['KPI Tower', spec.structure, 'Swiss Mode']} />
    </BaseLayout>
  )
}

export function S11StackedLedger({ spec }: { spec: BodySpec }) {
  return (
    <BaseLayout styleId={spec.style_id} aspectRatio="3:4">
      <Kicker>Inventory · {spec.structure}</Kicker>
      <DisplayTitle size="md" className="mb-10">{spec.title}</DisplayTitle>
      
      <div className="flex-1 flex flex-col border-t border-gz-ink/10">
        {spec.modules.map((module, i) => (
          <div key={i} className="py-5 border-b border-gz-line flex items-center justify-between group">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-gz-muted mb-1">ITEM 0{i+1}</span>
              <h3 className="text-xl font-bold tracking-tight text-gz-ink">
                {module}
              </h3>
              {spec.notes[i] && (
                <p className="text-[11px] text-gz-muted mt-1 uppercase tracking-wider">
                  {spec.notes[i]}
                </p>
              )}
            </div>
            <div className="w-10 h-10 border border-gz-line flex items-center justify-center text-gz-accent/40 group-hover:bg-gz-accent group-hover:text-gz-accent-on transition-all">
              <span className="font-mono text-xs italic">S{i+1}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gz-paper-2 border border-gz-line italic text-xs text-gz-muted">
        {spec.bottomSentence}
      </div>
    </BaseLayout>
  )
}

export function S10HBarChart({ spec }: { spec: BodySpec }) {
  // Extract percentages or generate them deterministically
  const bars = spec.modules.map((m, i) => {
    const hash = m.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + i
    const randomOffset = hash % 10
    const value = Math.max(10, 100 - i * 15 - randomOffset)
    return {
      label: m,
      value,
      note: spec.notes[i]
    }
  })

  return (
    <BaseLayout styleId={spec.style_id} aspectRatio="3:4">
      <Kicker>Ranking · {spec.structure}</Kicker>
      <DisplayTitle size="lg" className="mb-12 break-words">
        {spec.title}
      </DisplayTitle>
      
      <div className="flex-1 flex flex-col gap-6">
        {bars.map((bar, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold uppercase tracking-tight">{bar.label}</span>
              <span className="font-mono text-[10px] opacity-60">{Math.round(bar.value)}%</span>
            </div>
            <div className="h-4 bg-gz-line relative overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-gz-accent transition-all duration-1000 ease-out"
                style={{ width: `${bar.value}%` }}
              />
            </div>
            {bar.note && (
              <p className="text-[9px] text-gz-muted italic leading-none">{bar.note}</p>
            )}
          </div>
        ))}
      </div>

      <IssueStrip items={['Data Visualization', 'Horizontal Chart', 'Swiss']} />
    </BaseLayout>
  )
}
