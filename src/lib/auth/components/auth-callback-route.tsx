// src/lib/auth/components/auth-callback-route.tsx

import { applyActionCode } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { AuthActionCodes } from '@/lib/auth/constants'
import { useAuth } from '@/lib/auth/contexts' // Importe useAuth para verificar o estado
import { useAuthToast } from '@/lib/auth/hooks' // Importe seu hook de erro
import { auth } from '@/lib/firebase/firebase' // Importe a instância auth

import { LoadingSpinner } from '@/components/custom'

export const AuthCallbackRoute = () => {
  const { user, loading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [params] = useSearchParams()
  const { toastError } = useAuthToast()
  const navigate = useNavigate()

  const mode = params.get('mode')
  const oobCode = params.get('oobCode')

  useEffect(() => {
    if (authLoading) {
      setIsLoading(true)
      return
    }

    // Verifica se já temos um usuário logado E verificado
    // Isso pode acontecer se o onAuthStateChanged disparar *depois* da callback inicial falhar,
    // mas o backend tiver processado a verificação.
    if (user && user.emailVerified) {
      console.log("User already verified. Redirecting to dashboard.")
      toast.message("Email already Verified", {
        description: "Your email address was already successfully verified!",
        classNames: {
          title: '!text-success',
          description: '!text-foreground'
        }
      })
      navigate('/dashboard', { replace: true })
      setIsLoading(false)
      return
    }


    // Se não houver mode ou oobCode, é um link inválido.
    if (!mode || !oobCode) {
      console.error("Callback URL is missing 'mode' or 'oobCode'.")
      toastError(new Error("Invalid action link. Please try again or contact support."))
      setIsLoading(false)
      navigate('/login', { replace: true })
      return
    }

    const handleAction = async () => {
      setIsLoading(true)

      try {
        switch (mode) {
          case AuthActionCodes.VERIFY_EMAIL:
            console.log(`Attempting to apply action code: ${oobCode} for mode: ${mode}`)
            await applyActionCode(auth, oobCode)

            // *** MUDANÇA CHAVE 1: Recarregar o estado do usuário ***
            // Após aplicar o código com sucesso, force a atualização do objeto User no cliente.
            // Isso é CRUCIAL para garantir que emailVerified seja true imediatamente.
            if (auth.currentUser) {
              console.log("Action code applied successfully. Reloading user state...")
              await auth.currentUser.reload()
              console.log("User state reloaded. emailVerified:", auth.currentUser.emailVerified)
            } else {
              console.warn("Action code applied, but auth.currentUser is null. Cannot reload state.")
            }

            // *** MUDANÇA CHAVE 2: Verificar o estado de verificação após a aplicação/recarga ***
            // Só mostre sucesso e navegue para o dashboard se o email estiver REALMENTE verificado agora.
            if (auth.currentUser && auth.currentUser.emailVerified) {
              toast.message("Email Verified", {
                description: "Your email address has been successfully verified!",
                classNames: {
                  title: '!text-success',
                  description: '!text-foreground'
                }
              })
              console.log("User is verified. Redirecting to dashboard.")
              navigate('/dashboard', { replace: true }) // Redireciona para o dashboard
            } else {
              // Cenário de fallback: Se applyActionCode funcionou, mas emailVerified ainda não é true (improvável após reload),
              // ou se auth.currentUser ficou nulo por algum motivo.
              console.warn("Email verification process finished, but user state still shows not verified or user is null.")
              toastError(new Error("Email verification complete, but state not updated. Please try logging in."))
              navigate('/login', { replace: true }) // Redireciona para o login
            }

            break

          case AuthActionCodes.RESET_PASSWORD:
            console.log(`Redirecting for password reset with code: ${oobCode}`)
            navigate(`/reset-password?oobCode=${oobCode}`, { replace: true })
            break

          default:
            console.warn(`Unknown action mode: ${mode}`)
            toastError(new Error(`Unknown action requested: ${mode}.`))
            navigate('/login', { replace: true })
        }
      } catch (error) {
        // *** MUDANÇA CHAVE 3: Tratar o erro específico auth/invalid-action-code ***
        // Se for esse erro, mostramos a mensagem genérica de link inválido.
        // Para outros erros, podemos mostrar algo diferente se necessário, ou o erro genérico.
        const errorMessage = (error as any).code === 'auth/invalid-action-code'
          ? "The action link is invalid or has expired. Please try again or request a new link."
          : "An unexpected error occurred during the action. Please try again later."

        console.error('Error processing action code:', error)
        toastError(new Error(errorMessage)) // Usa a mensagem de erro apropriada

        // *** MUDANÇA CHAVE 4: Sempre redirecionar para login em caso de erro ***
        // Se a aplicação do código falhou, o usuário não está verificado por esta ação.
        // Ele precisa voltar para o login ou outra tela para tentar novamente ou obter um novo link.
        navigate('/login', { replace: true })

      } finally {
        setIsLoading(false) // Sempre desliga o spinner no final
      }
    }

    // Só executa handleAction se mode e oobCode estiverem presentes E
    // se o usuário *não* estiver já logado e verificado (tratado no início do useEffect).
    // Isso previne tentar aplicar o código de novo se o onAuthStateChanged já nos disse que está tudo ok.
    if (mode && oobCode && (!user || !user.emailVerified)) {
      handleAction()
    }

  }, [mode, oobCode, navigate, toastError, user, authLoading]) // Adicione user e authLoading às dependências

  // Mostra spinner enquanto isLoading é true (inicialmente, durante authLoading, e durante handleAction)
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Não renderiza nada se não estiver carregando (a navegação já ocorreu ou não há modo/oobCode)
  return null
}
