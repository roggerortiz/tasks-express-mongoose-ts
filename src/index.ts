import express from 'express'
import console from 'node:console'
import MongooseHelper from './helpers/MongooseHelper'
import ServerHelper from './helpers/ServerHelper'
import SwaggerHelper from './helpers/SwaggerHelper'

const app = express()

const start = async () => {
  try {
    await SwaggerHelper.generate()
    await MongooseHelper.connect()
    ServerHelper.listen(app)
  } catch (error: any) {
    console.log(error.message)
  }
}

start()
