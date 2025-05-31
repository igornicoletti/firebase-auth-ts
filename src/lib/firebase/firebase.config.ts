// src/lib/firebase/firebase.config.ts

/**
 * Objeto de configuração do Firebase para o seu projeto.
 * Estes valores são obtidos de variáveis de ambiente para segurança e flexibilidade.
 * Certifique-se de que estas variáveis estão definidas no seu ambiente de build (ex: arquivo .env).
 *
 * Para obter sua configuração do Firebase:
 * 1. Vá para o console do Firebase (https://console.firebase.google.com/).
 * 2. Selecione seu projeto.
 * 3. Clique no ícone de engrenagem (Configurações do projeto).
 * 4. Na aba "Geral", role para baixo até "Seus apps".
 * 5. Selecione o aplicativo web.
 * 6. Escolha a opção "Config" para o snippet do SDK do Firebase.
 */
export const firebaseConfig = {
  // Chave da API do projeto Firebase.
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // Domínio de autenticação usado para redirects OAuth e links de ação de e-mail.
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ID único do seu projeto Firebase.
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // Nome do bucket padrão do Cloud Storage para o seu projeto.
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  // ID do remetente para o Firebase Cloud Messaging (FCM).
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  // ID único do aplicativo web Firebase registrado.
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // ID da propriedade do Google Analytics associada ao seu projeto Firebase (se ativado).
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}
