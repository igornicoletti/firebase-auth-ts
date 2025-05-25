import { ControlledInputForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth'
import { forgotPasswordSchema, type ForgotPasswordData } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'

export const ForgotPasswordForm = () => {
  const { forgotPasswordRequest, clearError } = useAuth()

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onSubmit',
  })

  const onSubmit = async (data: ForgotPasswordData) => {
    clearError()
    try {
      // Chama a função forgotPasswordRequest do contexto
      await forgotPasswordRequest(data.email)
      // Se a Promise resolver, significa que a requisição foi bem-sucedida (email enviado ou tratado).
      // A mensagem de alerta já é exibida no AuthContext, podemos apenas limpar o formulário ou mostrar outra mensagem.
      // setSuccessMessage("Um email foi enviado com instruções para resetar sua senha.");
      // setEmail(''); // Opcional: limpar o campo após o sucesso
    } catch (err: any) {
      // O erro já foi definido no contexto e será exibido via `error`.
      console.error("Erro ao solicitar reset de senha:", err)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
        <ControlledInputForm
          name='email'
          type='email'
          control={form.control}
          placeholder='email@example.com'
          disabled={form.formState.isSubmitting}
        />
        <Button type='submit' disabled={form.formState.isSubmitting}>
          {!form.formState.isSubmitting ? 'Continue' : <SpinnerGap weight='bold' className='animate-spin' />}
        </Button>
      </form>
    </Form>
  )
}
