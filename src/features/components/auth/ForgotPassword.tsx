// src/features/components/auth/ForgotPassword.tsx

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneTilt, SpinnerGap } from '@phosphor-icons/react'

import { InputForm } from '@/features/auth'
import { Button } from '@/shadcn/ui/button'
import { Form } from '@/shadcn/ui/form'
import { AuthSuccessCodes } from '@/shared/constants'
import { useSubmit } from '@/shared/hooks'
import { forgotPasswordSchema, type ForgotPasswordData } from '@/shared/schemas'
import { authService } from '@/shared/services'

export const ForgotPassword = () => {
  const navigate = useNavigate()

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const { isLoading, handleSubmit } = useSubmit<ForgotPasswordData>({
    onSubmit: async (data) => {
      await authService.sendPasswordReset(data.email)
    },
    successMessage: AuthSuccessCodes.PASSWORD_RESET_EMAIL_SENT,
    onSuccess: () => navigate('/login', { replace: true })
  })

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubmit)}
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
          {isLoading ? <SpinnerGap className='animate-spin' /> : <PaperPlaneTilt />}
          {isLoading ? 'Sending...' : 'Send reset email'}
        </Button>
      </form>
    </Form>
  )
}
