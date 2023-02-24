import { authenticatedUserSchema, authTokenSchema } from '@todos/shared'
import { API_BASEPATH } from '.'

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASEPATH}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const { data, message } = await response.json()

    if (response.status !== 200) {
      throw new Error(message)
    }

    const parsedUser = authenticatedUserSchema.parse(data.user)
    const parsedAuthToken = authTokenSchema.parse(data.authToken)
    return { user: parsedUser, authToken: parsedAuthToken }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export const register = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${API_BASEPATH}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, email, password }),
    })

    const { data, message } = await response.json()

    if (response.status !== 200) {
      throw new Error(message)
    }

    const parsedUser = authenticatedUserSchema.parse(data.user)
    const parsedAuthToken = authTokenSchema.parse(data.authToken)
    return { user: parsedUser, authToken: parsedAuthToken }
  } catch (error) {
    console.error(error)
    return { error }
  }
}
