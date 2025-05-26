import { ControlledInputForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth'
import { resetPasswordSchema, type ResetPasswordData } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const ResetPasswordForm = () => {
  const [actionCode, setActionCode] = useState<string | null>(null)

  const { resetPasswordConfirm, error, isLoading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const oobCode = searchParams.get('oobCode')
    if (oobCode) {
      setActionCode(oobCode)
    } else {
      console.error("oobCode faltando na URL.")
      navigate('/login?error=invalid_reset_link')
    }
  }, [searchParams, navigate])

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmNewPassword: '' },
    mode: 'onSubmit',
  })

  const onSubmit = async (data: ResetPasswordData) => {
    if (!actionCode) {
      return
    }

    try {
      await resetPasswordConfirm(actionCode, data.newPassword, data.confirmNewPassword)
      console.log("Senha resetada, redirecionando para login...")
      navigate('/login')
    } catch (err: any) {
      console.error("Erro ao resetar senha:", err)
    }
  }

  // Não renderiza o formulário se o actionCode ainda não foi lido ou é inválido
  if (!actionCode) {
    // O useEffect já cuidou do erro e possivelmente redirecionou.
    // Podemos mostrar um loading ou uma mensagem de "Verificando link..."
    if (isLoading) return <div>Verificando link de redefinição...</div>
    // Se não está carregando e não tem actionCode, significa que deu erro no useEffect e possivelmente redirecionou.
    // Se não redirecionou (ex: debug local), pode mostrar uma mensagem de erro aqui.
    if (error) return <p style={{ color: 'red' }}>{error}</p> // Exibe erro do AuthContext se definido
    return <div>Link inválido ou expirado. Por favor, tente novamente.</div> // Mensagem fallback
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
        <ControlledInputForm
          name='newPassword'
          type='password'
          control={form.control}
          placeholder='New password'
          disabled={form.formState.isSubmitting}
        />
        <ControlledInputForm
          name='confirmNewPassword'
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
