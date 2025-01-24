import bcrypt from 'bcrypt'
import EnvHelper from './EnvHelper'

export default class PasswordHelper {
  static hash(password: string): string {
    return bcrypt.hashSync(password, EnvHelper.BCRYPT_SALT_ROUNDS)
  }

  static compare (password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash)
  }

  static validate(value?: string) {
    if (!value?.length || value.length < 8 || value.length > 20) {
      return true
    }

    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,20}$/.test(value || '')
  }
}
