import { useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { ImagePlan } from '@/lib/types'

export function useProject(
  article: string,
  setArticle: (v: string) => void,
  styleId: string,
  setStyleId: (v: string) => void,
  bodyCount: number,
  setBodyCount: (v: number) => void,
  plan: ImagePlan | null,
  setPlan: (p: ImagePlan | null) => void
) {
  const searchParams = useSearchParams()

  // Initialize from URL
  useEffect(() => {
    const urlArticle = searchParams.get('article')
    const urlStyle = searchParams.get('style')
    const urlCount = searchParams.get('count')
    const urlPlan = searchParams.get('plan_json')

    if (urlArticle) setArticle(decodeURIComponent(urlArticle))
    if (urlStyle) setStyleId(urlStyle)
    if (urlCount) setBodyCount(parseInt(urlCount))
    if (urlPlan) {
      try {
        setPlan(JSON.parse(decodeURIComponent(urlPlan)))
      } catch (e) {
        console.error('Failed to parse plan from URL', e)
      }
    }
  }, [searchParams, setArticle, setBodyCount, setPlan, setStyleId])

  // Sync to URL
  const syncToUrl = useCallback(() => {
    const params = new URLSearchParams()
    if (article) params.set('article', encodeURIComponent(article))
    if (styleId) params.set('style', styleId)
    if (bodyCount) params.set('count', bodyCount.toString())
    if (plan) params.set('plan_json', encodeURIComponent(JSON.stringify(plan)))

    const queryString = params.toString()
    if (queryString) {
      window.history.replaceState(null, '', `?${queryString}`)
    }
  }, [article, styleId, bodyCount, plan])

  useEffect(() => {
    syncToUrl()
  }, [syncToUrl])

  return { syncToUrl }
}
