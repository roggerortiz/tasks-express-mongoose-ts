import MongooseHelper from '@/helpers/MongooseHelper'
import PasswordHelper from '@/helpers/PasswordHelper'
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
      unique: true,
      required: true
    },
    phone: {
      type: String,
      unique: true,
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      set: (value: string) => PasswordHelper.hash(value)
    }
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

const UserModel = model<IUser, Model<IUser>>('User', userSchema, 'users')

userSchema
  .path('email')
  .validate(MongooseHelper.uniqueValidatorFn<IUser>(models.User, 'email'), "The 'Email' value already exists")

userSchema
  .path('phone')
  .validate(MongooseHelper.uniqueValidatorFn<IUser>(models.User, 'phone'), "The 'Phone' value already exists")

userSchema
  .path('username')
  .validate(MongooseHelper.uniqueValidatorFn<IUser>(models.User, 'username'), "The 'Username' value already exists")

export default UserModel
