// src/loaders/authLoader.ts

import type { LoaderFunctionArgs } from 'react-router-dom'

import { AUTH_DATA_MAP, } from '@/constants/auth'

export interface AuthPageData {
  subtitle: string
  ask: string
  title: string
  linkTo: string
  source: string
}

export interface AuthDataMap {
  login: AuthPageData
  register: AuthPageData
  'forgot-password': AuthPageData
  'reset-password': AuthPageData
}

export type AuthDataCode = keyof AuthDataMap

export type AuthLoaderData = AuthPageData

const isAuthDataCode = (codeKey: string): codeKey is AuthDataCode => {
  return codeKey in AUTH_DATA_MAP
}

export const authLoader = ({ request }: LoaderFunctionArgs): AuthLoaderData => {
  const { pathname } = new URL(request.url)
  const code = pathname.replace(/^\/+/, '').trim()

  if (!isAuthDataCode(code)) {
    throw new Response('Page Not Found', { status: 404 })
  }

  return AUTH_DATA_MAP[code]
}
