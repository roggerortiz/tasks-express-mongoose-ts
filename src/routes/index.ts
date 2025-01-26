import authHandler from '@/middlewares/authHandler'
import { Router } from 'express'
import authRouter from './auth'
import userRouter from './tasks'

const router = Router()

router.use('/auth', authRouter)
router.use('/tasks', authHandler, userRouter)

export default router
