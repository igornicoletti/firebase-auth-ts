export type MessageType = 'error' | 'success'

export type Message = {
  title: string
  message: string
}

const errorMessages = {
  'auth/email-already-in-use': {
    title: 'Email Already In Use',
    message: 'This email address is already in use.',
  },
  'auth/invalid-email': {
    title: 'Invalid Email',
    message: 'The email address is not valid.',
  },
  'auth/user-not-found': {
    title: 'User Not Found',
    message: 'No user found with this email.',
  },
  'auth/wrong-password': {
    title: 'Wrong Password',
    message: 'Incorrect password. Please try again.',
  },
  'auth/weak-password': {
    title: 'Weak Password',
    message: 'The password is too weak.',
  },
  'auth/too-many-requests': {
    title: 'Too Many Requests',
    message: 'Too many unsuccessful login attempts. Please try again later.',
  },
  'auth/user-disabled': {
    title: 'User Disabled',
    message: 'This user account has been disabled.',
  },
  'auth/expired-action-code': {
    title: 'Expired Code',
    message: 'The action code has expired.',
  },
  'auth/invalid-action-code': {
    title: 'Invalid Code',
    message: 'The action code is invalid.',
  },
  'auth/operation-not-allowed': {
    title: 'Operation Not Allowed',
    message: 'This operation is not allowed.',
  },
  'auth/invalid-credential': {
    title: 'Invalid Credential',
    message: 'The credential used is invalid. Please try again.',
  },
  'auth/email-not-verified': {
    title: 'Email Not Verified',
    message: 'Your email address is not verified. Please verify before logging in.',
  },
} as const

const successMessages = {
  'auth/email-verified': {
    title: 'Email Verified',
    message: 'Your email has been successfully verified.',
  },
  'auth/password-reset-success': {
    title: 'Password Reset',
    message: 'Your password has been reset successfully.',
  },
  'auth/login-success': {
    title: 'Login Successful',
    message: 'You have logged in successfully.',
  },
  'auth/register-success': {
    title: 'Registration Successful',
    message: 'Your account has been created successfully.',
  },
} as const

type ErrorCode = keyof typeof errorMessages
type SuccessCode = keyof typeof successMessages

const isErrorCode = (code: string): code is ErrorCode => code in errorMessages
const isSuccessCode = (code: string): code is SuccessCode => code in successMessages

export const getMessage = (code: string, type: MessageType): Message => {
  if (type === 'error') {
    return isErrorCode(code)
      ? errorMessages[code]
      : {
        title: 'Authentication Error',
        message: 'An unknown authentication error occurred.',
      }
  }

  if (type === 'success') {
    return isSuccessCode(code)
      ? successMessages[code]
      : {
        title: 'Success',
        message: 'Operation completed successfully.',
      }
  }

  return {
    title: 'Info',
    message: 'Status unknown.',
  }
}
