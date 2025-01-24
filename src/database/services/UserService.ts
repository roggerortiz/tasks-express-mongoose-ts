import PasswordHelper from '@/helpers/PasswordHelper'
import { CreateUser, UpdateUser, User } from '@/types/models/User'
import { HydratedDocument } from 'mongoose'
import BaseModel from '../models/BaseModel'
import UserModel, { IUser } from '../models/UserModel'

export default class UserService {
  static async login(username: string, password: string): Promise<User | null> {
    const document: HydratedDocument<IUser> | null = await UserModel.findOne({ username })
    const user: User | null = BaseModel.toJSON<IUser, User>(document)
    const result: boolean = user ? await PasswordHelper.compare(password, user.password) : false

    if (!user || !result) {
      return null
    }

    Reflect.deleteProperty(user, 'password')
    return user
  }

  static async create(data: CreateUser): Promise<User | null> {
    data.password = await PasswordHelper.hash(data.password)
    const document: HydratedDocument<IUser> | null = await UserModel.create({ ...data })
    const user: User | null = BaseModel.toJSON<IUser, User>(document)

    if (!user) {
      return null
    }

    Reflect.deleteProperty(user, 'password')
    return user
  }

  static async update(id: string, data: UpdateUser): Promise<User | null> {
    if (data.password) {
      data.password = await PasswordHelper.hash(data.password)
    }

    const document: HydratedDocument<IUser> | null = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...data } },
      { new: true, runValidators: true, _id: id, projection: { password: 0 } }
    )
    const user: User | null = BaseModel.toJSON<IUser, User>(document)

    if (!user) {
      return null
    }

    return user
  }
}
