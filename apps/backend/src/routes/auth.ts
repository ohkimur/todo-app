import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()

export const authRouter = Router()

authRouter.post('/auth/login', async (_req, _res, _next) => {
  // Implment login logic here
})

authRouter.post('/auth/register', async (_req, _res, _next) => {
  // Implment register logic here
})
