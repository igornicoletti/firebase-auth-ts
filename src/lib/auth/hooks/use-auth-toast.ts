// src/lib/auth/hooks/use-auth-toast.ts

import { FirebaseError } from 'firebase/app'
import { useCallback } from 'react'
import { toast } from 'sonner'

import { authFormatCodes } from '@/lib/auth/helpers/auth-format-codes'

export const useAuthToast = () => {
  const extractCode = (input: unknown) => {
    if (typeof input === 'string') return input
    if (input instanceof FirebaseError) return input.code
    if (input && typeof input === 'object' && 'code' in input) return String((input as any).code)
    return 'unknown'
  }

  const toastError = useCallback((error: unknown) => {
    const code = extractCode(error)
    const { title, description } = authFormatCodes.error(code)

    toast.dismiss()
    toast.message(title, {
      description,
      classNames: {
        title: '!text-destructive',
        description: '!text-foreground'
      }
    })
  }, [])

  const toastSuccess = useCallback((success: unknown) => {
    const code = extractCode(success)
    const { title, description } = authFormatCodes.success(code)

    toast.dismiss()
    toast.message(title, {
      description,
      classNames: {
        title: '!text-primary',
        description: '!text-foreground'
      }
    })
  }, [])

  return { toastError, toastSuccess }
}
