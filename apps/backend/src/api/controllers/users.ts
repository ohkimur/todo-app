import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { authenticateUser, authorizeUser, User } from '../.'

export const register: RequestHandler = async (req, res, _next) => {
  const { password } = req.body
  const hash = bcrypt.hashSync(password, 10)
  try {
    const user = await User.create(Object.assign(req.body, { password: hash }))
    const data = await authorizeUser(user)
    return res.json({ data, message: 'User registered successfully' })
  } catch (error) {
    return res.status(400).send(error)
  }
}

export const login: RequestHandler = async (req, res, _next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    const user = await authenticateUser(email, password)
    return res.json({ data: user, message: 'User logged in successfully' })
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
