import { format } from 'date-fns'

export default class DateHelper {
  static currentDate(formatStr = 'yyyy/MM/dd HH:mm:ss') {
    return format(new Date(), formatStr)
  }

  static currentTime(formatStr = 'HH:mm') {
    return format(new Date(), formatStr)
  }
}
