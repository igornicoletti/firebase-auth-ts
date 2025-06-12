import { AUTH_PAGE_MESSAGES, type AuthDataCode, type AuthPageData } from '@/features/auth/constants'
import type { LoaderFunctionArgs } from 'react-router-dom'

export const authLoader = ({ request }: LoaderFunctionArgs): AuthPageData => {
  const url = new URL(request.url)
  const pathname = url.pathname.replace(/^\/+/, '').trim()

  if (!isAuthDataKey(pathname)) {
    throw new Response('Page Not Found', { status: 404 })
  }

  return AUTH_PAGE_MESSAGES[pathname]
}

const isAuthDataKey = (key: string): key is AuthDataCode => {
  return key in AUTH_PAGE_MESSAGES
}
