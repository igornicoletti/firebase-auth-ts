// src/features/dashboard/pages/DashboardPage.tsx

import { HelmetWrapper, useToast } from '@/common'
import { authService } from '@/features/auth'
import { AuthSuccessCodes } from '@/features/auth/constants'
import type { DashboardLoaderData } from '@/features/dashboard/loaders/dashboardLoaders'
import { Button } from '@/shadcn/ui/button'
import { useLoaderData } from 'react-router-dom'

export const DashboardPage = () => {
  const { dashboardData, seo } = useLoaderData() as DashboardLoaderData
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
    <>
      {/* Usa o componente HelmetWrapper para definir o título e descrição da página */}
      <HelmetWrapper customMeta={seo} />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Seu Dashboard</h1>
        <p className="text-lg text-muted-foreground mb-4">Bem-vindo(a) de volta! Aqui está um resumo da sua atividade.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Total de Usuários</h2>
            <p className="text-4xl font-bold text-primary">{dashboardData.totalUsers}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Sessões Ativas</h2>
            <p className="text-4xl font-bold text-primary">{dashboardData.activeSessions}</p>
          </div>
          <Button onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      </div>
    </>
  )
}
