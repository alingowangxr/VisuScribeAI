'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn(
      "font-mono text-[10px] md:text-xs uppercase tracking-[0.22em] text-gz-muted mb-2",
      className
    )}>
      {children}
    </p>
  )
}

export function DisplayTitle({ 
  children, 
  className,
  size = 'md'
}: { 
  children: React.ReactNode; 
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
}) {
  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
    hero: "text-6xl md:text-8xl",
  }

  return (
    <h1 className={cn(
      "font-medium leading-[1.12] tracking-[0.05em] text-gz-ink",
      sizeClasses[size],
      className
    )}>
      {children}
    </h1>
  )
}

export function LeadText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn(
      "text-sm md:text-base leading-relaxed text-gz-muted mt-4",
      className
    )}>
      {children}
    </p>
  )
}

export function IssueStrip({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn(
      "mt-auto pt-4 border-t border-gz-line flex items-center justify-between font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gz-muted",
      className
    )}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <span>{item}</span>
          {i < items.length - 1 && <span className="opacity-30">—</span>}
        </React.Fragment>
      ))}
    </div>
  )
}

export function GzImage({ 
  src, 
  alt, 
  aspectRatio = '16:9',
  className 
}: { 
  src?: string; 
  alt?: string; 
  aspectRatio?: string;
  className?: string;
}) {
  return (
    <div className={cn(
      "relative bg-gz-paper-2 overflow-hidden rounded-sm border border-gz-line",
      aspectRatio === '21:9' && 'aspect-[21/9]',
      aspectRatio === '16:9' && 'aspect-[16/9]',
      aspectRatio === '3:4' && 'aspect-[3/4]',
      aspectRatio === '3:2' && 'aspect-[3/2]',
      aspectRatio === '1:1' && 'aspect-square',
      className
    )}>
      {src ? (
        <Image src={src} alt={alt || "Image preview"} fill unoptimized className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] text-gz-muted/50 uppercase tracking-widest font-mono">Image Evidence</span>
        </div>
      )}
    </div>
  )
}
