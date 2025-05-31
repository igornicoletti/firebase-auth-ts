// src/lib/auth/components/form/auth-forgot-form.tsx

// Importa hooks do React para gerenciar estado
import { useState } from 'react'
// Importa hooks do react-hook-form para gerenciamento de formulários
import { useForm } from 'react-hook-form'
// Importa hook do react-router-dom para navegação
import { useNavigate } from 'react-router-dom'
// Importa Zod para validação de schema
import { z } from 'zod'

// Importa o resolver Zod para integração com react-hook-form
import { zodResolver } from '@hookform/resolvers/zod'

// Importa componentes de UI (botão, wrapper de formulário)
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

// Importa o componente de input genérico que integra com react-hook-form
import { AuthInputForm } from '@/lib/auth/components/form'
// Importa os códigos de sucesso da sua fonte central de constantes
import { AuthSuccessCodes } from '@/lib/auth/constants'
// Importa o hook customizado para exibir mensagens de toast
import { useAuthToast } from '@/lib/auth/hooks'
// Importa o schema de validação Zod para este formulário
import { authForgotSchema } from '@/lib/auth/schemas'
// Importa o serviço de autenticação para enviar o email de reset
import { sendPasswordReset } from '@/lib/auth/services'

/**
 * Infere o tipo de dado do schema Zod authForgotSchema.
 * Define a forma do objeto de dados esperado para este formulário.
 */
type AuthForgot = z.infer<typeof authForgotSchema>

/**
 * Componente de Formulário para "Esqueceu a Senha".
 * Permite ao usuário inserir seu e-mail para receber um link de redefinição de senha.
 * Valida o e-mail inserido usando Zod e chama o serviço Firebase para enviar o e-mail.
 * Exibe mensagens de toast de sucesso ou erro baseadas no resultado da operação e redireciona.
 */
export const AuthForgotForm = () => {
  // Hook para navegação programática entre rotas.
  const navigate = useNavigate()
  // Hook customizado para exibir mensagens de toast (erro e sucesso).
  const { toastError, toastSuccess } = useAuthToast()

  // Estado local para controlar o estado de carregamento do formulário (enquanto a submissão está em andamento).
  const [isLoading, setIsLoading] = useState(false)

  // Configura e inicializa o formulário usando react-hook-form.
  // Associa o schema Zod para validação em tempo real.
  const form = useForm<AuthForgot>({
    resolver: zodResolver(authForgotSchema), // Usa o resolver Zod para conectar Zod com react-hook-form.
    defaultValues: { // Define os valores iniciais dos campos do formulário ao montar.
      email: '',
    },
  })

  /**
   * Handler assíncrono para a submissão do formulário.
   * É executado pelo react-hook-form APENAS se a validação do schema for bem-sucedida.
   * Lida com o processo de envio do e-mail de redefinição de senha.
   *
   * @param {AuthForgot} data - Os dados validados do formulário, inferidos do schema AuthForgot (contendo apenas 'email').
   */
  const onSubmit = async (data: AuthForgot) => {
    setIsLoading(true) // Define o estado de carregamento como true no início da submissão.

    try {
      // Chama a função de serviço para enviar o e-mail de redefinição de senha do Firebase.
      // Await pausa a execução até que a Promise retorne (sucesso ou rejeição).
      await sendPasswordReset(data.email)

      // Se a Promise de sendPasswordReset se resolve (sucesso), exibe um toast de sucesso.
      // Usa o código específico para envio de email de reset para obter a mensagem correta do mapa de sucessos.
      toastSuccess(AuthSuccessCodes.PASSWORD_RESET_EMAIL_SENT)

      // Limpa o formulário redefinindo seus campos para os valores iniciais.
      form.reset()

      // Navega o usuário programaticamente para a página de login após o envio bem-sucedido.
      navigate('/login')

    } catch (error) {
      // Se a Promise rejeita (ocorre um erro), este bloco é executado.
      // Chama o hook toastError, passando o objeto de erro para que ele formate a mensagem amigável.
      toastError(error)
      // Nota: O formulário não é resetado em caso de erro, permitindo ao usuário corrigir a entrada.

    } finally {
      // Este bloco é SEMPRE executado, independentemente de a operação ter sido bem-sucedida ou ter falhado.
      // Define o estado de carregamento como false para reativar o formulário e remover indicadores de carregamento.
      setIsLoading(false)
    }
  }

  return (
    // O componente <Form> da sua biblioteca de UI que envolve o formulário nativo.
    // Ele provavelmente fornece um contexto ou estilos para os campos filhos.
    <Form {...form}>
      {/* O elemento form HTML nativo. */}
      <form
        // Conecta o handler de submissão validado do react-hook-form ao evento 'onSubmit' do formulário nativo.
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete='on' // Sugere ao navegador que habilite o autocompletar para este formulário.
        className='grid gap-4' // Classes CSS para estilizar o layout do formulário (usando grid com gap).
      >
        {/* Componente de Input para o campo de e-mail. */}
        <AuthInputForm
          control={form.control} // Passa o controle do formulário para o input (conexão RHF).
          disabled={isLoading} // Desabilita o input se o formulário estiver carregando.
          type='email' // Define o tipo do input HTML.
          name='email' // Define o nome do campo, crucial para react-hook-form e validação.
          placeholder='Email address' // Texto placeholder para o input.
        />

        {/* Botão de submissão para o formulário. */}
        <Button disabled={isLoading} type='submit'>
          {/* Texto do botão que muda com base no estado de carregamento. */}
          {isLoading ? 'Sending...' : 'Send reset email'}
        </Button>
      </form>
    </Form>
  )
}
