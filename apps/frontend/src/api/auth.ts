import { LoginUserSchema, userSchema } from '@todos/shared'
import { z } from 'zod'
import { API_BASEPATH } from '.'

const loginReturnSchema = z
  .object({
    user: userSchema.optional(),
    message: z.string().optional(),
  })
  .strip()

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
  return loginReturnSchema.parse(json)
}
