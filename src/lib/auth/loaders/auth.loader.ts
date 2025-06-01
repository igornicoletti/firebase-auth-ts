// src/lib/auth/loaders/auth-loader.ts

import type { LoaderFunctionArgs } from 'react-router-dom'

import { authDataMap, type AuthData } from '@/lib/auth/config'
import type { AuthDataCode } from '@/lib/auth/constants'

/**
 * Loader function for authentication routes. It determines the appropriate `AuthData`
 * based on the current URL pathname.
 * @param {LoaderFunctionArgs} { request } - Arguments passed to the loader function, including the request.
 * @returns {AuthData} The configuration data for the current authentication page.
 * @throws {Response} If the pathname does not correspond to a valid `AuthDataCode`, it throws a 404 response.
 */
export const authLoader = ({ request }: LoaderFunctionArgs): AuthData => {
  const url = new URL(request.url)
  const pathname = url.pathname.replace(/^\/+/, '').trim()

  if (!isAuthDataKey(pathname)) {
    throw new Response('Page Not Found', { status: 404 })
  }

  return authDataMap[pathname]
}

/**
 * Type predicate to check if a given string is a valid key in the `authDataMap`.
 * @param {string} key - The string to check.
 * @returns {key is AuthDataCode} True if the key is a valid `AuthDataCode`, false otherwise.
 */
const isAuthDataKey = (key: string): key is AuthDataCode => {
  return key in authDataMap
}
