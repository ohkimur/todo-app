import { TodoSchema, todoSchema } from '@todos/shared'

import { z } from 'zod'

const todosSchema = z.array(todoSchema)

export const getTodos = async (
  filter: 'all' | 'completed' | 'uncompleted' = 'all'
) => {
  const response = await fetch(
    `http://localhost:3000/todos/${filter !== 'all' ? filter : ''}`
  )
  const { data: todos } = await response.json()

  try {
    const parsedTodos = todosSchema.parse(todos)
    return parsedTodos
  } catch (error) {
    console.error(error)
    return []
  }
}

export const createTodo = async (todo: Pick<TodoSchema, 'title'>) => {
  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  const { data: newTodo } = await response.json()

  try {
    const parsedTodo = todosSchema.parse([newTodo])
    return parsedTodo
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const deleteTodo = async (id: number) => {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE',
  })
  const { data: deletedTodo } = await response.json()

  try {
    const parsedTodo = todosSchema.parse([deletedTodo])
    return parsedTodo
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const completeTodo = async (id: number) => {
  const response = await fetch(`http://localhost:3000/todos/${id}/completed`, {
    method: 'PUT',
  })
  const { data: completedTodo } = await response.json()

  try {
    const parsedTodo = todosSchema.parse([completedTodo])
    return parsedTodo
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const uncompleteTodo = async (id: number) => {
  const response = await fetch(
    `http://localhost:3000/todos/${id}/uncompleted`,
    {
      method: 'PUT',
    }
  )
  const { data: uncompletedTodo } = await response.json()

  try {
    const parsedTodo = todosSchema.parse([uncompletedTodo])
    return parsedTodo
  } catch (error) {
    console.error(error)
    return {}
  }
}
