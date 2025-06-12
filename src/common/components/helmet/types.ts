// src/common/components/helmet/types.ts

export type SeoMeta = {
  title: string
  description: string
}

export type SeoPageKey =
  | 'home'
  | 'dashboard'
  | 'profile'
  | 'login'
  | 'register'
  | 'forgotPassword'
  | 'resetPassword'
  | 'verifyEmail'
  | 'notFound'

export interface HelmetWrapperProps {
  pageKey?: SeoPageKey
  customMeta?: SeoMeta
}
