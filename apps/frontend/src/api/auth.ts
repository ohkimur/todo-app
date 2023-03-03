import { LoginUserSchema } from '@todos/shared'
import { API_BASEPATH } from '.'

export const getToken = () => {
  return sessionStorage.getItem('token')
}

export const setToken = (token?: string) => {
  if (!token) {
    sessionStorage.removeItem('token')
    return
  }
  sessionStorage.setItem('token', token)
}

export const login = async (loginCredentials: LoginUserSchema) => {
  const response = await fetch(`${API_BASEPATH}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginCredentials),
  })
  const json = await response.json()
  return json
}
