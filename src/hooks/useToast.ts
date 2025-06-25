// src/hooks/useToast.ts

import { useCallback } from 'react'
import { toast } from 'sonner'

import { extractCode, formatCode } from '@/helpers'

export const useToast = () => {
  const toastError = useCallback((errorKey: unknown) => {
    const code = extractCode(errorKey)
    const { title, description } = formatCode.error(code)

    toast.message(title, {
      description, classNames: {
        title: '!text-destructive',
        description: '!text-foreground',
      }
    })
  }, [])

  const toastSuccess = useCallback((successKey: unknown) => {
    const code = extractCode(successKey)
    const { title, description } = formatCode.success(code)

    toast.message(title, {
      description, classNames: {
        title: '!text-constructive',
        description: '!text-foreground',
      }
    })
  }, [])

  return { toastError, toastSuccess }
}
