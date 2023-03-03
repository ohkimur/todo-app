import { Request } from 'express'

export interface ICustomeRequest<T> extends Request {
  body: Partial<T>
}
