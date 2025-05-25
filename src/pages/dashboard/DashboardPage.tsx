import { AppSidebar } from '@/components/sidebar'
import { ThemeToggle } from '@/components/theme'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/auth'

export const DashboardPage = () => {
  const { user, logoutUser, isLoading, clearError } = useAuth() // Use o hook

  const handleLogout = async () => {
    clearError() // Limpa qualquer erro anterior antes de deslogar
    try {
      await logoutUser()
      // Se o logoutUser resolver com sucesso, o onAuthStateChanged no AuthContext
      // vai definir o 'user' para null.
      // O ProtectedRoute ou sua lógica de roteamento irá detectar isso
      // e redirecionar automaticamente para a tela de login.
      console.log("Tentativa de logout realizada.")
    } catch (err: any) {
      console.error("Erro ao fazer logout:", err)
      // O erro (se houver) já foi definido no contexto e será exibido via `error`.
    }
  }

  // Enquanto o estado de autenticação está carregando, talvez mostre um loading
  // Mas o ProtectedRoute já deve cuidar disso antes de chegar aqui.
  if (isLoading) {
    return <div>Carregando dashboard...</div>
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='#'>
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <div className='grid gap-6'>
            <p className='text-lg font-semibold'>Welcome, {user?.displayName || user?.email}!</p>
            <ThemeToggle />
          </div>
          <div className='min-h-[100vh] flex-1 md:min-h-min'>
            <Button
              type='button'
              variant='secondary'
              onClick={handleLogout}
              className='w-full max-w-xs'
              aria-label='Logout and end session'>
              Logout
            </Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
