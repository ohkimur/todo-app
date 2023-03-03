import { getCurrentUser } from '@/controllers'
import { authenticate } from '@/middlewares/auth'
import { Router } from 'express'

export const usersRouter = Router()

usersRouter.get('/me', authenticate, getCurrentUser)
