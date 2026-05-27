'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StyleCard } from '@/components/style-card'
import { STYLES } from '@/lib/styles'
import { Sparkles, ArrowRight, GitBranch } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b h-16 flex items-center bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight">cc2image</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/editor"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              編輯器
            </Link>
            <Link
              href="/gallery"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              作品廊
            </Link>
            <ThemeToggle />
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GitBranch className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
              <Sparkles className="mr-2 h-3 w-3" />
              AI 驅動的文章視覺化工具
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              讓你的文章
              <br />
              <span className="text-primary">「一眼被看懂」</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              把長篇文章、選題或知識點，自動拆解為一套精美且風格統一的視覺資產。
              支持 34 套內置風格，完美適配小紅書、公眾號與設計提案。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/editor">
                <Button size="lg" className="h-14 px-8 text-lg font-bold">
                  進入編輯器
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                查看範例
              </Button>
            </div>
          </div>
        </section>

        {/* Style Preview Wall */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">內置 34 套專業風格</h2>
              <p className="text-muted-foreground">
                從手繪知識圖解到典籍山水，滿足各種內容場景
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {STYLES.map((style) => (
                <StyleCard key={style.style_id} id={style.style_id} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">準備好開始了嗎？</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/editor?plan=cover-only">
                <div className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-6 rounded-xl cursor-pointer transition-colors text-left border border-primary-foreground/20">
                  <h3 className="font-bold text-xl mb-2">封面 Only</h3>
                  <p className="text-sm opacity-80">快速生成 21:9 寬屏封面圖</p>
                </div>
              </Link>
              <Link href="/editor?plan=cover-3-bodies">
                <div className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-6 rounded-xl cursor-pointer transition-colors text-left border border-primary-foreground/20">
                  <h3 className="font-bold text-xl mb-2">封面 + 3 正文</h3>
                  <p className="text-sm opacity-80">適合短文或核心觀點拆解</p>
                </div>
              </Link>
              <Link href="/editor?plan=cover-6-bodies">
                <div className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-6 rounded-xl cursor-pointer transition-colors text-left border border-primary-foreground/20">
                  <h3 className="font-bold text-xl mb-2">封面 + 6 正文</h3>
                  <p className="text-sm opacity-80">深度文章的全套視覺方案</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 opacity-50">
            <div className="w-6 h-6 bg-foreground rounded flex items-center justify-center">
              <span className="text-background text-[10px] font-bold">V</span>
            </div>
            <span className="text-sm font-bold tracking-tight">
              VisuScribe AI
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 VisuScribe AI Project. 基於 AI 驅動的內容視覺化實驗室。
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground"
            >
              使用條款
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground"
            >
              隱私政策
            </Link>
            <a
              href="https://github.com"
              className="text-muted-foreground hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
