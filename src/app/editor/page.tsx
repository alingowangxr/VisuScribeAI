'use client'

import React, { useState, Suspense, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ArticleEditor } from '@/components/editor/article-editor'
import { StyleSelector } from '@/components/editor/style-selector'
import { ProviderSelector } from '@/components/editor/provider-selector'
import { CompareMode } from '@/components/editor/compare-mode'
import { ImageCountConfig } from '@/components/editor/image-count-config'
import { GlobalVisualConfig } from '@/components/editor/global-visual-config'
import { CoverCard } from '@/components/editor/cover-card'
import { BodyCard } from '@/components/editor/body-card'
import { PromptPreview } from '@/components/editor/prompt-preview'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'
import { CoverSpec, BodySpec, ImagePlan } from '@/lib/types'
import { STYLE_ANCHORS } from '@/lib/styles'
import {
  Plus,
  Sparkles,
  Send,
  Loader2,
  Save,
  ArrowRightLeft,
} from 'lucide-react'
import { useBreakdown } from '@/hooks/use-breakdown'
import { useGenerate } from '@/hooks/use-generate'
import { useProject } from '@/hooks/use-project'
import { usePersistence } from '@/hooks/use-persistence'
import { renderCover, renderBody } from '@/lib/renderer'
import { stripLargeGeneratedImages } from '@/lib/plan-serialization'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'
import { useI18n } from '@/components/i18n-provider'
import { toast } from 'sonner'

