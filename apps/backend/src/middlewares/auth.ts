import { CustomError } from '@/utils'
import { prisma } from '@db/client'
import { UserSchema } from '@todos/shared'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token
    if (!token) {
      throw new CustomError({
        statusCode: 401,
        message: 'Unauthorized',
      })
    }

    const decoded = jwt.verify(token, String(process.env.JWT_SECRET))
    if (!decoded) {
      throw new CustomError({
        statusCode: 401,
        message: 'Invalid token',
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: (decoded as UserSchema).email,
      },
    })
    if (!user) {
      throw new CustomError({
        statusCode: 404,
        message: 'User not found',
      })
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    }
    return next()
  } catch (error) {
    return next(error)
  }
}
