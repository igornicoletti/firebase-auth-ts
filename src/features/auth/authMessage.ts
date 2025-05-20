export const authMessage = {
  'auth/invalid-email': {
    title: 'Invalid Email',
    message: 'Please provide a valid email address.',
  },
  'auth/wrong-password': {
    title: 'Wrong Password',
    message: 'The password you entered is incorrect.',
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
    message: 'Your password must be stronger.',
  },
  'auth/too-many-requests': {
    title: 'Too Many Attempts',
    message: 'You’ve tried too many times.',
  },
  'auth/network-request-failed': {
    title: 'Network Error',
    message: 'Unable to connect. Check your internet connection.',
  },
  'auth/popup-closed-by-user': {
    title: 'Popup Closed',
    message: 'The sign-in popup was closed before completing the process.',
  },
  'auth/cancelled-popup-request': {
    title: 'Popup Cancelled',
    message: 'You already have a sign-in popup open.',
  },
  'auth/internal-error': {
    title: 'Internal Error',
    message: 'Something went wrong on our side.',
  },
  'auth/invalid-credential': {
    title: 'Invalid Credentials',
    message: 'The credentials provided are not valid.',
  },
  'auth/operation-not-allowed': {
    title: 'Operation Blocked',
    message: 'This operation has been disabled.',
  },
  'auth/user-disabled': {
    title: 'User Disabled',
    message: 'This account has been disabled and can’t be accessed.',
  },
  'auth/expired-action-code': {
    title: 'Expired Link',
    message: 'This link has expired. Please request a new password reset.',
  },
  'auth/invalid-action-code': {
    title: 'Invalid Link',
    message: 'The link is invalid or has already been used.',
  },
  'auth/password-reset-success': {
    title: 'Password Updated',
    message: 'Your password has been successfully changed. You can now log in.',
  },
} as const
