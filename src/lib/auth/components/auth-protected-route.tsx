// src/lib/auth/components/auth-protected-route.tsx

import { Navigate, Outlet } from 'react-router-dom'

import { LoadingSpinner } from '@/components/custom'
import { useAuth } from '@/lib/auth/contexts'
import { canAccess } from '@/lib/auth/helpers'

export const AuthProtectedRoute = () => {
  const { user, loading } = useAuth() // Obtém o estado de autenticação do Contexto

  // Enquanto o estado inicial do Firebase Auth está carregando, mostre um spinner.
  // O AuthProvider já espera por isso antes de renderizar os filhos,
  // mas ter uma verificação aqui é uma camada extra de segurança visual.
  if (loading) {
    return <LoadingSpinner />
  }

  // Verifica se o usuário tem permissão para acessar (está logado, email verificado, etc.)
  // Por padrão, canAccess requer apenas que o usuário exista.
  const isAllowed = canAccess(user)

  // Se o usuário não tem permissão, redireciona para a página de login.
  // Usamos 'replace' para que o usuário não possa voltar para a página protegida usando o botão Voltar do navegador.
  if (!isAllowed) {
    return <Navigate to="/login" replace />
  }

  // Se o usuário tem permissão, renderiza as rotas filhas aninhadas (definidas no router.tsx)
  return <Outlet />
}
