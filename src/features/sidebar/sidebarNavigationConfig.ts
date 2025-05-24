import { FileText, Gear, House, ShieldCheck, Stack, UsersThree } from '@phosphor-icons/react'

export const sidebarNavigationConfig = [
  {
    label: 'Platform',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: House,
        isActive: true,
      },
      {
        title: 'Users',
        url: '/users',
        icon: UsersThree,
        items: [
          { title: 'All Users', url: '/users' },
          { title: 'Invite', url: '/users/invite' },
        ],
      },
      {
        title: 'Reports',
        url: '/reports',
        icon: FileText,
        items: [
          { title: 'Monthly', url: '/reports/monthly' },
          { title: 'Custom', url: '/reports/custom' },
        ],
      },
      {
        title: 'Integrations',
        url: '/integrations',
        icon: Stack,
        items: [
          { title: 'Slack', url: '/integrations/slack' },
          { title: 'Zapier', url: '/integrations/zapier' },
        ],
      },
    ],
  },
  {
    label: 'Settings',
    items: [
      {
        title: 'Security',
        url: '/security',
        icon: ShieldCheck,
      },
      {
        title: 'Preferences',
        url: '/settings',
        icon: Gear,
      },
    ],
  },
]
