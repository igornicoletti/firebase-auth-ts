// src/lib/auth/components/form/auth-register-form.tsx

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
import { authRegisterSchema } from '@/lib/auth/schemas'
import { signUpWithEmail } from '@/lib/auth/services'

type RegisterFormData = z.infer<typeof authRegisterSchema>

export const AuthRegisterForm = () => {
  const [loading, setIsLoading] = useState<boolean>(false)
  const { toastError } = useAuthToast()
  const navigate = useNavigate()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(authRegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  // CHAMA O MÉTODO FIREBASE AUTH DE CRIAÇÃO DE USUÁRIO
  // Opcional: Setar o display name imediatamente após a criação
  // CHAMA O MÉTODO FIREBASE AUTH PARA ENVIAR EMAIL DE VERIFICAÇÃO
  // É importante enviar após a criação, pois auth.currentUser estará disponível
  // Checa se o usuário está logado (deve estar após signupWithEmail)
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)

    try {
      await signUpWithEmail(data.email, data.password)
      toast.message('Registration Successful', {
        description: 'Please check your email to verify your account.',
        classNames: {
          title: '!text-primary',
          description: '!text-foreground'
        }
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
          type='text' name='username' placeholder='Username' />
        <AuthInputForm control={form.control} disabled={loading}
          type='email' name='email' placeholder='Email address' />
        <AuthInputForm control={form.control} disabled={loading}
          type='password' name='password' placeholder='Password' />
        <AuthInputForm control={form.control} disabled={loading}
          type='password' name='confirmPassword' placeholder='Confirm password' />
        <Button disabled={loading} type='submit'>
          {loading ? 'Creating...' : 'Create account'}
        </Button>
      </form>
    </Form>
  )
}
