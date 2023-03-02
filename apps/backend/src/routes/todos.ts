import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()

export const todosRouter = Router()

// crud for todos

todosRouter.get('/todos', async (_req, res) => {
  const todos = await prisma.todo.findMany()
  res.json(todos)
})

todosRouter.get('/todos/:id', async (req, res) => {
  const { id } = req.params
  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(id),
    },
  })
  res.json(todo)
})
