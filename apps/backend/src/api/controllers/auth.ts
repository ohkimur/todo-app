import { authenticatedUserSchema, authTokenSchema } from '@todos/shared'
import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { ZodError } from 'zod'
import { authenticateUser, authorizeUser, User } from '..'

export const register: RequestHandler = async (req, res, _next) => {
  console.log(req.body)

  try {
    const { password } = req.body
    const hash = bcrypt.hashSync(password, 10)

    const user = await User.create(Object.assign(req.body, { password: hash }))
    const data = await authorizeUser(user)

    const parsedUser = authenticatedUserSchema.parse(data.user)
    const parsedAuthToken = authTokenSchema.parse(data.authToken)

    return res.json({
      data: {
        user: parsedUser,
        authToken: parsedAuthToken,
      },
      message: 'User registered successfully',
    })
  } catch (error) {
    console.error(error)

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.issues })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const login: RequestHandler = async (req, res, _next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    const data = await authenticateUser(email, password)
    const parsedUser = authenticatedUserSchema.parse(data.user)
    const parsedAuthToken = authTokenSchema.parse(data.authToken)

    return res.json({
      data: {
        user: parsedUser,
        authToken: parsedAuthToken,
      },
      message: 'User logged in successfully',
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const logout: RequestHandler = async (req, res, _next) => {
  const { userId } = req.body
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' })
  }

  try {
    await User.update({ authTokenId: null }, { where: { id: userId } })
    return res.json({ message: 'User logged out successfully' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
