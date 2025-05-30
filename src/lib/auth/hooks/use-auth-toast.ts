// src/lib/auth/hooks/use-auth-error-toast.ts

import { FirebaseError } from 'firebase/app'
import { useCallback } from 'react'
import { toast } from 'sonner'

import { authFormatCodes } from '@/lib/auth/helpers'

export const useAuthToast = () => {
  const toastError = useCallback((error: unknown) => {
    let code = 'unknown'

    if (typeof error === 'string') {
      code = error
    } else if (error instanceof FirebaseError) {
      code = error.code
    } else if (error && typeof error === 'object' && 'code' in error) {
      code = String((error as any).code)
    }

    const { title, description } = authFormatCodes(code)

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
    let code = 'unknown'

    if (typeof success === 'string') {
      code = success
    } else if (success && typeof success === 'object' && 'code' in success) {
      code = String((success as any).code)
    }

    const { title, description } = authFormatCodes(code)

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
