import { getMe, login, logout, register } from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import { LoginUserSchema, UserSchema } from '@todos/shared'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { create } from 'zustand'

const hasAuthToken = () => !!Cookies.get('hasAuthToken')

interface IAuthStore {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void

  user: UserSchema | null
  setUser: (user: UserSchema | null) => void

  errors: string[] | null
  setErrors: (error: string[] | null) => void
}

const useAuthStore = create<IAuthStore>(set => ({
  isAuthenticated: hasAuthToken(),
  setIsAuthenticated: isAuthenticated => set({ isAuthenticated }),

  user: null,
  setUser: user => set({ user }),

  errors: null,
  setErrors: errors => set({ errors }),
}))

export const useAuth = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    errors,
    setErrors,
  } = useAuthStore()

  const queryClient = useQueryClient()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!hasAuthToken()) {
      setIsAuthenticated(false)
      return
    }
    authenticateHandler()
  }, [])

  useEffect(() => {
    if (user && hasAuthToken()) {
      setIsAuthenticated(true)
      if (location.pathname === '/login' || location.pathname === '/register') {
        navigate('/')
      }
      return
    }
  }, [user])

  const authenticateHandler = async () => {
    try {
      const user = await getMe()
      if ('message' in user) {
        throw new Error(user.message)
      }
      setUser(user)
    } catch (error) {
      setUser(null)

      if (location.pathname !== '/login' && location.pathname !== '/register') {
        setErrors([(error as Error).message])
        navigate('/login')
      }
    }
  }

  const loginHandler = async (loginCredentials: LoginUserSchema) => {
    try {
      const { user, message } = await login(loginCredentials)
      if (!user) {
        throw new Error(message)
      }
      setUser(user)
    } catch (error) {
      setUser(null)
      setErrors([(error as Error).message])
    }
  }

  const registerHandler = async (registerCredentials: LoginUserSchema) => {
    try {
      const { user, message } = await register(registerCredentials)
      if (!user) {
        throw new Error(message)
      }
      setUser(user)
    } catch (error) {
      setUser(null)
      setErrors([(error as Error).message])
    }
  }

  const logoutHandler = async () => {
    await logout()
    setUser(null)
    queryClient.clear()
    navigate('/login')
  }

  return {
    isAuthenticated,
    user,
    errors,
    login: loginHandler,
    register: registerHandler,
    logout: logoutHandler,
  }
}
