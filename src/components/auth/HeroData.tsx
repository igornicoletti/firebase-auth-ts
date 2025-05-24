import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { GithubLogo } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

type HeroDataProps = {
  title: string
  description: string
}

export const HeroData = ({ title, description }: HeroDataProps) => {
  return (
    <div className='grid gap-4 text-center'>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant='link'>@igornicoletti</Button>
        </HoverCardTrigger>
        <HoverCardContent className='w-sm'>
          <div className='flex justify-between gap-4'>
            <Avatar>
              <AvatarImage src='https://github.com/igornicoletti.png' />
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <h4 className='text-sm font-semibold'>Front-End JavaScript Developer</h4>
                <p className='text-sm text-muted-foreground'>Open-source project built with React, TypeScript, Firebase Auth, and shadcn/ui.</p>
              </div>
              <Button asChild type='button' variant='link' className='h-auto mr-auto p-0 text-sm'>
                <Link to='https://github.com/igornicoletti/firebase-auth-ts' target='_blank'>
                  <GithubLogo />
                  github.com/igornicoletti
                </Link>
              </Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <div className='grid gap-2'>
        <h2 className='font-bold text-xl'>{title}</h2>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
    </div>
  )
}
