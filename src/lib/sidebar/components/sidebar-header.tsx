// src/sidebar/components/sidebar-header.tsx

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import { ModeToggle } from '@/lib/app/components'
import { AuthSuccessCodes } from '@/lib/auth/constants'
import { useAuthToast } from '@/lib/auth/hooks'
import { signOutUser } from '@/lib/auth/services'

import { SidebarBreadcrumb } from '@/lib/sidebar/components'
import { SignOut } from '@phosphor-icons/react'

export const SidebarHeader = () => {
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
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="w-full flex items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <SidebarBreadcrumb />
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button size='icon' type='button' variant='ghost' onClick={handleSignOutUser}>
            <SignOut />
          </Button>
        </div>
      </div>
    </header>
  )
}
