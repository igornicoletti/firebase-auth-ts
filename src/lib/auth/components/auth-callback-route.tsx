// src/lib/auth/components/auth-callback-route.tsx

import { useEffect, useState } from 'react' // Importe useState
import { useNavigate, useSearchParams } from 'react-router-dom'

import { AuthActionCodes } from '@/lib/auth/constants' // Importe seus códigos de ação
import { useAuthToast } from '@/lib/auth/hooks' // Importe seu hook de erro
import { auth } from '@/lib/firebase/firebase' // Importe a instância do auth
import { applyActionCode } from 'firebase/auth' // Importe applyActionCode do SDK

// Importe o spinner ou qualquer indicador de loading
import { LoadingSpinner } from '@/components/custom'

export const AuthCallbackRoute = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { toastError } = useAuthToast()

  // Adicione um estado de loading para esta rota de callback
  const [isLoading, setIsLoading] = useState(true) // Começa como true pois a ação é executada imediatamente

  // Captura os parâmetros importantes da URL
  const mode = params.get('mode')
  const oobCode = params.get('oobCode')

  useEffect(() => {
    // *** Lógica executada ao montar o componente ou quando params/navigate/toastError mudam ***

    // Se faltar mode ou oobCode, algo está errado com o link.
    if (!mode || !oobCode) {
      console.error("Callback URL is missing 'mode' or 'oobCode'.") // Log para debug
      toastError(new Error("Invalid action link. Please try again or contact support.")) // Mensagem amigável
      setIsLoading(false) // Pare o loading

      // Redirecione após um pequeno delay para permitir que o usuário veja o toast
      const redirectTimer = setTimeout(() => navigate('/login', { replace: true }), 3000) // Exemplo: redirecionar após 3 segundos
      return () => clearTimeout(redirectTimer) // Limpa o timer se o componente desmontar antes
    }

    // Função assíncrona para lidar com as ações
    const handleAction = async () => {
      // setIsLoading(true); // Já é true por padrão, mas pode ser explicitado se o estado inicial fosse false
      try {
        switch (mode) {
          case AuthActionCodes.VERIFY_EMAIL:
            // Aplica o código para verificar o email.
            await applyActionCode(auth, oobCode)

            // SUCESSO NA VERIFICAÇÃO DE EMAIL
            // console.log("Email verification successful!"); // Para depuração
            // Opcional: Exibir um toast de sucesso específico para verificação
            // toast.success("Email Verified", { description: "Your email address has been successfully verified!" });

            // Redireciona para a página de login.
            navigate('/login', { replace: true })
            break

          case AuthActionCodes.RESET_PASSWORD:
            // Para reset de senha, apenas redirecionamos para o formulário de reset,
            // passando o oobCode adiante.
            navigate(`/reset-password?oobCode=${oobCode}`, { replace: true })
            break

          // Adicione outros modos aqui se configurados (RECOVER_EMAIL, etc.)

          default:
            // Modo desconhecido
            console.warn(`Unknown action mode: ${mode}`) // Log para debug
            toastError(new Error(`Unknown action requested: ${mode}.`)) // Mensagem amigável
            // Redirecione após um pequeno delay
            const redirectDefaultTimer = setTimeout(() => navigate('/login', { replace: true }), 3000) // Exemplo: redirecionar após 3 segundos
            return () => clearTimeout(redirectDefaultTimer) // Limpa o timer
        }
      } catch (error) {
        // ERRO ao aplicar o código (código inválido, expirado, etc.)
        console.error('Error processing action code:', error) // Log para debug
        toastError(error) // Usa seu hook para exibir a mensagem amigável do erro Firebase

        // Redirecione para a página de login após um erro.
        const redirectErrorTimer = setTimeout(() => navigate('/login', { replace: true }), 3000) // Exemplo: redirecionar após 3 segundos
        return () => clearTimeout(redirectErrorTimer) // Limpa o timer
      } finally {
        // *** IMPORTANTE: Parar o loading no finally, garantindo que sempre pare ***
        setIsLoading(false)
      }
    }

    // *** CHAMA A FUNÇÃO handleAction para iniciar o processo ***
    // Só chama se mode e oobCode estiverem presentes
    if (mode && oobCode) {
      handleAction()
    }

    // Cleanup para o useEffect: geralmente não é necessário limpar algo aqui
    // a menos que você adicione listeners que precisem ser removidos.
    // Os timers de redirecionamento já são limpos dentro dos blocos try/catch/if.
    // Se você adicionar um timer aqui antes de handleAction, ele precisaria ser limpo.
    // return () => {}; // Exemplo de cleanup vazio

  }, [mode, oobCode, navigate, toastError]) // Dependências: re-executa se params (mode, oobCode) ou hooks de navegação/toast mudarem

  // Renderiza um spinner enquanto estiver carregando
  if (isLoading) {
    // Você pode adicionar um texto como "Processing action..."
    return <LoadingSpinner />
  }

  // Retorna null ou nada após o carregamento, pois o componente já navegou
  // Este componente existe primariamente para executar a lógica de callback e redirecionar.
  // Não há UI para ser mostrada permanentemente nesta página.
  return null
}
