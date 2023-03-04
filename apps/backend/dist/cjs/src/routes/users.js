'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.usersRouter = void 0
const controllers_1 = require('@/controllers')
const auth_1 = require('@/middlewares/auth')
const express_1 = require('express')
exports.usersRouter = (0, express_1.Router)()
exports.usersRouter.get(
  '/me',
  auth_1.authenticate,
  controllers_1.getCurrentUser
)
