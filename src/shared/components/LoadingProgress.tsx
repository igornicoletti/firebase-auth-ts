import { useEffect, useState } from 'react'

import { SpinnerGap } from '@phosphor-icons/react'

import { Progress } from '@/shadcn/ui/progress'

type LoadingProps = {
  isIndeterminate?: boolean
  value?: number
  message?: string
}

export const LoadingProgress = ({
  isIndeterminate = false,
  value,
  message,
}: LoadingProps) => {
  const [currentProgress, setCurrentProgress] = useState<number>(0)

  useEffect(() => {
    if (isIndeterminate) {
      const interval = setInterval(() => {
        setCurrentProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval)
            return 100
          }
          return prevProgress + 10
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      if (value !== undefined) {
        setCurrentProgress(value)
      }
    }
  }, [isIndeterminate, value])

  return (
    <div className='min-h-screen grid place-items-center p-6'>
      <div className='w-full max-w-sm'>
        <div className='grid gap-6'>
          <div className='grid gap-2 text-center'>
            <SpinnerGap className="animate-spin size-6 mx-auto" />
            <p className='text-sm text-muted-foreground'>
              {message || 'Please wait while we prepare everything'}
            </p>
          </div>
          <Progress value={currentProgress} />
        </div>
      </div>
    </div>
  )
}
