import { useAuth } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  loginUserSchema,
  registerUserSchema,
  RegisterUserSchema,
} from '@todos/shared'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Card, Input } from '.'

export const AuthForm = () => {
  const { login } = useAuth()
  const [action, setAction] = useState<'login' | 'register'>('login')

  const [title, setTitle] = useState('Welcome back!')
  const [subTitle, setSubTitle] = useState('Log in to continue.')

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(
      action === 'login' ? loginUserSchema : registerUserSchema
    ),
  })

  const onSubmit: SubmitHandler<RegisterUserSchema> = async data => {
    console.log(data)
    if (action === 'login') {
      const res = await login(data)
      console.log(res)
    }
  }

  useEffect(() => {
    if (action === 'login') {
      setTitle('Welcome back!')
      setSubTitle('Log in to continue.')
    } else {
      setTitle('Welcome!')
      setSubTitle('Sign up to start using Todos.')
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
        {/* Name */}
        {action === 'register' ? (
          <div className='flex flex-col w-full gap-2'>
            <Input
              type={'text'}
              placeholder='Name'
              fullWidth
              {...register('name')}
            />
            {errors.name && (
              <span className='text-red-500'>{errors.name.message}</span>
            )}
          </div>
        ) : null}

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

        {/* Confirm Password */}
        {action === 'register' ? (
          <div className='flex flex-col w-full gap-2'>
            <Input
              type={'password'}
              placeholder='confirmPassword'
              fullWidth
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <span className='text-red-500'>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        ) : null}

        {/* Toggle between login and register */}
        {action === 'login' ? (
          <span className='flex gap-2'>
            Don't have an account?
            <Button
              type='button'
              styleType='link'
              onClick={() => setAction('register')}
            >
              Sign up
            </Button>
          </span>
        ) : (
          <span className='flex gap-2'>
            Do have an account?
            <Button
              type='button'
              styleType='link'
              onClick={() => setAction('login')}
            >
              Sign in
            </Button>
          </span>
        )}

        <Button type='submit' fullWidth className='mt-12'>
          {action === 'login' ? 'Log In' : 'Sign Up'}
        </Button>
      </form>
    </Card>
  )
}