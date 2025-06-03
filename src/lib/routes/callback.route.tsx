// src/lib/routes/callback.route.tsx

import { AuthErrorCodes } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { AuthActionCodes, AuthSuccessCodes } from '@/lib/auth/constants'
import { useAuth } from '@/lib/auth/contexts'
import { useAuthToast } from '@/lib/auth/hooks'
import { applyUserActionCode } from '@/lib/auth/services'
import { auth } from '@/lib/firebase'

export const Callback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const { toastError, toastSuccess } = useAuthToast()

  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')

  useEffect(() => {
    // Ensure Firebase Auth state is loaded before attempting to process the callback
    if (loading) {
      console.log('Callback: Waiting for auth state to load...')
      // While auth is loading, the AuthProvider will render its own <Loading />.
      // So we just return here and wait for the 'loading' state to become false.
      return
    }

    // Check if the necessary parameters are present after loading
    if (!mode || !oobCode) {
      console.error('Callback: Missing mode or oobCode.')
      // Use a more specific error code if available, or rely on the toastError default
      toastError(AuthErrorCodes.EXPIRED_OOB_CODE) // Or perhaps AuthErrorCodes.ARGUMENT_ERROR ?
      navigate('/login', { replace: true })
      return // Stop execution if parameters are missing
    }

    console.log(`Callback: Processing mode=${mode} with oobCode=${oobCode}`)

    // Define the asynchronous action handler inside the effect
    const handleAuthAction = async () => {
      try {
        switch (mode) {
          case AuthActionCodes.VERIFY_EMAIL: {
            console.log('Callback: Verifying email...')
            await applyUserActionCode(oobCode) // Use your service function
            console.log('Callback: Email verification code applied.')

            // After applying the action code, the user's state (like emailVerified)
            // *should* eventually update through the onAuthStateChanged listener
            // in your AuthProvider. Reloading manually can help speed this up
            // or ensure you have the latest state immediately.
            await auth.currentUser?.reload() // Reload user data

            // Now, check the current user's verified status AFTER potential reload
            // We check auth.currentUser directly because the 'user' from context
            // might have a slight delay updating after 'reload()'.
            if (auth.currentUser?.emailVerified) {
              console.log('Callback: Email successfully verified. Navigating to dashboard.')
              toastSuccess(AuthSuccessCodes.EMAIL_VERIFIED_SUCCESS)
              navigate('/dashboard', { replace: true }) // Navigate to dashboard on success
            } else {
              // This case should ideally not happen if applyActionCode and reload succeeded,
              // but it's a fallback for unexpected states.
              console.error('Callback: Email not verified after applying code and reload.')
              toastError(AuthErrorCodes.INVALID_OOB_CODE) // Or a more specific error?
              navigate('/login', { replace: true })
            }
            break
          }

          case AuthActionCodes.RESET_PASSWORD: {
            console.log('Callback: Handling password reset. Navigating to reset password page.')
            // No async action needed here, just navigate to the reset form with the code
            navigate(`/reset-password?oobCode=${oobCode}`, { replace: true })
            break
          }

          // Add other cases if you handle other action codes (e.g., RECOVER_EMAIL, SIGN_IN_EMAIL_LINK)
          // case AuthActionCodes.RECOVER_EMAIL: { ... }
          // case AuthActionCodes.SIGN_IN_EMAIL_LINK: { ... }

          default: {
            console.warn(`Callback: Unhandled action mode: ${mode}.`)
            toastError(AuthErrorCodes.INTERNAL_ERROR) // Or a more specific error like AuthErrorCodes.INVALID_CONTINUE_URI
            navigate('/login', { replace: true })
          }
        }
      } catch (error) {
        console.error('Callback: Error handling auth action:', error)
        // The toastError function handles showing the message from the error object
        toastError(error)
        navigate('/login', { replace: true }) // Navigate to login on error
      }
      // Note: Removed the finally block with setIsLoading(false) as we
      // no longer use the local isLoading state. The global useAuth().loading
      // handles the initial overall loading state.
    }

    // Execute the action handler
    handleAuthAction()

    // Dependencies for the effect:
    // - 'loading': Ensures the effect waits until auth state is known.
    // - 'mode', 'oobCode': If these change (though unlikely on this route), re-run the effect.
    // - 'navigate', 'toastError', 'toastSuccess': React Hook Lint rules require these if used inside effect.
    //   navigate is guaranteed stable by React Router, but it's good practice to include.
    //   toast functions might depend on context, better to include them.
    // - 'user': Although the logic primarily uses auth.currentUser, including 'user'
    //   as a dependency ensures the effect re-runs if the user object from context changes
    //   after the initial load, which might be relevant for `auth.currentUser?.reload()`.
  }, [loading, mode, oobCode, navigate, toastError, toastSuccess, user]) // Added user dependency

  // Simplified Render Logic:
  // We only need to show a loading state *initially* while Firebase Auth
  // is determining the user's status. The AuthProvider is already doing this
  // by conditionally rendering {loading ? <Loading /> : children}.
  // Inside the Callback component itself, we just need to wait for that initial load.
  // Once loading is false, the useEffect handles the action and subsequent navigation.
  // There's no need for a separate local isLoading state just for the async action
  // within this component, as the component's purpose is solely to run the effect
  // and navigate away.

  // If the component is rendered *after* loading is false and before the navigate
  // happens, it should render nothing or a minimal placeholder. Returning null is fine.
  // If you wanted a loading state *during* the handleAuthAction execution (after initial auth load),
  // you would need the local state back, but for a component whose sole job is to
  // process and redirect, it's often unnecessary complexity.
  // The primary loading handled by AuthProvider is usually sufficient.

  // We don't need the local 'isLoading' state anymore.
  // The AuthProvider's 'loading' state will render the initial <Loading />.
  // Once the AuthProvider is *not* loading, this component takes over,
  // the useEffect runs, handles the action, and navigates.
  // So, if the component reaches this point, it means the initial auth
  // loading is done, and the effect is running or has finished.
  // Returning null is appropriate as the component's purpose is just to
  // trigger an action and navigate, not to display persistent UI.
  return null
}
