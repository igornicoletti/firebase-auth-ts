import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/contexts/AuthProvider'
import { PATHS } from '@/routers/paths'

export const HomePage = () => {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return

    if (user) {
      navigate(PATHS.app.dashboard, { replace: true })
    } else {
      navigate(PATHS.auth.login, { replace: true })
    }
  }, [user, isLoading, navigate])

  return null
}
