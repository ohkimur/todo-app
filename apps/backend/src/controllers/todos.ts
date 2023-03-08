import { ICustomRequest } from '@/types'
import { CustomError, parseBoolean } from '@/utils'
import { prisma } from '@db/client'
import { CreateTodoSchema, UpdateTodoSchema } from '@todos/shared'
import { NextFunction, Request, Response } from 'express'

const findTodoOrThrow = async (id: number, userId: number) => {
  const todo = await prisma.todo.findFirstOrThrow({
    where: {
      id,
      userId,
    },
  })
  if (!todo) {
    throw new CustomError({
      statusCode: 404,
      message: 'Todo not found',
    })
  }
  return todo
}

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const completed = parseBoolean(req.query.completed)
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user.id,
        completed,
      },
    })
    res.json(todos)
  } catch (error) {
    next(error)
  }
}

export const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id)
    const todo = await findTodoOrThrow(id, req.user.id)
    res.json(todo)
  } catch (error) {
    next(error)
  }
}

export const createTodo = async (
  req: ICustomRequest<CreateTodoSchema>,
  res: Response,
  _next: NextFunction
) => {
  const { title, completed } = req.body
  const newTodo = await prisma.todo.create({
    data: {
      title,
      completed,
      userId: req.user.id,
    },
  })
  res.json(newTodo)
}

export const updateTodo = async (
  req: ICustomRequest<Omit<UpdateTodoSchema, 'id'>>,
  res: Response,
  _next: NextFunction
) => {
  const id = Number(req.params.id)
  const { title, completed } = req.body

  await findTodoOrThrow(id, req.user.id)

  const updatedTodo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      completed,
    },
  })
  res.json(updatedTodo)
}

export const deleteTodo = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const id = Number(req.params.id)

  await findTodoOrThrow(id, req.user.id)

  const deletedTodo = await prisma.todo.delete({
    where: {
      id,
    },
  })
  res.json(deletedTodo)
}
