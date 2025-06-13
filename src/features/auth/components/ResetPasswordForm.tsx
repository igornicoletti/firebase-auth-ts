
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shadcn/ui/button'
import { Form } from '@/shadcn/ui/form'

import { useToast } from '@/common'
import { InputForm } from '@/common/components/form'
import { AuthSuccessCodes } from '@/features/auth/constants'
import { useFormSubmit } from '@/features/auth/hooks'
import { resetPasswordSchema, type ResetPasswordFormData } from '@/features/auth/schemas'
import { authService } from '@/features/auth/services'
import { AuthErrorCodes } from 'firebase/auth'

export const ResetPasswordForm = () => {
  const navigate = useNavigate()
  const { toastError } = useToast()
  const [searchParams] = useSearchParams()

  const oobCode = searchParams.get('oobCode')

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const { isLoading, handleSubmit } = useFormSubmit<ResetPasswordFormData>({
    onSubmit: async (data) => {
      if (!oobCode) {
        toastError(AuthErrorCodes.MISSING_CODE)
        navigate('/forgot-password', { replace: true })
        return
      }
      await authService.confirmUserPasswordReset(oobCode, data.password)
    },
    successMessage: AuthSuccessCodes.PASSWORD_UPDATE_SUCCESS,
    onSuccess: () => navigate('/login', { replace: true }),
    onError: (error) => toastError(error)
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
          {isLoading ? 'Resetting...' : 'Reset password'}
        </Button>
      </form>
    </Form>
  )
}
