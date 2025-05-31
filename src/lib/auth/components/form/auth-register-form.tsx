// src/lib/auth/components/form/auth-register-form.tsx

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

// Importa o componente de input genérico
import { AuthInputForm } from '@/lib/auth/components/form'
// Importa os códigos de sucesso da sua fonte central de constantes
import { AuthSuccessCodes } from '@/lib/auth/constants'
// Importa o hook customizado para exibir mensagens de toast
import { useAuthToast } from '@/lib/auth/hooks'
// Importa o schema de validação Zod para este formulário (inclui validação de senha e confirmação)
import { authRegisterSchema } from '@/lib/auth/schemas'
// Importa o serviço de autenticação para criar um novo usuário
import { createUserWithEmail } from '@/lib/auth/services'

/**
 * Infere o tipo de dado do schema Zod authRegisterSchema.
 * Define a forma do objeto de dados esperado para o formulário de registro
 * (username, email, password, confirmPassword).
 */
type AuthRegister = z.infer<typeof authRegisterSchema>

/**
 * Componente de Formulário de Registro.
 * Permite ao usuário criar uma nova conta com e-mail e senha.
 * Inclui campos para nome de usuário, e-mail, senha e confirmação de senha.
 * Utiliza react-hook-form para gerenciamento de formulário e validação com Zod.
 * Chama o serviço de criação de usuário Firebase e exibe toasts de sucesso ou erro.
 */
export const AuthRegisterForm = () => {
  // Hook para navegação programática entre rotas.
  const navigate = useNavigate()
  // Hook customizado para exibir mensagens de toast (erro e sucesso).
  const { toastError, toastSuccess } = useAuthToast()

  // Estado local para controlar se a operação de registro está em andamento.
  // Usado para desabilitar o formulário e mostrar um indicador visual.
  const [isLoading, setIsLoading] = useState(false)

  // Configura e inicializa o formulário usando react-hook-form.
  // Associa o schema Zod authRegisterSchema para validação.
  const form = useForm<AuthRegister>({
    resolver: zodResolver(authRegisterSchema), // Usa o resolver Zod para conectar Zod com react-hook-form.
    defaultValues: { // Define os valores iniciais de todos os campos do formulário.
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  /**
   * Handler assíncrono para a submissão do formulário de registro.
   * É executado pelo react-hook-form APENAS se a validação do schema passar.
   * Tenta criar uma nova conta de usuário no Firebase Authentication.
   *
   * @param {AuthRegister} data - Os dados validados do formulário, inferidos do schema AuthRegister.
   *                              Inclui username, email, password, confirmPassword.
   */
  const onSubmit = async (data: AuthRegister) => {
    setIsLoading(true) // Define o estado de carregamento como true no início da submissão.

    try {
      // Chama a função de serviço para criar o usuário com email e senha.
      // Passa o username opcionalmente para definir o displayName (conforme implementado em auth-service.ts).
      // Await pausa a execução até que a Promise retorne (sucesso ou rejeição).
      await createUserWithEmail(data.email, data.password, data.username)

      // Se a Promise se resolve (sucesso), exibe um toast de sucesso de registro.
      // Usa o código AuthSuccessCodes.SIGNUP_SUCCESS para obter a mensagem amigável correta,
      // que inclui a nota sobre o e-mail de verificação.
      toastSuccess(AuthSuccessCodes.SIGNUP_SUCCESS)

      // Limpa o formulário redefinindo seus campos para os valores iniciais.
      form.reset()

      // Navega o usuário programaticamente para a página de login após o registro bem-sucedido.
      // Geralmente, o fluxo após o registro é ir para login ou para uma página "Verifique seu e-mail".
      navigate('/login')

    } catch (error) {
      // Se a Promise rejeita (ocorre um erro na criação do usuário, ex: email já em uso, senha fraca), este bloco é executado.
      // Chama o hook toastError, passando o objeto de erro para formatação e exibição.
      toastError(error)
      // Nota: O formulário geralmente não é resetado em caso de erro, permitindo ao usuário corrigir a entrada (ex: email duplicado, senha).

    } finally {
      // Este bloco é SEMPRE executado, independentemente de a operação ter sido bem-sucedida ou ter falhado.
      // Define o estado de carregamento como false para reativar o formulário e remover indicadores de carregamento.
      setIsLoading(false)
    }
  }

  return (
    // O componente <Form> da sua biblioteca de UI que envolve o formulário nativo.
    // Ele provavelmente fornece um contexto ou estilização para os campos filhos e lida com o handleSubmit do RHF.
    <Form {...form}>
      {/* O elemento form HTML nativo. Contém todos os campos de input e o botão de submissão. */}
      <form
        // Conecta o handler de submissão validado do react-hook-form ao evento 'onSubmit' do formulário nativo.
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete='on' // Sugere ao navegador que habilite o autocompletar para este formulário.
        className='grid gap-4' // Classes CSS para estilizar o layout do formulário (usando grid com gap).
      >
        {/* Componente de Input para o campo de Username. */}
        <AuthInputForm
          control={form.control} // Passa o controle do formulário para o input (conexão RHF).
          disabled={isLoading} // Desabilita o input se o formulário estiver carregando.
          type='text' // Define o tipo do input HTML.
          name='username' // Define o nome do campo no formulário (deve corresponder ao schema).
          placeholder='Username' // Texto placeholder.
        />
        {/* Componente de Input para o campo de E-mail. */}
        <AuthInputForm
          control={form.control} // Passa o controle do formulário para o input.
          disabled={isLoading} // Desabilita o input se o formulário estiver carregando.
          type='email' // Define o tipo do input HTML como 'email'.
          name='email' // Define o nome do campo no formulário.
          placeholder='Email address' // Texto placeholder.
        />
        {/* Componente de Input para o campo de Senha. */}
        <AuthInputForm
          control={form.control} // Passa o controle do formulário para o input.
          disabled={isLoading} // Desabilita o input se o formulário estiver carregando.
          type='password' // Define o tipo do input HTML como 'password'.
          name='password' // Define o nome do campo no formulário.
          placeholder='Password' // Texto placeholder.
        />
        {/* Componente de Input para o campo de Confirmação de Senha. */}
        <AuthInputForm
          control={form.control} // Passa o controle do formulário para o input.
          disabled={isLoading} // Desabilita o input se o formulário estiver carregando.
          type='password' // Define o tipo do input HTML como 'password'.
          name='confirmPassword' // Define o nome do campo no formulário.
          placeholder='Confirm password' // Texto placeholder.
        />
        {/* Botão de submissão para o formulário de registro. */}
        <Button disabled={isLoading} type='submit'>
          {/* Texto no botão que reflete o estado de carregamento. */}
          {isLoading ? 'Creating...' : 'Create account'}
        </Button>
      </form>
    </Form>
  )
}
