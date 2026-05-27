'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ArrowLeft,
  Copy,
  Download,
  Check,
  FileJson,
  FileText,
} from 'lucide-react'
import { ImagePlan } from '@/lib/types'
import { generateMarkdown, generateJson } from '@/lib/export-utils'
import { toast } from 'sonner'

function ExportContent() {
  const searchParams = useSearchParams()
  const [plan] = useState<ImagePlan | null>(() => {
    const urlPlan = searchParams.get('plan_json')
    if (!urlPlan) return null

    try {
      return JSON.parse(decodeURIComponent(urlPlan)) as ImagePlan
    } catch (e) {
      console.error('Failed to parse plan', e)
      return null
    }
  })
  const [article] = useState(() => {
    const urlArticle = searchParams.get('article')
    return urlArticle ? decodeURIComponent(urlArticle) : ''
  })
  const [copied, setCopied] = useState(false)

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
        <p>找不到可導出的規劃方案。</p>
        <Link href="/editor" className="mt-4">
          <Button variant="outline">返回編輯器</Button>
        </Link>
      </div>
    )
  }

  const markdownContent = generateMarkdown(plan, article)
  const jsonContent = generateJson(plan)

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    toast.success('已複製到剪貼簿')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`檔案 ${filename} 已開始下載`)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="mb-8 flex items-center justify-between">
        <Link href="/editor">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            返回編輯器
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">導出規劃方案</h1>
        <div className="w-24" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Card className="h-[700px] flex flex-col overflow-hidden border-2">
            <Tabs defaultValue="markdown" className="flex-1 flex flex-col">
              <CardHeader className="bg-muted/30 border-b py-3 px-6 flex flex-row items-center justify-between space-y-0">
                <TabsList>
                  <TabsTrigger value="markdown" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Markdown
                  </TabsTrigger>
                  <TabsTrigger value="json" className="gap-2">
                    <FileJson className="h-4 w-4" />
                    JSON
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center space-x-2">
                  <TabsContent value="markdown" className="mt-0">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(markdownContent)}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        複製內容
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleDownload(markdownContent, 'visuscribe-plan.md')
                        }
                      >
                        <Download className="h-4 w-4 mr-2" />
                        下載 .md
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="json" className="mt-0">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(jsonContent)}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        複製 JSON
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleDownload(jsonContent, 'visuscribe-plan.json')
                        }
                      >
                        <Download className="h-4 w-4 mr-2" />
                        下載 .json
                      </Button>
                    </div>
                  </TabsContent>
                </div>
              </CardHeader>

              <div className="flex-1 overflow-hidden relative bg-background">
                <TabsContent value="markdown" className="h-full m-0">
                  <ScrollArea className="h-full p-8">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <pre className="p-4 rounded-lg bg-muted text-[12px] font-mono whitespace-pre-wrap">
                        {markdownContent}
                      </pre>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="json" className="h-full m-0">
                  <ScrollArea className="h-full p-8">
                    <pre className="p-4 rounded-lg bg-muted text-[12px] font-mono whitespace-pre-wrap">
                      {jsonContent}
                    </pre>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">接下來可以...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <h4 className="font-bold text-sm mb-1 text-primary">
                  1. 手動優化提示詞
                </h4>
                <p className="text-xs text-muted-foreground">
                  將生成的提示詞複製到 Midjourney 或 Stable Diffusion
                  中進行更多風格實驗。
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <h4 className="font-bold text-sm mb-1 text-primary">
                  2. 匯入內容管理系統
                </h4>
                <p className="text-xs text-muted-foreground">
                  使用 JSON 格式將規劃方案匯入你的自定義 CMS 或知識管理工具。
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <h4 className="font-bold text-sm mb-1 text-primary">
                  3. 分享連結
                </h4>
                <p className="text-xs text-muted-foreground">
                  目前的 URL 已包含所有規劃數據，直接分享給隊友即可查看。
                </p>
              </div>
            </CardContent>
          </Card>

          <Link
            href="/editor"
            className={buttonVariants({
              variant: 'outline',
              className: 'w-full h-12 font-bold',
            })}
          >
            繼續編輯
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ExportPage() {
  return (
    <Suspense fallback={<div>Loading Export...</div>}>
      <ExportContent />
    </Suspense>
  )
}
