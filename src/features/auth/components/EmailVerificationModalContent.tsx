// src/features/auth/components/EmailVerificationModalContent.tsx
import { useAuth } from '@/features/auth/contexts'
import { useEmailVerification } from '@/features/auth/hooks/useEmailVerification'
import { Button } from '@/shadcn/ui/button'

export const EmailVerificationModalContent = () => {
  const { user } = useAuth()
  const {
    needsVerification,
    isSending,
    canResend,
    timeUntilCanResend,
    resendVerificationEmail,
  } = useEmailVerification({ showWarning: false, autoResend: false })
  return (
    <div className="py-4 text-sm text-muted-foreground">
      <p>
        Enviamos um link de verificação para{' '}
        <strong className="text-foreground">{user?.email || 'seu e-mail'}</strong>.
        Por favor, verifique sua caixa de entrada (e pasta de spam) para ativar sua conta.
      </p>
      <Button
        className="mt-6 w-full"
        onClick={resendVerificationEmail}
        disabled={isSending || !canResend || !needsVerification}>
        {isSending ? (
          'Reenviando...'
        ) : canResend ? (
          'Reenviar E-mail'
        ) : (
          `Reenviar em ${timeUntilCanResend}s`
        )}
      </Button>
    </div>
  )
}
