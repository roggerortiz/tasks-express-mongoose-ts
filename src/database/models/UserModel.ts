import { Model } from '@/types/mongoose/Model'
import { Schema, model } from 'mongoose'

export interface IUser {
  first_name: string
  last_name: string
  email: string
  phone?: string
  username: string
  password: string
}

const userSchema = new Schema<IUser>(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: false,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
)

const UserModel = model<IUser, Model<IUser>>('users', userSchema)

export default UserModel
