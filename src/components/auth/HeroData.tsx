type HeroDataProps = {
  title: string
  description: string
}

export const HeroData = ({ title, description }: HeroDataProps) => {
  return (
    <div className='grid gap-2 text-center'>
      <h2 className='font-bold text-xl'>{title}</h2>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  )
}
