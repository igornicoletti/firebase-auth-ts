// src/components/auth/ResetPassword.tsx

import { AuthErrorCodes } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { ShieldStarIcon, SpinnerGapIcon } from '@phosphor-icons/react'

import { InputForm } from '@/components/auth'
import { Button, Form } from '@/components/ui'
import { AuthSuccessCodes } from '@/constants/auth'

import { useSubmit, useToast } from '@/hooks'
import { authService } from '@/services'

import { resetPasswordSchema } from '@/schemas'
import type { ResetPasswordFormValues } from '@/types'

export const ResetPassword = () => {
  const navigate = useNavigate()
  const { toastError } = useToast()
  const [searchParams] = useSearchParams()

  const oobCode = searchParams.get('oobCode')

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const { isLoading, handleSubmit } = useSubmit<ResetPasswordFormValues>({
    onSubmit: async (data) => {
      if (!oobCode) {
        toastError(AuthErrorCodes.MISSING_CODE)
        navigate('/forgot-password', { replace: true })
        return
      }
      await authService.confirmUserPasswordReset(oobCode, data.password)
    },
    successMessage: AuthSuccessCodes.PASSWORD_UPDATE_SUCCESS,
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
          type='password'
          name='password'
          placeholder='New password'
          autoComplete='new-password'
          autoFocus
        />
        <InputForm
          control={form.control}
          disabled={isLoading}
          type='password'
          name='confirmPassword'
          placeholder='Confirm new password'
          autoComplete='new-password'
        />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? <SpinnerGapIcon className='animate-spin' /> : <ShieldStarIcon />}
          {isLoading ? 'Resetting...' : 'Reset password'}
        </Button>
      </form>
    </Form>
  )
}
