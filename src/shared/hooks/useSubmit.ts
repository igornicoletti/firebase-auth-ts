// src/features/auth/hooks/useSubmit.ts

import { useState } from 'react'

import { useToast } from '@/shared/hooks'

type useSubmitOptions<T> = {
  onSubmit: (data: T) => Promise<void> | void
  successMessage?: string
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

export const useSubmit = <T>({ onSubmit, successMessage, onSuccess, onError }: useSubmitOptions<T>) => {
  const { toastError, toastSuccess } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: T) => {
    setIsLoading(true)

    try {
      await onSubmit(data)
      if (successMessage) {
        toastSuccess(successMessage)
      }
      onSuccess?.()
    } catch (error) {
      if (onError) {
        onError(error)
      } else {
        toastError(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleSubmit }
}
