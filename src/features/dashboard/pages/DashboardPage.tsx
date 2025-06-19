// src/features/dashboard/pages/DashboardPage.tsx

import { useLoaderData } from 'react-router-dom'

import { SignOut } from '@phosphor-icons/react'

import { Button, ButtonHighlight } from '@/shadcn/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/shadcn/ui/card'

import type { DashboardLoaderData } from '@/features/dashboard/loaders/dashboardLoaders'

import { ThemeSwitcher } from '@/shared/components'
import { AuthSuccessCodes } from '@/shared/constants'
import { useToast } from '@/shared/hooks'
import { authService } from '@/shared/services'

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
      <div className="flex gap-4 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Sessões Ativas</CardTitle>
            <CardDescription>{dashboardData.activeSessions}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total de Usuários</CardTitle>
            <CardDescription>{dashboardData.totalUsers}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total de Usuários</CardTitle>
            <CardDescription>{dashboardData.totalUsers}</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="flex gap-4">
        <ThemeSwitcher />
        <Button variant='secondary' onClick={handleLogout}>
          <SignOut />
          Sign out
          <ButtonHighlight />
        </Button>
      </div>
    </div>
  )
}
