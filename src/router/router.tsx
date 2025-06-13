// src/router/router.tsx

import { useEffect } from 'react'
import { createBrowserRouter, useNavigate } from 'react-router-dom'

import { Loading } from '@/common/components/loading/Loading'
import {
  ForgotPasswordForm,
  LoginForm,
  RegisterForm,
  ResetPasswordForm,
  useAuth,
} from '@/features'
import { AuthLayout } from '@/features/auth/layouts/AuthLayout'
import { authLoader } from '@/features/auth/loaders/authLoaders'
import { dashboardLoader } from '@/features/dashboard/loaders/dashboardLoaders'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import { CallbackRoute, NotFoundRoute, ProtectedRoute, PublicRoute } from '@/router'

// ---
// RootRedirect: Lógica para o redirecionamento inicial na raiz '/'
// ---
const RootRedirect = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Se o usuário estiver logado (verificado ou não), ele é enviado para o dashboard.
        // A verificação de e-mail será tratada pelo ProtectedRoute ou pelo LoginForm/DashboardPage.
        navigate('/dashboard', { replace: true })
      } else {
        // Se não houver usuário logado, vá para a página de login
        navigate('/login', { replace: true })
      }
    }
  }, [user, loading, navigate])

  return <Loading /> // Mostra um spinner enquanto o estado de auth carrega
}

// ---
// Rotas Públicas: Acessíveis sem autenticação ou para autenticação
// ---
const publicRoutes = [
  { path: '/login', element: <LoginForm />, loader: authLoader },
  { path: '/register', element: <RegisterForm />, loader: authLoader },
  { path: '/forgot-password', element: <ForgotPasswordForm />, loader: authLoader },
  { path: '/reset-password/:oobCode', element: <ResetPasswordForm />, loader: authLoader },
  { path: '/callback', element: <CallbackRoute /> }, // Sua página de callback para ações do Firebase
]

// ---
// Configuração Principal do Roteador
// ---
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />, // Rota inicial para determinar o redirecionamento
  },
  {
    element: <PublicRoute />, // Protege rotas públicas (usuários logados são redirecionados)
    children: [
      {
        element: <AuthLayout />, // Layout comum para páginas de autenticação
        children: publicRoutes,
      },
    ],
  },
  {
    element: <ProtectedRoute requireEmailVerified={true} />, // Protege rotas que exigem e-mail verificado
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
        loader: dashboardLoader,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundRoute />, // Rota para páginas não encontradas
  },
])
