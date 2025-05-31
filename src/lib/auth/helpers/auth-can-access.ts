// src/lib/auth/helpers/auth-can-access.ts

// Importa o tipo User do SDK do Firebase Authentication
import { type User } from 'firebase/auth'

/**
 * Define as opções que podem ser passadas para a função canAccess para configurar a verificação.
 */
type CanAccess = {
  /**
   * Se a verificação deve exigir que o e-mail do usuário esteja verificado.
   * @default true
   */
  requireEmailVerified?: boolean
  // Adicione outras opções de permissão aqui no futuro (ex: requireCustomClaim: 'admin')
  // requireCustomClaim?: string;
  // allowedRoles?: string[];
}

/**
 * Função helper para verificar se um usuário tem permissão para acessar um recurso/rota
 * com base no objeto User do Firebase e opções configuráveis.
 *
 * @param {User | null} user - O objeto User do Firebase (ou null se não logado).
 * @param {CanAccess} [options={}] - Opções para configurar a verificação de permissão.
 * @param {boolean} [options.requireEmailVerified=true] - Se a permissão exige e-mail verificado.
 * @returns {boolean} Retorna true se o usuário tiver permissão, false caso contrário.
 */
export const canAccess = (user: User | null, options: CanAccess = {}): boolean => {
  // Extrai as opções com valores padrão.
  const { requireEmailVerified = true } = options
  // Desestruturação para outras opções futuras:
  // const { requireEmailVerified = true, requireCustomClaim, allowedRoles } = options;

  // Verifica a condição mais básica: o usuário deve estar logado (não ser null).
  if (!user) {
    return false // Usuário não logado não tem acesso.
  }

  // Verifica a condição de e-mail verificado, se for exigida.
  // user.emailVerified é um booleano, true se verificado, false caso contrário.
  if (requireEmailVerified && user.emailVerified !== true) {
    return false // E-mail não verificado, mas é exigido.
  }

  // --- Adicionar outras verificações de permissão aqui ---
  // Exemplo: Verificar um custom claim 'admin'
  // if (requireCustomClaim === 'admin' && user.customClaims?.admin !== true) {
  //   return false;
  // }

  // Exemplo: Verificar se o usuário tem um role permitido (assumindo custom claim 'role' ou similar)
  // if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.customClaims?.role)) {
  //   return false;
  // }
  // --- Fim de outras verificações ---

  // Se todas as verificações de permissão passaram, retorna true.
  return true
}
