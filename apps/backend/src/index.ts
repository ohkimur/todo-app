import { json, urlencoded } from 'body-parser'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'

import { connection } from './config'
import { todoRoutes } from './routes'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/todos', todoRoutes)

app.use((error: Error, _req: Request, res: Response) => {
  res.status(500).json({ message: error.message })
})

connection.sync().then(() => {
  app.listen(port, () => {
    console.log(`⚡️[Server]: Server is running at http://localhost:${port}`)
  })
})
