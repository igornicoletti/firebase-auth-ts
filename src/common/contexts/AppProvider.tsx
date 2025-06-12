// src/common/contexts/AppProvider.tsx

import type { ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async'

import {
  DialogProvider,
  ThemeProvider,
  ToastProvider
} from '@/common/components'
import { AuthProvider } from '@/features/auth'

const providers = [HelmetProvider, ThemeProvider, AuthProvider, ToastProvider, DialogProvider]

export const AppProvider = ({ children }: { children: ReactNode }) =>
  providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children)
