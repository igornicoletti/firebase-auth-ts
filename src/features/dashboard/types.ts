// src/types/index.ts (or navigation.ts)

// Define a union type for available icons to ensure type safety
export type IconName = 'SquareTerminal' | 'Settings2'

// Define the shape of a basic navigation item (for sub-items)
export interface BasicNavItem {
  title: string
  url: string
}

// Define the shape of a top-level navigation item
// It uses BasicNavItem for its 'items' property
export interface TopLevelNavItem {
  title: string
  url: string
  icon: IconName // Explicitly use IconName
  isActive?: boolean
  items?: BasicNavItem[] // Sub-items are BasicNavItem
}

// Define the shape of the user profile
export interface UserProfile {
  name: string
  email: string
  avatar: string
}

// Define the shape of the data returned by the app loader
export interface AppLoaderData {
  mockData: {
    user: UserProfile
    navMain: TopLevelNavItem[]
  }
}
