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
      setErrors(errors)
      setIsAuthenticated(false)
      removeToken()
      removeUser()
      return
    }

    setIsAuthenticated(true)
    setToken(authToken.token)
    setUser(user)
  }

  const login = async (email: string, password: string) => {
    const { user, authToken, error } = await loginUser(email, password)

    if (error || !authToken || !user) {
      console.error(error)
      setErrors(errors)
      setIsAuthenticated(false)
      removeToken()
      removeUser()
      return
    }

    setIsAuthenticated(true)
    setToken(authToken.token)
    setUser(user)
  }

  return { isAuthenticated, token, user, errors, register, login }
}
