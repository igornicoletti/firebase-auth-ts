// src/router.tsx

// Importa funções e componentes necessários do react-router-dom
import { createBrowserRouter, Navigate } from 'react-router-dom'

// Importa componentes de rota específicos para autenticação (callback e rota protegida)
import { AuthCallbackRoute, AuthProtectedRoute } from '@/lib/auth/components'
// Importa os componentes de formulário para as páginas de autenticação pública
import {
  AuthForgotForm,
  AuthLoginForm,
  AuthRegisterForm,
  AuthResetForm,
} from '@/lib/auth/components/form'
// Importa o hook customizado para acessar o estado de autenticação global
import { useAuth } from '@/lib/auth/contexts'
// Importa o componente de layout comum para as páginas de autenticação pública
import { AuthLayout } from '@/lib/auth/layouts'
// Importa o loader para carregar dados de layout nas rotas de autenticação pública
import { authLoader } from '@/lib/auth/loaders'

// Importa componentes genéricos (spinner, páginas de erro)
import { LoadingSpinner } from '@/components/custom'
import { DashboardPage } from '@/pages/dashboard'
import { ErrorBoundaryPage } from '@/pages/errorBoundary'
import { NotFoundPage } from '@/pages/notFound'

/**
 * Componente Helper para redirecionar usuários na rota raiz ('/').
 * Verifica o estado de autenticação inicial e redireciona para o dashboard (se logado)
 * ou para a página de login (se não logado).
 * Exibe um spinner enquanto o estado de autenticação está carregando.
 */
const RootRedirect = () => {
  // Obtém o usuário atual e o estado de carregamento inicial do hook de autenticação.
  const { user, loading } = useAuth()

  // Enquanto o estado de autenticação está sendo determinado (primeiro carregamento), mostra um spinner.
  if (loading) {
    return <LoadingSpinner />
  }

  // Se o usuário está logado (user é um objeto User), redireciona para o dashboard.
  // Se não está logado (user é null), redireciona para a página de login.
  // 'replace' evita que a página atual seja adicionada ao histórico do navegador.
  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  )
}

/**
 * Array definindo as rotas públicas da aplicação (acessíveis sem autenticação).
 * Cada rota utiliza o authLoader para carregar dados de layout e um componente de formulário específico.
 */
const publicRoutes = [
  {
    path: '/login', // Caminho da rota
    element: <AuthLoginForm />, // Componente a ser renderizado para esta rota
    loader: authLoader // Loader associado para carregar dados antes de renderizar
  },
  {
    path: '/register',
    element: <AuthRegisterForm />,
    loader: authLoader
  },
  {
    path: '/forgot-password',
    element: <AuthForgotForm />,
    loader: authLoader
  },
  {
    path: '/reset-password',
    element: <AuthResetForm />,
    loader: authLoader
  },
]

/**
 * Array definindo as rotas privadas da aplicação (que requerem autenticação).
 * Cada rota representa uma página acessível apenas para usuários logados.
 */
const privateRoutes = [
  {
    path: '/dashboard', // Caminho da rota
    element: <DashboardPage />, // Componente a ser renderizado
    // Loaders ou ações específicas podem ser adicionados aqui se necessário
  },
  // Adicionar outras rotas privadas aqui
]

/**
 * Configuração principal do router da aplicação usando createBrowserRouter.
 * Define a estrutura de rotas, incluindo rotas públicas, privadas, callback e tratamento de erros.
 */
export const router = createBrowserRouter([
  {
    // Rota raiz ('/').
    path: '/',
    // Utiliza o componente RootRedirect para lidar com o redirecionamento inicial baseado na autenticação.
    element: <RootRedirect />,
    // Componente para renderizar em caso de erro nesta rota ou em seus loaders/ações.
    errorElement: <ErrorBoundaryPage />,
  },
  {
    // Rota específica para lidar com callbacks de e-mail do Firebase (links de ação).
    // Ex: /callback?mode=verifyEmail&oobCode=...
    path: '/callback',
    element: <AuthCallbackRoute />, // O componente que processa o link de ação.
    errorElement: <ErrorBoundaryPage />, // Error Boundary para esta rota.
  },
  {
    // Rota de layout para as rotas públicas.
    // Rotas filhas (definidas em publicRoutes) serão renderizadas dentro deste layout.
    element: <AuthLayout />,
    errorElement: <ErrorBoundaryPage />, // Error Boundary para este layout e suas rotas filhas.
    children: publicRoutes, // Array de rotas filhas que herdarão este layout e loader (via loader no filho).
  },
  {
    // Rota de proteção para as rotas privadas.
    // Utiliza o componente AuthProtectedRoute para verificar a autenticação antes de renderizar rotas filhas.
    element: <AuthProtectedRoute />,
    errorElement: <ErrorBoundaryPage />, // Error Boundary para esta rota protegida e suas rotas filhas.
    children: privateRoutes, // Array de rotas filhas que só serão acessíveis se a proteção passar.
  },
  {
    // Rota catch-all ('*') para lidar com caminhos não encontrados (páginas 404).
    path: '*',
    element: <NotFoundPage />, // Componente a ser renderizado para qualquer rota não definida acima.
  },
])
