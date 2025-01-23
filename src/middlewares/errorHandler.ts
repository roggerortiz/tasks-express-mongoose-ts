import ErrorHelper from '@/helpers/ErrorHelper'
import { NextFunction, Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const { status, message, errors } = ErrorHelper.verify(error)

  if (message) {
    res.status(status).json({ message })
    return
  }

  if (errors) {
    res.status(status).json({ errors })
    return
  }

  res.status(status).json()
}

export default errorHandler
