// src/shared/layouts/index.ts

import { lazy } from 'react'

export * from './AppLayout'
export * from './AuthLayout'
export const LazyRootLayout =
  lazy(() => import('./RootLayout')
    .then((m) => ({ default: m.RootLayout })))
