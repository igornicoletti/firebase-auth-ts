// src/lib/app/layouts/app.layout.tsx

import { Outlet } from 'react-router-dom'

import { Button } from '@/shadcn/ui/button'
import { Separator } from '@/shadcn/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/shadcn/ui/sidebar'

import { SignOut } from '@phosphor-icons/react'

import { BreadCrumb, ThemeToggle } from '@/app/components'
import { AuthSuccessCodes } from '@/auth/constants'
import { useAuthToast } from '@/auth/hooks'
import { signOutUser } from '@/auth/services'
import { SidebarLayout } from '@/sidebar/layouts'

export const AppLayout = () => {
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
      <SidebarLayout collapsible='icon' />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-6' />
            <BreadCrumb />
          </div>
          <div className='flex items-center gap-2'>
            <ThemeToggle />
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
