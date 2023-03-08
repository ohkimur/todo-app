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

const origin =
  process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_PROD_URL
    : 'http://localhost:5173'

app.enable('trust proxy')

app.use(
  cors({
    origin,
    credentials: true,
  })
)
app.use(json())
app.use(cookieParser())
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
