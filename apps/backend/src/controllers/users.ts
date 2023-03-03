import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const getCurrentUser = async (_req: Request, res: Response) => {
  const user = await prisma.user.findFirst()
  if (!user) {
    return res.status(404).send('User not found')
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
  })
}
