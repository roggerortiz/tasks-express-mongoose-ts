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

  static validate(value?: string) {
    if (!value?.length || value.length < 8 || value.length > 20) {
      return true
    }

    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,20}$/.test(value || '')
  }
}
