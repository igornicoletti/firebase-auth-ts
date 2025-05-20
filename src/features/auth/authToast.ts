import { authMessage } from '@/features/auth'
import { FirebaseError } from 'firebase/app'
import { toast } from 'sonner'

const getErrorMessageCode = (code: string) => {
  const fallback = {
    title: 'Authentication Error',
    message: 'An unexpected error occurred. Please try again.'
  }

  if (code in authMessage) {
    const { title, message } = authMessage[code as keyof typeof authMessage]
    return { title, message }
  }

  return fallback
}

export const authToast = (error: unknown | string) => {
  if (typeof error === 'string') {
    const { title, message } = getErrorMessageCode(error)
    return toast.error(title, { description: message })
  }

  if (error instanceof FirebaseError) {
    const { title, message } = getErrorMessageCode(error.code)
    return toast.error(title, { description: message })
  }

  return toast.error('Unexpected Error', {
    description: 'Something went wrong. Please try again.'
  })
}
