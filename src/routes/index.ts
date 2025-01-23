import DateHelper from '@/helpers/DateHelper'
import authHandler from '@/middlewares/authHandler'
import { Request, Response, Router } from 'express'
import authRouter from './auth'
import userRouter from './tasks'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send(`Success: ${DateHelper.currentDate()}`)
})

router.use('/auth', authRouter)
router.use('/tasks', authHandler, userRouter)

export default router
