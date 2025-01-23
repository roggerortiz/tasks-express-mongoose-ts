import validateData from '@/middlewares/validateData'
import RequestDataType from '@/types/enums/RequestDataType'
import idSchema from '@/zod/schemas/IdSchema'

export default class IdValidator {
  static id = validateData(idSchema, RequestDataType.PARAMS)
}
