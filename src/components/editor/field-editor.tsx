'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface FieldEditorProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  isTextArea?: boolean
}

export function FieldEditor({
  label,
  value,
  onChange,
  placeholder,
  isTextArea,
}: FieldEditorProps) {
  return (
    <div className="space-y-1">
      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
        {label}
      </Label>
      {isTextArea ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[60px] text-sm py-1 px-2"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-8 text-sm py-1 px-2"
        />
      )}
    </div>
  )
}
