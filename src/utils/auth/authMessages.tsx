import { toast } from 'sonner'

type AuthMessageProps = {
  code: string
  title: string
  description: string
}

const authMessages: AuthMessageProps[] = [
  { code: 'auth/wrong-password', title: 'Invalid password', description: 'The password you entered is incorrect. Please try again.' },
  { code: 'auth/user-not-found', title: 'User not found', description: 'No account found with this email address.' },
  { code: 'auth/email-already-in-use', title: 'Email already in use', description: 'This email is already registered. Try logging in instead.' },
  { code: 'auth/invalid-email', title: 'Invalid email', description: 'Please enter a valid email address.' },
  { code: 'auth/network-request-failed', title: 'Network error', description: 'Check your internet connection and try again.' },
  { code: 'auth/weak-password', title: 'Weak password', description: 'Your password is too weak. Use at least 6 characters.' },
  { code: 'auth/too-many-requests', title: 'Too many attempts', description: 'We have blocked all requests from this device due to unusual activity. Try again later.' },
  { code: 'auth/invalid-action-code', title: 'Invalid or expired link', description: 'The reset password link is invalid or has expired. Please request a new one.' },
  { code: 'auth/missing-oob-code', title: 'Missing code', description: 'The reset link is incomplete or missing. Please try again.' },
  { code: 'auth/login-success', title: 'Welcome back!', description: 'You have successfully signed in.' },
  { code: 'auth/logout-success', title: 'Logged out', description: 'You have been logged out successfully.' },
  { code: 'auth/password-reset-sent', title: 'Reset email sent', description: 'Check your email for a link to reset your password.' },
  { code: 'auth/reset-password-success', title: 'Password updated', description: 'Your password has been reset successfully. You can now log in.' },
  { code: 'auth/register-success', title: 'Account created!', description: 'You have successfully registered. You can now log in.' },
]

const getMessageByCode = (code: string): AuthMessageProps => {
  return (
    authMessages.find((msg) => msg.code === code) || {
      code: 'unknown',
      title: 'Unexpected error',
      description: 'An unexpected error occurred. Please try again.',
    }
  )
}

export const authToast = (code: string, status: string) => {
  const { title, description } = getMessageByCode(code)
  toast(
    <span className={status === 'success' ? 'text-primary' : 'text-destructive'}>{title}</span>,
    { description: <span className='text-muted-foreground'>{description}</span> }
  )
}
