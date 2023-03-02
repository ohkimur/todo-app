// create users routers
import { Router } from 'express'

export const usersRouter = Router()

usersRouter.get('/me', (_req, res) => {
  res.send('Hello Daniel!')
})
