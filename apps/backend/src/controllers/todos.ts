import { ICustomeRequest } from '@/types'
import { CustomError } from '@/utils'
import { PrismaClient } from '@prisma/client'
import { TodoSchema } from '@todos/shared'
import { NextFunction, Request, Response } from 'express'

const prisma = new PrismaClient()

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

    res.json(todo)
  } catch (error) {
    next(error)
  }
}

export const createTodo = async (
  req: ICustomeRequest<TodoSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, completed } = req.body

    if (!title) {
      throw new CustomError({
        statusCode: 400,
        message: 'Title is required',
      })
    }

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
  req: ICustomeRequest<TodoSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { title, completed } = req.body

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
