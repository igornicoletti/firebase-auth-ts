// src/shared/loaders/authLoader.ts

import type { LoaderFunctionArgs } from 'react-router-dom'

import { AUTH_DATA_MAP } from '@/shared/constants'

const isAuthDataCode = (codeKey: string) => {
  return codeKey in AUTH_DATA_MAP
}

export const authLoader = ({ request }: LoaderFunctionArgs) => {
  const { pathname } = new URL(request.url)
  const code = pathname.replace(/^\/+/, '').trim()

  if (!isAuthDataCode(code)) {
    throw new Response('Page Not Found', { status: 404 })
  }

  return AUTH_DATA_MAP[code]
}

export type AuthLoaderData = Awaited<ReturnType<typeof authLoader>>
