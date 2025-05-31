// src/main.tsx

// Importa funções necessárias do React e ReactDOM para criar a raiz da aplicação.
import { StrictMode } from 'react' // Importa o StrictMode para ajudar a identificar problemas em desenvolvimento.
import { createRoot } from 'react-dom/client' // Importa a função para criar a raiz de renderização (React 18+).

// Importa o componente raiz da sua aplicação.
import { App } from '@/App'
// Importa o arquivo CSS global da sua aplicação.
import '@/index.css'

// Encontra o elemento DOM no HTML onde a aplicação React será renderizada.
// O '!' é um operador de asserção não-nula em TypeScript, assumindo que o elemento 'root' existe.
const container = document.getElementById('root')!

// Cria uma raiz de renderização do React 18+ para o elemento container.
const root = createRoot(container)

// Renderiza o componente principal da aplicação dentro da raiz criada.
root.render(
  // StrictMode: Um wrapper que ativa verificações adicionais e avisos para problemas potenciais
  // durante o desenvolvimento. Não tem efeito no build de produção.
  <StrictMode>
    {/* Renderiza o componente raiz da aplicação, que configura os providers e o router. */}
    <App />
  </StrictMode>,
)
