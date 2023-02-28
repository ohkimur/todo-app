import { json, urlencoded } from 'body-parser'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(json())
app.use(urlencoded({ extended: true }))

app.use((error: Error, _req: Request, res: Response) => {
  res.status(500).json({ message: error.message })
})

app.listen(port, () => {
  console.log(`⚡️[Server]: Server is running at http://localhost:${port}`)
})
