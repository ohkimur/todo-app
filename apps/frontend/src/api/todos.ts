import { GetTodosSchema, TodoSchema, todoSchema } from '@todos/shared'

import { z } from 'zod'
import { API_BASEPATH } from '.'

const todosSchema = z.array(todoSchema)

export const getTodos = async ({ completed }: GetTodosSchema) => {
  const response = await fetch(`${API_BASEPATH}/todos?completed=${completed}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  const json = await response.json()
  return todosSchema.parse(json)
}

export const createTodo = async ({ title }: Pick<TodoSchema, 'title'>) => {
  const response = await fetch(`${API_BASEPATH}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ title }),
  })
  const json = await response.json()
  return todoSchema.parse(json)
}
