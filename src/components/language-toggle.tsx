'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/components/i18n-provider'
import { Languages } from 'lucide-react'

export function LanguageToggle() {
  const { lang, setLang } = useI18n()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1 px-2"
      onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
    >
      <Languages className="h-4 w-4" />
      <span className="text-[10px] font-bold uppercase">{lang === 'zh' ? 'EN' : '中文'}</span>
    </Button>
  )
}
