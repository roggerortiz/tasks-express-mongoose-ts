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

const UserSchema = new Schema<IUser>(
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
      required: true
    },
    phone: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: true
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

const UserModel = model<IUser, Model<IUser>>('users', UserSchema)

export default UserModel
