// src/features/auth/loaders/authLoader.ts

import type { LoaderFunctionArgs } from 'react-router-dom'

import {
  AUTH_DATA_MAP,
  type AuthDataCodes,
  type AuthDataValues
} from '@/features/auth/constants'

export const authLoader = ({ request }: LoaderFunctionArgs): AuthDataValues => {
  const url = new URL(request.url)
  const pathname = url.pathname.replace(/^\/+/, '').trim()

  if (!isAuthDataKey(pathname)) {
    throw new Response('Page Not Found', { status: 404 })
  }

  return AUTH_DATA_MAP[pathname]
}

const isAuthDataKey = (key: string): key is AuthDataCodes => {
  return key in AUTH_DATA_MAP
}
