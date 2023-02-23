import { Router } from 'express'

import {
  createTodo,
  deleteTodo,
  listTodos,
  markTodoCompleted,
  markTodoUncompleted,
} from '../controllers'

const router = Router()

router.get('/', listTodos)

router.post('/', createTodo)

router.put('/:id/completed', markTodoCompleted)

router.put('/:id/uncompleted', markTodoUncompleted)

router.delete('/:id', deleteTodo)

export const todoRoutes = router
