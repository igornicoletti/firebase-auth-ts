// src/configs/lazy.ts

import { lazy } from 'react'

export const LazyRootLayout =
  lazy(() => import('@/layouts/RootLayout')
    .then((m) => ({ default: m.RootLayout })))
