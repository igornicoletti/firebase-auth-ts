import { NavMain, UserMenu } from '@/features/dashboard/components'
import type { TopLevelNavItem, UserProfile } from '@/features/dashboard/types'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shadcn/ui/sidebar'
import { GalleryVerticalEnd } from 'lucide-react'
import { Link } from 'react-router-dom'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: UserProfile
  navMain: TopLevelNavItem[]
}

export const AppSidebar = ({ user, navMain, ...props }: AppSidebarProps) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" aria-label="Go to Dashboard home">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Dashboard</span>
                  <span className="text-xs text-muted-foreground">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu {...user} />
      </SidebarFooter>
    </Sidebar>
  )
}
