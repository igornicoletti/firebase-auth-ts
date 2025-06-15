// src/features/dashboard/loaders/dashboardLoaders.ts


// Exemplo de um loader para a página do Dashboard
export const dashboardLoader = () => {
  // Simulação de carregamento de dados específicos do dashboard
  /* await new Promise(resolve => setTimeout(resolve, 300))  */

  // Aqui você pode buscar dados do usuário, contagens, etc.
  const dashboardData = {
    totalUsers: 1234,
    activeSessions: 56,
  }

  // Retorna os metadados de SEO junto com os dados da página
  return {
    dashboardData,
    // Ou, se precisar de algo dinâmico:
    // seo: {
    //   title: `Dashboard de ${user.name}`,
    //   description: `Veja os dados de ${user.name} em tempo real.`
    // }
  }
}

export type DashboardLoaderData = Awaited<ReturnType<typeof dashboardLoader>>
