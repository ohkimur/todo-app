import { useForm } from 'react-hook-form'
import { Button, Card, Input } from '..'

export const LogIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => console.log(data)

  return (
    <Card
      title='Welcome back!'
      subTitle='Log in to continue.'
      className='w-full max-w-[390px]'
    >
      <form
        className='flex gap-5 flex-col items-start'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col w-full gap-2'>
          <Input
            placeholder='email'
            fullWidth
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className='text-red-500'>This email is required</span>
          )}
        </div>

        <div className='flex flex-col w-full gap-2'>
          <Input
            placeholder='password'
            fullWidth
            {...register('password', { required: true })}
          />
          {errors.password && (
            <span className='text-red-500'>This password is required</span>
          )}
        </div>

        <Button styleType='link'>Don't have an account? Sign up.</Button>

        <Button type='submit' fullWidth className='mt-[52px] mb-[22px]'>
          Log In
        </Button>
      </form>
    </Card>
  )
}
