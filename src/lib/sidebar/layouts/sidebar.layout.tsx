// src/lib/sidebar/layouts/sidebar.layout.tsx

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { ModeToggle } from '@/lib/app/components'
import { AuthSuccessCodes } from '@/lib/auth/constants'
import { useAuthToast } from '@/lib/auth/hooks'
import { signOutUser } from '@/lib/auth/services'

import { SidebarBreadcrumb } from '@/lib/sidebar/components'
import { Command, SignOut } from '@phosphor-icons/react'
import { Link, Outlet } from 'react-router-dom'

export const SidebarLayout = () => {
  const { toastError, toastSuccess } = useAuthToast()

  const handleSignOutUser = async () => {
    try {
      await signOutUser()
      toastSuccess(AuthSuccessCodes.SIGNOUT_SUCCESS)
    } catch (error) {
      toastError(error)
    }
  }

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible='icon'>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-6" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
        </SidebarContent>
        <SidebarFooter>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-6' />
            <SidebarBreadcrumb />
          </div>
          <div className='flex items-center gap-2'>
            <ModeToggle />
            <Button size='icon' type='button' variant='ghost' onClick={handleSignOutUser}>
              <SignOut />
            </Button>
          </div>
        </header>
        <div className='flex flex-1 flex-col p-4 pt-0'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
