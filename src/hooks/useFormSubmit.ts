import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type SubmitFn<T> = (data: T) => Promise<void>

export const useFormSubmit = <T,>(
  submitFn: SubmitFn<T>,
  redirectPath: string,
  extraCheck?: () => boolean | Promise<boolean>
) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = useCallback(async (data: T) => {
    setIsLoading(true)
    try {
      if (extraCheck) {
        const checkResult = await extraCheck()
        if (!checkResult) {
          setIsLoading(false)
          return
        }
      }
      await submitFn(data)
      navigate(redirectPath, { replace: true })
    } catch (error) {
      console.error('Auth submit error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [submitFn, redirectPath, extraCheck, navigate])

  return { handleSubmit, isLoading }
}
