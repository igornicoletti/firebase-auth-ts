// src/lib/auth/helpers/auth-format-codes.ts

// Importa os mapas de mensagens de erro e sucesso definidos nas configurações
import { authErrorMap, authSuccessMap } from '@/lib/auth/config'
// Importa o tipo que representa uma chave válida para mensagens de sucesso
import type { AuthSuccessCode } from '@/lib/auth/constants'

/**
 * Função helper para formatar códigos (de erro ou chaves de sucesso) em um formato legível.
 * Remove prefixos ('auth/'), substitui hifens por espaços e capitaliza a primeira letra de cada palavra.
 * Útil para criar títulos padrão ou fallbacks a partir dos códigos.
 *
 * @param {string} code - O código (ex: 'auth/user-not-found') ou chave (ex: 'signin-success') a ser formatado.
 * @returns {string} A string formatada (ex: 'User Not Found', 'Signin Success').
 */
const prettifyCode = (code: string): string => {
  // Remove o prefixo 'auth/' se ele existir no início da string.
  return code
    .replace(/^auth\//, '')
    // Substitui todos os hifens por espaços.
    .replace(/-/g, ' ')
    // Capitaliza a primeira letra de cada palavra na string resultante.
    .replace(/\b\w/g, char => char.toUpperCase())
}

/**
 * Objeto contendo funções para formatar códigos de erro e chaves de sucesso
 * em objetos com 'title' e 'description' para exibição ao usuário.
 * Usa mapas de configuração para mensagens amigáveis e fornece fallbacks padrão.
 */
export const authFormatCodes = {
  /**
   * Formata um código de erro do Firebase Authentication em um objeto com title e description.
   * Busca no authErrorMap pela mensagem amigável correspondente ao código.
   * Se o código não for encontrado no mapa, gera um título formatado a partir do código
   * e usa uma descrição de erro genérica como fallback.
   *
   * @param {string} code - O código de erro do Firebase Auth (ex: 'auth/invalid-email').
   * @returns {{ title: string; description: string; }} Um objeto contendo o título e a descrição formatados para o erro.
   */
  error: (code: string) => {
    // Define uma mensagem fallback caso o código de erro não esteja no mapa.
    const fallback = {
      title: prettifyCode(code), // Prettify o código para o título fallback.
      description: 'Algo deu errado. Por favor, tente novamente.' // Descrição padrão para erros desconhecidos.
    }

    // Busca a mensagem no authErrorMap usando o código como chave.
    // Se encontrada, retorna-a; caso contrário, retorna o objeto fallback.
    return authErrorMap[code] ?? fallback
  },

  /**
   * Formata uma chave de sucesso específica em um objeto com title e description.
   * Busca no authSuccessMap pela mensagem amigável correspondente à chave de sucesso.
   * Se a chave não for encontrada no mapa (o que não deve acontecer se tipado corretamente,
   * mas útil para robustez), gera um título formatado a partir da chave
   * e usa uma descrição de sucesso genérica como fallback.
   *
   * @param {AuthSuccessCode} successKey - A chave de sucesso (um dos valores de AuthSuccessCodes, ex: 'signin-success').
   * @returns {{ title: string; description: string; }} Um objeto contendo o título e a descrição formatados para o sucesso.
   */
  success: (successKey: AuthSuccessCode) => {
    // Define uma mensagem fallback caso a chave de sucesso não esteja no mapa (improvável com tipagem).
    const fallback = {
      title: prettifyCode(successKey), // Prettify a chave para o título fallback.
      description: 'Operação concluída com sucesso.' // Descrição padrão para sucessos desconhecidos.
    }

    // Busca a mensagem no authSuccessMap usando a chave de sucesso.
    // Se encontrada, retorna-a; caso contrário, retorna o objeto fallback.
    // A tipagem AuthSuccessCode garante que successKey é uma chave válida para o Record authSuccessMap.
    return authSuccessMap[successKey] ?? fallback
  }
}
