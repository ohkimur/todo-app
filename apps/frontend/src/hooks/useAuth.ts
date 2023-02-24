import { useEffect } from 'react'
import { useAuthStore } from '.'
import { login as loginUser, register as registerUser } from '../api'

export const useAuth = () => {
  const {
    errors,
    setErrors,
    removeErrors,
    isAuthenticated,
    setIsAuthenticated,
    token,
    setToken,
    removeToken,
    user,
    setUser,
    removeUser,
  } = useAuthStore()

  const register = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    const { user, authToken, error } = await registerUser(
      fullName,
      email,
      password
    )

    if (error || !authToken || !user) {
      console.error(error)
      if (error instanceof Error) {
        setErrors([error.message])
      }
      setIsAuthenticated(false)
      removeToken()
      removeUser()
      return
    }

    setIsAuthenticated(true)
    setToken(authToken.token)
    localStorage.setItem('token', authToken.token)
    setUser(user)
  }

  const login = async (email: string, password: string) => {
    const { user, authToken, error } = await loginUser(email, password)

    if (error || !authToken || !user) {
      console.error(error)

      if (error instanceof Error) {
        setErrors([error.message])
      }
      setIsAuthenticated(false)
      removeToken()
      removeUser()
      return
    }

    setIsAuthenticated(true)
    setToken(authToken.token)
    localStorage.setItem('token', authToken.token)
    setUser(user)
  }

  const logout = () => {
    setIsAuthenticated(false)
    removeToken()
    removeUser()
    removeErrors()
    localStorage.removeItem('token')
  }

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      setToken(localToken)
      setIsAuthenticated(true)
    }
  }, [])

  return { isAuthenticated, token, user, errors, register, login, logout }
}
