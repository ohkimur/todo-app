import { json, urlencoded } from 'body-parser'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(json())
app.use(urlencoded({ extended: true }))

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/users', async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.listen(port, () => {
  console.log(`⚡️[Server]: Server is running at http://localhost:${port}`)
})
