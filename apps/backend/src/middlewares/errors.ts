import { NextFunction, Request, Response } from 'express'
import { CustomError } from './CustomError'

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

export const invalidRoute = (_req: Request, res: Response) => {
  res.status(404).json({ message: 'Invalid route' })
}
