import bcrypt from 'bcrypt'
import EnvHelper from './EnvHelper'

export default class PasswordHelper {
  static async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, EnvHelper.BCRYPT_SALT_ROUNDS)
    return hash
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hash)
    return result
  }
}
