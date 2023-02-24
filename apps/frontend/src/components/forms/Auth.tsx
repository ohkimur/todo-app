import { useAuth } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { TUser, userSchema } from '@todos/shared'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Card, Input } from '..'

export const Auth = () => {
  const {
    register: registerUser,
    login: loginUser,
    errors: authErrors,
  } = useAuth()
  const [action, setAction] = useState<'login' | 'register'>('login')

  const [title, setTitle] = useState('Welcome back!')
  const [subTitle, setSubTitle] = useState('Log in to continue.')

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<TUser>({ resolver: zodResolver(userSchema) })

  const onSubmit: SubmitHandler<TUser> = async data => {
    if (action === 'register') {
      registerUser(data.fullName || '', data.email, data.password)
      return
    }
    loginUser(data.email, data.password)
  }

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

  useEffect(() => {
    console.log(errors)
  }, [authErrors])

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
              type={'text'}
              placeholder='Full Name'
              fullWidth
              {...register('fullName')}
            />
            {errors.fullName && (
              <span className='text-red-500'>{errors.fullName.message}</span>
            )}
          </div>
        ) : null}

        {authErrors.map((error, index) => (
          <span key={index} className='text-red-500'>
            {error}
          </span>
        ))}

        {/* Email */}
        <div className='flex flex-col w-full gap-2'>
          <Input
            type={'text'}
            placeholder='email'
            fullWidth
            {...register('email')}
          />
          {errors.email && (
            <span className='text-red-500'>{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div className='flex flex-col w-full gap-2'>
          <Input
            type={'password'}
            placeholder='password'
            fullWidth
            {...register('password')}
          />
          {errors.password && (
            <span className='text-red-500'>{errors.password.message}</span>
          )}
        </div>

        {/* Toggle between login and register */}
        {action === 'login' ? (
          <Button
            type='button'
            styleType='link'
            onClick={() => setAction('register')}
          >
            Don't have an account? Sign up.
          </Button>
        ) : (
          <Button
            type='button'
            styleType='link'
            onClick={() => setAction('login')}
          >
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
