// src/lib/auth/components/form/auth-reset-form.tsx

// Importa códigos de erro específicos do Firebase Auth
import { AuthErrorCodes } from 'firebase/auth'
// Importa hooks do React para gerenciar estado
import { useState } from 'react'
// Importa hooks do react-hook-form para gerenciamento de formulários
import { useForm } from 'react-hook-form'
// Importa hooks do react-router-dom para navegação e leitura de URL params
import { useNavigate, useSearchParams } from 'react-router-dom'
// Importa Zod para validação de schema
import { z } from 'zod'

// Importa o resolver Zod para integração com react-hook-form
import { zodResolver } from '@hookform/resolvers/zod'

// Importa componentes de UI (botão, wrapper de formulário)
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

// Importa o componente de input genérico
import { AuthInputForm } from '@/lib/auth/components/form'
// Importa os códigos de sucesso da sua fonte central de constantes
import { AuthSuccessCodes } from '@/lib/auth/constants'
// Importa o hook customizado para exibir mensagens de toast
import { useAuthToast } from '@/lib/auth/hooks'
// Importa o schema de validação Zod para este formulário (inclui validação de senha e confirmação)
import { authResetSchema } from '@/lib/auth/schemas'
// Importa o serviço de autenticação para confirmar a redefinição de senha
import { confirmUserPasswordReset } from '@/lib/auth/services'

/**
 * Infere o tipo de dado do schema Zod authResetSchema.
 * Define a forma do objeto de dados esperado para o formulário de redefinição de senha
 * (newPassword, confirmNewPassword).
 */
type AuthReset = z.infer<typeof authResetSchema>

/**
 * Componente de Formulário de Redefinição de Senha.
 * Exibido quando o usuário clica em um link de redefinição de senha enviado por e-mail.
 * Permite ao usuário inserir e confirmar uma nova senha para sua conta.
 * Requer um 'oobCode' válido da URL para funcionar.
 * Utiliza react-hook-form para gerenciamento de formulário e validação com Zod.
 * Chama o serviço Firebase para confirmar o reset e exibe toasts de sucesso ou erro.
 */
