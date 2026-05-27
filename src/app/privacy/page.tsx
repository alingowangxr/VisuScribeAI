import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b h-16 flex items-center bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">返回首頁</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">隱私政策</h1>
        <div className="prose prose-slate dark:prose-invert">
          <p>我們非常重視您的隱私...</p>
          <h2 className="text-xl font-bold mt-8 mb-4">1. 資料收集</h2>
          <p>我們僅收集為了提供服務所必要的資訊，如文章內容及配置參數...</p>
          <h2 className="text-xl font-bold mt-8 mb-4">2. 資料用途</h2>
          <p>收集的資料將用於生成配圖規劃及改善 AI 模型表現...</p>
        </div>
      </main>
    </div>
  )
}
