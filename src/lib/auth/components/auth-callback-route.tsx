// src/lib/auth/components/auth-callback-route.tsx

// Importa códigos de erro específicos do Firebase Auth
import { AuthErrorCodes } from 'firebase/auth'
// Importa hooks do React para gerenciar estado e efeitos
import { useEffect, useState } from 'react'
// Importa hooks do react-router-dom para navegação e leitura de URL
import { useNavigate, useSearchParams } from 'react-router-dom'

// Importa códigos de ação e sucesso definidos localmente
import { AuthActionCodes, AuthSuccessCodes } from '@/lib/auth/constants'
// Importa o hook customizado para acessar o estado de autenticação
import { useAuth } from '@/lib/auth/contexts'
// Importa o hook customizado para exibir mensagens de toast
import { useAuthToast } from '@/lib/auth/hooks'
// Importa o serviço para aplicar códigos de ação do Firebase
import { applyUserActionCode } from '@/lib/auth/services'
// Importa a instância do Firebase Auth inicializada
import { auth } from '@/lib/firebase'
// Importa um componente de spinner para o estado de carregamento
import { LoadingSpinner } from '@/components/custom'


/**
 * Componente de Rota de Callback de Autenticação.
 * Lida com links de ação de email do Firebase (ex: verificação de email, redefinição de senha).
 * Extrai os parâmetros 'mode' e 'oobCode' da URL e executa a ação apropriada.
 * Exibe mensagens de toast de sucesso ou erro e redireciona o usuário.
 */
export const AuthCallbackRoute = () => {
  // Hook para ler parâmetros da query string da URL.
  const [searchParams] = useSearchParams()
  // Hook para navegação programática.
  const navigate = useNavigate()
  // Hook customizado para acessar o estado global de autenticação (usuário e loading inicial).
  const { user, loading } = useAuth()
  // Hook customizado para exibir mensagens de toast.
  const { toastError, toastSuccess } = useAuthToast()

  // Estado local para controlar o carregamento enquanto a ação do callback está sendo processada.
  const [isLoading, setIsLoading] = useState(true)

  // Extrai os parâmetros essenciais 'mode' e 'oobCode' da URL.
  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')

  // Efeito colateral para processar a ação de callback quando o componente é montado ou
  // quando os parâmetros da URL ou o estado de carregamento global da autenticação mudam.
  useEffect(() => {
    // Se o estado global de autenticação ainda está carregando, espera.
    // Mantém isLoading local como true.
    if (loading) {
      setIsLoading(true)
      return
    }

    // Se 'mode' ou 'oobCode' estão faltando na URL, o link é inválido.
    // Exibe um toast de erro e redireciona para a tela de login.
    if (!mode || !oobCode) {
      // Usa um código de erro Firebase apropriado para link inválido/expirado.
      toastError(AuthErrorCodes.EXPIRED_OOB_CODE)
      // Redireciona para a página de login, substituindo a entrada atual no histórico.
      navigate('/login', { replace: true })
      // Define isLoading local como false, pois não há ação a ser processada.
      setIsLoading(false)
      return // Interrompe a execução do efeito.
    }

    /**
     * Função assíncrona para lidar com a ação de callback baseada no 'mode'.
     */
    const handleAction = async () => {
      setIsLoading(true) // Ativa o spinner local enquanto a ação roda.

      try {
        // Usa um switch para executar lógica diferente baseada no 'mode' da URL.
        switch (mode) {
          case AuthActionCodes.VERIFY_EMAIL:
            // Caso: Verificação de E-mail.
            // Chama o serviço para aplicar o código de verificação.
            await applyUserActionCode(oobCode)
            // Recarrega o objeto do usuário logado para buscar o status emailVerified atualizado do Firebase.
            // O '?' garante que reload() só seja chamado se houver um usuário logado.
            await auth.currentUser?.reload()

            // Verifica se a verificação foi realmente bem-sucedida checando a propriedade emailVerified.
            if (auth.currentUser && auth.currentUser.emailVerified) {
              // Se verificou, exibe toast de sucesso.
              toastSuccess(AuthSuccessCodes.EMAIL_VERIFIED_SUCCESS)
              // Redireciona o usuário para uma página pós-verificação (ex: dashboard).
              navigate('/dashboard', { replace: true })

            } else {
              // Se applyActionCode não lançou erro, mas o e-mail não está verificado após reload,
              // exibe um erro (pode indicar código inválido ou outro problema).
              toastError(AuthErrorCodes.INVALID_OOB_CODE) // Ou AuthErrorCodes.INTERNAL_ERROR
              // Redireciona para a página de login.
              navigate('/login', { replace: true })
            }
            break // Sai do switch.

          case AuthActionCodes.RESET_PASSWORD:
            // Caso: Redefinição de Senha.
            // Em vez de processar o reset aqui, redireciona para a página dedicada de reset de senha.
            // Passa o 'oobCode' como parâmetro de URL para que o formulário na página de reset possa usá-lo.
            navigate(`/reset-password?oobCode=${oobCode}`, { replace: true })
            // A lógica real de confirmar a senha ocorrerá no componente AuthResetForm.
            break // Sai do switch.

          // Adicione casos para outros AuthActionCodes aqui, se aplicável (ex: RECOVER_EMAIL, SIGN_IN com link).
          // case AuthActionCodes.RECOVER_EMAIL:
          //   // Lógica para processar links de recuperação de e-mail...
          //   break;
          // case AuthActionCodes.SIGN_IN:
          //   // Lógica para processar links de login (email link sign-in)...
          //   // Geralmente envolve signInWithEmailLink(auth, emailDaUrl, oobCode)
          //   break;

          default:
            // Caso: 'mode' da URL não é reconhecido.
            // Exibe um toast de erro para indicar um link inválido ou problema interno.
            toastError(AuthErrorCodes.INTERNAL_ERROR) // Ou AuthErrorCodes.ARGUMENT_ERROR
            // Redireciona para a página de login.
            navigate('/login', { replace: true })
            break // Sai do switch.
        }
      } catch (error) {
        // Captura quaisquer erros que ocorram durante a execução da ação (ex: applyUserActionCode lança erro).
        // Isso inclui códigos inválidos/expirados para VERIFY_EMAIL, RECOVER_EMAIL, etc.
        // Usa o hook toastError para exibir a mensagem amigável baseada no código do erro.
        toastError(error)

        // Em caso de qualquer erro, redireciona para a página de login.
        navigate('/login', { replace: true })

      } finally {
        // Este bloco sempre executa após try ou catch.
        // Garante que o spinner local seja desativado, independentemente do resultado.
        setIsLoading(false)
      }
    }

    // Chama a função handleAction assíncrona para iniciar o processamento.
    handleAction()

  }, [mode, oobCode, navigate, toastError, toastSuccess, user, loading]) // Lista de dependências do useEffect.
  // O efeito roda novamente se qualquer um desses valores mudar.

  // Renderiza o spinner enquanto o estado local isLoading é true.
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Quando não está carregando (a ação terminou e um redirecionamento ocorreu),
  // este componente não precisa renderizar nada visível.
  return null
}
