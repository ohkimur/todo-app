import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Card, Input } from '..'

export const Auth = () => {
  const [action, setAction] = useState<'login' | 'register'>('login')

  const [title, setTitle] = useState('Welcome back!')
  const [subTitle, setSubTitle] = useState('Log in to continue.')

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm()

  const onSubmit = (data: any) => console.log(data)

  useEffect(() => {
    if (action === 'login') {
      setTitle('Welcome back!')
      setSubTitle('Log in to continue.')
    } else {
      setTitle('Welcome!')
      setSubTitle('Sign up to start using Simpledo today.')
    }
  }, [action])

  useEffect(() => {
    clearErrors()
  }, [title])

  return (
    <Card title={title} subTitle={subTitle} className='w-full max-w-[390px]'>
      <form
        className='flex gap-5 flex-col items-start'
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Full Name */}
        {action === 'register' ? (
          <div className='flex flex-col w-full gap-2'>
            <Input
              placeholder='Full Name'
              fullWidth
              {...register('fullName', { required: true })}
            />
            {errors.fullName && (
              <span className='text-red-500'>This full name is required</span>
            )}
          </div>
        ) : null}

        {/* Email */}
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

        {/* Password */}
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

        {/* Toggle between login and register */}
        {action === 'login' ? (
          <Button styleType='link' onClick={() => setAction('register')}>
            Don't have an account? Sign up.
          </Button>
        ) : (
          <Button styleType='link' onClick={() => setAction('login')}>
            Do have an account? Sign in.
          </Button>
        )}

        <Button type='submit' fullWidth className='mt-[52px] mb-[22px]'>
          {action === 'login' ? 'Log In' : 'Sign Up'}
        </Button>
      </form>
    </Card>
  )
}
