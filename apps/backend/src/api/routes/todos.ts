import { Router } from 'express'

import {
  createTodo,
  deleteTodo,
  listCompletedTodos,
  listTodos,
  listUncompletedTodos,
  markTodoCompleted,
  markTodoUncompleted,
} from '../controllers'

const router = Router()

router.get('/', listTodos)

router.get('/completed', listCompletedTodos)

router.get('/uncompleted', listUncompletedTodos)

router.post('/', createTodo)

router.put('/:id/completed', markTodoCompleted)

router.put('/:id/uncompleted', markTodoUncompleted)

router.delete('/:id', deleteTodo)

export const todoRoutes = router
