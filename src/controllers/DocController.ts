import SwaggerHelper from '@/helpers/SwaggerHelper'
import DocFileFormat from '@/types/enums/DocFileFormat'
import ResponseStatus from '@/types/enums/ResponseStatus'
import { NextFunction, Request, Response } from 'express'

export default class DocController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const format = req.query.format?.toString()?.toLowerCase() || DocFileFormat.UI

      if (format === DocFileFormat.JSON) {
        res.status(ResponseStatus.SUCCESS).download(SwaggerHelper.jsonPath)
        return
      }

      if (format === DocFileFormat.YAML) {
        res.set('Content-Type', 'text/yaml')
        res.status(ResponseStatus.SUCCESS).download(SwaggerHelper.yamlPath)
        return
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}
