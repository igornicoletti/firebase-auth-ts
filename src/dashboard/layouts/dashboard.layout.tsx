import { ProtectionScreen } from '@/app/components'
import { useIdleDetector } from '@/app/hooks'
import { useAuth } from '@/auth/contexts'
import { useCallback, useState } from 'react'

// Simulação de serviço de autenticação
// Em um ambiente real, esta lógica pode vir de um serviço global ou do contexto de autenticação
const authService = {
  verifyPassword: async (password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (password === 'senha123') { // Mude a senha para 'senha123' para testar
          resolve(true)
        } else {
          resolve(false)
        }
      }, 500)
    })
  },
  // Usaremos o user do contexto de autenticação para o nome e avatar, se disponível
  // Ou podemos manter um padrão se não houver um avatar no contexto de auth
}

const IDLE_TIMEOUT_MS = 1 * 60 * 1000 // 15 minutos de inatividade

export const DashboardLayout = () => {
  const { user } = useAuth() // Assume que 'user' tem displayName, email, e talvez um avatar

  const [isLocked, setIsLocked] = useState(false)
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  const handleIdle = useCallback(() => {
    console.log('Usuário inativo. Bloqueando tela do Dashboard...')
    setIsLocked(true)
    setAuthError('')
  }, [])

  const handleUnlock = useCallback(async (password: string) => {
    setAuthLoading(true)
    setAuthError('')
    const isValid = await authService.verifyPassword(password)
    setAuthLoading(false)

    if (isValid) {
      console.log('Senha correta. Desbloqueando Dashboard...')
      setIsLocked(false)
    } else {
      setAuthError('Senha incorreta. Tente novamente.')
    }
  }, [])

  // Usa o hook de detecção de inatividade
  useIdleDetector({
    timeout: IDLE_TIMEOUT_MS,
    onIdle: handleIdle,
  })

  // Determina o nome do usuário para a tela de proteção
  const userNameOrEmail = user?.displayName || user?.email || 'Usuário'
  // Determina o caminho do avatar. Se o user do useAuth tiver uma propriedade avatar, use-a.
  // Caso contrário, use um avatar padrão.
  const userAvatar = (user && 'avatar' in user && typeof user.avatar === 'string')
    ? user.avatar
    : 'https://avatars.githubusercontent.com/u/40406316?v=4'

  return (
    <div className="grid gap-1 relative">
      {isLocked && (
        <ProtectionScreen
          onUnlock={handleUnlock}
          isLoading={authLoading}
          error={authError}
          userName={userNameOrEmail}
          avatarSrc={userAvatar}
        />
      )}

      {/* Conteúdo do dashboard. Aplicar blur/pointer-events se estiver bloqueado */}
      <div className={isLocked ? "blur-sm pointer-events-none" : ""}>
        {user && (
          <p className='font-bold text-xl'>
            Welcome, {userNameOrEmail}!
          </p>
        )}
        {/* Adicione o restante do conteúdo do seu dashboard aqui */}
        <p className="mt-4 text-gray-600">
          This is your dashboard content. It will blur when idle.
        </p>
        {/* Exemplo de onde você pode colocar o CurrentDateTime */}
        {/* <CurrentDateTime /> */}
      </div>
    </div>
  )
}
