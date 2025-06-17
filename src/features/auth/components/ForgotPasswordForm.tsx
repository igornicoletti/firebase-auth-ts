// src/auth/components/form/ForgotPasswordForm.tsx

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneTilt, SpinnerGap } from '@phosphor-icons/react'

import { AuthInputForm } from '@/features/auth/components'
import { useFormSubmit } from '@/features/auth/hooks'
import { authService } from '@/features/auth/services'
import { Button } from '@/shadcn/ui/button'
import { Form } from '@/shadcn/ui/form'
import { AuthSuccessCodes } from '@/shared/constants'
import { useToast } from '@/shared/hooks'
import { forgotPasswordSchema, type ForgotPasswordData } from '@/shared/schemas'

export const ForgotPasswordForm = () => {
  const navigate = useNavigate()
  const { toastError } = useToast()

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    }
  })

  const { isLoading, handleSubmit } = useFormSubmit<ForgotPasswordData>({
    onSubmit: async (data) => {
      await authService.sendPasswordReset(data.email)
    },
    successMessage: AuthSuccessCodes.PASSWORD_RESET_EMAIL_SENT,
    onSuccess: () => navigate('/login', { replace: true }),
    onError: (error) => toastError(error)
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        className='grid gap-4'>
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='email'
          autoFocus
        />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? <SpinnerGap className='animate-spin' /> : <PaperPlaneTilt />}
          {isLoading ? 'Sending...' : 'Send reset email'}
        </Button>
      </form>
    </Form>
  )
}
