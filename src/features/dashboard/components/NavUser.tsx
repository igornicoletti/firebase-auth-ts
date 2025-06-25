
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { authService } from '@/services'
import { BellIcon, CaretUpDownIcon, GearIcon, SignOutIcon, UserCircleIcon, type Icon } from '@phosphor-icons/react'

type MenuItem = {
  icon: Icon
  label: string
}

type UserValues = {
  name: string
  email: string
  avatar?: string
}

type User = {
  user: UserValues
}

const items: MenuItem[] = [
  { icon: UserCircleIcon, label: 'Account' },
  { icon: GearIcon, label: 'Settings' },
  { icon: BellIcon, label: 'Notifications' }
]

const UserProfile = ({ name, email, avatar }: UserValues) => (
  <div className='flex w-full items-center gap-2'>
    <Avatar className='size-8 rounded-lg'>
      <AvatarImage src={avatar} alt={`Avatar of ${name}`} />
      <AvatarFallback className='rounded-lg'>
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
    <div className='flex flex-col gap-0.5 leading-none'>
      <span className='truncate font-medium'>{name}</span>
      <span className='truncate text-xs text-muted-foreground'>{email}</span>
    </div>
  </div>
)

export const UserMenu = ({ user }: User) => {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
              <UserProfile {...user} />
              <CaretUpDownIcon className='ml-auto' weight='light' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            side={isMobile ? 'bottom' : 'right'}
            className='w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg'>
            <DropdownMenuLabel>
              <UserProfile {...user} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {items.map(({ icon: Icon, label }) => (
                <DropdownMenuItem key={label} className='cursor-pointer flex gap-2'>
                  <Icon weight='light' />
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => authService.signOut()}
              className='cursor-pointer flex gap-2'>
              <SignOutIcon weight='light' />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
