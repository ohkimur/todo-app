import { getMe, login, register } from '@/api'
import { LoginUserSchema, UserSchema } from '@todos/shared'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { create } from 'zustand'

interface IAuthStore {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void

  user: UserSchema | null
  setUser: (user: UserSchema | null) => void

  errors: string[] | null
  setErrors: (error: string[] | null) => void
}

const useAuthStore = create<IAuthStore>(set => ({
  isAuthenticated: false,
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

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      authenticateHandler()
    }
  }, [])

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
      navigate('/')
      return
    }
    setIsAuthenticated(false)
  }, [user])

  useEffect(() => {
    console.log(isAuthenticated)
  }, [isAuthenticated])

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

  return {
    isAuthenticated,
    user,
    errors,
    login: loginHandler,
    register: registerHandler,
  }
}
