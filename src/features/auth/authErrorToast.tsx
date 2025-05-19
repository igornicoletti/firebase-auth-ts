import { authErrorMessage } from '@/features/auth'
import { FirebaseError } from 'firebase/app'
import { toast } from 'sonner'

const getErrorContent = (code: string) => {
  const fallback = {
    title: 'Authentication Error',
    message: 'An unexpected error occurred. Please try again.'
  }

  if (code in authErrorMessage) {
    const { title, message } = authErrorMessage[code as keyof typeof authErrorMessage]
    return { title, message }
  }

  return fallback
}

export const authErrorToast = (error: unknown) => {
  if (error instanceof FirebaseError) {
    const { title, message } = getErrorContent(error.code)
    toast(<span className='text-destructive'>{title}</span>, {
      description: message,
    })
  } else {
    toast(<span className='text-destructive'>Unexpected Error</span>, {
      description: 'Something went wrong. Please try again.'
    })
  }
}
