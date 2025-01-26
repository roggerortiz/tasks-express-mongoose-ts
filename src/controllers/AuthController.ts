import UserService from '@/database/services/UserService'
import JwtHelper from '@/helpers/JwtHelper'
import ResponseStatus from '@/types/enums/ResponseStatus'
import BadRequestError from '@/types/errors/BadRequestError'
import NotFoundError from '@/types/errors/NotFoundError'
import { CreateUser, UpdateUser, User } from '@/types/models/User'
import { Request } from '@/types/request/Request'
import { NextFunction, Response } from 'express'

export default class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    /*
      #swagger.tags = ['Auth']
      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginUser'
            }
          }
        }
      }
      #swagger.responses[200] = {
        content: {
          'application/json': {
            schema:{
              $ref: '#/components/schemas/AuthenticatedUser'
            }
          }
        }
      }
      #swagger.responses[400] = {
        content: {
          'application/json': {
            schema: {
              oneOf: [
                {
                  $ref: '#/components/schemas/Message'
                },
                {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              ]
            }
          }
        }
      }
      #swagger.responses[500] = {}
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
      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SaveUser'
            }
          }
        }
      }
      #swagger.responses[201] = {
        content: {
          'application/json': {
            schema:{
              $ref: '#/components/schemas/AuthenticatedUser'
            }
          }
        }
      }
      #swagger.responses[400] = {
        content: {
          'application/json': {
            schema:{
              type: 'array',
              items: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
      #swagger.responses[500] = {}
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
          'bearerAuth': []
      }]
      #swagger.responses[200] = {
        content: {
          'application/json': {
            schema:{
              $ref: '#/components/schemas/User'
            }
          }
        }
      }
      #swagger.responses[401] = {}
      #swagger.responses[403] = {}
      #swagger.responses[500] = {}
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
          'bearerAuth': []
      }]
      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SaveUser'
            }
          }
        }
      }
      #swagger.responses[200] = {
        content: {
          'application/json': {
            schema:{
              $ref: '#/components/schemas/User'
            }
          }
        }
      }
      #swagger.responses[400] = {
        content: {
          'application/json': {
            schema:{
              type: 'array',
              items: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
      #swagger.responses[401] = {}
      #swagger.responses[403] = {}
      #swagger.responses[404] = {}
      #swagger.responses[500] = {}
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
