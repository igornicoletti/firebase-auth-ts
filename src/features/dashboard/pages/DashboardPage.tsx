// src/features/dashboard/pages/DashboardPage.tsx

import { useLoaderData } from 'react-router-dom'

import { SignOut } from '@phosphor-icons/react'

import { authService } from '@/features'
import type { DashboardLoaderData } from '@/features/dashboard/loaders/dashboardLoaders'
import { Button, ButtonHighlight } from '@/shadcn/ui/button'

import { AuthSuccessCodes } from '@/shared/constants'
import { useToast } from '@/shared/hooks'

export const DashboardPage = () => {
  const { dashboardData } = useLoaderData() as DashboardLoaderData
  const { toastSuccess, toastError } = useToast()

  const handleLogout = async () => {
    try {
      await authService.signOut()
      toastSuccess(AuthSuccessCodes.SIGNOUT_SUCCESS)
    } catch (error) {
      toastError(error)
    }
  }
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-auto rounded-lg p-4">
          <h2 className="font-semibold">Sessões Ativas</h2>
          <p className="text-xl text-primary">{dashboardData.activeSessions}</p>
        </div>
        <div className="bg-muted/50 aspect-auto rounded-lg p-4">
          <h2 className="font-semibold">Total de Usuários</h2>
          <p className="text-xl text-primary">{dashboardData.totalUsers}</p>
        </div>
        <div className="bg-muted/50 aspect-auto rounded-lg p-4">
          <h2 className="font-semibold">Total de Usuários</h2>
          <p className="text-xl text-primary">{dashboardData.totalUsers}</p>
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 md:min-h-min">
        <Button variant='secondary' onClick={handleLogout}>
          <SignOut />
          Sign out
          <ButtonHighlight />
        </Button>
      </div>
    </div>
  )
}
