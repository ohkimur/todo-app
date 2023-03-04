'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.register = exports.logout = exports.login = void 0
const utils_1 = require('@/utils')
const client_1 = require('@db/client')
const argon2_1 = __importDefault(require('argon2'))
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'))
const createToken = user => {
  return jsonwebtoken_1.default.sign(
    { email: user.email },
    String(process.env.JWT_SECRET),
    {
      expiresIn: '1d',
    }
  )
}
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await client_1.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      throw new utils_1.CustomError({
        statusCode: 401,
        message: 'Account does not exist',
      })
    }
    const isPasswordValid = await argon2_1.default.verify(
      user.password,
      password
    )
    if (!isPasswordValid) {
      throw new utils_1.CustomError({
        statusCode: 401,
        message: 'Invalid credentials',
      })
    }
    const token = createToken(user)
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'strict',
      })
      .json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        message: 'Login successful',
      })
  } catch (error) {
    next(error)
  }
}
exports.login = login
const logout = async (_req, res, _next) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .json({
      message: 'Logout successful',
    })
}
exports.logout = logout
const register = async (req, res, next) => {
  const { name, email, password } = req.body
  try {
    const user = await client_1.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (user) {
      throw new utils_1.CustomError({
        statusCode: 400,
        message: 'User already exists',
      })
    }
    const hasehdPassword = await argon2_1.default.hash(password)
    const newUser = await client_1.prisma.user.create({
      data: {
        name,
        email,
        password: hasehdPassword,
      },
    })
    const token = createToken(newUser)
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'strict',
      })
      .json({
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        message: 'Registration successful',
      })
  } catch (error) {
    next(error)
  }
}
exports.register = register
