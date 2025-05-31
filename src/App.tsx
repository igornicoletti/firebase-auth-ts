// src/App.tsx

// Importa o componente principal do react-router-dom para renderizar a árvore de rotas
import { RouterProvider } from 'react-router-dom'

// Importa o componente Toaster para exibir mensagens de toast (da biblioteca sonner)
import { Toaster } from '@/components/ui/sonner'
// Importa o provedor de contexto para gerenciar diálogos (modal, etc.)
import { DialogProvider } from '@/contexts/dialog'
// Importa o provedor de contexto para gerenciar o tema (claro/escuro)
import { ThemeProvider } from '@/contexts/theme'
// Importa o provedor de contexto para gerenciar o estado global de autenticação
import { AuthProvider } from '@/lib/auth/contexts'
// Importa a configuração do router da aplicação
import { router } from '@/router'

/**
 * Componente raiz da aplicação.
 * Configura e aninha todos os principais Context Providers e o Router.
 * Este componente define a estrutura global e os contextos disponíveis para toda a aplicação.
 */
export const App = () => {
  return (
    // AuthProvider: Fornece o estado de autenticação global via hook useAuth.
    // Envolve toda a aplicação para que o estado de autenticação esteja disponível em qualquer lugar.
    <AuthProvider>
      {/* ThemeProvider: Fornece o contexto de tema para a aplicação (claro/escuro, etc.). */}
      {/* Envolve outros componentes que podem precisar acessar ou alterar o tema. */}
      <ThemeProvider>
        {/* DialogProvider: Fornece um contexto para gerenciar o estado de diálogos/modais globais. */}
        {/* Envolve componentes que podem disparar ou renderizar modais. */}
        <DialogProvider>
          {/* RouterProvider: Conecta a configuração do router (definida em '@/router')
              à árvore de componentes React. Ele renderizará a rota correspondente. */}
          <RouterProvider router={router} />
          {/* Toaster: O componente que renderiza os toasts. Posicionado no nível superior
              para que as mensagens disparadas por toast() apareçam corretamente. */}
          <Toaster />
        </DialogProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
