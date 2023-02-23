import bcrypt from 'bcrypt'
import { authorizeUser, AuthToken, User } from '..'

export const generateAuthToken = async (userId: number) => {
  if (!userId) {
    throw new Error('AuthToken requires a user ID')
  }

  let token = ''

  const possibleCharacters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 15; i++) {
    token += possibleCharacters.charAt(
      Math.floor(Math.random() * possibleCharacters.length)
    )
  }

  return AuthToken.create({ token, userId })
}

export const authenticateUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } })

  if (!user) {
    throw new Error('User not found')
  }

  if (bcrypt.compareSync(password, user.password)) {
    return authorizeUser(user)
  }

  throw new Error('Invalid password')
}
