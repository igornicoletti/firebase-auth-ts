// src/lib/auth/components/form/auth-forgot-form.tsx

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
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
  const [loading, setIsLoading] = useState<boolean>(false)
  const { toastError } = useAuthToast()
  const navigate = useNavigate()

  const form = useForm<ForgotFormData>({
    resolver: zodResolver(authForgotSchema),
    defaultValues: {
      email: '',
    },
  })

  // CHAMA O MÉTODO FIREBASE AUTH PARA ENVIAR EMAIL DE RESET DE SENHA
  // Exibir mensagem de sucesso (Mensagem padrão Firebase por segurança - Email Enumeration Protection)
  // Opcional: Redirecionar para a página de login
  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true)

    try {
      await sendPasswordReset(data.email)
      toast.success('Password Reset Email Sent', {
        description: 'If an account exists with that email, a reset link has been sent.'
      })
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
