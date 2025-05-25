// authServices.ts
import { auth } from '@/services/firebase' // Importa a instância auth inicializada
import {
  type AuthError,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onAuthStateChanged as firebaseOnAuthStateChanged, // Renomeando para evitar conflito de nome, se necessário
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User
} from 'firebase/auth'

// --- FUNÇÕES DE AUTENTICAÇÃO ---

/**
 * Registra um novo usuário com email e senha.
 * @param email - O email do usuário.
 * @param password - A senha do usuário.
 * @returns Uma Promise que resolve com o objeto User em caso de sucesso.
 * @throws FirebaseError em caso de erro (email já em uso, senha fraca, etc.).
 */
export const signupWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // O usuário é criado, mas o email ainda não foi verificado automaticamente.
    // O fluxo descrito pelo usuário pede para redirecionar para o login após a criação.
    return userCredential.user
  } catch (error: any) {
    // Tratar erros específicos do Firebase Auth, se necessário
    // Por exemplo: auth/email-already-in-use, auth/weak-password
    throw error as AuthError // Lança o erro novamente para ser tratado no contexto ou componente
  }
}

/**
 * Realiza o login de um usuário com email e senha.
 * Inclui a verificação de email.
 * @param email - O email do usuário.
 * @param password - A senha do usuário.
 * @returns Uma Promise que resolve com o objeto User em caso de sucesso.
 * @throws FirebaseError em caso de erro (credenciais inválidas, usuário desabilitado, etc.).
 * @throws Error customizado se o email não for verificado.
 */
export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // ** Implementação da regra de negócio: bloquear login se email não validado **
    if (!user.emailVerified) {
      // Se o email não for verificado, desloga o usuário imediatamente
      await signOut(auth)
      // Lança um erro para informar o usuário que ele precisa verificar o email
      const error = new Error("Por favor, verifique seu email antes de fazer login.") as any
      error.code = "auth/email-not-verified"
      throw error
    }

    // Se o email for verificado, retorna o usuário para seguir para o dashboard
    return user

  } catch (error: any) {
    // Tratar erros específicos do Firebase Auth
    // Por exemplo: auth/user-not-found, auth/wrong-password, auth/user-disabled
    throw error as AuthError // Lança o erro novamente
  }
}

/**
 * Realiza o login com a conta Google.
 * @returns Uma Promise que resolve com o objeto User em caso de sucesso.
 * @throws FirebaseError em caso de erro.
 */
export const loginWithGoogle = async (): Promise<User> => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    // O login com Google geralmente já verifica o email
    const user = result.user
    return user
  } catch (error: any) {
    // Tratar erros específicos
    throw error as AuthError
  }
}

/**
 * Envia um email de reset de senha para o email fornecido.
 * @param email - O email do usuário.
 * @returns Uma Promise que resolve em caso de sucesso.
 * @throws FirebaseError em caso de erro.
 */
export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email)
    // Sucesso - um email foi enviado (se o email existir e a proteção de enumeração estiver desabilitada)
  } catch (error: any) {
    // Tratar erros específicos (auth/invalid-email, auth/user-not-found - embora este último possa não ocorrer com a proteção de enumeração habilitada)
    throw error as AuthError
  }
}

/**
 * Confirma o reset de senha com o código de ação e a nova senha.
 * Geralmente usado após o usuário clicar no link de reset de senha no email.
 * @param actionCode - O código de ação da URL de reset de senha.
 * @param newPassword - A nova senha do usuário.
 * @returns Uma Promise que resolve em caso de sucesso.
 * @throws FirebaseError em caso de erro (código inválido/expirado, senha fraca, etc.).
 */
export const resetPassword = async (actionCode: string, newPassword: string): Promise<void> => {
  try {
    // O método confirmPasswordReset não retorna o usuário, apenas confirma o reset.
    await confirmPasswordReset(auth, actionCode, newPassword)
    // Sucesso - a senha foi resetada.
  } catch (error: any) {
    // Tratar erros específicos (auth/invalid-action-code, auth/expired-action-code, auth/weak-password)
    throw error as AuthError
  }
}


/**
 * Desloga o usuário atual.
 * @returns Uma Promise que resolve em caso de sucesso.
 * @throws FirebaseError em caso de erro.
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth)
    // O onAuthStateChanged listener (que implementaremos no AuthContext)
    // irá detectar essa mudança de estado (usuário agora é null)
    // e atualizar o estado da aplicação e/ou redirecionar o usuário.
    console.log("Usuário deslogado com sucesso.") // Opcional: log para depuração
  } catch (error: any) {
    // Tratar erros específicos (embora signOut raramente falhe no cliente, a menos que haja um problema de rede ou configuração)
    console.error("Erro ao deslogar:", error)
    throw error as AuthError // Lança o erro novamente
  }
}

// --- OBSERVADOR DE ESTADO DE AUTENTICAÇÃO ---

// A função onAuthStateChanged é um OBSERVADOR.
// Ela não é uma função que você chama diretamente para *fazer* algo acontecer uma vez,
// mas sim uma função que você "liga" para ESCUTAR mudanças no estado de autenticação.
// Ela é fundamental para saber quem é o usuário atualmente logado (ou se ninguém está logado)
// sempre que o estado muda (login, logout, recarga da página, expiração/renovação do token).

/**
 * Configura um observador para o estado de autenticação.
 * Esta função é um listener que reage a mudanças no estado de login (usuário logado, deslogado, etc.).
 * É ideal para ser usada em um React Context ou no ponto mais alto da sua aplicação
 * para manter o estado de autenticação globalmente acessível e atualizado.
 * @param callback - Uma função que será chamada toda vez que o estado de autenticação mudar.
 *                   Recebe o objeto User (ou null se ninguém estiver logado).
 * @returns Uma função de "unsubscribe" para parar de observar as mudanças.
 */
export const onAuthStateChangedObserver = (callback: (user: User | null) => void) => {
  // firebaseOnAuthStateChanged é o onAuthStateChanged importado do firebase/auth, renomeado.
  return firebaseOnAuthStateChanged(auth, callback)
}

// --- CONSIDERAÇÕES ADICIONAIS ---

// Sobre o fluxo de registro:
// Quando um usuário se registra com email/senha, ele é automaticamente logado pelo Firebase SDK.
// No entanto, o fluxo que você descreveu ("create -> login") sugere que, após a criação,
// o usuário deve ser levado de volta para a tela de login (e não ir direto para o dashboard).
// A implementação de `loginWithEmail` já lida com a regra de negócio de impedir o acesso ao dashboard
// para usuários não verificados, forçando-os a logar novamente.
// Você precisará implementar o envio de email de verificação APÓS o registro.
// Ex: await user.sendEmailVerification(); após criar o usuário.
// E na tela de login, instruir o usuário a verificar o email se ele receber o erro `auth/email-not-verified`.

// Sobre a regra de bloquear login de email não validado:
// A função `loginWithEmail` implementa a verificação `user.emailVerified`.
// Se for `false`, ela chama `signOut` para garantir que o usuário não fique logado
// com um estado inconsistente e lança um erro específico ("auth/email-not-verified")
// para que a UI possa exibir a mensagem adequada.
