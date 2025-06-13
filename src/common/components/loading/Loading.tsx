// src/common/components/loading/Loading.tsx

import { useEffect, useState } from 'react'

import { Spinner } from '@phosphor-icons/react'

import { Progress } from '@/shadcn/ui/progress'

import type { LoadingScreenProps } from '@/common/components/loading'

export const Loading = ({ progress: externalProgress, message }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (externalProgress === undefined) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval)
            return 100
          }
          return prevProgress + 10
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      setProgress(externalProgress)
    }
  }, [externalProgress])

  return (
    <div className="min-h-screen grid place-items-center px-4 py-6">
      <div className="w-full max-w-sm text-muted-foreground text-center space-y-4">
        <Spinner className="animate-spin text-2xl mx-auto" />
        <p className="text-sm font-medium">
          {message || 'Please wait while we prepare everything'}
        </p>
        <Progress value={progress} />
      </div>
    </div>
  )
}
