import mongoose from 'mongoose'
import EnvHelper from './helpers/EnvHelper'

export const connectDB = async () => {
  await mongoose.connect(EnvHelper.MONGO_URI)
}
