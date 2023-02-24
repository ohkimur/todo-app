import { TAuthenticatedUser } from '@todos/shared'
import { create } from 'zustand'

interface IAuthStore {
  errors: string[]
  setErrors: (errors: string[]) => void
  removeErrors: () => void

  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void

  user: TAuthenticatedUser | null
  setUser: (user: TAuthenticatedUser) => void
  removeUser: () => void

  token: string | null
  setToken: (token: string) => void
  removeToken: () => void
}

export const useAuthStore = create<IAuthStore>(set => ({
  errors: [],
  setErrors: (errors: string[]) => set({ errors }),
  removeErrors: () => set({ errors: [] }),

  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

  user: null,
  setUser: (user: TAuthenticatedUser) => set({ user }),
  removeUser: () => set({ user: null }),

  token: null,
  setToken: (token: string) => set({ token }),
  removeToken: () => set({ token: null }),
}))
