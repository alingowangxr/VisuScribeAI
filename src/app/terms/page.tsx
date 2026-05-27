import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold mb-8">使用條款</h1>
        <div className="prose prose-slate dark:prose-invert">
          <p>歡迎使用 VisuScribe AI。在使用本服務前，請仔細閱讀以下條款...</p>
          <h2 className="text-xl font-bold mt-8 mb-4">1. 服務內容</h2>
          <p>VisuScribe AI 提供基於人工智慧的文章視覺化與配圖規劃服務...</p>
          <h2 className="text-xl font-bold mt-8 mb-4">2. 用戶責任</h2>
          <p>用戶需對其輸入的內容及生成的圖片用途承載法律責任...</p>
        </div>
      </main>
    </div>
  )
}
