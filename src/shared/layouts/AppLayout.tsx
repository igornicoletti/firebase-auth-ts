import { AppSidebar, SiteHeader } from '@/features/dashboard/components'
import type { AppLoaderData } from '@/features/dashboard/types'
import { SidebarInset, SidebarProvider } from '@/shadcn/ui/sidebar'
import { Outlet, useLoaderData } from 'react-router-dom'

const AppLayout = () => {
  const { user, navMain } = useLoaderData() as AppLoaderData
  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar" user={user} navMain={navMain} />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
export default AppLayout
