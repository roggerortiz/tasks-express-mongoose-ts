import PasswordHelper from '@/helpers/PasswordHelper'
import { CreateUser, UpdateUser, User } from '@/types/models/User'
import { HydratedDocument } from 'mongoose'
import BaseModel from '../models/BaseModel'
import UserModel, { IUser } from '../models/UserModel'

export default class UserService {
  static async login(username: string, password: string): Promise<User | null> {
    const document: HydratedDocument<IUser> | null = await UserModel.findOne({ username })
    const matched: boolean = document ? PasswordHelper.compare(password, document.password) : false
    return matched ? BaseModel.toJSON<IUser, User>(document, ['password']) : null
  }

  static async create(data: CreateUser): Promise<User | null> {
    const document: HydratedDocument<IUser> | null = await UserModel.create({ ...data })
    return BaseModel.toJSON<IUser, User>(document, ['password'])
  }

  static async update(id: string, data: UpdateUser): Promise<User | null> {
    const document: HydratedDocument<IUser> | null = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...data } },
      { new: true, runValidators: true, _id: id, projection: { password: 0 } }
    )
    return BaseModel.toJSON<IUser, User>(document, ['password'])
  }
}

