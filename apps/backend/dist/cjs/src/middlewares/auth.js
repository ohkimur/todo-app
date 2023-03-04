'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.authenticate = void 0
const utils_1 = require('@/utils')
const client_1 = require('@db/client')
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'))
const authenticate = async (req, _res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      throw new utils_1.CustomError({
        statusCode: 401,
        message: 'Unauthorized',
      })
    }
    const decoded = jsonwebtoken_1.default.verify(
      token,
      String(process.env.JWT_SECRET)
    )
    if (!decoded) {
      throw new utils_1.CustomError({
        statusCode: 401,
        message: 'Invalid token',
      })
    }
    const user = await client_1.prisma.user.findUnique({
      where: {
        email: decoded.email,
      },
    })
    if (!user) {
      throw new utils_1.CustomError({
        statusCode: 404,
        message: 'User not found',
      })
    }
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    }
    return next()
  } catch (error) {
    return next(error)
  }
}
exports.authenticate = authenticate
