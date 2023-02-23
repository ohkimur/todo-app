import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'

dotenv.config()

import { AuthToken, Todo, User } from '../api'

export const connection = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [Todo, User, AuthToken],
})
