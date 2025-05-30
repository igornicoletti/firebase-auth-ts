// src/lib/auth/components/form/auth-reset-form.tsx

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { AuthInputForm } from '@/lib/auth/components/form'
import { useAuthToast } from '@/lib/auth/hooks'
import { authResetSchema } from '@/lib/auth/schemas'
import { confirmUserPasswordReset } from '@/lib/auth/services'

type ResetFormData = z.infer<typeof authResetSchema>

export const AuthResetForm = () => {
  const [loading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const { toastError } = useAuthToast()
  const navigate = useNavigate()

  const oobCode = searchParams.get('oobCode')

  const form = useForm<ResetFormData>({
    resolver: zodResolver(authResetSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const onSubmit = async (data: ResetFormData) => {
    setIsLoading(true)

    if (!oobCode) {
      setIsLoading(false)
      toastError(new Error("Missing password reset code."))
      navigate('/forgot-password')
      return
    }

    try {
      await confirmUserPasswordReset(oobCode, data.newPassword)
      toast.message("Password Reset Successful", {
        description: "Your password has been updated. Please login with your new password.",
        classNames: {
          title: '!text-primary',
          description: '!text-foreground'
        }
      })
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
        autoComplete='off' className='grid gap-4'>
        <AuthInputForm control={form.control} disabled={loading}
          type='password' name='newPassword' placeholder='New password' />
        <AuthInputForm control={form.control} disabled={loading}
          type='password' name='confirmNewPassword' placeholder='Confirm new password' />
        <Button disabled={loading} type='submit'>
          {loading ? 'Resetting...' : 'Reset password'}
        </Button>
      </form>
    </Form>
  )
}
