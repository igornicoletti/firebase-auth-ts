// src/lib/auth/components/form/auth-login-form.tsx

// Importa hooks do React para gerenciar estado
import { useState } from 'react'
// Importa hooks do react-hook-form para gerenciamento de formulários
import { useForm } from 'react-hook-form'
// Importa componentes e hooks do react-router-dom para navegação
import { Link, useNavigate } from 'react-router-dom'
// Importa Zod para validação de schema
import { z } from 'zod'

// Importa o resolver Zod para integração com react-hook-form
import { zodResolver } from '@hookform/resolvers/zod'
// Importa ícone do Google
import { GoogleLogo } from '@phosphor-icons/react'

// Importa componentes de UI (botão, wrapper de formulário)
import { Button, ButtonHighlight } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

// Importa o componente de input genérico
import { AuthInputForm } from '@/lib/auth/components/form'
// Importa os códigos de sucesso da sua fonte central de constantes
import { AuthSuccessCodes } from '@/lib/auth/constants'
// Importa o hook customizado para exibir mensagens de toast
import { useAuthToast } from '@/lib/auth/hooks'
// Importa o schema de validação Zod para este formulário
import { authLoginSchema } from '@/lib/auth/schemas'
// Importa os serviços de autenticação (email/senha e Google)
import { signInWithEmail, signInWithGoogle } from '@/lib/auth/services'

/**
 * Infere o tipo de dado do schema Zod authLoginSchema.
 * Define a forma do objeto de dados esperado para o formulário de login (email e password).
 */
type AuthLogin = z.infer<typeof authLoginSchema>

/**
 * Componente de Formulário de Login.
 * Permite ao usuário fazer login utilizando seu endereço de e-mail e senha,
 * ou através de um fluxo de autenticação com o Google (via popup).
 * Utiliza react-hook-form para gerenciamento de formulário e validação com Zod.
 * Interage com os serviços de autenticação Firebase e exibe feedback ao usuário
 * através de mensagens de toast de sucesso ou erro.
 */
