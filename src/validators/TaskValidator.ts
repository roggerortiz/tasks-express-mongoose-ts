import validateData from '@/middlewares/validateData'
import RequestDataType from '@/types/enums/RequestDataType'
import getTasksSchema from '@/zod/schemas/GetTasksSchema'
import saveTaskSchema from '@/zod/schemas/SaveTaskSchema'

export default class TaskValidator {
  static getTasks = validateData(getTasksSchema, RequestDataType.QUERY)
  static saveTask = validateData(saveTaskSchema, RequestDataType.BODY)
}
