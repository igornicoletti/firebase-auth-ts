// src/hooks/useIdleDetector.ts
import { useCallback, useEffect, useRef, useState } from 'react'

interface UseIdleDetectorOptions {
  timeout: number // Tempo de inatividade em milissegundos
  onIdle: () => void // Callback quando o usuário fica inativo
  onActive?: () => void // Callback quando o usuário volta a ficar ativo (opcional)
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

    // Se o usuário estava inativo e agora está ativo, aciona onActive
    if (isIdle && onActive) {
      setIsIdle(false)
      onActive()
    }
  }, [timeout, onIdle, onActive, isIdle])

  useEffect(() => {
    // Inicializa o timer na montagem
    resetTimer()

    // Adiciona event listeners para resetar o timer na atividade
    IDLE_EVENTS.forEach(event => {
      document.addEventListener(event, resetTimer)
    })

    // Limpa event listeners e timer ao desmontar o componente
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
