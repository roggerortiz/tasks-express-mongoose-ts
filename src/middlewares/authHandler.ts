import JwtHelper from '@/helpers/JwtHelper'
import ForbiddenError from '@/types/errors/ForbiddenError'
import { User } from '@/types/models/User'
import { Request } from '@/types/requests/Request'
import { NextFunction, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'

const authHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = req.header('Authorization')?.trim()?.replace('Bearer ', '') || ''

    if (!token) {
      throw new ForbiddenError()
    }

    const decoded: JwtPayload = JwtHelper.verify(token)
    const { sub, ...data } = decoded.data

    const user: User = { id: sub, ...data }
    req.user = user

    return next()
  } catch (error) {
    next(error)
  }
}

export default authHandler
