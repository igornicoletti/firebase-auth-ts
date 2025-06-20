import type { BasicNavItem, IconName, TopLevelNavItem } from '@/features/dashboard/types'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shadcn/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shadcn/ui/sidebar'
import { ChevronRight, type LucideIcon, Settings2, SquareTerminal } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface NavMainProps {
  items: TopLevelNavItem[]
}

const ICONS: Record<IconName, LucideIcon> = {
  SquareTerminal,
  Settings2,
}

export const NavMain = ({ items }: NavMainProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = ICONS[item.icon]
          const hasSubItems = item.items && item.items.length > 0
          return (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  aria-current={item.isActive ? 'page' : undefined}
                >
                  <Link to={item.url}>
                    {Icon && <Icon className="mr-2 size-4" aria-hidden="true" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {hasSubItems && (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction
                        className="data-[state=open]:rotate-90"
                        aria-expanded={item.isActive ? true : false}
                        aria-controls={`collapsible-content-${item.title.replace(/\s/g, '-')}`}
                      >
                        <ChevronRight aria-hidden="true" />
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent id={`collapsible-content-${item.title.replace(/\s/g, '-')}`}>
                      <SidebarMenuSub>
                        {item.items!.map((subItem: BasicNavItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link to={subItem.url}>{subItem.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                )}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
