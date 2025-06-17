// src/features/auth/hooks/useFormSubmit.ts

import { useState } from 'react'

import { useToast } from '@/shared/hooks'

type UseFormSubmitOptions<T> = {
  onSubmit: (data: T) => Promise<void> | void
  successMessage?: string
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

export const useFormSubmit = <T>({
  onSubmit,
  successMessage,
  onSuccess,
  onError
}: UseFormSubmitOptions<T>) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toastError, toastSuccess } = useToast()

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
        console.log(`if onError: ${error}`)
        onError(error)
      } else {
        console.log(`else: ${error}`)
        toastError(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleSubmit }
}
