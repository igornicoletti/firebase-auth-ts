// src/router/PublicRoute.tsx

import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Loading } from '@/common'
import { useAuth } from '@/features'

type PublicRouteProps = {
  redirectTo?: string
  redirectToEmailVerification?: string
}

export const PublicRoute = ({
  redirectTo = '/dashboard',
  redirectToEmailVerification = '/login',
}: PublicRouteProps = {}) => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Se o usuário estiver logado
    if (!loading && user) {
      if (user.emailVerified) {
        navigate(redirectTo, { replace: true })
      } else {
        // Se logado, mas e-mail não verificado, redireciona para a página de verificação
        navigate(redirectToEmailVerification, { replace: true })
      }
    }
    // Se não estiver carregando e não houver usuário, o Outlet será renderizado, permitindo o acesso às rotas públicas (como /login).
  }, [loading, user, navigate, redirectTo, redirectToEmailVerification])

  if (loading) {
    return <Loading message="Verifying your session..." />
  }

  return <Outlet />
}
