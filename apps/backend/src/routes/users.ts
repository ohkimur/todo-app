import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()

export const usersRouter = Router()

usersRouter.get('/me', async (_req, res) => {
  const user = await prisma.user.findFirst()
  if (!user) {
    return res.status(404).send('User not found')
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
  })
})
