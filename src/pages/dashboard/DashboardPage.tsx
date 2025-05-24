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
import { useToast } from '@/hooks/auth'
import { useNavigate } from 'react-router-dom'

export const DashboardPage = () => {
  const navigate = useNavigate()
  const { toastSuccess } = useToast()
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    toastSuccess('auth/logout-success')
    navigate('/login', { replace: true })
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
            <p className='text-lg font-semibold'>Welcome, {currentUser?.displayName || currentUser?.email}!</p>
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
