import { todoSchema } from '@todos/shared'
import { RequestHandler } from 'express'
import { ZodError } from 'zod'
import { Todo } from '../.'

export const createTodo: RequestHandler = async (req, res, _next) => {
  try {
    const { title } = req.body
    const todo = await Todo.create({ title })

    const parsedTodo = todoSchema.parse(todo.dataValues)
    return res
      .status(200)
      .json({ message: 'Todo created successfully', data: parsedTodo })
  } catch (error) {
    console.error(error)

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.issues })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const markTodoCompleted: RequestHandler = async (req, res, _next) => {
  try {
    const { id } = req.params
    const todo = await Todo.findOne({ where: { id } })
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    todo.completed = true
    await todo.save()

    const parsedTodo = todoSchema.parse(todo.dataValues)
    return res.status(200).json({
      message: 'Todo marked completed successfully',
      data: parsedTodo,
    })
  } catch (error) {
    console.error(error)

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.issues })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const markTodoUncompleted: RequestHandler = async (req, res, _next) => {
  try {
    const { id } = req.params
    const todo = await Todo.findOne({ where: { id } })
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    todo.completed = false
    await todo.save()

    const parsedTodo = todoSchema.parse(todo.dataValues)
    return res.status(200).json({
      message: 'Todo marked uncompleted successfully',
      data: parsedTodo,
    })
  } catch (error) {
    console.error(error)

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.issues })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteTodo: RequestHandler = async (req, res, _next) => {
  try {
    const { id } = req.params
    const todo = await Todo.findOne({ where: { id } })
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    await todo.destroy()

    const parsedTodo = todoSchema.parse(todo.dataValues)
    return res.status(200).json({
      message: 'Todo deleted successfully',
      data: parsedTodo,
    })
  } catch (error) {
    console.error(error)

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.issues })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const listTodos: RequestHandler = async (_req, res, _next) => {
  try {
    const todos = await Todo.findAll()
    const parsedTodos = todos.map(todo => todoSchema.parse(todo.dataValues))
    return res.status(200).json({
      data: parsedTodos.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    })
  } catch (error) {
    console.error(error)

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.issues })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const listCompletedTodos: RequestHandler = async (_req, res, _next) => {
  try {
    const todos = await Todo.findAll({ where: { completed: true } })
    const parsedTodos = todos.map(todo => todoSchema.parse(todo.dataValues))
    return res.status(200).json({
      data: parsedTodos.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    })
  } catch (error) {
    console.error(error)

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.issues })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const listUncompletedTodos: RequestHandler = async (
  _req,
  res,
  _next
) => {
  try {
    const todos = await Todo.findAll({ where: { completed: false } })
    const parsedTodos = todos.map(todo => todoSchema.parse(todo.dataValues))
    return res.status(200).json({
      data: parsedTodos.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    })
  } catch (error) {
    console.error(error)

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.issues })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}
