import validateData from '@/middlewares/validateData'
import RequestDataType from '@/types/enums/RequestDataType'
import loginSchema from '@/zod/schemas/LoginSchema'
import signupSchema from '@/zod/schemas/SignupSchema'

export default class AuthValidator {
  static login = validateData(loginSchema, RequestDataType.BODY)
  static signup = validateData(signupSchema, RequestDataType.BODY)
}
