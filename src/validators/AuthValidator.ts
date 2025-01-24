import validateData from '@/middlewares/validateData'
import RequestDataType from '@/types/enums/RequestDataType'
import loginSchema from '@/zod/schemas/LoginSchema'
import saveUserSchema from '@/zod/schemas/SaveUserSchema'

export default class AuthValidator {
  static login = validateData(loginSchema, RequestDataType.BODY)
  static saveUser = validateData(saveUserSchema, RequestDataType.BODY)
}
