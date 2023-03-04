'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.todosRouter = void 0
const controllers_1 = require('@/controllers')
const middlewares_1 = require('@/middlewares')
const auth_1 = require('@/middlewares/auth')
const shared_1 = require('@todos/shared')
const express_1 = require('express')
exports.todosRouter = (0, express_1.Router)()
exports.todosRouter.get('/todos', auth_1.authenticate, controllers_1.getTodos)
exports.todosRouter.get(
  '/todos/:id',
  auth_1.authenticate,
  controllers_1.getTodo
)
exports.todosRouter.post(
  '/todos',
  (0, middlewares_1.validate)(shared_1.createTodoSchema),
  auth_1.authenticate,
  controllers_1.createTodo
)
exports.todosRouter.patch(
  '/todos/:id',
  (0, middlewares_1.validate)(
    shared_1.updateTodoSchema.omit({
      id: true,
    })
  ),
  auth_1.authenticate,
  controllers_1.updateTodo
)
exports.todosRouter.delete(
  '/todos/:id',
  auth_1.authenticate,
  controllers_1.deleteTodo
)
