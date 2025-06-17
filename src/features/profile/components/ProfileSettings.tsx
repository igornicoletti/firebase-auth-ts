// src/features/profile/components/ProfileSettings.tsx
// Demonstra como os mesmos componentes são reutilizados em features diferentes

import { useFormSubmit } from '@/features/auth/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn/ui/card'
import { Form } from '@/shadcn/ui/form'
import { useAuth } from '@/shared/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

// Schema específico para perfil
const profileSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional()
})

type ProfileFormData = z.infer<typeof profileSchema>

export const ProfileSettings = () => {
  const { user } = useAuth()

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      email: user?.email || '',
      phone: '',
      bio: ''
    }
  })

  // Reutilizando o mesmo hook de submit
  const { handleSubmit } = useFormSubmit<ProfileFormData>({
    onSubmit: async (data) => {
      // Simular atualização do perfil
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Profile updated:', data)
    },
    successMessage: 'profile-update-success' as any
  })

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                {/* Reutilizando os mesmos FormField components */}

                {/* Exemplo de field customizado ainda usando a base modular */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea
                    {...form.register('bio')}
                    className="w-full p-3 border rounded-md resize-none"
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                  {form.formState.errors.bio && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.bio.message}
                    </p>
                  )}
                </div>


              </form>
            </Form>
          </FormProvider>
        </CardContent>
      </Card>

      {/* Outra seção reutilizando componentes */}
      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>
            Manage your security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Reutilizando Spinner em contexto diferente */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>

          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Change Password</h3>
              <p className="text-sm text-muted-foreground">Update your account password</p>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
