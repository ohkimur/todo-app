import { CustomError } from '@/utils'
export const errorLogger = (error, _req, _res, next) => {
  console.error(error)
  next(error)
}
export const errorHandler = (error, _req, res, _next) => {
  if (error instanceof CustomError) {
    const statusCode = error.statusCode
    return res.status(statusCode).json({ message: error.message })
  }
  return res.status(500).json({ message: 'Internal server error' })
}
