// src/features/auth/hooks/useEmailVerification.ts

import { useEffect, useState } from 'react'

import { authService } from '@/features/auth/services'
import { AuthSuccessCodes } from '@/shared/constants'
import { useAuth, useToast } from '@/shared/hooks'

type UseEmailVerificationOptions = {
  showWarning?: boolean
  autoResend?: boolean
}

export const useEmailVerification = ({
  showWarning = true,
  autoResend = false
}: UseEmailVerificationOptions = {}) => {
  const { user } = useAuth()
  const { toastError, toastSuccess } = useToast()

  const [isSending, setIsSending] = useState(false)
  const [lastSentAt, setLastSentAt] = useState<Date | null>(null)

  const isEmailVerified = user?.emailVerified ?? false
  const needsVerification = user && !isEmailVerified

  useEffect(() => {
    if (showWarning && needsVerification) {
      toastError('auth/email-not-verified')
    }
  }, [showWarning, needsVerification, toastError])

  useEffect(() => {
    if (autoResend && needsVerification && !lastSentAt) {
      resendVerificationEmail()
    }
  }, [autoResend, needsVerification, lastSentAt])

  const resendVerificationEmail = async () => {
    if (isSending || !user || user.emailVerified) return

    if (lastSentAt && Date.now() - lastSentAt.getTime() < 60000) {
      toastError('auth/too-many-requests')
      return
    }

    setIsSending(true)
    try {
      await authService.sendEmailVerificationToCurrentUser()
      setLastSentAt(new Date())
      toastSuccess(AuthSuccessCodes.EMAIL_VERIFIED_SUCCESS)
    } catch (error) {
      toastError(error)
    } finally {
      setIsSending(false)
    }
  }

  const canResend = !isSending && (
    !lastSentAt || Date.now() - lastSentAt.getTime() >= 60000
  )

  const timeUntilCanResend = lastSentAt
    ? Math.max(0, 60 - Math.floor((Date.now() - lastSentAt.getTime()) / 1000))
    : 0

  return {
    isEmailVerified,
    needsVerification,
    isSending,
    canResend,
    timeUntilCanResend,
    resendVerificationEmail,
    lastSentAt
  }
}
