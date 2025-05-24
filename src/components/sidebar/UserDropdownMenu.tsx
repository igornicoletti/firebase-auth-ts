import { AvatarProfile } from '@/components/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { sidebarAvatarConfig } from '@/features/sidebar'
import type { Icon } from '@phosphor-icons/react'
import {
  ChevronsUpDown
} from 'lucide-react'

type Props = {
  user: {
    label: string
    items: {
      label: string
      icon: Icon
      href?: string
      onClick?: () => void
    }[]
  }[]
}

export const UserDropdownMenu = ({ user }: Props) => {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
              <AvatarProfile profile={sidebarAvatarConfig} />
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            sideOffset={4}
            side={isMobile ? 'bottom' : 'right'}
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'>
            <DropdownMenuLabel className='p-0 font-normal'>
              <AvatarProfile profile={sidebarAvatarConfig} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.map((group, index) => (
              <DropdownMenuGroup key={index}>
                {group.items.map((item, idx) => (
                  <DropdownMenuItem
                    key={idx}
                    onClick={item.onClick}
                    asChild={!!item.href}>
                    {item.href ? (
                      <a href={item.href} className='flex items-center gap-2'>
                        <item.icon className='size-4' />
                        {item.label}
                      </a>
                    ) : (
                      <>
                        <item.icon className='size-4' />
                        {item.label}
                      </>
                    )}
                  </DropdownMenuItem>
                ))}
                {index < user.length - 1 && <DropdownMenuSeparator />}
              </DropdownMenuGroup>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
