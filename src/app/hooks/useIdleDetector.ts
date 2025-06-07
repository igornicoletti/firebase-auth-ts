// src/hooks/useIdleDetector.ts
import { useCallback, useEffect, useRef, useState } from 'react'

interface UseIdleDetectorOptions {
  timeout: number
  onIdle: () => void
  onActive?: () => void
}

const IDLE_EVENTS = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']

export const useIdleDetector = ({ timeout, onIdle, onActive }: UseIdleDetectorOptions) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [isIdle, setIsIdle] = useState(false)

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      setIsIdle(true)
      onIdle()
    }, timeout)

    if (isIdle && onActive) {
      setIsIdle(false)
      onActive()
    }

  }, [timeout, onIdle, onActive, isIdle])

  useEffect(() => {
    resetTimer()

    IDLE_EVENTS.forEach(event => {
      document.addEventListener(event, resetTimer)
    })

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      IDLE_EVENTS.forEach(event => {
        document.removeEventListener(event, resetTimer)
      })
    }

  }, [resetTimer])
}
