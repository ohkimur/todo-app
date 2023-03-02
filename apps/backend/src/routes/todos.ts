import { CustomError } from '@/utils'
import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()

export const todosRouter = Router()

todosRouter.get('/todos', async (_req, res, next) => {
  try {
    const todos = await prisma.todo.findMany()
    res.json(todos)
  } catch (error) {
    next(error)
  }
})

todosRouter.get('/todos/:id', async (req, res, next) => {
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
})

todosRouter.post('/todos', async (req, res, next) => {
  try {
    const { title, completed } = req.body
    const newTodo = await prisma.todo.create({
      data: {
        title,
        completed,
        userId: 1,
      },
    })
    res.json(newTodo)
  } catch (error) {
    next(error)
  }
})

todosRouter.put('/todos/:id', async (req, res, next) => {
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
})

todosRouter.delete('/todos/:id', async (req, res, next) => {
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
})
