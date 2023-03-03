import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from '@/controllers'
import { Router } from 'express'

export const todosRouter = Router()

todosRouter.get('/todos', getTodos)

todosRouter.get('/todos/:id', getTodo)

todosRouter.post('/todos', createTodo)

todosRouter.put('/todos/:id', updateTodo)

todosRouter.delete('/todos/:id', deleteTodo)
