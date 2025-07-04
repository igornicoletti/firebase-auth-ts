import { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom'

import { Progress } from '@/components/ui/progress'

export const ProgressBar = () => {
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

  if (progress === 0) return null

  return (
    <Progress
    value={progress}
    className='fixed top-0 left-0 w-full z-50' />
  )
}
