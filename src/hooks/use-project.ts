import { useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { ImagePlan } from '@/lib/types'
import { stripLargeGeneratedImages } from '@/lib/plan-serialization'

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
  const hasInitialized = useRef(false)

  // Initialize from URL
  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

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
    
    // Truncate extremely long articles for URL serialization to prevent HTTP 414 URI Too Long
    const shareableArticle = article && article.length > 800
      ? article.substring(0, 800) + '...'
      : article

    if (shareableArticle) params.set('article', encodeURIComponent(shareableArticle))
    if (styleId) params.set('style', styleId)
    if (bodyCount) params.set('count', bodyCount.toString())
    const shareablePlan = stripLargeGeneratedImages(plan)
    if (shareablePlan) {
      params.set('plan_json', encodeURIComponent(JSON.stringify(shareablePlan)))
    }

    const queryString = params.toString()
    if (queryString && queryString.length < 5000) {
      window.history.replaceState(null, '', `?${queryString}`)
    } else if (queryString) {
      // If still too large, omit the article text from URL sync to preserve the JSON plan structural data
      const backupParams = new URLSearchParams()
      if (styleId) backupParams.set('style', styleId)
      if (bodyCount) backupParams.set('count', bodyCount.toString())
      if (shareablePlan) {
        backupParams.set('plan_json', encodeURIComponent(JSON.stringify(shareablePlan)))
      }
      const backupQuery = backupParams.toString()
      if (backupQuery && backupQuery.length < 5000) {
        window.history.replaceState(null, '', `?${backupQuery}`)
      }
    }
  }, [article, styleId, bodyCount, plan])

  useEffect(() => {
    syncToUrl()
  }, [syncToUrl])

  return { syncToUrl }
}
