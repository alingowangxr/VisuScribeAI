'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCcw } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold mb-2">發生了點意外</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        抱歉，系統目前遇到了一些技術問題。你可以嘗試重新載入，或返回首頁。
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => reset()} className="gap-2">
          <RefreshCcw className="w-4 h-4" />
          嘗試重試
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">返回首頁</Link>
        </Button>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <pre className="mt-12 p-4 bg-muted rounded text-left text-xs overflow-auto max-w-full">
          {error.message}
        </pre>
      )}
    </div>
  )
}
