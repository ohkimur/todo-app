import { json, urlencoded } from 'body-parser'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { errorHandler, errorLogger, invalidRoute } from './middlewares'
import { todosRouter, usersRouter } from './routes'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(json())
app.use(urlencoded({ extended: true }))

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

// Use the routes
app.use('/api/v1', usersRouter)
app.use('/api/v1', todosRouter)

// Use the error handlers
app.use(errorLogger)
app.use(errorHandler)
app.use(invalidRoute)

app.listen(port, () => {
  console.log(`⚡️[Server]: Server is running at http://localhost:${port}`)
})
