import type { AppLoaderData, BasicNavItem } from '@/features/dashboard/types.ts'
import type { LoaderFunctionArgs } from 'react-router-dom'

export const appLoader = async (_args: LoaderFunctionArgs): Promise<AppLoaderData> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
      user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: 'https://avatars.githubusercontent.com/u/40406316?v=4',
      },
      navMain: [
        {
          title: 'Playground',
          url: '/playground',
          icon: 'SquareTerminal',
          isActive: true,
          items: [
            { title: 'History', url: '/playground/history' },
            { title: 'Starred', url: '/playground/starred' },
            { title: 'Settings', url: '/playground/settings' },
          ] as BasicNavItem[], // Cast for clarity
        },
        {
          title: 'Settings',
          url: '/settings',
          icon: 'Settings2',
          items: [
            { title: 'General', url: '/settings/general' },
            { title: 'Team', url: '/settings/team' },
            { title: 'Billing', url: '/settings/billing' },
            { title: 'Limits', url: '/settings/limits' },
          ] as BasicNavItem[], // Cast for clarity
        },
      ],
    }
  } catch (error) {
    console.error('Failed to load app data:', error)
    throw new Response('Failed to load application data', { status: 500 })
  }
}
