import { Bell, CreditCard, SignOut, Star, UserCircle } from '@phosphor-icons/react'

export const sidebarUserMenuConfig = [
  {
    label: 'Upgrade',
    items: [
      {
        label: 'Upgrade to Pro',
        icon: Star,
        onClick: () => console.log('Upgrade clicked'),
      },
    ],
  },
  {
    label: 'Settings',
    items: [
      {
        label: 'Account',
        icon: UserCircle,
        href: '/account',
      },
      {
        label: 'Billing',
        icon: CreditCard,
        href: '/billing',
      },
      {
        label: 'Notifications',
        icon: Bell,
        href: '/notifications',
      },
    ],
  },
  {
    label: 'Session',
    items: [
      {
        label: 'Log out',
        icon: SignOut,
        onClick: () => console.log('Logging out'),
      },
    ],
  },
]
