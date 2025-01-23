import NodeEnv from '@/types/enums/NodeEnv'

export default class EnvHelper {
  static PORT: number = Number(process.env.PORT) || 3000
  static NODE_ENV: string = process.env.NODE_ENV || NodeEnv.DEVELOPMENT
  static BCRYPT_SALT_ROUNDS: number = Number(process.env.BCRYPT_SALT_ROUNDS) || 10
  static JWT_PRIVATE_KEY: string = process.env.JWT_PRIVATE_KEY || ''
  static MONGO_URI: string = process.env.MONGO_URI || ''
}
