// src/shared/components/ProgressBar.tsx

import { useEffect, useRef, useState } from 'react'
import { useNavigation } from 'react-router-dom'

import { Progress } from '@/shadcn/ui/progress'

export const ProgressBar = () => {
  const navigation = useNavigation()
  const [progress, setProgress] = useState(0)
  const [shouldRender, setShouldRender] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<DOMHighResTimeStamp | null>(null)
  const estimatedLoadTime = useRef<number>(500)

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (navigation.state === 'loading') {
      setShouldRender(true)
      setProgress(0)

      startTimeRef.current = performance.now()
      const animateProgress = (currentTime: DOMHighResTimeStamp) => {
        if (!startTimeRef.current) return

        const elapsedTime = currentTime - startTimeRef.current
        let calculatedProgress = (elapsedTime / estimatedLoadTime.current) * 100

        calculatedProgress = Math.min(99, calculatedProgress)

        setProgress(calculatedProgress)

        if (navigation.state === 'loading') {
          animationFrameRef.current = requestAnimationFrame(animateProgress)
        }
      }

      animationFrameRef.current = requestAnimationFrame(animateProgress)

    } else if (navigation.state === 'idle') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      setProgress(100)
      setShouldRender(false)
      setProgress(0)
    }
  }, [navigation.state])

  if (!shouldRender) return null

  return <Progress value={progress} className="fixed top-0 left-0 w-full z-50" />
}
