import { useEffect, useCallback, useRef } from 'react'

function isQuotaExceededError(error: unknown) {
  return (
    error instanceof DOMException &&
    (error.name === 'QuotaExceededError' ||
      error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
  )
}

function stripGeneratedDataUrls(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stripGeneratedDataUrls)
  }

  if (!value || typeof value !== 'object') {
    return value
  }

  return Object.fromEntries(
    Object.entries(value).flatMap(([entryKey, entryValue]) => {
      if (
        entryKey === 'generatedUrl' &&
        typeof entryValue === 'string' &&
        (entryValue.startsWith('data:') || entryValue.startsWith('blob:'))
      ) {
        return []
      }

      return [[entryKey, stripGeneratedDataUrls(entryValue)]]
    })
  )
}

export function usePersistence<T>(
  key: string,
  data: T,
  onRestore: (data: T) => void
) {
  const isInitialized = useRef(false)
  const onRestoreRef = useRef(onRestore)
  const lastSavedStr = useRef<string>('')

  // Keep ref updated to always point to the latest callback without triggering dependencies
  useEffect(() => {
    onRestoreRef.current = onRestore
  }, [onRestore])

  // Save to localStorage on data change, but only after initialization
  useEffect(() => {
    if (isInitialized.current) {
      const storageKey = `visuscribe_${key}`
      const currentStr = JSON.stringify(data)
      
      if (currentStr === lastSavedStr.current) {
        return
      }

      try {
        localStorage.setItem(storageKey, currentStr)
        lastSavedStr.current = currentStr
      } catch (error) {
        if (!isQuotaExceededError(error)) {
          throw error
        }

        const strippedData = stripGeneratedDataUrls(data)
        const strippedStr = JSON.stringify(strippedData)
        localStorage.setItem(storageKey, strippedStr)
        lastSavedStr.current = strippedStr
      }
    }
  }, [key, data])

  // Manual Restore
  const restore = useCallback(() => {
    const saved = localStorage.getItem(`visuscribe_${key}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        onRestoreRef.current(parsed)
        lastSavedStr.current = saved
        isInitialized.current = true
        return true
      } catch (e) {
        console.error('Failed to restore from local storage', e)
      }
    }
    isInitialized.current = true
    return false
  }, [key])

  const clear = useCallback(() => {
    localStorage.removeItem(`visuscribe_${key}`)
    lastSavedStr.current = ''
  }, [key])

  const setInitialized = useCallback((val: boolean) => {
    isInitialized.current = val
  }, [])

  return {
    restore,
    clear,
    setInitialized,
  }
}
