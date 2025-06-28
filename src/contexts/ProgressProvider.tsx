import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigation } from 'react-router-dom'

import { Progress } from '@/components/ui/progress'

type ProgressContextValue = {
  isLoading: boolean
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined)

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const navigation = useNavigation()
  const [progress, setProgress] = useState(0)

  const isLoading = navigation.state === 'loading'

  useEffect(() => {
    let interval: NodeJS.Timeout
    let timeout: NodeJS.Timeout

    if (isLoading) {
      setProgress(10)
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval)
            return prev
          }
          return prev + 10
        })
      }, 200)
    } else {
      setProgress(100)
      timeout = setTimeout(() => setProgress(0), 500)
    }

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [isLoading])

  const value = useMemo(() => ({ isLoading }), [isLoading])

  return (
    <ProgressContext.Provider value={value}>
      {progress > 0 && (
        <Progress
          value={progress}
          className='fixed top-0 left-0 w-full z-50' />
      )}
      {children}
    </ProgressContext.Provider>
  )
}

export const useProgress = (): ProgressContextValue => {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
