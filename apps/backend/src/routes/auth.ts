import { login, logout, register } from '@/controllers'
import { validate } from '@/middlewares'
import { loginUserSchema, registerUserSchema } from '@todos/shared'
import { Router } from 'express'

export const authRouter = Router()

authRouter.post('/auth/login', validate(loginUserSchema), login)

authRouter.post('/auth/register', validate(registerUserSchema), register)

authRouter.post('/auth/logout', logout)
