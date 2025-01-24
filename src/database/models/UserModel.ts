import MongooseHelper from '@/helpers/MongooseHelper'
import { Model } from '@/types/mongoose/Model'
import { Schema, model, models } from 'mongoose'

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
      required: true,
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

const UserModel = model<IUser, Model<IUser>>('User', userSchema, 'users')

userSchema
  .path('email')
  .validate(MongooseHelper.uniqueValidatorFn<IUser>(models.User, 'email'), "The 'Email' field value already exists")

userSchema
  .path('phone')
  .validate(MongooseHelper.uniqueValidatorFn<IUser>(models.User, 'phone'), "The 'Phone' field value already exists")

userSchema
  .path('username')
  .validate(
    MongooseHelper.uniqueValidatorFn<IUser>(models.User, 'username'),
    "The 'Username' field value already exists"
  )

export default UserModel
