import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shadcn/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/shadcn/ui/sidebar'
import { authService } from '@/shared/services'
import React from 'react'

type UserMenuItem = {
  Icon: React.ElementType
  label: string
  onClick: () => void
}

type UserProfile = {
  name: string
  email: string
  avatar?: string
}

const UserProfileText = ({ name, email }: Pick<UserProfile, 'name' | 'email'>) => (
  <div className='grid flex-1 text-left text-sm leading-tight'>
    <span className='truncate font-medium'>{name}</span>
    <span className='truncate text-xs text-muted-foreground'>{email}</span>
  </div>
)

const UserProfileDisplay = ({ name, email, avatar }: UserProfile) => (
  <div className='flex w-full items-center gap-2'>
    <Avatar className='h-8 w-8 rounded-lg'>
      <AvatarImage src={avatar} alt={`Avatar of ${name}`} />
      <AvatarFallback className='rounded-lg'>
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
    <UserProfileText name={name} email={email} />
  </div>
)

const userMenuItems: UserMenuItem[] = [
  { Icon: Sparkles, label: 'Upgrade to Pro', onClick: () => console.log('Upgrade to Pro clicked') },
  { Icon: BadgeCheck, label: 'Account', onClick: () => console.log('Account clicked') },
  { Icon: CreditCard, label: 'Billing', onClick: () => console.log('Billing clicked') },
  { Icon: Bell, label: 'Notifications', onClick: () => console.log('Notifications clicked') },
]

export const UserMenu = ({ name, email, avatar }: UserProfile) => {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              aria-label={`Open user menu for ${name}`}>
              <UserProfileDisplay name={name} email={email} avatar={avatar} />
              <ChevronsUpDown className='ml-auto size-4 text-muted-foreground' aria-hidden='true' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            sideOffset={4}
            side={isMobile ? 'bottom' : 'right'}
            className='w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg'>
            <DropdownMenuLabel className='p-2'>
              <UserProfileText name={name} email={email} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {userMenuItems.map(({ Icon, label, onClick }, index) => (
                <React.Fragment key={label}>
                  <DropdownMenuItem onClick={onClick} className='cursor-pointer'>
                    <Icon className='mr-2 size-4' aria-hidden='true' />
                    {label}
                  </DropdownMenuItem>
                  {index === 0 && <DropdownMenuSeparator />}
                </React.Fragment>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => authService.signOut()}
              className='cursor-pointer text-destructive'
              aria-label='Log out'>
              <LogOut className='mr-2 size-4' aria-hidden='true' />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
