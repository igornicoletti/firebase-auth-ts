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

  const { resetPasswordConfirm, error, isLoading, clearError } = useAuth()
  const navigate = useNavigate()
  // Hook para ler os parâmetros da URL
  const [searchParams] = useSearchParams()

  // Efeito para ler o oobCode da URL quando o componente monta
  useEffect(() => {
    const oobCode = searchParams.get('oobCode')
    if (oobCode) {
      setActionCode(oobCode)
      // Opcional: Validar o código de ação antes de exibir o formulário
      // Firebase pode ter um método para verificar se o código é válido/não expirado sem aplicá-lo.
      // Por agora, vamos apenas armazená-lo e usá-lo no submit.
    } else {
      // Se não houver oobCode, algo está errado - redirecionar ou mostrar erro.
      clearError() // Limpa qualquer erro anterior do AuthContext
      // Define um erro local ou redireciona
      // setError("Código de redefinição de senha inválido ou faltando."); // Se quiser usar o estado de erro do contexto para isso
      console.error("oobCode faltando na URL.")
      // Podemos redirecionar para uma página de erro ou para a de login com uma mensagem
      navigate('/login?error=invalid_reset_link') // Redireciona e adiciona um param de erro na URL
    }
  }, [searchParams, navigate, clearError]) // Dependências do efeito

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmNewPassword: '' },
    mode: 'onSubmit',
  })

  const onSubmit = async (data: ResetPasswordData) => {
    clearError() // Limpa erros anteriores

    if (!actionCode) {
      // Não deveria acontecer se a validação inicial funcionar, mas é um safeguard
      console.error("Tentativa de reset de senha sem actionCode.")
      // setError("Não foi possível resetar a senha. Link inválido."); // Usar erro do contexto
      alert("Link de redefinição inválido.") // Feedback rápido
      return
    }

    try {
      // Chama a função resetPasswordConfirm do contexto
      // O AuthContext.resetPasswordConfirm já lida com erros do Firebase e exibe alerta de sucesso
      await resetPasswordConfirm(actionCode, data.newPassword, data.confirmNewPassword)

      // Se a Promise resolver com sucesso, a senha foi resetada.
      // Conforme o fluxo definido ("resetar senha -> login"), redirecionamos para a tela de login.
      console.log("Senha resetada, redirecionando para login...")
      // O alerta de sucesso já foi exibido no AuthContext.
      // navigate('/login'); // <-- O REDIRECIONAMENTO PODE SER FEITO AQUI APÓS O ALERT

    } catch (err: any) {
      // O erro já foi definido no contexto e será exibido via `error`.
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
