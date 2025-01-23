import console from 'node:console'
import { connectDB } from './database'
import EnvHelper from './helpers/EnvHelper'
import app from './server'

const startServer = async () => {
  try {
    await connectDB()
    app.listen(EnvHelper.PORT)
    console.log(`Server ready: http://localhost:${EnvHelper.PORT}/api/v1`)
  } catch (error: any) {
    console.log(error.message)
  }
}

startServer()
