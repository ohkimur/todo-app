import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from '@/controllers'
import { validate } from '@/middlewares'
import { authenticate } from '@/middlewares/auth'
import { createTodoSchema, updateTodoSchema } from '@todos/shared'
import { Router } from 'express'

export const todosRouter = Router()

todosRouter.get('/todos', authenticate, getTodos)

todosRouter.get('/todos/:id', authenticate, getTodo)

todosRouter.post('/todos', validate(createTodoSchema), authenticate, createTodo)

todosRouter.patch(
  '/todos/:id',
  validate(
    updateTodoSchema.omit({
      id: true,
    })
  ),
  authenticate,
  updateTodo
)

todosRouter.delete('/todos/:id', authenticate, deleteTodo)
