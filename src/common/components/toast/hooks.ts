// src/common/components/toast/hooks.ts

import { FirebaseError } from 'firebase/app'
import { useCallback } from 'react'
import { toast } from 'sonner'

import { authFormat } from '@/common/components/toast/helpers'
import type { AuthSuccessCodes } from '@/features/auth/constants'

export const useToast = () => {
  const toastError = useCallback((error: unknown) => {
    const code = extractCode(error)
    const { title, description } = authFormat.error(code)

    toast.dismiss()
    toast.message(title, {
      description,
      classNames: {
        title: '!text-destructive',
        description: '!text-foreground',
      },
    })
  }, [])

  const toastSuccess = useCallback((successKey: AuthSuccessCodes) => {
    const { title, description } = authFormat.success(successKey)

    toast.dismiss()
    toast.message(title, {
      description,
      classNames: {
        title: '!text-primary',
        description: '!text-foreground',
      },
    })
  }, [])

  return { toastError, toastSuccess }
}

const extractCode = (input: unknown): string => {
  if (typeof input === 'string') return input
  if (input instanceof FirebaseError) return input.code
  if (input && typeof input === 'object' && 'code' in input) return String((input as any).code)
  return 'unknown'
}
