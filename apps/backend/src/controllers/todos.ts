/**

  createTodo(title)
  markTodoCompleted(id)
  markTodoUncompleted(id)
  deleteTodo(id)
  listTodos

 */

import { RequestHandler } from 'express'
import { Todo } from '../models'

export const createTodo: RequestHandler = async (req, res, _next) => {
  const { title, userId } = req.body
  // TODO: Validate the request body
  const todo = await Todo.create({ title, userId })
  return res
    .status(200)
    .json({ message: 'Todo created successfully', data: todo.dataValues })
}

export const markTodoCompleted: RequestHandler = async (req, res, _next) => {
  const { id } = req.params
  // TODO: Validate the request body
  const todo = await Todo.findOne({ where: { id } })
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' })
  }

  todo.completed = true
  await todo.save()

  return res.status(200).json({
    message: 'Todo marked completed successfully',
    data: todo.dataValues,
  })
}

export const markTodoUncompleted: RequestHandler = async (req, res, _next) => {
  const { id } = req.params
  // TODO: Validate the request body
  const todo = await Todo.findOne({ where: { id } })
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' })
  }

  todo.completed = false
  await todo.save()

  return res.status(200).json({
    message: 'Todo marked uncompleted successfully',
    data: todo.dataValues,
  })
}

export const deleteTodo: RequestHandler = async (req, res, _next) => {
  const { id } = req.params
  // TODO: Validate the request body
  const todo = await Todo.findOne({ where: { id } })
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' })
  }

  await todo.destroy()

  return res.status(200).json({
    message: 'Todo deleted successfully',
    data: todo.dataValues,
  })
}

export const listTodos: RequestHandler = async (_req, res, _next) => {
  const todos = await Todo.findAll()
  return res.status(200).json({ data: todos })
}
