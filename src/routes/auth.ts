import AuthController from '@/controllers/AuthController'
import authHandler from '@/middlewares/authHandler'
import AuthValidator from '@/validators/AuthValidator'
import { Router } from 'express'

const router = Router()

router.post('/login', AuthValidator.login, AuthController.login)
router.post('/signup', AuthValidator.signup, AuthController.signup)
router.get('/profile', authHandler, AuthController.profile)

export default router
