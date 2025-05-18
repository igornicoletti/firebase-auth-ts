import { authErrorMessage } from '@/features/auth'
import { FirebaseError } from 'firebase/app'
import { toast } from 'sonner'

const getErrorMessages = (code: string): string => {
  if (code in authErrorMessage) {
    return authErrorMessage[code as keyof typeof authErrorMessage].message
  }
  return 'An unexpected error occurred. Please try again.'
}

export const authErrorToast = (error: unknown) => {
  if (error instanceof FirebaseError) {
    toast('Authentication Error', {
      description: getErrorMessages(error.code),
    })
  } else {
    toast('Unexpected Error', {
      description: 'Something went wrong. Please try again.'
    })
  }
}
