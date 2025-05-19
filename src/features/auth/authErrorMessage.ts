export const authErrorMessage = {
  'auth/invalid-email': {
    title: 'Invalid Email',
    message: 'Please provide a valid email address.',
  },
  'auth/wrong-password': {
    title: 'Wrong Password',
    message: 'The password you entered is incorrect. Please try again.',
  },
  'auth/user-not-found': {
    title: 'User Not Found',
    message: 'There’s no account associated with this email.',
  },
  'auth/email-already-in-use': {
    title: 'Email In Use',
    message: 'This email is already linked to another account.',
  },
  'auth/weak-password': {
    title: 'Weak Password',
    message: 'Your password must be stronger. Try adding numbers or symbols.',
  },
  'auth/too-many-requests': {
    title: 'Too Many Attempts',
    message: 'You’ve tried too many times. Please wait and try again later.',
  },
  'auth/network-request-failed': {
    title: 'Network Error',
    message: 'Unable to connect. Please check your internet connection.',
  },
  'auth/popup-closed-by-user': {
    title: 'Popup Closed',
    message: 'The sign-in popup was closed before completing the process.',
  },
  'auth/cancelled-popup-request': {
    title: 'Popup Cancelled',
    message: 'You already have a sign-in popup open. Close it and try again.',
  },
  'auth/internal-error': {
    title: 'Internal Error',
    message: 'Something went wrong on our side. Please try again soon.',
  },
  'auth/invalid-credential': {
    title: 'Invalid Credentials',
    message: 'The credentials provided are not valid. Double-check and try again.',
  },
  'auth/operation-not-allowed': {
    title: 'Operation Blocked',
    message: 'This operation has been disabled. Contact support if needed.',
  },
  'auth/user-disabled': {
    title: 'User Disabled',
    message: 'This account has been disabled and can’t be accessed.',
  },
} as const
