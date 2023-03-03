import { ICustomRequest } from '@/types'
import { CustomError } from '@/utils'
import { prisma } from '@db/client'
import { LoginUserSchema, RegisterUserSchema } from '@todos/shared'
import argon2 from 'argon2'
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

export const login = async (
  req: ICustomRequest<LoginUserSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

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

    const isPasswordValid = await argon2.verify(user.password, password)
    if (!isPasswordValid) {
      throw new CustomError({
        statusCode: 401,
        message: 'Invalid credentials',
      })
    }

    const token = jwt.sign(
      { email: user.email },
      String(process.env.JWT_SECRET),
      {
        expiresIn: '1d',
      }
    )

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
      message: 'Login successful',
    })
  } catch (error) {
    next(error)
  }
}

export const register = async (
  req: ICustomRequest<RegisterUserSchema>,
  res: Response,
  next: NextFunction
) => {
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

    const hasehdPassword = await argon2.hash(password)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hasehdPassword,
      },
    })

    const token = jwt.sign(
      { email: newUser.email },
      String(process.env.JWT_SECRET),
      {
        expiresIn: '1d',
      }
    )

    res.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
      message: 'User created successfully',
    })
  } catch (error) {
    next(error)
  }
}
