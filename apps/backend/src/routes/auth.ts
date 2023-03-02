import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'
import { Router } from 'express'
import { CustomError } from '../middlewares'

const prisma = new PrismaClient()

export const authRouter = Router()

authRouter.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    console.log(email, password)

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      throw new CustomError({
        statusCode: 404,
        message: 'User not found',
      })
    }

    const validPassword = await argon2.verify(user.password, password)
    if (!validPassword) {
      throw new CustomError({
        statusCode: 401,
        message: 'Invalid password',
      })
    }

    if (user.email !== email) {
      throw new CustomError({
        statusCode: 401,
        message: 'Invalid email',
      })
    }

    res.json({ message: 'Login' })
  } catch (error) {
    next(error)
  }
})

authRouter.post('/auth/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (user) {
      throw new CustomError({
        statusCode: 400,
        message: 'User already exists',
      })
    }

    const hash = await argon2.hash(password)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    })

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    })
  } catch (error) {
    next(error)
  }
})
