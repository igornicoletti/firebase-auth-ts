// src/sidebar/components/sidebar-breadcrumb.tsx

import React from 'react'
import { Link, useMatches } from 'react-router-dom'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type MatchHandle = {
  crumb?: string | ((data: any) => string)
  [key: string]: any
}

type Match = {
  id: string
  pathname: string
  params: Record<string, string | undefined>
  data: unknown
  handle?: MatchHandle
}

export const SidebarBreadcrumb = () => {
  const matches = useMatches() as Match[]

  const crumbs = matches
    .filter((match) => match.handle && match.handle.crumb)
    .map((match) => {
      const crumbValue = match.handle!.crumb
      const name = typeof crumbValue === 'function'
        ? crumbValue(match.params)
        : crumbValue

      return {
        path: match.pathname,
        name: name,
        isCurrent: match.pathname === window.location.pathname,
      }
    })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            <BreadcrumbItem>
              {crumb.isCurrent ? (
                <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={crumb.path}>{crumb.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < crumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
