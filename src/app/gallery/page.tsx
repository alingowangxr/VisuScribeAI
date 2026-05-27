'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { StyleCard } from '@/components/style-card'
import { STYLES } from '@/lib/styles'

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b h-16 flex items-center bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">返回首頁</span>
          </Link>
          <h1 className="text-lg font-bold">作品廊</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">靈感發現</h2>
          <p className="text-muted-foreground">
            探索由 AI 生成的各種風格配圖範例
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for real gallery items */}
          <div className="space-y-4 border rounded-xl overflow-hidden bg-muted/20 p-4 flex flex-col items-center justify-center h-64 border-dashed">
            <Sparkles className="w-12 h-12 opacity-10 mb-4" />
            <p className="text-sm font-medium text-muted-foreground italic">
              即將推出更多範例...
            </p>
          </div>
        </div>

        <div className="mt-24">
          <h3 className="text-xl font-bold mb-8 text-center">
            所有內置風格預覽
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {STYLES.map((style) => (
              <StyleCard key={style.style_id} id={style.style_id} />
            ))}
          </div>
        </div>

        <div className="mt-24 bg-primary text-primary-foreground rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">準備好親自嘗試了嗎？</h2>
          <p className="mb-8 opacity-90">
            只需輸入一段文字，AI 即可為你規劃全套視覺資產。
          </p>
          <Link href="/editor">
            <Button size="lg" variant="secondary" className="font-bold">
              進入編輯器
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
