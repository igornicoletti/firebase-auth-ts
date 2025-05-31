// src/lib/auth/schemas/auth-forgot.schema.ts

// Importa a biblioteca Zod
import { z } from 'zod'

/**
 * Schema de validação para o formulário de Esqueceu a Senha.
 * Define a estrutura e as regras para o campo de email usado para enviar o link de reset.
 */
export const authForgotSchema = z.object({
  /**
   * O endereço de e-mail do usuário para o qual enviar o link de redefinição de senha.
   * Deve ser uma string no formato de e-mail, remover espaços em branco e é obrigatório.
   */
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .min(1, 'Email is required'), // Adicionado min(1) para garantir que não esteja vazio
})

// Para usar a tipagem inferida deste schema:
// export type AuthForgot = z.infer<typeof authForgotSchema>;
