// src/routers/constants/publicRoutes.ts

import { ForgotPassword, Login, Register, ResetPassword } from '@/features/auth'

import { AuthDataCodes } from '@/shared/constants'
import { authLoader } from '@/shared/loaders'

export const publicRoutes = [
  {
    id: AuthDataCodes.LOGIN,
    path: `/${AuthDataCodes.LOGIN}`,
    element: <Login />,
    loader: authLoader
  },
  {
    id: AuthDataCodes.REGISTER,
    path: `/${AuthDataCodes.REGISTER}`,
    element: <Register />,
    loader: authLoader
  },
  {
    id: AuthDataCodes.FORGOT_PASSWORD,
    path: `/${AuthDataCodes.FORGOT_PASSWORD}`,
    element: <ForgotPassword />,
    loader: authLoader
  },
  {
    id: AuthDataCodes.RESET_PASSWORD,
    path: `/${AuthDataCodes.RESET_PASSWORD}`,
    element: <ResetPassword />,
    loader: authLoader
  }
]
