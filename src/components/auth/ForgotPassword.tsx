// src/components/auth/ForgotPassword.tsx

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneTiltIcon, SpinnerGapIcon } from '@phosphor-icons/react'

import { InputForm } from '@/components/auth'
import { Button, Form } from '@/components/ui'
import { AuthSuccessCodes } from '@/constants/auth'
import { useSubmit } from '@/hooks'
import { authService } from '@/services'

import { forgotPasswordSchema } from '@/schemas'
import type { ForgotPasswordFormValues } from '@/types'

export const ForgotPassword = () => {
  const navigate = useNavigate()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    }
  })

  const { isLoading, handleSubmit } = useSubmit<ForgotPasswordFormValues>({
    onSubmit: async (data) => {
      await authService.sendPasswordReset(data.email)
    },
    successMessage: AuthSuccessCodes.PASSWORD_RESET_EMAIL_SENT,
    onSuccess: () => navigate('/login', { replace: true })
  })

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
          {isLoading ? <SpinnerGapIcon className='animate-spin' /> : <PaperPlaneTiltIcon />}
          {isLoading ? 'Sending...' : 'Send reset email'}
        </Button>
      </form>
    </Form>
  )
}
