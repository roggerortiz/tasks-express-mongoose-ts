import Pager from '@/types/pagination/Pager'
import { Request } from 'express'

export default class RequestHelper {
  static queryParamString(req: Request, key: string) {
    return req.query[key.toLowerCase()]?.toString()
  }

  static queryParamNumber(req: Request, key: string) {
    const value: string | undefined = req.query[key.toLowerCase()]?.toString()
    return value ? parseInt(value) : undefined
  }

  static queryParamBoolean(req: Request, key: string) {
    const value: string | undefined = req.query[key.toLowerCase()]?.toString()?.toLowerCase()

    if (!value) {
      return undefined
    }

    return value === '1' || value === 'true' || value === 'on'
  }

  static pager(req: Request): Pager {
    const page_size = this.queryParamNumber(req, 'page_size') ?? 0
    const page_index = this.queryParamNumber(req, 'page_index') ?? 1
    const sort_field = this.queryParamString(req, 'sort_field') ?? ''
    const sort_direction = this.queryParamString(req, 'sort_direction') ?? ''

    const pager: Pager = {
      page_size,
      page_index,
      page_count: 0,
      sort_field,
      sort_direction,
      total_items: 0
    }

    return pager
  }
}
