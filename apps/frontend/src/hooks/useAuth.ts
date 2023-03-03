import { login } from '@/api'
import { UserSchema } from '@todos/shared'
import { create } from 'zustand'

interface IAuthStore {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void

  user: UserSchema | null
  setUser: (user: UserSchema | null) => void
}

const useAuthStore = create<IAuthStore>(set => ({
  isAuthenticated: false,
  setIsAuthenticated: isAuthenticated => set({ isAuthenticated }),

  user: null,
  setUser: user => set({ user }),
}))

export const useAuth = () => {
  const { isAuthenticated, user, setUser } = useAuthStore()

  return {
    isAuthenticated,
    login,
  }
}
