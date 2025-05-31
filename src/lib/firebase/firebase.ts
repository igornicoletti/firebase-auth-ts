// src/lib/firebase/firebase.ts

// Importa a função para inicializar um aplicativo Firebase
import { initializeApp } from 'firebase/app'
// Importa a função para obter a instância do serviço de Autenticação
import { getAuth } from 'firebase/auth'
// Importa funções para outros serviços (comentados, mas incluídos para referência)
// import { getFirestore } from 'firebase/firestore'; // Para Cloud Firestore
// import { getStorage } from 'firebase/storage'; // Para Cloud Storage

// Importa o objeto de configuração do Firebase do seu arquivo de configuração
import { firebaseConfig } from '@/lib/firebase/firebase.config'

/**
 * Inicializa o aplicativo Firebase com a configuração fornecida.
 * Esta é a primeira etapa para usar qualquer serviço Firebase.
 * Cria uma instância do aplicativo Firebase.
 */
const app = initializeApp(firebaseConfig)

/**
 * Obtém a instância do serviço Firebase Authentication associada ao aplicativo inicializado.
 * Usando a abordagem modular (SDK v9+).
 */
const auth = getAuth(app)

// Obtém instâncias de outros serviços Firebase, se estiverem sendo usados.
// Eles estão comentados no seu código atual, mas a estrutura é mostrada.
// const db = getFirestore(app); // Instância do Cloud Firestore
// const storage = getStorage(getApp()); // Instância do Cloud Storage (usando getApp() ou a instância 'app' local)

/**
 * Exporta as instâncias inicializadas do aplicativo Firebase e dos serviços utilizados.
 * Outros arquivos da sua aplicação importarão estas instâncias para interagir com o Firebase.
 */
export { app, auth /*, db, storage */ }
