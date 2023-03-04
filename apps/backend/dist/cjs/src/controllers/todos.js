'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.deleteTodo =
  exports.updateTodo =
  exports.createTodo =
  exports.getTodo =
  exports.getTodos =
    void 0
const utils_1 = require('@/utils')
const client_1 = require('@db/client')
const findTodoOrThrow = async (id, userId) => {
  const todo = await client_1.prisma.todo.findUnique({
    where: {
      id: Number(id),
    },
  })
  if (!todo) {
    throw new utils_1.CustomError({
      statusCode: 404,
      message: 'Todo not found',
    })
  }
  if (todo.userId !== userId) {
    throw new utils_1.CustomError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }
  return todo
}
const getTodos = async (req, res, next) => {
  try {
    const completed =
      req.query.completed === 'true' || req.query.completed === 'false'
        ? req.query.completed === 'true'
        : undefined
    const todos = await client_1.prisma.todo.findMany({
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
exports.getTodos = getTodos
const getTodo = async (req, res, next) => {
  try {
    const { id } = req.params
    const todo = await findTodoOrThrow(id, req.user.id)
    res.json(todo)
  } catch (error) {
    next(error)
  }
}
exports.getTodo = getTodo
const createTodo = async (req, res, next) => {
  try {
    const { title, completed } = req.body
    const newTodo = await client_1.prisma.todo.create({
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
exports.createTodo = createTodo
const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, completed } = req.body
    await findTodoOrThrow(id, req.user.id)
    const updatedTodo = await client_1.prisma.todo.update({
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
exports.updateTodo = updateTodo
const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params
    await findTodoOrThrow(id, req.user.id)
    const deletedTodo = await client_1.prisma.todo.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(deletedTodo)
  } catch (error) {
    next(error)
  }
}
exports.deleteTodo = deleteTodo
