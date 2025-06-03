// src/lib/auth/loaders/auth-loader.ts

import type { LoaderFunctionArgs } from 'react-router-dom'

import { authDataMap, type AuthData } from '@/lib/auth/config'
import type { AuthDataCode } from '@/lib/auth/constants'

export const authLoader = ({ request }: LoaderFunctionArgs): AuthData => {
  const url = new URL(request.url)
  const pathname = url.pathname.replace(/^\/+/, '').trim()

  if (!isAuthDataKey(pathname)) {
    throw new Response('Page Not Found', { status: 404 })
  }

  return authDataMap[pathname]
}

const isAuthDataKey = (key: string): key is AuthDataCode => {
  return key in authDataMap
}
