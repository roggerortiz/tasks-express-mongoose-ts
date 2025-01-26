import { Request as ExpressRequest } from 'express'
import { User } from '../models/User'

export type Request = ExpressRequest & {
  user?: User
}
