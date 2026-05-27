'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, translations } from '@/lib/i18n'

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: keyof typeof translations.zh) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('zh')

  useEffect(() => {
    const saved = localStorage.getItem('cc2image_lang') as Language
    if (saved && (saved === 'zh' || saved === 'en')) {
      setLang(saved)
    }
  }, [])

  const handleSetLang = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem('cc2image_lang', newLang)
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
