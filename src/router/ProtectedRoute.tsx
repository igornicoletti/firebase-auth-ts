// src/router/ProtectedRoute.tsx

import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Loading } from '@/common'
import { useAuth, type AuthOptions } from '@/features'

export const ProtectedRoute = ({
  requireEmailVerified = true,
  redirectTo = '/login'
}: AuthOptions = {}) => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Permite se houver usuário E (se a verificação de e-mail não for obrigatória OU o e-mail estiver verificado)
  const isAllowed = user && (!requireEmailVerified || user.emailVerified)

  useEffect(() => {
    // Se não estiver carregando E não for permitido (usuário não logado ou e-mail não verificado quando necessário)
    if (!loading && !isAllowed) {
      // Redireciona para a rota configurada. Substitui a entrada no histórico de navegação. Salva o caminho de onde o usuário veio
      navigate(redirectTo, {
        replace: true,
        state: {
          from: location.pathname
        }
      })
    }
  }, [loading, isAllowed, navigate, location.pathname, redirectTo])

  if (loading) {
    return <Loading message='Verifying your session...' />
  }

  // Se o usuário é permitido, renderiza os componentes filhos da rota; caso contrário, não renderiza nada (null)
  return isAllowed ? <Outlet /> : null
}
