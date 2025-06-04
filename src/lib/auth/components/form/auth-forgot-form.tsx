// src/lib/auth/components/form/auth-forgot-form.tsx

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { AuthInputForm } from '@/lib/auth/components/form'
import { AuthSuccessCodes } from '@/lib/auth/constants'
import { useAuthToast } from '@/lib/auth/hooks'
import { authForgotSchema } from '@/lib/auth/schemas'
import { sendPasswordReset } from '@/lib/auth/services'

type AuthForgot = z.infer<typeof authForgotSchema>

export const AuthForgotForm = () => {
  const navigate = useNavigate()
  const { toastError, toastSuccess } = useAuthToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<AuthForgot>({
    resolver: zodResolver(authForgotSchema),
    defaultValues: { email: '' },
  })

  const handleSendPasswordReset = async (data: AuthForgot) => {
    setIsLoading(true)

    try {
      await sendPasswordReset(data.email)
      form.reset()
      navigate('/login')
      toastSuccess(AuthSuccessCodes.PASSWORD_RESET_EMAIL_SENT)

    } catch (error) {
      toastError(error)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSendPasswordReset)}
        autoComplete='on'
        className='grid gap-4'>
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email address'
          autoComplete='email' />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? 'Sending...' : 'Send reset email'}
        </Button>
      </form>
    </Form>
  )
}
