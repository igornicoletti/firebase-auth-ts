// src/lib/auth/schemas/auth-register.schema.ts

// Importa a biblioteca Zod
import { z } from 'zod'

/**
 * Schema de validação para o formulário de Registro de Usuário.
 * Define a estrutura e as regras para nome de usuário, email, senha e confirmação de senha,
 * incluindo validação de força da senha e correspondência entre as senhas.
 */
export const authRegisterSchema = z
  .object({
    /**
     * O nome de usuário desejado.
     * Deve ser uma string e remove espaços em branco extras do início/fim.
     */
    username: z
      .string()
      .trim()
      .min(1, 'Username is required'), // Adicionei min(1) para garantir que não seja apenas espaços

    /**
     * O endereço de e-mail do usuário.
     * Deve ser uma string no formato de e-mail, remover espaços em branco e é obrigatório.
     */
    email: z
      .string()
      .trim()
      .email('Invalid email address')
      .min(1, 'Email is required'), // Adicionado min(1) para garantir que não seja apenas espaços

    /**
     * A senha para a nova conta do usuário.
     * Requisitos de força de senha (os mesmos do reset):
     * - Mínimo de 6 caracteres.
     * - Pelo menos uma letra maiúscula (A-Z).
     * - Pelo menos uma letra minúscula (a-z).
     * - Pelo menos um número (0-9).
     */
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),

    /**
     * Confirmação da senha.
     * Deve ser uma string e é obrigatória.
     */
    confirmPassword: z
      .string()
      .min(1, 'Confirm password is required'), // Garante que o campo não esteja vazio
  })
  // Refine: Validação a nível de objeto para garantir que a senha e sua confirmação sejam idênticas.
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match', // Mensagem de erro se as senhas não corresponderem.
    path: ['confirmPassword'], // Associa o erro ao campo confirmPassword.
  })

// Para usar a tipagem inferida deste schema:
// export type AuthRegister = z.infer<typeof authRegisterSchema>;
