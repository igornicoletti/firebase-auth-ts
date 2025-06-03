// src/lib/auth/components/form/auth-reset-form.tsx

import { AuthErrorCodes } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { AuthInputForm } from '@/lib/auth/components/form'
import { AuthSuccessCodes } from '@/lib/auth/constants'
import { useAuthToast } from '@/lib/auth/hooks'
import { authResetSchema } from '@/lib/auth/schemas'
import { confirmUserPasswordReset } from '@/lib/auth/services'

type AuthReset = z.infer<typeof authResetSchema>

export const AuthResetForm = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { toastError, toastSuccess } = useAuthToast()

  const [isLoading, setIsLoading] = useState(false)

  const oobCode = searchParams.get('oobCode')

  const form = useForm<AuthReset>({
    resolver: zodResolver(authResetSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const onSubmit = async (data: AuthReset) => {
    setIsLoading(true)

    if (!oobCode) {
      toastError(AuthErrorCodes.MISSING_CODE)
      navigate('/forgot-password')
      setIsLoading(false)
      return
    }

    try {
      await confirmUserPasswordReset(oobCode, data.newPassword)
      toastSuccess(AuthSuccessCodes.PASSWORD_RESET_SUCCESS)
      form.reset()
      navigate('/login')

    } catch (error) {
      toastError(error)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete='off'
        className='grid gap-4'>
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='password'
          name='newPassword'
          placeholder='New password'
          autoComplete='new-password' />
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='password'
          name='confirmNewPassword'
          placeholder='Confirm new password'
          autoComplete='new-password' />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? 'Resetting...' : 'Reset password'}
        </Button>
      </form>
    </Form>
  )
}
