// src/shared/components/ProgressBar.tsx

import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigation } from 'react-router-dom'

import { Progress } from '@/components/ui/progress'

const START_DELAY_MS = 150
const FINISH_ANIMATION_MS = 200
const ESTIMATED_LOAD_TIME_MS = 500

export const ProgressBar = () => {
  const navigation = useNavigation()
  const [progress, setProgress] = useState(0)
  const [shouldRender, setShouldRender] = useState(false)

  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<DOMHighResTimeStamp | null>(null)
  const startDelayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const finishTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const animateProgress = useCallback((currentTime: DOMHighResTimeStamp) => {
    if (!startTimeRef.current) return

    const elapsedTime = currentTime - startTimeRef.current
    const calculatedProgress = Math.min(99, (elapsedTime / ESTIMATED_LOAD_TIME_MS) * 100)

    setProgress(calculatedProgress)

    if (navigation.state === 'loading') {
      animationFrameRef.current = requestAnimationFrame(animateProgress)
    }
  }, [navigation.state])

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (startDelayTimerRef.current) clearTimeout(startDelayTimerRef.current)
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (navigation.state === 'loading') {
      startDelayTimerRef.current = setTimeout(() => {
        if (!shouldRender) {
          setShouldRender(true)
          setProgress(0)
          startTimeRef.current = performance.now()
          animationFrameRef.current = requestAnimationFrame(animateProgress)
        }
      }, START_DELAY_MS)
    }

    if (navigation.state === 'idle') {
      if (startDelayTimerRef.current) clearTimeout(startDelayTimerRef.current)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)

      if (shouldRender) {
        setProgress(100)
        finishTimeoutRef.current = setTimeout(() => {
          setShouldRender(false)
          setProgress(0)
        }, FINISH_ANIMATION_MS)
      }
    }
  }, [navigation.state, shouldRender, animateProgress])

  if (!shouldRender) return null

  return (
    <Progress
      value={progress}
      className='fixed top-0 left-0 w-full z-50'
    />
  )
}
