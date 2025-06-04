// src/lib/auth/components/form/auth-login-form.tsx

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleLogo } from '@phosphor-icons/react'

import { Button, ButtonHighlight } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { AuthInputForm } from '@/lib/auth/components/form'
import { AuthSuccessCodes } from '@/lib/auth/constants'
import { useDialog } from '@/lib/auth/contexts'
import { useAuthToast } from '@/lib/auth/hooks'
import { authLoginSchema } from '@/lib/auth/schemas'
import {
  sendEmailVerificationToCurrentUser,
  signInWithEmail,
  signInWithGoogle,
  signOutUser
} from '@/lib/auth/services'
import { auth } from '@/lib/firebase'

type AuthLogin = z.infer<typeof authLoginSchema>

export const AuthLoginForm = () => {
  const { toastError, toastSuccess } = useAuthToast()
  const { openDialog, closeDialog } = useDialog()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/dashboard'

  const form = useForm<AuthLogin>({
    resolver: zodResolver(authLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSendEmailVerification = async () => {
    try {
      await sendEmailVerificationToCurrentUser()
      toastSuccess(AuthSuccessCodes.EMAIL_RESEND_SUCCESS)
      closeDialog()
    } catch (error) {
      toastError(error)
    }
  }

  const handleSignOutUser = async () => {
    try {
      await signOutUser()
      closeDialog()
    } catch (error) {
      toastError(error)
    }
  }

  const handoSignInWithEmail = async (data: AuthLogin) => {
    setIsLoading(true)

    try {
      await signInWithEmail(data.email, data.password)
      if (!auth.currentUser?.emailVerified) {
        openDialog({
          title: 'Hold up! Verify your email',
          description: 'You’ll need to confirm your email before jumping in. Didn’t get the message? Check your spam folder — or just resend it.',
          content: (
            <div className='grid grid-cols-2 gap-4'>
              <Button variant='secondary' onClick={handleSendEmailVerification}>
                Send again
                <ButtonHighlight />
              </Button>
              <Button variant='default' onClick={handleSignOutUser}>
                Okay
              </Button>
            </div>
          )
        })
        return
      }
      form.reset()
      navigate(from, { replace: true })
      toastSuccess(AuthSuccessCodes.EMAIL_SIGNIN_SUCCESS)

    } catch (error) {
      toastError(error)

    } finally {
      setIsLoading(false)
    }
  }

  const handleSignInWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signInWithGoogle()
      form.reset()
      navigate(from, { replace: true })
      toastSuccess(AuthSuccessCodes.GOOGLE_SIGNIN_SUCCESS)

    } catch (error) {
      toastError(error)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handoSignInWithEmail)}
        autoComplete='on'
        className='grid gap-4'>
        <Button
          onClick={handleSignInWithGoogle}
          disabled={isLoading}
          type='button'
          variant='secondary'>
          <GoogleLogo />
          {isLoading ? 'Logging..' : 'Login with Google'}
          <ButtonHighlight />
        </Button>
        <p className='flex items-center gap-x-3 text-sm text-muted-foreground
        before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-border before:to-border
        after:h-px after:flex-1 after:bg-gradient-to-r after:from-border after:via-border after:to-transparent'>
          or
        </p>
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email address'
          autoComplete='email' />
        <Button
          asChild
          variant='link'
          className='h-auto ml-auto -mb-2 p-0 text-xs font-semibold'>
          <Link to='/forgot-password'>Forgot password?</Link>
        </Button>
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='current-password' />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? 'Logging...' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}
