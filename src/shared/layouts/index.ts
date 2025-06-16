// src/shared/layouts/index.ts

import { lazy } from 'react'

export * from './RootLayout'
export const LazyAppLayout = lazy(() => import('./AppLayout'))
export const LazyAuthLayout = lazy(() => import('./AuthLayout'))
