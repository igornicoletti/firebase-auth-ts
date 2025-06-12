import { Loading } from '@/common/components' // Certifique-se de que o alias está configurado
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useEmailVerification } from '..' // Importa useAuth do index da feature
import { useAuthToast } from '../hooks/useAuthToast' // Importe para usar toasts
import { authService } from '../services/authService' // Importe authService para a função de reenviar e-mail

const VerifyEmail = () => {
  const { user, loading } = useAuth()
  const { isSending, canResend } = useEmailVerification()
  const { toastError, toastSuccess } = useAuthToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      if (user?.emailVerified) {
        navigate('/dashboard', { replace: true })
      } else if (!user) {
        navigate('/login', { replace: true })
      }
    }
  }, [loading, user, navigate])

  const handleResendEmail = async () => {
    try {
      await authService.sendEmailVerificationToCurrentUser()
      toastSuccess('email-verification-sent')
    } catch (error) {
      toastError(error)
    }
  }

  if (loading) {
    return <Loading message="Verifying your session..." />
  }

  return (
    <div className="p-8 text-center flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Verifique Seu E-mail</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-md">
        Um link de verificação foi enviado para o seu endereço de e-mail (<strong>{user?.email || 'seu e-mail'}</strong>).
        Por favor, clique no link para ativar sua conta e acessar todos os recursos.
      </p>

      {user && !user.emailVerified && (
        <button
          onClick={handleResendEmail}
          disabled={isSending || !canResend}
        >
          Reenviar E-mail de Verificação
        </button>
      )}

      {!user && !loading && (
        <p className="mt-8 text-md text-gray-500">
          Não recebeu o e-mail? Verifique sua pasta de spam ou tente entrar em contato.
        </p>
      )}
    </div>
  )
}

export { VerifyEmail }
