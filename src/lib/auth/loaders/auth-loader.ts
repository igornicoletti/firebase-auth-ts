// src/lib/auth/loaders/auth-loader.ts

import type { LoaderFunctionArgs } from 'react-router-dom'

import { authDataMap } from '@/lib/auth/config'

export const authLoader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)

  const pathname = url.pathname.replace(/^\/+/, '').trim()

  const data = authDataMap[pathname as keyof typeof authDataMap]

  if (!data) {
    throw new Response('Page Not Found', {
      status: 404
    })
  }

  return data
}
