import type { ActionCodeSettings } from 'firebase/auth'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const ACTION_CODE_SETTINGS: ActionCodeSettings = {
  url: `${BASE_URL}/callback`,
  handleCodeInApp: true,
}
