// src/shared/components/BreadcrumbMatch.tsx

import React from 'react'
import { Link, useLocation, useMatches } from 'react-router-dom'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/shadcn/ui/breadcrumb'

type Match = {
  id: string
  pathname: string
  params: Record<string, string | undefined>
  data: unknown
  handle?: {
    crumb?: string | ((params: Record<string, string | undefined>) => string)
  }
}

export const BreadcrumbMatch = () => {
  const matches = useMatches() as Match[]
  const { pathname } = useLocation()

  const crumbs = matches
    .filter((match) => match.handle?.crumb)
    .map((match) => {
      const crumb = match.handle!.crumb
      const name = typeof crumb === 'function' ? crumb(match.params) : crumb
      const isCurrent = match.pathname === pathname

      return { path: match.pathname, name, isCurrent }
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
