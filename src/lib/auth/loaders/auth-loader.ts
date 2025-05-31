// src/lib/auth/loaders/auth-loader.ts

import type { LoaderFunctionArgs } from 'react-router-dom'

// Importa o mapa que associa caminhos a dados de layout de autenticação
import { authDataMap, type AuthData } from '@/lib/auth/config'
// Importa o tipo de dado que representa uma chave válida no mapa de dados de autenticação
import type { AuthDataCode } from '@/lib/auth/constants'

/**
 * Loader para rotas de autenticação pública (login, register, forgot-password, etc.).
 * Carrega os dados de layout (título, descrição, links) com base no caminho da URL.
 *
 * @param {LoaderFunctionArgs} args - Argumentos fornecidos pelo react-router-dom loader.
 * @param {Request} args.request - O objeto Request para a URL atual.
 * @returns {AuthData} Um objeto contendo os dados de layout para o caminho da rota.
 * @throws {Response} Uma Response com status 404 se o caminho não corresponder a uma chave válida no authDataMap.
 */
export const authLoader = ({ request }: LoaderFunctionArgs): AuthData => {
  // Cria um objeto URL a partir da URL da requisição para facilitar a manipulação.
  const url = new URL(request.url)
  // Extrai o segmento do caminho da URL (ex: 'login', 'register')
  // Remove barras iniciais e finais e espaços em branco extras.
  const pathname = url.pathname.replace(/^\/+/, '').trim()

  // Verifica se o pathname extraído é uma chave válida no authDataMap usando o type guard.
  if (!isAuthDataKey(pathname)) {
    // Se não for uma chave válida, significa que a URL não corresponde a nenhuma
    // das rotas de autenticação configuradas no mapa. Lança um erro 404.
    throw new Response('Page Not Found', { status: 404 })
  }

  // Se o pathname é uma chave válida, retorna os dados de layout correspondentes
  // do authDataMap. Graças ao type guard, TypeScript sabe que authDataMap[pathname]
  // retornará um objeto do tipo AuthData.
  return authDataMap[pathname]
}

/**
 * Type guard para verificar se uma string é uma chave válida para o authDataMap.
 * Utiliza o operador 'in' com o objeto authDataMap para validar a existência da chave.
 *
 * @param {string} key - A string a ser verificada.
 * @returns {key is AuthDataCode} Retorna true se a string for uma chave válida (e informa ao TypeScript o tipo).
 */
const isAuthDataKey = (key: string): key is AuthDataCode => {
  // Verifica se a string 'key' existe como uma propriedade diretamente no objeto authDataMap.
  // Isso funciona porque authDataMap é um Record<AuthDataCode, AuthData>, onde AuthDataCode
  // é um conjunto de string literals.
  return key in authDataMap
}
