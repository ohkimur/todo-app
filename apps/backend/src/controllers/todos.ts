import { ICustomRequest } from '@/types'
import { CustomError } from '@/utils'
import { PrismaClient } from '@prisma/client'
import { CreateTodoSchema, UpdateTodoSchema } from '@todos/shared'
import { NextFunction, Request, Response } from 'express'

const prisma = new PrismaClient()

const findTodoOrThrow = async (id: number | string) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(id),
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
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await prisma.todo.findMany()
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
    const { id } = req.params
    const todo = await findTodoOrThrow(id)
    res.json(todo)
  } catch (error) {
    next(error)
  }
}

export const createTodo = async (
  req: ICustomRequest<CreateTodoSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, completed } = req.body
    const newTodo = await prisma.todo.create({
      data: {
        title,
        completed: completed || false,
        userId: 1,
      },
    })
    res.json(newTodo)
  } catch (error) {
    next(error)
  }
}

export const updateTodo = async (
  req: ICustomRequest<UpdateTodoSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { title, completed } = req.body

    await findTodoOrThrow(id)

    const updatedTodo = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        completed,
      },
    })
    res.json(updatedTodo)
  } catch (error) {
    next(error)
  }
}

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    await findTodoOrThrow(id)

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(deletedTodo)
  } catch (error) {
    next(error)
  }
}
