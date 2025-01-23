import { User } from '@/types/models/User'
import jwt, { JwtPayload } from 'jsonwebtoken'
import EnvHelper from './EnvHelper'

export default class JwtHelper {
  static generate(user: User): string {
    const { id, ...data } = user
    const token: string = jwt.sign(
      {
        data: { sub: id, ...data },
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      },
      EnvHelper.JWT_PRIVATE_KEY
    )

    return token
  }

  static verify(token: string): any {
    const decoded: string | JwtPayload = jwt.verify(token, EnvHelper.JWT_PRIVATE_KEY)
    return decoded
  }
}