export const AuthLoginForm = () => {
  // Hook para navegação programática entre rotas.
  const navigate = useNavigate()
  // Hook customizado para exibir mensagens de toast (erro e sucesso).
  const { toastError, toastSuccess } = useAuthToast()

  // Estado local para controlar se alguma operação de login está em andamento (e-mail/senha ou Google).
  // Usado para desabilitar os botões e inputs e mostrar um indicador visual.
  const [isLoading, setIsLoading] = useState(false)

  // Configura e inicializa o formulário de login usando react-hook-form.
  // Conecta o schema Zod para validação dos campos 'email' e 'password'.
  const form = useForm<AuthLogin>({
    resolver: zodResolver(authLoginSchema), // Usa o resolver Zod para conectar o schema à validação do formulário.
    defaultValues: { // Define os valores iniciais dos campos do formulário ao montar.
      email: '',
      password: '',
    },
  })

  /**
   * Handler assíncrono para a submissão do formulário de login com e-mail e senha.
   * É executado pelo react-hook-form APENAS se a validação do schema para 'email' e 'password' passar.
   * Tenta autenticar o usuário com as credenciais fornecidas.
   *
   * @param {AuthLogin} data - Os dados validados do formulário, inferidos do schema AuthLogin (contendo 'email' e 'password').
   */
  const onSubmit = async (data: AuthLogin) => {
    setIsLoading(true) // Define o estado de carregamento como true no início da submissão.

    try {
      // Chama a função de serviço para autenticar o usuário com e-mail e senha no Firebase.
      // Await pausa a execução até que a Promise retorne (sucesso ou rejeição).
      await signInWithEmail(data.email, data.password)

      // Se a Promise se resolve (sucesso), exibe um toast de sucesso de login.
      // Usa o código AuthSuccessCodes.SIGNIN_SUCCESS para obter a mensagem amigável correta.
      toastSuccess(AuthSuccessCodes.SIGNIN_SUCCESS)

      // Limpa o formulário redefinindo seus campos para os valores iniciais.
      form.reset()

      // Navega o usuário programaticamente para a página do dashboard após o login bem-sucedido.
      navigate('/dashboard')

    } catch (error) {
      // Se a Promise rejeita (ocorre um erro no login, ex: credenciais inválidas), este bloco é executado.
      // Chama o hook toastError, passando o objeto de erro retornado pelo serviço para formatação e exibição.
      toastError(error)
      // Nota: O formulário geralmente não é resetado em caso de erro de login, permitindo ao usuário corrigir as credenciais.

    } finally {
      // Este bloco é SEMPRE executado, independentemente de a operação ter sido bem-sucedida ou ter falhado.
      // Define o estado de carregamento como false para reativar o formulário e remover indicadores de carregamento.
      setIsLoading(false)
    }
  }

  /**
   * Handler assíncrono para iniciar o fluxo de login com Google via popup.
   * É executado quando o botão "Login with Google" é clicado.
   */
  const handleGoogleLogin = async () => {
    setIsLoading(true) // Define o estado de carregamento como true.

    try {
      // Chama a função de serviço para iniciar o fluxo de login com Google no Firebase.
      // Await espera a conclusão da Promise (fechar popup, sucesso, ou erro).
      await signInWithGoogle()

      // Se a Promise se resolve (login com Google bem-sucedido), exibe o mesmo toast de sucesso de login.
      toastSuccess(AuthSuccessCodes.SIGNIN_SUCCESS)

      // Reseta o formulário (pode não ser estritamente necessário para login social, mas mantém a consistência).
      form.reset()

      // Navega o usuário programaticamente para a página do dashboard após o login bem-sucedido.
      navigate('/dashboard')

    } catch (error) {
      // Se a Promise rejeita (ex: popup bloqueado, usuário fechou popup, erro do Google), este bloco é executado.
      // Chama o hook toastError, passando o objeto de erro.
      toastError(error)

    } finally {
      // Este bloco SEMPRE executa.
      // Define o estado de carregamento como false.
      setIsLoading(false)
    }
  }

  return (
    // O componente <Form> da sua biblioteca de UI que envolve o formulário nativo.
    // Provavelmente fornece um contexto ou estilização para os campos filhos e lida com o handleSubmit do RHF.
    <Form {...form}>
      {/* O elemento form HTML nativo. Contém todos os campos de input e botões. */}
      <form
        // Conecta o handler de submissão validado do react-hook-form ao evento 'onSubmit' do formulário nativo.
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete='on' // Sugere ao navegador que habilite o autocompletar (útil para e-mail e senha).
        className='grid gap-4' // Classes CSS para estilizar o layout do formulário.
      >
        {/* Botão para iniciar o fluxo de login com Google. */}
        <Button
          onClick={handleGoogleLogin} // Handler de clique para o login Google.
          disabled={isLoading} // Desabilita o botão se o formulário estiver carregando (qualquer operação).
          type='button' // **CRUCIAL:** Define o tipo como 'button' para evitar que ele submeta o formulário pai.
          variant='secondary' // Define um estilo visual secundário para o botão.
        >
          <ButtonHighlight /> {/* Componente visual adicional no botão (se aplicável). */}
          <GoogleLogo /> {/* Ícone do Google. */}
          {isLoading ? 'Logging..' : 'Login with Google'} {/* Texto no botão que reflete o estado de carregamento. */}
        </Button>

        {/* Divisor visual com texto 'or' (ou). */}
        <p className='flex items-center gap-x-3 text-sm text-muted-foreground
        before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-border before:to-border
        after:h-px after:flex-1 after:bg-gradient-to-r after:from-border after:via-border after:to-transparent'>
          or
        </p>

        {/* Componente de Input para o campo de E-mail. */}
        <AuthInputForm
          control={form.control} // Passa o controle do formulário para o input (conexão RHF).
          disabled={isLoading} // Desabilita o input se o formulário estiver carregando.
          type='email' // Define o tipo do input HTML como 'email'.
          name='email' // Define o nome do campo no formulário (deve corresponder ao schema).
          placeholder='Email address' // Texto placeholder.
        />

        {/* Botão estilizado como link para a página 'Forgot password?'. */}
        <Button
          asChild // Renderizado como seu componente filho (o <Link>).
          variant='link' // Define um estilo visual de link.
          className='h-auto ml-auto -mb-2 p-0 text-xs font-semibold' // Classes CSS para posicionamento e estilo.
        >
          {/* O componente Link real do react-router-dom que navega para a rota. */}
          <Link to='/forgot-password'>Forgot password?</Link>
        </Button>

        {/* Componente de Input para o campo de Senha. */}
        <AuthInputForm
          control={form.control} // Passa o controle do formulário para o input.
          disabled={isLoading} // Desabilita o input se o formulário estiver carregando.
          type='password' // Define o tipo do input HTML como 'password'.
          name='password' // Define o nome do campo no formulário.
          placeholder='Password' // Texto placeholder.
        />

        {/* Botão de submissão principal para o formulário (email/senha). */}
        <Button disabled={isLoading} type='submit'>
          {/* Texto no botão que reflete o estado de carregamento. */}
          {isLoading ? 'Logging...' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}
