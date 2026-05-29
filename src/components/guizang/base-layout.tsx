'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface BaseLayoutProps {
  styleId: string
  aspectRatio?: '21:9' | '16:9' | '3:4' | '1:1'
  children: React.ReactNode
  className?: string
}

export function BaseLayout({
  styleId,
  aspectRatio = '16:9',
  children,
  className,
}: BaseLayoutProps) {
  // Parse styleId: gz_editorial_ink_classic or gz_swiss_ikb_blue
  const parts = styleId.split('_')
  const isGuizang = parts[0] === 'gz'
  const gzStyle = parts[1] // editorial or swiss
  const gzThemeOrAccent = parts.slice(2).join('-').replace(/_/g, '-')

  if (!isGuizang) return <>{children}</>

  const isEditorial = gzStyle === 'editorial'
  const isSwiss = gzStyle === 'swiss'

  return (
    <div
      data-gz-style={gzStyle}
      data-gz-theme={isEditorial ? gzThemeOrAccent : undefined}
      data-gz-accent={isSwiss ? gzThemeOrAccent : undefined}
      className={cn(
        'relative overflow-hidden selection:bg-gz-accent selection:text-gz-accent-on',
        'bg-gz-paper text-gz-ink transition-colors duration-300',
        isEditorial ? 'font-serif' : 'font-sans',
        aspectRatio === '21:9' && 'aspect-[21/9]',
        aspectRatio === '16:9' && 'aspect-[16/9]',
        aspectRatio === '3:4' && 'aspect-[3/4]',
        aspectRatio === '1:1' && 'aspect-square',
        className
      )}
    >
      {/* Background Layers for Editorial */}
      {isEditorial && (
        <>
          <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
          <div 
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light"
            style={{
              background: `
                radial-gradient(80% 50% at 20% 20%, var(--gz-accent-soft), transparent),
                radial-gradient(80% 50% at 80% 80%, var(--gz-accent-soft), transparent)
              `
            }}
          />
        </>
      )}

      {/* Content Container */}
      <div className="relative h-full w-full p-8 flex flex-col">
        {children}
      </div>
    </div>
  )
}
