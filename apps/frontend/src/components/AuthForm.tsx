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

interface IAuthFormProps {
  action?: 'login' | 'register'
}

export const AuthForm = ({ action = 'login' }: IAuthFormProps) => {
  const {
    login: loginHandler,
    register: registerHandler,
    errors: authErrors,
  } = useAuth()

  const [localAction, setLocalAction] = useState<'login' | 'register'>(action)

  const [title, setTitle] = useState('Welcome back!')
  const [subTitle, setSubTitle] = useState('Log in to continue.')

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(
      localAction === 'login' ? loginUserSchema : registerUserSchema
    ),
  })

  const onSubmit: SubmitHandler<RegisterUserSchema> = async data => {
    if (localAction === 'login') {
      await loginHandler(data)
    } else if (localAction === 'register') {
      await registerHandler(data)
    }
  }

  useEffect(() => {
    if (localAction === 'login') {
      setTitle('Welcome back!')
      setSubTitle('Log in to continue.')
    } else {
      setTitle('Welcome!')
      setSubTitle('Sign up to start using Todos.')
    }
    window.history.replaceState({}, '', `/${localAction}`)
  }, [localAction])

  useEffect(() => {
    clearErrors()
  }, [title])

  return (
    <Card title={title} subTitle={subTitle} className='w-full max-w-[390px]'>
      <form
        className='flex gap-5 flex-col items-start'
        onSubmit={handleSubmit(onSubmit)}
      >
        {authErrors && (
          <span className='text-red-500'>
            {authErrors.map((message, index) => (
              <span key={index}>{message}</span>
            ))}
          </span>
        )}

        {/* Name */}
        {localAction === 'register' ? (
          <div className='flex flex-col w-full gap-2'>
            <Input
              type={'text'}
              placeholder='Name'
              fullWidth
              {...register('name')}
            />
            {errors.name ? (
              <span className='text-red-500'>{errors.name.message}</span>
            ) : null}
          </div>
        ) : null}

        {/* Email */}
        <div className='flex flex-col w-full gap-2'>
          <Input
            type={'text'}
            placeholder='Email'
            fullWidth
            {...register('email')}
          />
          {errors.email ? (
            <span className='text-red-500'>{errors.email.message}</span>
          ) : null}
        </div>

        {/* Password */}
        <div className='flex flex-col w-full gap-2'>
          <Input
            type={'password'}
            placeholder='Password'
            fullWidth
            {...register('password')}
          />
          {errors.password ? (
            <span className='text-red-500'>{errors.password.message}</span>
          ) : null}
        </div>

        {/* Confirm Password */}
        {localAction === 'register' ? (
          <div className='flex flex-col w-full gap-2'>
            <Input
              type={'password'}
              placeholder='Confirm Password'
              fullWidth
              {...register('confirmPassword')}
            />
            {errors.confirmPassword ? (
              <span className='text-red-500'>
                {errors.confirmPassword.message}
              </span>
            ) : null}
          </div>
        ) : null}

        {/* Toggle between login and register */}
        {localAction === 'login' ? (
          <span className='flex gap-2'>
            Don't have an account?
            <Button
              type='button'
              styleType='link'
              onClick={() => setLocalAction('register')}
            >
              Sign up
            </Button>
          </span>
        ) : (
          <span className='flex gap-2'>
            Already have an account?
            <Button
              type='button'
              styleType='link'
              onClick={() => setLocalAction('login')}
            >
              Sign in
            </Button>
          </span>
        )}

        <Button type='submit' fullWidth className='mt-12'>
          {localAction === 'login' ? 'Log In' : 'Sign Up'}
        </Button>
      </form>
    </Card>
  )
}
