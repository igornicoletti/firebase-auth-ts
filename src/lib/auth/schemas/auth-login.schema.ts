// src/lib/auth/schemas/auth-login.schema.ts

// Importa a biblioteca Zod
import { z } from 'zod'

/**
 * Schema de validação para o formulário de Login.
 * Define a estrutura e as regras para os campos de email e password.
 */
export const authLoginSchema = z.object({
  /**
   * O endereço de e-mail do usuário.
   * Deve ser uma string no formato de e-mail, remover espaços em branco e é obrigatório.
   */
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .min(1, 'Email is required'), // Adicionado min(1) para garantir que não esteja vazio

  /**
   * A senha do usuário.
   * Deve ser uma string. A mensagem de erro inclui uma descrição genérica dos requisitos,
   * embora a validação real de força da senha possa ser mais rigorosa do lado do servidor Firebase.
   */
  password: z
    .string()
    .min(1, 'Password is required'), // Adicionado min(1) para garantir que não esteja vazio
  // Nota: A validação de força da senha mínima (6 chars, etc.) é feita principalmente
  // no momento da criação ou atualização da senha pelo Firebase Auth.
  // Este schema apenas garante que a senha não esteja vazia e atenda a um mínimo local se definido.
  // Se você quiser validar a força da senha no cliente (embora não seja tão seguro quanto no server),
  // pode adicionar .min(), .regex() aqui como nos schemas Register/Reset.
})

// Para usar a tipagem inferida deste schema:
// export type AuthLogin = z.infer<typeof authLoginSchema>;
