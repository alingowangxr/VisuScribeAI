import { useEffect, useCallback, useRef } from 'react'

export function usePersistence<T>(key: string, data: T, onRestore: (data: T) => void) {
  const isInitialized = useRef(false)

  // Save to localStorage on data change, but only after initialization
  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem(`cc2image_${key}`, JSON.stringify(data))
    }
  }, [key, data])

  // Manual Restore
  const restore = useCallback(() => {
    const saved = localStorage.getItem(`cc2image_${key}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        onRestore(parsed)
        isInitialized.current = true
        return true
      } catch (e) {
        console.error('Failed to restore from local storage', e)
      }
    }
    isInitialized.current = true
    return false
  }, [key, onRestore])

  const clear = useCallback(() => {
    localStorage.removeItem(`cc2image_${key}`)
  }, [key])

  return { restore, clear, setInitialized: (val: boolean) => { isInitialized.current = val } }
}
