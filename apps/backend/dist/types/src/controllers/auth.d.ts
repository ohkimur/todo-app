import { ICustomRequest } from '@/types'
import { LoginUserSchema, RegisterUserSchema } from '@todos/shared'
import { NextFunction, Request, Response } from 'express'
export declare const login: (
  req: ICustomRequest<LoginUserSchema>,
  res: Response,
  next: NextFunction
) => Promise<void>
export declare const logout: (
  _req: Request,
  res: Response,
  _next: NextFunction
) => Promise<void>
export declare const register: (
  req: ICustomRequest<RegisterUserSchema>,
  res: Response,
  next: NextFunction
) => Promise<void>
