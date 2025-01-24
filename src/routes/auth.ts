import AuthController from '@/controllers/AuthController'
import authHandler from '@/middlewares/authHandler'
import AuthValidator from '@/validators/AuthValidator'
import { Router } from 'express'

const router = Router()

router.post('/login', AuthValidator.login, AuthController.login)
router.post('/signup', AuthValidator.saveUser, AuthController.signup)
router.get('/profile', authHandler, AuthController.profile)
router.put('/profile', authHandler, AuthValidator.saveUser, AuthController.update)

export default router
