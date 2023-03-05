import { CustomError } from '@/utils'
import { prisma } from '@db/client'
const findTodoOrThrow = async (id, userId) => {
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
  if (todo.userId !== userId) {
    throw new CustomError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }
  return todo
}
export const getTodos = async (req, res, next) => {
  try {
    const completed =
      req.query.completed === 'true' || req.query.completed === 'false'
        ? req.query.completed === 'true'
        : undefined
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user.id,
        completed,
      },
    })
    res.json(todos)
  } catch (error) {
    next(error)
  }
}
export const getTodo = async (req, res, next) => {
  try {
    const { id } = req.params
    const todo = await findTodoOrThrow(id, req.user.id)
    res.json(todo)
  } catch (error) {
    next(error)
  }
}
export const createTodo = async (req, res, next) => {
  try {
    const { title, completed } = req.body
    const newTodo = await prisma.todo.create({
      data: {
        title,
        completed: completed || false,
        userId: req.user.id,
      },
    })
    res.json(newTodo)
  } catch (error) {
    next(error)
  }
}
export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, completed } = req.body
    await findTodoOrThrow(id, req.user.id)
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
}
export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params
    await findTodoOrThrow(id, req.user.id)
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(deletedTodo)
  } catch (error) {
    next(error)
  }
}
