import { GradientHighlight } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { GoogleLogo } from '@phosphor-icons/react'

export const SocialProvider = () => {
  const { isLoading, loginGoogle } = useAuth() // Use o hook

  const onSubmit = async () => {
    try {
      await loginGoogle()
      console.log("Tentativa de login com Google realizada.")
      // Redirecionamento automático via ProtectedRoute ou lógica similar
    } catch (err: any) {
      console.error("Erro no login com Google:", err)
      // O erro será exibido na UI via `error` do contexto
    }
  }

  return (
    <Button variant='secondary' onClick={onSubmit} disabled={isLoading}>
      <GoogleLogo />
      Continue with Google
      <GradientHighlight />
    </Button>
  )
}
