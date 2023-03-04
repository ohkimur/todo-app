import { LoginUserSchema, userSchema } from '@todos/shared'
import { z } from 'zod'
import { API_BASEPATH } from '.'

const authReturnSchema = z.object({
  user: userSchema.optional(),
  message: z.string().optional(),
})

export const login = async (loginCredentials: LoginUserSchema) => {
  const response = await fetch(`${API_BASEPATH}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(loginCredentials),
  })
  const json = await response.json()
  return authReturnSchema.parse(json)
}

export const logout = async () => {
  const response = await fetch(`${API_BASEPATH}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  return response
}

export const register = async (registerCredentials: LoginUserSchema) => {
  const response = await fetch(`${API_BASEPATH}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(registerCredentials),
  })
  const json = await response.json()
  return authReturnSchema.parse(json)
}
