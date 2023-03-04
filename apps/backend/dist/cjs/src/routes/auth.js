'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.authRouter = void 0
const controllers_1 = require('@/controllers')
const middlewares_1 = require('@/middlewares')
const shared_1 = require('@todos/shared')
const express_1 = require('express')
exports.authRouter = (0, express_1.Router)()
exports.authRouter.post(
  '/auth/login',
  (0, middlewares_1.validate)(shared_1.loginUserSchema),
  controllers_1.login
)
exports.authRouter.post(
  '/auth/register',
  (0, middlewares_1.validate)(shared_1.registerUserSchema),
  controllers_1.register
)
exports.authRouter.post('/auth/logout', controllers_1.logout)
