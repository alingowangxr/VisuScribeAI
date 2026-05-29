import React from 'react'

interface AspectRatioBoxProps {
  ratio: '21:9' | '16:9' | '1:1' | '3:4'
  children: React.ReactNode
  className?: string
}

export function AspectRatioBox({ ratio, children, className = '' }: AspectRatioBoxProps) {
  const ratioClass = {
    '21:9': 'aspect-[21/9]',
    '16:9': 'aspect-[16/9]',
    '1:1': 'aspect-square',
    '3:4': 'aspect-[3/4]',
  }[ratio]

  return (
    <div className={`relative w-full overflow-hidden ${ratioClass} ${className}`}>
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}
