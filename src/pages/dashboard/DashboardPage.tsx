import { AppSidebar } from '@/components/sidebar'
import { ThemeToggle } from '@/components/theme'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button, ButtonHighlight } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@/lib/auth/contexts/auth-context'
import { useAuthToast } from '@/lib/auth/hooks'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'

export const DashboardPage = () => {
  const { user } = useAuth() // Consome o estado do contexto
  const { toastError } = useAuthToast()

  const handleLogout = async () => {
    try {
      await signOut(auth) // Chama a função de logout do Firebase
      // O useAuthState no AuthProvider vai detectar o logout e atualizar o 'user' para null
    } catch (error) {
      toastError(error)
    }
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
          {user && (
            <p className='text-lg font-semibold'>
              Welcome, {user.displayName || user.email}!
            </p>
          )}
          <ThemeToggle />
          <Button
            type='button'
            variant='secondary'
            onClick={handleLogout}
            className='w-full max-w-xs'
            aria-label='Logout and end session'>
            <ButtonHighlight />
            Logout
          </Button>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
