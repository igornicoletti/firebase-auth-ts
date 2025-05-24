import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = {
  profile: {
    name: string
    email: string
    avatar: string
  }
}
export const AvatarProfile = ({ profile }: Props) => {
  return (
    <div className='flex items-center gap-2'>
      <Avatar className='size-8 rounded-lg'>
        <AvatarImage src={profile.avatar} alt={profile.name} />
        <AvatarFallback className='rounded-lg'>{profile.name?.[1] ?? ' '}</AvatarFallback>
      </Avatar>
      <div className='grid flex-1 text-left text-sm leading-tight'>
        <span className='truncate font-semibold'>{profile.name}</span>
        <span className='truncate text-xs'>{profile.email}</span>
      </div>
    </div>
  )
}
