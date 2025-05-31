// src/lib/auth/hooks/use-auth-toast.ts

// Importa o tipo FirebaseError para identificação de erros específicos
import { FirebaseError } from 'firebase/app'
// Importa hooks do React para memoização de callbacks
import { useCallback } from 'react'
// Importa a biblioteca de toast (sonner)
import { toast } from 'sonner'

// Importa os códigos de sucesso e o tipo para garantir segurança de tipo
import { AuthSuccessCodes, type AuthSuccessCode } from '@/lib/auth/constants'
// Importa a função helper para formatar códigos/chaves em mensagens amigáveis
import { authFormatCodes } from '@/lib/auth/helpers'

/**
 * Hook customizado para extrair o código de erro de um objeto de erro.
 * Suporta strings, instâncias de FirebaseError e objetos genéricos com uma propriedade 'code'.
 *
 * @param {unknown} input - O valor de entrada, que pode ser um erro, string, etc.
 * @returns {string} O código do erro como string, ou 'unknown' se não puder ser extraído.
 */
const extractCode = (input: unknown): string => {
  // Se a entrada já for uma string, a retorna diretamente (pode ser um código de erro passado como string).
  if (typeof input === 'string') return input
  // Se a entrada for uma instância de FirebaseError, retorna a propriedade 'code'.
  if (input instanceof FirebaseError) return input.code
  // Se a entrada for um objeto e tiver uma propriedade 'code', tenta convertê-la para string.
  if (input && typeof input === 'object' && 'code' in input) return String((input as any).code)
  // Se nenhuma das condições acima for atendida, retorna 'unknown'.
  return 'unknown'
}

/**
 * Hook customizado para exibir mensagens de toast formatadas para erros e sucessos de autenticação.
 * Utiliza os mapas de mensagens definidas em auth-format-codes.ts.
 *
 * @returns {{ toastError: (error: unknown) => void; toastSuccess: (successKey?: AuthSuccessCode) => void; }}
 *          Um objeto contendo as funções para exibir toasts de erro e sucesso.
 */
export const useAuthToast = () => {

  /**
   * Exibe uma mensagem de toast formatada para um erro de autenticação.
   * Extrai o código do erro e usa authFormatCodes.error para obter o título e a descrição.
   * Usa useCallback para memoizar a função e evitar recriações desnecessárias.
   *
   * @param {unknown} error - O objeto de erro (geralmente um FirebaseError) ou string do erro.
   */
  const toastError = useCallback((error: unknown) => {
    // Extrai o código do erro usando a função helper.
    const code = extractCode(error)
    // Usa authFormatCodes.error para obter o título e a descrição formatados para o código de erro.
    const { title, description } = authFormatCodes.error(code)

    // Dispensa quaisquer toasts existentes para evitar sobreposição excessiva.
    toast.dismiss()
    // Exibe a mensagem de toast usando a biblioteca sonner.
    toast.message(title, {
      description,
      // Classes CSS para estilizar o toast de erro (ex: cor do título vermelha).
      classNames: {
        title: '!text-destructive',
        description: '!text-foreground'
      }
    })
  }, []) // Array de dependências vazio, pois as funções usadas (extractCode, authFormatCodes.error, toast.dismiss, toast.message) são estáveis.

  /**
   * Exibe uma mensagem de toast formatada para um evento de sucesso de autenticação.
   * Usa a chave de sucesso fornecida e authFormatCodes.success para obter o título e a descrição.
   * Usa useCallback para memoizar a função.
   *
   * @param {AuthSuccessCode} [successKey=AuthSuccessCodes.GENERIC_SUCCESS] - A chave que identifica o tipo de sucesso.
   *                                                                        Usa 'generic-success' como padrão se não fornecida.
   */
  const toastSuccess = useCallback((successKey: AuthSuccessCode = AuthSuccessCodes.GENERIC_SUCCESS) => {
    // Usa authFormatCodes.success para obter o título e a descrição formatados para a chave de sucesso.
    const { title, description } = authFormatCodes.success(successKey)

    // Dispensa quaisquer toasts existentes.
    toast.dismiss()
    // Exibe a mensagem de toast.
    toast.message(title, {
      description,
      // Classes CSS para estilizar o toast de sucesso (ex: cor do título primária/verde).
      classNames: {
        title: '!text-green-500',
        description: '!text-foreground'
      }
    })
  }, []) // Array de dependências vazio, pois as funções usadas (authFormatCodes.success, toast.dismiss, toast.message) são estáveis.

  /**
   * Retorna as funções toastError e toastSuccess para serem utilizadas pelos componentes.
   */
  return { toastError, toastSuccess }
}
