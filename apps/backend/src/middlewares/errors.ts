import { CustomError } from '@/utils'
import { NextFunction, Request, Response } from 'express'

export const errorLogger = (
  error: CustomError,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.error(error)
  next(error)
}

export const errorHandler = (
  error: CustomError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof CustomError) {
    const statusCode = error.statusCode
    return res.status(statusCode).json({ message: error.message })
  }
  return res.status(500).json({ message: 'Internal server error' })
}
