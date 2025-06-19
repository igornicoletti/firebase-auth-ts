// src/routers/constants/publicRoutes.ts

import {
  ForgotPasswordForm,
  LoginForm,
  RegisterForm,
  ResetPasswordForm
} from '@/features/auth/components'

import { AuthDataCodes } from '@/shared/constants'
import { authLoader } from '@/shared/loaders'

export const publicRoutes = [
  {
    id: AuthDataCodes.LOGIN,
    path: `/${AuthDataCodes.LOGIN}`,
    element: <LoginForm />,
    loader: authLoader
  },
  {
    id: AuthDataCodes.REGISTER,
    path: `/${AuthDataCodes.REGISTER}`,
    element: <RegisterForm />,
    loader: authLoader
  },
  {
    id: AuthDataCodes.FORGOT_PASSWORD,
    path: `/${AuthDataCodes.FORGOT_PASSWORD}`,
    element: <ForgotPasswordForm />,
    loader: authLoader
  },
  {
    id: AuthDataCodes.RESET_PASSWORD,
    path: `/${AuthDataCodes.RESET_PASSWORD}`,
    element: <ResetPasswordForm />,
    loader: authLoader
  }
]
