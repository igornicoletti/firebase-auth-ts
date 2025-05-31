// src/lib/auth/components/form/auth-forgot-form.tsx

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { AuthInputForm } from '@/lib/auth/components/form'
import { useAuthToast } from '@/lib/auth/hooks'
import { authForgotSchema } from '@/lib/auth/schemas'
import { sendPasswordReset } from '@/lib/auth/services'

type ForgotFormData = z.infer<typeof authForgotSchema>

export const AuthForgotForm = () => {
  const [loading, setIsLoading] = useState(false)
  const { toastError, toastSuccess } = useAuthToast()
  const navigate = useNavigate()

  const form = useForm<ForgotFormData>({
    resolver: zodResolver(authForgotSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true)

    try {
      await sendPasswordReset(data.email)
      toastSuccess('auth/forgot-password-sent')
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
      <form onSubmit={form.handleSubmit(onSubmit)}
        autoComplete='on' className='grid gap-4'>
        <AuthInputForm control={form.control} disabled={loading}
          type='email' name='email' placeholder='Email address' />
        <Button disabled={loading} type='submit'>
          {loading ? 'Sending...' : 'Send reset email'}
        </Button>
      </form>
    </Form>
  )
}