function EditorContent() {
  const { t } = useI18n()
  const [article, setArticle] = useState('')
  const [styleId, setStyleId] = useState('handdrawn_knowledge_card')
  const [provider, setProvider] = useState('gpt-image-2')
  const [bodyCount, setBodyCount] = useState(3)
  const [globalAnchor, setGlobalAnchor] = useState(
    STYLE_ANCHORS['handdrawn_knowledge_card']
  )

  const [plan, setPlan] = useState<ImagePlan | null>(null)
  const [regeneratingIndex, setRegeneratingIndex] = useState<
    number | 'cover' | null
  >(null)
  const [generatingImageIndex, setGeneratingImageIndex] = useState<
    number | 'cover' | null
  >(null)

  const [batchProgress, setBatchProgress] = useState<{
    current: number
    total: number
  } | null>(null)
  const [isCompareOpen, setIsCompareOpen] = useState(false)

  const {
    breakdown,
    regenerateImage,
    loading: breakdownLoading,
  } = useBreakdown()
  const { generate: generateImage, loading: imageLoading } = useGenerate()
  const persistedPlan = useMemo(() => stripLargeGeneratedImages(plan), [plan])

  useProject(
    article,
    setArticle,
    styleId,
    setStyleId,
    bodyCount,
    setBodyCount,
    plan,
    setPlan
  )

  const { restore: restoreDraft, setInitialized } = usePersistence(
    'current_project',
    { article, styleId, bodyCount, plan: persistedPlan, provider },
    (saved) => {
      if (saved.article) setArticle(saved.article)
      if (saved.styleId) setStyleId(saved.styleId)
      if (saved.bodyCount) setBodyCount(saved.bodyCount)
      if (saved.plan) setPlan(saved.plan)
      if (saved.provider) {
        setProvider(saved.provider === 'dalle' ? 'gpt-image-2' : saved.provider)
      }
    }
  )

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const hasParams =
      searchParams.has('article') || searchParams.has('plan_json')
    if (!hasParams) {
      const restored = restoreDraft()
      if (restored) toast.info('已從本地存檔恢復草稿')
    } else {
      setInitialized(true)
    }
  }, [restoreDraft, setInitialized])

  const handleStartBreakdown = async () => {
    if (!article.trim()) {
      toast.error('請先輸入文章內容或 URL')
      return
    }
    if (article.length < 20) {
      toast.error('內容過短，請提供至少 20 字以獲得更好的拆解效果')
      return
    }

    const newPlan = await breakdown(article, styleId, bodyCount)
    if (newPlan) {
      setPlan(newPlan)
      toast.success('AI 拆解完成！')
    } else {
      toast.error('拆解失敗，請檢查網路或 API Key 配置')
    }
  }

  const handleRegenerate = async (type: 'cover' | 'body', index?: number) => {
    if (!article.trim() || !plan) return
    setRegeneratingIndex(type === 'cover' ? 'cover' : index!)

    if (type === 'cover') {
      const newSpec = await regenerateImage(
        article,
        'cover',
        plan.cover,
        styleId
      )
      if (newSpec) {
        setPlan({ ...plan, cover: newSpec as CoverSpec })
        toast.success('AI 已更新該卡片規劃')
      } else {
        toast.error('重新生成規劃失敗')
      }
      setRegeneratingIndex(null)
      return
    }

    const currentSpec = plan.bodies[index!]
    const newSpec = await regenerateImage(article, 'body', currentSpec, styleId)
    if (newSpec) {
      const newBodies = [...plan.bodies]
      newBodies[index!] = newSpec as BodySpec
      setPlan({ ...plan, bodies: newBodies })
      toast.success('AI 已更新該卡片規劃')
    } else {
      toast.error('重新生成規劃失敗')
    }
    setRegeneratingIndex(null)
  }

  const handleGenerateImage = async (
    type: 'cover' | 'body',
    index?: number
  ) => {
    if (!plan) return
    const spec = type === 'cover' ? plan.cover : plan.bodies[index!]

    if (type === 'cover') {
      const s = spec as CoverSpec
      if (!s.title.trim() || !s.metaphor.trim() || !s.elements.trim()) {
        toast.error('封面圖的主題、隱喻或元素不能為空')
        return
      }
    } else {
      const s = spec as BodySpec
      if (!s.title.trim() || s.modules.length === 0) {
        toast.error('正文圖的題圖或核心模塊不能為空')
        return
      }
    }

    setGeneratingImageIndex(type === 'cover' ? 'cover' : index!)

    try {
      const prompt =
        type === 'cover'
          ? renderCover(spec as CoverSpec)
          : renderBody(spec as BodySpec)
      const ratio = type === 'cover' ? '21:9' : '16:9'

      const url = await generateImage(prompt, ratio, provider)

      if (url) {
        if (type === 'cover') {
          setPlan((prev) =>
            prev
              ? { ...prev, cover: { ...prev.cover, generatedUrl: url } }
              : null
          )
        } else {
          setPlan((prev) => {
            if (!prev) return null
            const newBodies = [...prev.bodies]
            newBodies[index!] = { ...newBodies[index!], generatedUrl: url }
            return { ...prev, bodies: newBodies }
          })
        }
        return url
      }

      toast.error('生圖失敗')
      return null
    } finally {
      setGeneratingImageIndex(null)
    }
  }

  const handleGenerateAll = async () => {
    if (!plan) return
    const total = 1 + plan.bodies.length
    setBatchProgress({ current: 0, total })
    toast.info('開始批量生成圖片，請稍候...')
    await handleGenerateImage('cover')
    setBatchProgress({ current: 1, total })
    for (let i = 0; i < plan.bodies.length; i++) {
      await handleGenerateImage('body', i)
      setBatchProgress({ current: i + 2, total })
    }
    setBatchProgress(null)
    setGeneratingImageIndex(null)
    toast.success('所有圖片生成完成！')
  }

  const updateCover = (newCover: CoverSpec) => {
    if (!plan) return
    setPlan({ ...plan, cover: newCover })
  }

  const updateBody = (index: number, newBody: BodySpec) => {
    if (!plan) return
    const newBodies = [...plan.bodies]
    newBodies[index] = newBody
    setPlan({ ...plan, bodies: newBodies })
  }

  const addBody = () => {
    if (!plan) return
    const newBody: BodySpec = {
      title: '新正文圖',
      structure: '橫向流程圖',
      modules: [],
      notes: [],
      character_action: '思考中',
      speech_bubble: '加點什麼呢',
      bottomSentence: '總結一句話。',
      style_id: styleId,
    }
    setPlan({ ...plan, bodies: [...plan.bodies, newBody] })
    setBodyCount(plan.bodies.length + 1)
  }

  const deleteBody = (index: number) => {
    if (!plan) return
    const newBodies = plan.bodies.filter((_, i) => i !== index)
    setPlan({ ...plan, bodies: newBodies })
    setBodyCount(newBodies.length)
  }

  const moveBody = (index: number, direction: 'up' | 'down') => {
    if (!plan) return
    const newBodies = [...plan.bodies]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newBodies.length) return
    const temp = newBodies[index]
    newBodies[index] = newBodies[targetIndex]
    newBodies[targetIndex] = temp
    setPlan({ ...plan, bodies: newBodies })
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300 relative">
      {isCompareOpen && plan && (
        <CompareMode plan={plan} onClose={() => setIsCompareOpen(false)} />
      )}

      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold">V</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight">
                VisuScribe AI {t('editor')}
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ProviderSelector value={provider} onChange={setProvider} />
            <LanguageToggle />
            <ThemeToggle />
            {plan && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCompareOpen(true)}
                className="gap-2"
              >
                <ArrowRightLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{t('compareMode')}</span>
              </Button>
            )}
            <Link
              href={`/export?${new URLSearchParams({
                article: encodeURIComponent(article),
                plan_json: encodeURIComponent(
                  JSON.stringify(stripLargeGeneratedImages(plan) || {})
                ),
              }).toString()}`}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              {t('export')}
            </Link>
            <Button
              size="sm"
              onClick={handleGenerateAll}
              disabled={!plan || breakdownLoading || imageLoading}
            >
              {imageLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {t('generateAll')}
            </Button>
          </div>
        </div>
        {batchProgress && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-muted">
            <Progress
              value={(batchProgress.current / batchProgress.total) * 100}
              className="h-full rounded-none"
            />
          </div>
        )}
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-2">
            <label className="text-lg font-bold">文章內容 / URL</label>
            <ArticleEditor value={article} onChange={setArticle} />
          </div>
          <Separator />
          <StyleSelector
            selectedId={styleId}
            onSelect={(id) => {
              setStyleId(id)
              setGlobalAnchor(
                STYLE_ANCHORS[id] || STYLE_ANCHORS['handdrawn_knowledge_card']
              )
            }}
          />
          <Separator />
          <ImageCountConfig count={bodyCount} onChange={setBodyCount} />
          <Separator />
          <GlobalVisualConfig value={globalAnchor} onChange={setGlobalAnchor} />

          <Button
            className="w-full py-6 text-lg font-bold"
            onClick={handleStartBreakdown}
            disabled={breakdownLoading || !article.trim()}
          >
            {breakdownLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t('aiBreakdownLoading')}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                {t('aiBreakdown')}
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            <Save className="h-3 w-3" />
            {t('autoSave')}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          {breakdownLoading ? (
            <div className="space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-[400px] w-full" />
                <Skeleton className="h-[100px] w-full" />
              </div>
              <Separator />
              <div className="space-y-4">
                <Skeleton className="h-[300px] w-full" />
                <Skeleton className="h-[100px] w-full" />
              </div>
            </div>
          ) : !plan ? (
            <div className="h-[600px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground bg-muted/20">
              <Sparkles className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-lg">輸入文章並點擊「{t('aiBreakdown')}」</p>
              <p className="text-sm">或者手動新增圖片卡片開始編輯</p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() =>
                  setPlan({
                    cover: {
                      title: '',
                      subtitle: '',
                      metaphor: '',
                      elements: '',
                      character_action: '',
                      speech_bubble: '',
                      bottomSentence: '',
                      style_id: styleId,
                    },
                    bodies: [],
                  })
                }
              >
                手動開始
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <section className="space-y-4">
                <CoverCard
                  spec={plan.cover}
                  onChange={updateCover}
                  onRegenerate={() => handleRegenerate('cover')}
                  isRegenerating={regeneratingIndex === 'cover'}
                  onGenerateImage={() => handleGenerateImage('cover')}
                  isGeneratingImage={generatingImageIndex === 'cover'}
                />
                <PromptPreview type="cover" spec={plan.cover} />
              </section>

              <div className="flex items-center">
                <Separator className="flex-1" />
                <span className="px-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                  正文配圖
                </span>
                <Separator className="flex-1" />
              </div>

              {plan.bodies.map((body, i) => (
                <section key={i} className="space-y-4">
                  <BodyCard
                    index={i}
                    spec={body}
                    onChange={(newBody) => updateBody(i, newBody)}
                    onDelete={() => deleteBody(i)}
                    onMoveUp={i > 0 ? () => moveBody(i, 'up') : undefined}
                    onMoveDown={
                      i < plan.bodies.length - 1
                        ? () => moveBody(i, 'down')
                        : undefined
                    }
                    onRegenerate={() => handleRegenerate('body', i)}
                    isRegenerating={regeneratingIndex === i}
                    onGenerateImage={() => handleGenerateImage('body', i)}
                    isGeneratingImage={generatingImageIndex === i}
                  />
                  <PromptPreview type="body" spec={body} />
                </section>
              ))}

              <Button
                variant="outline"
                className="w-full border-dashed py-8 flex flex-col items-center justify-center space-y-2 hover:bg-muted/50"
                onClick={addBody}
              >
                <Plus className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  新增正文配圖
                </span>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div>Loading Editor...</div>}>
      <EditorContent />
    </Suspense>
  )
}
