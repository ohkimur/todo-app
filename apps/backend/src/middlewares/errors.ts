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
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode || 500
  res.status(statusCode).json({ message: error.message })
}
