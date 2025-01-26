import UserService from '@/database/services/UserService'
import JwtHelper from '@/helpers/JwtHelper'
import ResponseStatus from '@/types/enums/ResponseStatus'
import BadRequestError from '@/types/errors/BadRequestError'
import NotFoundError from '@/types/errors/NotFoundError'
import { CreateUser, UpdateUser, User } from '@/types/models/User'
import { Request } from '@/types/requests/Request'
import { NextFunction, Response } from 'express'

export default class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    /*
      #swagger.tags = ['Auth']
    */
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
    /*
      #swagger.tags = ['Auth']
    */
    try {
      const data: CreateUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password
      }

      const user: User | null = await UserService.create(data)

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
    /*
      #swagger.tags = ['Auth']
      #swagger.security = [{
          "bearerAuth": []
      }]
    */
    try {
      res.status(ResponseStatus.SUCCESS).json(req.user)
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    /*
      #swagger.tags = ['Auth']
      #swagger.security = [{
          "bearerAuth": []
      }]
    */
    try {
      const id: string = req.user?.id ?? ''
      const data: UpdateUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password
      }
      const user: User | null = await UserService.update(id, data)

      if (!user) {
        throw new NotFoundError()
      }

      res.status(ResponseStatus.SUCCESS).json(user)
    } catch (error) {
      next(error)
    }
  }
}
