import { getCurrentUser } from '@/controllers'
import { authorize } from '@/middlewares/auth'
import { Router } from 'express'

export const usersRouter = Router()

usersRouter.get('/me', authorize, getCurrentUser)
