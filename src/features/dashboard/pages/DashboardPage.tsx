// src/features/dashboard/pages/DashboardPage.tsx

import { SignOut } from '@phosphor-icons/react'

import { Button, ButtonHighlight } from '@/shadcn/ui/button'

import { ThemeSwitcher } from '@/shared/components'
import { AuthSuccessCodes } from '@/shared/constants'
import { useToast } from '@/shared/hooks'
import { authService } from '@/shared/services'

export const DashboardPage = () => {
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
    <div className='flex flex-1 flex-col gap-4'>
      <div className='flex gap-4'>
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
