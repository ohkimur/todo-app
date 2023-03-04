import { ICustomRequest } from '@/types'
import { CreateTodoSchema, UpdateTodoSchema } from '@todos/shared'
import { NextFunction, Request, Response } from 'express'
export declare const getTodos: (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>
export declare const getTodo: (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>
export declare const createTodo: (
  req: ICustomRequest<CreateTodoSchema>,
  res: Response,
  next: NextFunction
) => Promise<void>
export declare const updateTodo: (
  req: ICustomRequest<Omit<UpdateTodoSchema, 'id'>>,
  res: Response,
  next: NextFunction
) => Promise<void>
export declare const deleteTodo: (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>
