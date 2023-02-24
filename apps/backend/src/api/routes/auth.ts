import { Router } from 'express'
import { login, register } from '..'

const router = Router()

router.post('/register', register)

router.post('/login', login)

export const authRoutes = router
