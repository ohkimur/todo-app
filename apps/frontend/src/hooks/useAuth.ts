import { login } from '@/api'
import { LoginUserSchema, UserSchema } from '@todos/shared'
import { useNavigate } from 'react-router-dom'
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

  const loginHandler = async (loginCredentials: LoginUserSchema) => {
    try {
      const { user, message } = await login(loginCredentials)
      if (!user) {
        setIsAuthenticated(false)
        message && setErrors([message])
        return
      }

      setUser(user)
      setIsAuthenticated(true)
      setErrors(null)

      navigate('/')
    } catch (error) {
      setIsAuthenticated(false)
      const message = (error as Error)?.message
      message && setErrors([message])
    }
  }

  return {
    isAuthenticated,
    user,
    errors,
    login: loginHandler,
  }
}
