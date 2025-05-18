export const authConfig = {
  login: {
    hero: {
      title: 'Sign in to your account',
      description: 'Welcome back! Please sign in to continue',
    },
    anchor: {
      ask: 'Don’t have an account?',
      source: 'Register',
      pathname: '/register',
    },
  },
  register: {
    hero: {
      title: 'Create your account',
      description: 'Please fill in the details to get started',
    },
    anchor: {
      ask: 'Already have an account?',
      source: 'Login',
      pathname: '/login',
    },
  },
  forgotPassword: {
    hero: {
      title: 'Forgotten password',
      description: 'Enter your email to receive reset instructions',
    },
    anchor: {
      ask: 'Remember your password?',
      source: 'Login',
      pathname: '/login',
    },
  },
  resetPassword: {
    hero: {
      title: 'Reset password',
      description: 'Set a new password for your account',
    },
    anchor: {
      ask: 'Back to login?',
      source: 'Login',
      pathname: '/login',
    },
  },
}
