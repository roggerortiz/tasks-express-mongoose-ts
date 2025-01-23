import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import RequestDataType from '../types/enums/RequestDataType'

const validateData = (schema: z.ZodObject<any, any>, type: RequestDataType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[type])
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default validateData
