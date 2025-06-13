
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shadcn/ui/button'
import { Form } from '@/shadcn/ui/form'

import { useToast } from '@/common'
import { InputForm } from '@/common/components/form'
import { AuthSuccessCodes } from '@/features/auth/constants'
import { useAuthRedirect, useFormSubmit } from '@/features/auth/hooks'
import { resetPasswordSchema, type ResetPasswordFormData } from '@/features/auth/schemas'
import { authService } from '@/features/auth/services'

export const ResetPasswordForm = () => {
  const { isRedirecting } = useAuthRedirect()
  const navigate = useNavigate()
  const { toastError } = useToast()

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const { isLoading, handleSubmit } = useFormSubmit<ResetPasswordFormData>({
    onSubmit: async (data) => {
      await authService.confirmUserPasswordReset(data.password, data.confirmPassword)
    },
    successMessage: AuthSuccessCodes.PASSWORD_UPDATE_SUCCESS,
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
          {isLoading ? 'Resetting...' : 'Reset password'}
        </Button>
      </form>
    </Form>
  )
}
