import { ControlledInputForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth'
import { registerSchema, type RegisterFormData } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const RegisterForm = () => {
  const navigate = useNavigate()
  const { signup, clearError } = useAuth()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '', username: '' },
    mode: 'onSubmit',
  })

  const onSubmit = async (data: RegisterFormData) => {
    clearError()
    try {
      // Chama a função signup do contexto.
      // O AuthContext.signup já envia o email de verificação e desloga.
      await signup(data.email, data.password, data.confirmPassword, data.username ?? '')
      // Se a função signup resolver com sucesso (mesmo após o logout interno),
      // significa que o usuário foi criado e o email de verificação enviado.
      // Redirecionamos para a tela de login conforme o fluxo definido.
      console.log("Usuário criado, redirecionando para login...")
      // O alerta já é exibido no AuthContext, então o redirecionamento vem a seguir.
      navigate('/login') // <-- O REDIRECIONAMENTO PODE SER FEITO AQUI APÓS O ALERT

    } catch (err: any) {
      // O erro (incluindo a mensagem amigável) já foi definido no contexto pela função handleError
      console.error("Erro no signup:", err)
      // O erro será exibido na UI via `error` do contexto
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
        <ControlledInputForm
          name='username'
          type='text'
          control={form.control}
          placeholder='Username (optional)'
          disabled={form.formState.isSubmitting}
        />
        <ControlledInputForm
          name='email'
          type='email'
          control={form.control}
          placeholder='email@example.com'
          disabled={form.formState.isSubmitting}
        />
        <ControlledInputForm
          name='password'
          type='password'
          control={form.control}
          placeholder='Password'
          disabled={form.formState.isSubmitting}
        />
        <ControlledInputForm
          name='confirmPassword'
          type='password'
          control={form.control}
          placeholder='Confirm password'
          disabled={form.formState.isSubmitting}
        />
        <Button type='submit' disabled={form.formState.isSubmitting}>
          {!form.formState.isSubmitting ? 'Continue' : <SpinnerGap weight='bold' className='animate-spin' />}
        </Button>
      </form>
    </Form>
  )
}
