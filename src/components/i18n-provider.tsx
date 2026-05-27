'use client'

import React, { createContext, useContext, useSyncExternalStore } from 'react'
import { Language, translations } from '@/lib/i18n'

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: keyof typeof translations.zh) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const languageChangeEvent = 'visuscribe-language-change'

function isLanguage(value: string | null): value is Language {
  return value === 'zh' || value === 'en'
}

function getLanguageSnapshot(): Language {
  if (typeof window === 'undefined') return 'zh'

  const saved = localStorage.getItem('visuscribe_lang')
  return isLanguage(saved) ? saved : 'zh'
}

function subscribeLanguageChange(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener(languageChangeEvent, callback)

  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener(languageChangeEvent, callback)
  }
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore<Language>(
    subscribeLanguageChange,
    getLanguageSnapshot,
    () => 'zh' as const
  )

  const handleSetLang = (newLang: Language) => {
    localStorage.setItem('visuscribe_lang', newLang)
    window.dispatchEvent(new Event(languageChangeEvent))
  }

  const t = (key: keyof typeof translations.zh) => {
    return translations[lang][key] || key
  }

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}
