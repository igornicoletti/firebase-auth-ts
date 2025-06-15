// src/features/dashboard/pages/DashboardPage.tsx

import { useLoaderData } from 'react-router-dom'

import { SignOut } from '@phosphor-icons/react'

import { authService, useAuth } from '@/features/auth'
import type { DashboardLoaderData } from '@/features/dashboard/loaders/dashboardLoaders'
import { Button, ButtonHighlight } from '@/shadcn/ui/button'
import { AuthSuccessCodes } from '@/shared/constants'
import { useToast } from '@/shared/hooks'

export const DashboardPage = () => {
  const { user } = useAuth()
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
    <div className='min-h-screen grid place-items-start p-6'>
      <div className='grid gap-6'>
        <div className='grid gap-2'>
          <h2 className='font-bold text-xl'>Dashboard</h2>
          <p className='text-sm text-muted-foreground'>
            Bem-vindo(a) {user?.displayName}! Aqui está um resumo da sua atividade.</p>
        </div>

        <div className="flex gap-16">
          <div className="">
            <h2 className="text-xl font-semibold">Total de Usuários</h2>
            <p className="text-4xl font-bold text-primary">{dashboardData.totalUsers}</p>
          </div>
          <div className="">
            <h2 className="text-xl font-semibold">Sessões Ativas</h2>
            <p className="text-4xl font-bold text-primary">{dashboardData.activeSessions}</p>
          </div>
        </div>
        <Button variant='secondary' onClick={handleLogout}>
          <SignOut />
          Sign out
          <ButtonHighlight />
        </Button>
      </div>
    </div>
  )
}
