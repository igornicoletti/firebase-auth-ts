// src/lib/auth/layouts/auth-layout.tsx

// Importa componentes do react-router-dom para navegação e renderização de rotas filhas.
import { Link, Outlet, useMatches } from 'react-router-dom'

// Importa um componente de botão da sua biblioteca de UI.
import { Button } from '@/components/ui/button'

// Importa o tipo de dado que o loader associado a este layout fornece.
import type { AuthData } from '@/lib/auth/config'

/**
 * Componente de Layout Comum para Páginas de Autenticação Pública.
 * Este layout fornece uma estrutura visual consistente (container centralizado, cabeçalho, link alternativo)
 * para as páginas de login, registro, esqueci a senha e redefinição de senha.
 * Ele carrega seus dados de texto e links de um loader associado à rota.
 */
export const AuthLayout = () => {
  // useMatches(): Hook do react-router-dom que retorna um array de todas as rotas
  // que correspondem à localização atual, incluindo seus dados carregados por loaders.
  // Procuramos o primeiro match que possui dados (dados carregados pelo authLoader).
  const match = [...useMatches()].find(m => m.data)

  // Se nenhum match com dados for encontrado, algo está errado com a configuração da rota/loader,
  // ou este layout está sendo usado onde não deveria. Retorna null para não renderizar nada.
  if (!match) {
    // Em um ambiente de produção, você pode querer renderizar uma página de erro genérica aqui.
    return null
  }

  // Desestrutura os dados carregados do loader, garantindo que o tipo seja AuthData.
  // Este cast é seguro porque o loader já validou que os dados têm esta forma.
  const { title, description, ask, source, pathname } = match.data as AuthData

  return (
    // Container principal para centralizar o conteúdo.
    <div className='min-h-screen grid place-items-center px-4 py-6'>
      {/* Container com largura máxima definida. */}
      <div className='w-full max-w-sm'>
        {/* Grid layout para os elementos dentro do container. */}
        <div className='grid gap-6'>
          {/* Seção do cabeçalho da página (título e descrição). */}
          <div className="grid gap-2 text-center">
            <h2 className="font-bold text-xl">{title}</h2> {/* Título carregado pelo loader */}
            <p className="text-sm text-muted-foreground">{description}</p> {/* Descrição carregada */}
          </div>
          {/* Outlet: Aqui é onde o componente da rota filha específica
              (AuthLoginForm, AuthRegisterForm, etc.) será renderizado pelo react-router-dom. */}
          <Outlet />
          {/* Parágrafo com o link alternativo (ex: "Don't have an account? Register"). */}
          <p className="text-sm text-muted-foreground text-center">
            {ask}{' '} {/* Texto da pergunta (ex: "Don't have an account?") */}
            {/* Botão estilizado que age como um link usando asChild. */}
            <Button asChild variant="link" className="p-0 font-semibold">
              {/* Link para a página alternativa de autenticação. */}
              <Link to={pathname}> {/* O caminho é carregado dinamicamente pelo loader */}
                {source} {/* O texto do link (ex: "Register") é carregado dinamicamente */}
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
