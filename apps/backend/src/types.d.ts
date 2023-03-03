import { UserSchema } from '@todos/shared'
import { Request } from 'express'

declare global {
  namespace Express {
    export interface Request {
      user?: Omit<UserSchema, 'password', 'createdAt'>
    }
  }
}

export interface ICustomRequest<T> extends Request {
  body: T
}
