import { validate } from '@/middlewares'
import { PrismaClient } from '@prisma/client'
import { loginUserSchema, registerUserSchema } from '@todos/shared'
import { Router } from 'express'

const prisma = new PrismaClient()

export const authRouter = Router()

authRouter.post(
  '/auth/login',
  validate(loginUserSchema),
  async (_req, res, _next) => {
    // Implment login logic here
    res.json({ message: 'Login successful' })
  }
)

authRouter.post(
  '/auth/register',
  validate(registerUserSchema),
  async (_req, res, _next) => {
    // Implment register logic here
    res.json({ message: 'Register successful' })
  }
)
