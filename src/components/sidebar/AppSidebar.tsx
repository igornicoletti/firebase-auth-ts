import { NavCollapsibleMenu, TeamSwitcher, UserDropdownMenu } from '@/components/sidebar'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { sidebarNavigationConfig, sidebarUserMenuConfig } from '@/features/sidebar'
import { GalleryVerticalEnd } from 'lucide-react'

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavCollapsibleMenu groups={sidebarNavigationConfig} />
      </SidebarContent>
      <SidebarFooter>
        <UserDropdownMenu user={sidebarUserMenuConfig} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

const data = {
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
  ],
}
