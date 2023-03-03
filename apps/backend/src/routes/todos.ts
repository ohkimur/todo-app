import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from '@/controllers'
import { validate } from '@/middlewares'
import { createTodoSchema, updateTodoSchema } from '@todos/shared'
import { Router } from 'express'

export const todosRouter = Router()

todosRouter.get('/todos', getTodos)

todosRouter.get('/todos/:id', getTodo)

todosRouter.post('/todos', validate(createTodoSchema), createTodo)

todosRouter.put('/todos/:id', validate(updateTodoSchema), updateTodo)

todosRouter.delete('/todos/:id', deleteTodo)
