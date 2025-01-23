import NodeEnv from '@/types/enums/NodeEnv'
import EnvHelper from './EnvHelper'

export default class ServerHelper {
  static isDevelopment() {
    return EnvHelper.NODE_ENV === NodeEnv.DEVELOPMENT
  }

  static isProduction() {
    return EnvHelper.NODE_ENV === NodeEnv.PRODUCTION
  }
}
