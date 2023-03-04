'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.errorHandler = exports.errorLogger = void 0
const utils_1 = require('@/utils')
const errorLogger = (error, _req, _res, next) => {
  console.error(error)
  next(error)
}
exports.errorLogger = errorLogger
const errorHandler = (error, _req, res, _next) => {
  if (error instanceof utils_1.CustomError) {
    const statusCode = error.statusCode
    return res.status(statusCode).json({ message: error.message })
  }
  return res.status(500).json({ message: 'Internal server error' })
}
exports.errorHandler = errorHandler
