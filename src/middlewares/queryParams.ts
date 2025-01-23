import { NextFunction, Request, Response } from 'express'

const queryParams = (req: Request, res: Response, next: NextFunction) => {
  const query = req.query

  req.query = {}
  Object.entries(query).forEach(([key, value]) => (req.query[key.toLowerCase()] = value))

  return next()
}

export default queryParams
