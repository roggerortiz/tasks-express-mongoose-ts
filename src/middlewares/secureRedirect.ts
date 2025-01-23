import ServerHelper from '@/helpers/ServerHelper'
import { NextFunction, Request, Response } from 'express'

const secureRedirect = (req: Request, res: Response, next: NextFunction) => {
  if (ServerHelper.isProduction() && !req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`)
  }

  return next()
}

export default secureRedirect
