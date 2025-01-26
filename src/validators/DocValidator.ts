import validateData from '@/middlewares/validateData'
import RequestDataType from '@/types/enums/RequestDataType'
import docFileSchema from '@/zod/schemas/DocFileSchema'

export default class DocValidator {
  static file = validateData(docFileSchema, RequestDataType.QUERY)
}
