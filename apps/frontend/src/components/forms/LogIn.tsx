import { Button, Card, Input } from '..'

export const LogIn = () => {
  return (
    <Card
      title='Welcome back!'
      subTitle='Log in to continue.'
      className='w-full max-w-[390px]'
    >
      <form className='flex gap-5 flex-col items-start'>
        <Input placeholder='email' fullWidth />
        <Input placeholder='password' fullWidth />
        <Button styleType='link'>Don't have an account? Sign up.</Button>

        <Button type='submit' fullWidth className='mt-[52px] mb-[22px]'>
          Log In
        </Button>
      </form>
    </Card>
  )
}
