import { Request } from 'express'

export default class RequestHelper {
  static queryParamString(req: Request, key: string) {
    return req.query[key.toLowerCase()]?.toString()
  }

  static queryParamNumber(req: Request, key: string) {
    const value: string | undefined = req.query[key.toLowerCase()]?.toString()
    return value ? parseInt(value) : undefined
  }
}
