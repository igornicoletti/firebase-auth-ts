// src/lib/routes/loading.route.ts

import { useEffect, useState } from "react"

import { Progress } from "@/components/ui/progress"

import { Spinner } from "@phosphor-icons/react"

type LoadingProps = {
  progress?: number
  message?: string
}

export const Loading = ({ progress: externalProgress, message }: LoadingProps) => {
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
        <div className="flex justify-center">
          <Spinner className="size-6 animate-spin text-primary" weight="bold" />
        </div>
        <p className="text-sm font-medium">
          {message || 'Please wait while we prepare everything'}
        </p>
        <Progress value={progress} />
      </div>
    </div>
  )
}
