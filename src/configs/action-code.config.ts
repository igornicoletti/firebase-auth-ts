import type { ActionCodeSettings } from 'firebase/auth'

const APP_ORIGIN = import.meta.env.VITE_APP_ORIGIN

export const ACTION_CODE_SETTINGS: ActionCodeSettings = {
  url: `${APP_ORIGIN}/callback`,
  handleCodeInApp: true,
}
