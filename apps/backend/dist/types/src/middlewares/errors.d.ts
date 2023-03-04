import { CustomError } from '@/utils'
import { NextFunction, Request, Response } from 'express'
export declare const errorLogger: (
  error: CustomError,
  _req: Request,
  _res: Response,
  next: NextFunction
) => void
export declare const errorHandler: (
  error: CustomError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => Response<any, Record<string, any>>
