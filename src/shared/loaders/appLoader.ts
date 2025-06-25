import type { AppLoaderData, BasicNavItem } from '@/features/dashboard/types.ts'
import type { LoaderFunctionArgs } from 'react-router-dom'

export const appLoader = async (_args: LoaderFunctionArgs): Promise<AppLoaderData> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return {
    mockData: {
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
          ] as BasicNavItem[],
        }
      ]
    }
  }
}
