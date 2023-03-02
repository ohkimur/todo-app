import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()

export const authRouter = Router()

authRouter.get('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    console.log(email, password)
    res.json({ message: 'Login' })
  } catch (error) {
    next(error)
  }
})
