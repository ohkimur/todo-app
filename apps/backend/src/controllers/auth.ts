import { ICustomRequest } from '@/types'
import { CustomError } from '@/utils'
import { prisma } from '@db/client'
import { LoginUserSchema, RegisterUserSchema } from '@todos/shared'
import argon2 from 'argon2'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const createToken = (user: LoginUserSchema) => {
  return jwt.sign({ email: user.email }, String(process.env.JWT_SECRET), {
    expiresIn: '1d',
  })
}

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
        statusCode: 401,
        message: 'Account does not exist',
      })
    }

    const isPasswordValid = await argon2.verify(user.password, password)
    if (!isPasswordValid) {
      throw new CustomError({
        statusCode: 401,
        message: 'Invalid credentials',
      })
    }

    const token = createToken(user)

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'strict',
      })
      .json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        message: 'Login successful',
      })
  } catch (error) {
    next(error)
  }
}

export const logout = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .json({
      message: 'Logout successful',
    })
}

export const register = async (
  req: ICustomRequest<RegisterUserSchema>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body

  try {
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

    const token = createToken(newUser)

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'strict',
      })
      .json({
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        message: 'Registration successful',
      })
  } catch (error) {
    next(error)
  }
}
