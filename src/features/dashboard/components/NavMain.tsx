import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
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
} from '@/components/ui/sidebar'
import type { BasicNavItem, TopLevelNavItem } from '@/features/dashboard/types'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface NavMainProps {
  items: TopLevelNavItem[]
}

export const NavMain = ({ items }: NavMainProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
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
