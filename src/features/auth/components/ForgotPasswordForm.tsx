// src/auth/components/form/ForgotPasswordForm.tsx

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shadcn/ui/button'
import { Form } from '@/shadcn/ui/form'

import { useToast } from '@/common'
import { InputForm } from '@/common/components/form'
import { AuthSuccessCodes } from '@/features/auth/constants'
import { useAuthRedirect, useFormSubmit } from '@/features/auth/hooks'
import { type ForgotPasswordFormData, forgotPasswordSchema } from '@/features/auth/schemas'
import { authService } from '@/features/auth/services'

export const ForgotPasswordForm = () => {
  const { isRedirecting } = useAuthRedirect()
  const navigate = useNavigate()
  const { toastError } = useToast()

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    }
  })

  const { isLoading, handleSubmit } = useFormSubmit<ForgotPasswordFormData>({
    onSubmit: async (data) => {
      await authService.sendPasswordReset(data.email)
    },
    successMessage: AuthSuccessCodes.PASSWORD_RESET_EMAIL_SENT,
    onSuccess: () => navigate('/login', { replace: true }),
    onError: (error) => toastError(error)
  })

  if (isRedirecting) return null

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        className='grid gap-4'>
        <InputForm
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='email'
          autoFocus
        />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? 'Sending...' : 'Send reset email'}
        </Button>
      </form>
    </Form>
  )
}
