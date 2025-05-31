// src/lib/auth/components/auth-protected-route.tsx

// Importa componentes do react-router-dom para navegação e renderização de rotas filhas
import { Navigate, Outlet } from 'react-router-dom'

// Importa o hook customizado para acessar o estado global de autenticação
import { useAuth } from '@/lib/auth/contexts'
// Importa a função helper que contém a lógica de verificação de permissão
import { canAccess } from '@/lib/auth/helpers/auth-can-access'
// Importa um componente de spinner para o estado de carregamento
import { LoadingSpinner } from '@/components/custom'

/**
 * Define as props configuráveis para o componente AuthProtectedRoute.
 */
type AuthProtected = {
  /**
   * Indica se a rota protegida exige que o e-mail do usuário esteja verificado.
   * @default true
   */
  requireEmailVerified?: boolean
  /**
   * O caminho para o qual redirecionar se o usuário não tiver permissão.
   * @default '/login'
   */
  redirectTo?: string
}

/**
 * Componente de Rota Protegida por Autenticação.
 * Este componente envolve outras rotas e verifica se o usuário atual tem permissão para acessá-las.
 * Se o usuário não estiver autenticado ou não atender aos requisitos (ex: email verificado),
 * ele será redirecionado para a página de login ou outra página configurada.
 * Exibe um spinner enquanto o estado de autenticação está carregando.
 *
 * @param {AuthProtected} props - Props de configuração para a proteção da rota.
 * @param {boolean} [props.requireEmailVerified=true] - Se a rota exige email verificado.
 * @param {string} [props.redirectTo='/login'] - O caminho de redirecionamento.
 */
export const AuthProtectedRoute = ({
  requireEmailVerified = true,
  redirectTo = '/login'
}: AuthProtected) => {
  // Usa o hook customizado para obter o usuário autenticado e o estado de carregamento inicial do Firebase Auth.
  const { user, loading } = useAuth()

  // Se o estado de autenticação global ainda está carregando, renderiza um spinner.
  // Isso evita que a rota protegida pisque momentaneamente antes de o estado do usuário ser conhecido.
  if (loading) {
    return <LoadingSpinner />
  }

  // Usa a função helper 'canAccess' para determinar se o usuário tem permissão para acessar a rota,
  // com base nas opções fornecidas (ex: se o e-mail verificado é necessário).
  const isAllowed = canAccess(user, { requireEmailVerified })

  // Se o usuário NÃO tiver permissão ('isAllowed' é false), redireciona.
  // `<Navigate to={redirectTo} replace />` faz o redirecionamento.
  // 'replace' substitui a entrada atual no histórico de navegação.
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />
  }

  // Se o usuário TEM permissão ('isAllowed' é true), renderiza as rotas filhas.
  // `<Outlet />` renderiza o componente da rota aninhada correspondente.
  return <Outlet />
}
