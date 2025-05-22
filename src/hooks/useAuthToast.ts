import { getMessage } from '@/features/auth'
import { toast, type ToasterProps } from 'sonner'

export const useAuthToast = () => {
  const toastError = (
    error: unknown,
    options?: Omit<ToasterProps, 'title' | 'description'>
  ): string | undefined => {
    const code = (error as { code?: string })?.code
    if (typeof code === 'string') {
      const { title, message } = getMessage(code, 'error')
      toast(title, { description: message, ...options })
      return code
    }
    toast('Error', { description: 'Something went wrong. Please try again.', ...options })
    return undefined
  }

  const toastSuccess = (
    code: string,
    options?: Omit<ToasterProps, 'title' | 'description'>
  ): void => {
    const { title, message } = getMessage(code, 'success')
    toast(title, { description: message, ...options })
  }

  return { toastError, toastSuccess }
}
