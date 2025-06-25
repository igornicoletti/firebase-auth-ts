import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { NavMain, UserMenu } from '@/features/dashboard/components'
import type { AppLoaderData } from '@/features/dashboard/types'
import { FireIcon } from '@phosphor-icons/react'
import { Link, useLoaderData } from 'react-router-dom'

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { mockData } = useLoaderData() as AppLoaderData

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link to='#' aria-label='Go to Dashboard home'>
                <div className='bg-sidebar-primary text-sidebar-primary-foreground aspect-square size-8 rounded-lg'>
                  <FireIcon weight='fill' className='size-8 p-1' />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className='font-medium'>Dashboard</span>
                  <span className='text-xs text-muted-foreground'>v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={mockData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu user={mockData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
