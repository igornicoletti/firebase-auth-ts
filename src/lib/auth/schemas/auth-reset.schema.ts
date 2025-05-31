// src/lib/auth/schemas/auth-reset.schema.ts

// Importa a biblioteca Zod
import { z } from 'zod'

/**
 * Schema de validação para o formulário de Redefinição de Senha.
 * Define a estrutura e as regras para a nova senha e sua confirmação,
 * incluindo validação de força da senha e correspondência entre os campos.
 */
export const authResetSchema = z
  .object({
    /**
     * A nova senha para a conta do usuário.
     * Requisitos de força de senha:
     * - Mínimo de 6 caracteres.
     * - Pelo menos uma letra maiúscula (A-Z).
     * - Pelo menos uma letra minúscula (a-z).
     * - Pelo menos um número (0-9).
     */
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),

    /**
     * Confirmação da nova senha.
     * Deve ser uma string e é obrigatória.
     */
    confirmNewPassword: z
      .string()
      .min(1, 'Confirm new password'), // Garante que o campo não esteja vazio
  })
  // Refine: Validação a nível de objeto para garantir que a nova senha e sua confirmação sejam idênticas.
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match', // Mensagem de erro se as senhas não corresponderem.
    path: ['confirmNewPassword'], // Associa o erro ao campo confirmNewPassword.
  })

// Para usar a tipagem inferida deste schema:
// export type AuthReset = z.infer<typeof authResetSchema>;
