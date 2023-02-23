import dotenv from 'dotenv'
import express from 'express'
import { connection } from './config'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (_req, res) => {
  res.send('Express + TypeScript Server = 🎉')
})

connection.sync().then(() => {
  app.listen(port, () => {
    console.log(`⚡️[Server]: Server is running at http://localhost:${port}`)
  })
})
