'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const middlewares_1 = require('@/middlewares')
const routes_1 = require('@/routes')
const body_parser_1 = require('body-parser')
const cookie_parser_1 = __importDefault(require('cookie-parser'))
const cors_1 = __importDefault(require('cors'))
const dotenv_1 = __importDefault(require('dotenv'))
const express_1 = __importDefault(require('express'))
dotenv_1.default.config()
const app = (0, express_1.default)()
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
app.use((0, body_parser_1.json)())
app.use((0, cookie_parser_1.default)())
app.use((0, cors_1.default)(corsOptions))
app.use((0, body_parser_1.urlencoded)({ extended: true }))
// Use the routes
app.use('/api/v1', routes_1.authRouter)
app.use('/api/v1', routes_1.usersRouter)
app.use('/api/v1', routes_1.todosRouter)
// Use the error handlers
app.use(middlewares_1.errorLogger)
app.use(middlewares_1.errorHandler)
app.use(middlewares_1.invalidRoute)
app.listen(port, () => {
  console.log(`⚡️[Server]: Server is running at http://localhost:${port}`)
})
