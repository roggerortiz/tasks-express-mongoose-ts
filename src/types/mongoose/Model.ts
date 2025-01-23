import { Model as MongooseModel } from 'mongoose'

export type Model<T> = MongooseModel<T, {}, {}>