export const AuthResetForm = () => {
  // Hook para ler parâmetros da query string da URL (para obter oobCode).
  const [searchParams] = useSearchParams()
  // Hook para navegação programática entre rotas.
  const navigate = useNavigate()
  // Hook customizado para exibir mensagens de toast (erro e sucesso).
  const { toastError, toastSuccess } = useAuthToast()

  // Estado local para controlar se a operação de redefinição de senha está em andamento.
  const [isLoading, setIsLoading] = useState(false)

  // Extrai o 'oobCode' (Out-of-Band code) da URL, que é necessário para confirmar o reset.
  const oobCode = searchParams.get('oobCode')

  // Configura e inicializa o formulário usando react-hook-form.
  // Associa o schema Zod authResetSchema para validação (inclui validação de força e correspondência de senha).
  const form = useForm<AuthReset>({
    resolver: zodResolver(authResetSchema), // Usa o resolver Zod para conectar o schema à validação.
    defaultValues: { // Define os valores iniciais dos campos.
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  /**
   * Handler assíncrono para a submissão do formulário de redefinição de senha.
   * É executado pelo react-hook-form APENAS se a validação do schema para 'newPassword' e 'confirmNewPassword' passar.
   * Tenta confirmar a redefinição de senha usando o oobCode e a nova senha.
   *
   * @param {AuthReset} data - Os dados validados do formulário, inferidos do schema AuthReset.
   *                           Contém 'newPassword' e 'confirmNewPassword'.
   */
  const onSubmit = async (data: AuthReset) => {
    setIsLoading(true) // Define o estado de carregamento como true no início da submissão.

    // **Verificação Crítica:** Checa se o oobCode está presente na URL.
    // Se não estiver, o link é inválido/incompleto, não pode prosseguir com o reset.
    if (!oobCode) {
      // Exibe um toast de erro indicando que o código está faltando.
      // Usa um código de erro Firebase apropriado para este cenário.
      toastError(AuthErrorCodes.MISSING_CODE)
      // Redireciona o usuário de volta para a página de 'Esqueceu a Senha' para que ele possa iniciar o processo novamente.
      navigate('/forgot-password')
      setIsLoading(false) // Define o estado de carregamento como false (saída precoce).
      return // Interrompe a execução do handler.
    }

    try {
      // Chama a função de serviço para confirmar a redefinição de senha no Firebase.
      // Passa o oobCode extraído da URL e a nova senha fornecida pelo usuário.
      // Await pausa a execução até que a Promise retorne (sucesso ou rejeição).
      await confirmUserPasswordReset(oobCode, data.newPassword)

      // Se a Promise se resolve (redefinição bem-sucedida), exibe um toast de sucesso.
      // Usa o código AuthSuccessCodes.PASSWORD_RESET_SUCCESS para obter a mensagem amigável correta.
      toastSuccess(AuthSuccessCodes.PASSWORD_RESET_SUCCESS)

      // Limpa o formulário redefinindo seus campos para os valores iniciais.
      form.reset()

      // Navega o usuário programaticamente para a página de login.
      // Ele agora pode fazer login com a nova senha.
      navigate('/login')

    } catch (error) {
      // Se a Promise rejeita (ocorre um erro, ex: oobCode inválido/expirado, senha fraca), este bloco é executado.
      // Chama o hook toastError, passando o objeto de erro retornado pelo serviço para formatação e exibição.
      toastError(error)
      // Nota: O formulário geralmente não é resetado em caso de erro, permitindo ao usuário corrigir (ex: senha fraca).

    } finally {
      // Este bloco é SEMPRE executado, independentemente do resultado.
      // Define o estado de carregamento como false para reativar o formulário e remover indicadores de carregamento.
      setIsLoading(false)
    }
  }

  return (
    // O componente <Form> da sua biblioteca de UI que envolve o formulário nativo.
    // Provavelmente fornece um contexto ou estilização para os campos filhos.
    <Form {...form}>
      {/* O elemento form HTML nativo. Contém os campos de input de senha e o botão de submissão. */}
      <form
        // Conecta o handler de submissão validado do react-hook-form ao evento 'onSubmit' do formulário nativo.
        onSubmit={form.handleSubmit(onSubmit)}
        // auto-complete='off' é útil aqui por questões de segurança, para evitar que o navegador
        // sugira senhas antigas ou preencha automaticamente campos de senha nova.
        autoComplete='off'
        className='grid gap-4' // Classes CSS para estilizar o layout do formulário.
      >
        {/* Componente de Input para o campo de Nova Senha. */}
        <AuthInputForm
          control={form.control} // Passa o controle do formulário para o input (conexão RHF).
          disabled={isLoading} // Desabilita o input se o formulário estiver carregando.
          type='password' // Define o tipo do input HTML como 'password'.
          name='newPassword' // Define o nome do campo no formulário (deve corresponder ao schema).
          placeholder='New password' // Texto placeholder.
        />
        {/* Componente de Input para o campo de Confirmação da Nova Senha. */}
        <AuthInputForm
          control={form.control} // Passa o controle do formulário para o input.
          disabled={isLoading} // Desabilita o input se o formulário estiver carregando.
          type='password' // Define o tipo do input HTML como 'password'.
          name='confirmNewPassword' // Define o nome do campo no formulário.
          placeholder='Confirm new password' // Texto placeholder.
        />
        {/* Botão de submissão para redefinir a senha. */}
        <Button disabled={isLoading} type='submit'>
          {/* Texto no botão que reflete o estado de carregamento. */}
          {isLoading ? 'Resetting...' : 'Reset password'}
        </Button>
      </form>
    </Form>
  )
}
