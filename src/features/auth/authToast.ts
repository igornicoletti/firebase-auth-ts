import { authMessage } from '@/features/auth'
import { FirebaseError } from 'firebase/app'
import { toast } from 'sonner'

type AuthErrorMessage = { title: string; message: string }

const getErrorMessageCode = (code: string): AuthErrorMessage => {
  const fallback: AuthErrorMessage = {
    title: 'Authentication Error',
    message: 'An unexpected error occurred. Please try again.',
  }

  if (code && code in authMessage) {
    const entry = authMessage[code as keyof typeof authMessage]
    if (entry?.title && entry?.message) {
      return { title: entry.title, message: entry.message }
    }
  }

  return fallback
}

export const authToast = (error: unknown | string) => {
  if (typeof error === 'string') {
    const { title, message } = getErrorMessageCode(error)
    return toast(title, { description: message })
  }

  if (error instanceof FirebaseError) {
    const { title, message } = getErrorMessageCode(error.code)
    return toast(title, { description: message })
  }

  if (error instanceof Error) {
    return toast(error.message || 'Unexpected Error', {
      description: 'Something went wrong. Please try again.',
    })
  }

  return toast('Unexpected Error', {
    description: 'Something went wrong. Please try again.',
  })
}
