import { errorHandler, errorLogger, invalidRoute } from '@/middlewares'
import { authRouter, todosRouter, usersRouter } from '@/routes'
import { json, urlencoded } from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

const FRONTEND_PROD_URL =
  process.env.FRONTEND_PROD_URL || 'https://todo-app-frontend.vercel.app'
const FRONTEND_DEV_URL = process.env.FRONTEND_DEV_URL || 'http://localhost:5173'

const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? FRONTEND_PROD_URL
      : FRONTEND_DEV_URL,
  credentials: true,
}

app.enable('trust proxy')

app.use(json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(urlencoded({ extended: true }))

app.get('/', (_req, res) => {
  res.send('Hey this is the todo-app API running 🥳')
})

// Use the routes
app.use('/api/v1', authRouter)
app.use('/api/v1', usersRouter)
app.use('/api/v1', todosRouter)

// Use the error handlers
app.use(errorLogger)
app.use(errorHandler)
app.use(invalidRoute)

app.listen(port, () => {
  console.log(`⚡️[Server]: Server is running at http://localhost:${port}`)
})
