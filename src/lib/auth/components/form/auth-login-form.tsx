// src/lib/auth/components/form/auth-login-form.tsx

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleLogo } from '@phosphor-icons/react'

import { Button, ButtonHighlight } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useDialog } from '@/lib/app/providers'
import { AuthInputForm } from '@/lib/auth/components/form'
import { AuthSuccessCodes } from '@/lib/auth/constants'
import { useAuthToast } from '@/lib/auth/hooks'
import { authLoginSchema } from '@/lib/auth/schemas'
import {
  sendEmailVerificationToCurrentUser,
  signInWithEmail,
  signInWithGoogle,
  signOutUser
} from '@/lib/auth/services'
import { auth } from '@/lib/firebase'

type AuthLoginValues = z.infer<typeof authLoginSchema>

export const AuthLoginForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const form = useForm<AuthLoginValues>({
    resolver: zodResolver(authLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })
  const { openDialog } = useDialog()
  const { toastError, toastSuccess } = useAuthToast()
  const [isLoading, setIsLoading] = useState(false)

  const from = location.state?.from || '/dashboard'

  const handoSignInWithEmail = async (data: AuthLoginValues) => {
    setIsLoading(true)

    try {
      await signInWithEmail(data.email, data.password)
      if (!auth.currentUser || !auth.currentUser.emailVerified) {
        openDialog({
          title: 'Verify your email',
          description: 'You’ll need to confirm your email before jumping in. Didn’t get the message? Check your spam folder — or just resend it.',
          onConfirm: async () => {
            try {
              await sendEmailVerificationToCurrentUser()
              toastSuccess(AuthSuccessCodes.EMAIL_RESEND_SUCCESS)
            } catch (error) {
              toastError(error)
            }
          },
          onCancel: async () => { await signOutUser() },
          footer: ({ confirm }) => (
            <Button onClick={confirm} variant='secondary' className='w-full'>
              {isLoading ? 'Resending...' : 'Resend email'}
              <ButtonHighlight />
            </Button>
          ),
        })
        return
      }
      form.reset()
      navigate(from, { replace: true })
      toastSuccess(AuthSuccessCodes.EMAIL_SIGNIN_SUCCESS)

    }
    catch (error) {
      toastError(error)

    }
    finally {
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
          autoComplete='email'
        />
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
          autoComplete='current-password'
        />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? 'Logging...' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}
