// src/common/types/index.ts

export type { User } from 'firebase/auth'

export type LoadingState = {
  loading: boolean
}

export type AsyncAction = () => Promise<void> | void
