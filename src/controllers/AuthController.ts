import UserService from '@/database/services/UserService'
import JwtHelper from '@/helpers/JwtHelper'
import ResponseStatus from '@/types/enums/ResponseStatus'
import BadRequestError from '@/types/errors/BadRequestError'
import { CreateUser, User } from '@/types/models/User'
import { Request } from '@/types/requests/Request'
import { NextFunction, Response } from 'express'

export default class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const username: string = req.body.username
      const password: string = req.body.password
      const user: User | null = await UserService.login(username, password)

      if (!user) {
        throw new BadRequestError('Invalid username or password')
      }

      const token: string = JwtHelper.generate(user)
      res.status(ResponseStatus.SUCCESS).json({ token, user })
    } catch (error) {
      next(error)
    }
  }

  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password
      }

      const emailCount: number = await UserService.count({ email: data.email })

      if (emailCount) {
        throw new BadRequestError('Email already exists')
      }

      const usernameCount: number = await UserService.count({ username: data.username })

      if (usernameCount) {
        throw new BadRequestError('Username already exists')
      }

      if (data.phone) {
        const phoneCount: number = await UserService.count({ phone: data.phone })

        if (phoneCount) {
          throw new BadRequestError('Phone already exists')
        }
      }

      const user: User | null = await UserService.signup(data)

      if (!user) {
        throw new BadRequestError()
      }

      const token: string = JwtHelper.generate(user)
      res.status(ResponseStatus.CREATED).json({ token, user })
    } catch (error) {
      next(error)
    }
  }

  static async profile(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(ResponseStatus.SUCCESS).json(req.user)
    } catch (error) {
      next(error)
    }
  }
}
