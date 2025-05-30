// src/lib/auth/components/form/auth-login-form.tsx

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleLogo } from '@phosphor-icons/react'

import { Button, ButtonHighlight } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { AuthInputForm } from '@/lib/auth/components/form'
import { useAuthToast } from '@/lib/auth/hooks'
import { authLoginSchema } from '@/lib/auth/schemas'
import { signInWithEmail, signInWithGoogle } from '@/lib/auth/services'

type LoginFormData = z.infer<typeof authLoginSchema>

export const AuthLoginForm = () => {
  const [loading, setIsLoading] = useState(false)
  const { toastError } = useAuthToast()
  const navigate = useNavigate()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(authLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)

    try {
      await signInWithEmail(data.email, data.password)
      toast.message('Login Successful', {
        description: 'Welcome back!.',
        classNames: {
          title: '!text-primary',
          description: '!text-foreground'
        }
      })
      form.reset()
      navigate('/dashboard')

    } catch (error) {
      toastError(error)

    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)

    try {
      await signInWithGoogle()
      toast.message('Login Successful', {
        description: 'Welcome back!.',
        classNames: {
          title: '!text-primary',
          description: '!text-foreground'
        }
      })
      form.reset()
      navigate('/dashboard')

    } catch (error) {
      toastError(error)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        autoComplete='on' className='grid gap-4'>
        <Button onClick={handleGoogleLogin} disabled={loading}
          type='button' variant='secondary'>
          <ButtonHighlight />
          <GoogleLogo />
          {loading ? 'Logging..' : 'Login with Google'}
        </Button>
        <p className="flex items-center gap-x-3 text-sm text-muted-foreground
        before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-border before:to-border
        after:h-px after:flex-1 after:bg-gradient-to-r after:from-border after:via-border after:to-transparent">or</p>
        <AuthInputForm control={form.control} disabled={loading}
          type='email' name='email' placeholder='Email address' />
        <Button asChild variant='link' className='h-auto ml-auto -mb-2 p-0 text-xs font-semibold'>
          <Link to='/forgot-password'>
            Forgot password?
          </Link>
        </Button>
        <AuthInputForm control={form.control} disabled={loading}
          type='password' name='password' placeholder='Password' />
        <Button disabled={loading} type='submit'>
          {loading ? 'Logging...' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}
