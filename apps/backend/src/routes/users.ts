import { getCurrentUser } from '@/controllers'
import { Router } from 'express'

export const usersRouter = Router()

usersRouter.get('/me', getCurrentUser)
